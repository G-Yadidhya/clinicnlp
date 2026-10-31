import { ExtractedSymptom } from '../types/clinical';
import { SYMPTOM_ONTOLOGY } from '../data/medicalKnowledge';

export type { TokenSpan, ExtractedSymptom } from '../types/clinical';

// NegEx inspired clinical negation trigger phrases
const PRE_NEGATION_TRIGGERS = [
  'no', 'not', 'denies', 'denying', 'without', 'negative for', 'ruled out',
  'no signs of', 'never had', 'did not have', "didn't have", 'free of',
  'absence of', 'fails to reveal'
];

const POST_NEGATION_TRIGGERS = [
  'unlikely', 'was ruled out', 'is absent', 'resolved'
];

// Epistemic hedging triggers -> certainty 'possible'
const HEDGE_TRIGGERS = [
  'possible', 'maybe', 'perhaps', 'might be', 'might have', 'could be',
  'may be', 'may have', 'i think', 'think i might', 'seems like',
  'feels like', 'feeling like', 'kind of', 'sort of', 'wondering if'
];

// Temporal duration regex patterns
const DURATION_PATTERNS = [
  /(\d+)\s*(days?|hrs?|hours?|weeks?|months?)/i,
  /(yesterday|last night|a few days|couple of days|a week)/i,
  /since\s+([a-zA-Z]+|\d+\s*[a-zA-Z]+)/i
];

const WORD_DURATION_DAYS: Record<string, number> = {
  yesterday: 1,
  'last night': 1,
  'a few days': 3,
  'couple of days': 2,
  'a week': 7
};

// Severity lexicon
const SEVERITY_PATTERNS: Record<string, 'mild' | 'moderate' | 'severe'> = {
  mild: 'mild',
  slight: 'mild',
  minor: 'mild',
  little: 'mild',
  moderate: 'moderate',
  medium: 'moderate',
  manageable: 'moderate',
  severe: 'severe',
  terrible: 'severe',
  unbearable: 'severe',
  crushing: 'severe',
  pounding: 'severe',
  extreme: 'severe',
  intense: 'severe',
  excruciating: 'severe'
};

// Progression lexicon
const PROGRESSION_PATTERNS: Record<string, 'improving' | 'worsening' | 'stable' | 'fluctuating'> = {
  worse: 'worsening',
  worsening: 'worsening',
  deteriorating: 'worsening',
  increasing: 'worsening',
  better: 'improving',
  improving: 'improving',
  lessening: 'improving',
  stable: 'stable',
  unchanged: 'stable',
  same: 'stable',
  'comes and goes': 'fluctuating',
  intermittent: 'fluctuating'
};

export interface DetailedNLPResult {
  rawInput: string;
  extractedSymptoms: ExtractedSymptom[];
  globalDuration?: string;
  globalDurationDays?: number;
  globalProgression?: 'improving' | 'worsening' | 'stable' | 'fluctuating';
  tokensAnalyzed: number;
  negationScopesFound: { trigger: string; scopeText: string }[];
}

interface Clause {
  start: number;
  end: number;
  sepBefore: string;
}

interface SymptomOccurrence {
  canonicalId: string;
  index: number;
  length: number;
  raw: string;
  clauseIdx: number;
}

interface TemporalMatch {
  text: string;
  index: number;
  days?: number;
}

type Progression = 'improving' | 'worsening' | 'stable' | 'fluctuating';

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function triggerRegex(trigger: string): RegExp {
  return new RegExp(
    `(?<![a-zA-Z0-9])${escapeRegex(trigger)}(?!\\s+only)(?![a-zA-Z0-9])`,
    'i'
  );
}

function hasTrigger(triggerList: string[], segment: string): string | undefined {
  for (const trigger of triggerList) {
    if (triggerRegex(trigger).test(segment)) {
      return trigger;
    }
  }
  return undefined;
}

// Continuation separators keep a resolved negation scope alive across a denial list
// ("denies chest pain and shortness of breath"); contrastive separators break it.
function isContinuationSeparator(sep: string): boolean {
  const s = sep.toLowerCase();
  return s === ',' || s === 'and' || s === 'or';
}

const CLAUSE_SEPARATOR_RE = /,|;|!|\?|\band\b|\bbut\b|\bhowever\b|\balso\b|\bor\b/g;

function buildClauses(lower: string): Clause[] {
  const clauses: Clause[] = [];
  let start = 0;
  let sepBefore = '';
  let match: RegExpExecArray | null;
  CLAUSE_SEPARATOR_RE.lastIndex = 0;
  while ((match = CLAUSE_SEPARATOR_RE.exec(lower)) !== null) {
    clauses.push({ start, end: match.index, sepBefore });
    sepBefore = match[0].toLowerCase();
    start = match.index + match[0].length;
  }
  clauses.push({ start, end: lower.length, sepBefore });
  return clauses;
}

function computeClauseNegation(lower: string, clauses: Clause[]): Map<number, string> {
  const clauseNegation = new Map<number, string>();
  clauses.forEach((clause, idx) => {
    const trigger = hasTrigger(PRE_NEGATION_TRIGGERS, lower.slice(clause.start, clause.end));
    if (trigger) {
      clauseNegation.set(idx, trigger);
    }
  });
  for (let idx = 1; idx < clauses.length; idx++) {
    if (isContinuationSeparator(clauses[idx].sepBefore) && clauseNegation.has(idx - 1) && !clauseNegation.has(idx)) {
      clauseNegation.set(idx, `${clauseNegation.get(idx - 1)} (carried: "${clauses[idx].sepBefore}")`);
    }
  }
  return clauseNegation;
}

function parseDurationMatch(match: RegExpExecArray): TemporalMatch {
  const text = match[0];
  const num = parseInt(match[1], 10);
  const unit = match[2]?.toLowerCase();
  let days: number | undefined;
  if (!isNaN(num) && unit) {
    if (unit.startsWith('day')) days = num;
    else if (unit.startsWith('hr') || unit.startsWith('hour')) days = +(num / 24).toFixed(1);
    else if (unit.startsWith('week')) days = num * 7;
    else if (unit.startsWith('month')) days = num * 30;
  } else {
    days = WORD_DURATION_DAYS[text.toLowerCase()];
  }
  return { text, index: match.index, days };
}

function collectMatches(lower: string, source: RegExp, handler: (match: RegExpExecArray) => void): void {
  const re = new RegExp(source.source, source.flags.includes('g') ? source.flags : source.flags + 'g');
  let match: RegExpExecArray | null;
  while ((match = re.exec(lower)) !== null) {
    handler(match);
  }
}

function computeConfidence(synonyms: string[], matched: string): number {
  const primary = synonyms[0]?.toLowerCase();
  if (primary && matched.toLowerCase() === primary) return 0.95;
  if (matched.trim().includes(' ')) return 0.9;
  return 0.82;
}

export function extractClinicalEntities(text: string): DetailedNLPResult {
  const lower = text.toLowerCase();
  const negationScopes: { trigger: string; scopeText: string }[] = [];

  // 1. Full duration inventory with positions
  const durationMatches: TemporalMatch[] = [];
  for (const pattern of DURATION_PATTERNS) {
    collectMatches(lower, pattern, match => durationMatches.push(parseDurationMatch(match)));
  }
  durationMatches.sort((a, b) => a.index - b.index);
  const globalDuration = durationMatches[0]?.text;
  const globalDurationDays = durationMatches[0]?.days;

  // 2. Full progression inventory with positions
  const progressionMatches: { text: string; index: number; value: Progression }[] = [];
  const progressionAlternatives = Object.keys(PROGRESSION_PATTERNS)
    .sort((a, b) => b.length - a.length)
    .map(escapeRegex)
    .join('|');
  collectMatches(lower, new RegExp(`(\\b(?:${progressionAlternatives})\\b)`, 'i'), match => {
    const phrase = match[1].toLowerCase();
    const value = PROGRESSION_PATTERNS[phrase] as Progression | undefined;
    if (value) {
      progressionMatches.push({ text: match[1], index: match.index, value });
    }
  });
  progressionMatches.sort((a, b) => a.index - b.index);
  const globalProgression = progressionMatches[0]?.value;

  // 3. Clause map for scope-limited negation and attribute analysis
  const clauses = buildClauses(lower);
  const clauseNegation = computeClauseNegation(lower, clauses);

  function clauseIndexAt(pos: number): number {
    for (let i = 0; i < clauses.length; i++) {
      if (pos >= clauses[i].start && pos < clauses[i].end) return i;
    }
    return clauses.length - 1;
  }

  // 4. Locate symptom occurrences via word-boundary synonym matching (earliest, then longest)
  const occurrences: SymptomOccurrence[] = [];
  for (const [symptomKey, def] of Object.entries(SYMPTOM_ONTOLOGY)) {
    let best: { index: number; length: number; raw: string } | undefined;
    for (const syn of def.synonyms) {
      collectMatches(lower, new RegExp(`(?<![a-z])${escapeRegex(syn.toLowerCase())}(?![a-z])`, 'i'), match => {
        const candidate = { index: match.index, length: match[0].length, raw: match[0] };
        if (
          !best ||
          candidate.index < best.index ||
          (candidate.index === best.index && candidate.length > best.length)
        ) {
          best = candidate;
        }
      });
    }
    if (best) {
      occurrences.push({
        canonicalId: symptomKey,
        index: best.index,
        length: best.length,
        raw: best.raw,
        clauseIdx: clauseIndexAt(best.index)
      });
    }
  }
  occurrences.sort((a, b) => a.index - b.index);

  // 5. Attribute ownership: a temporal/progression match belongs to the nearest
  //    symptom mention at or before its position (earliest mention, if none).
  const durationByOccurrence = new Map<number, TemporalMatch>();
  for (const dur of durationMatches) {
    let owner = 0;
    for (let i = 0; i < occurrences.length; i++) {
      if (occurrences[i].index <= dur.index) owner = i; else break;
    }
    if (!durationByOccurrence.has(owner)) {
      durationByOccurrence.set(owner, dur);
    }
  }

  const progressionByOccurrence = new Map<number, Progression>();
  for (const prog of progressionMatches) {
    let owner = 0;
    for (let i = 0; i < occurrences.length; i++) {
      if (occurrences[i].index <= prog.index) owner = i; else break;
    }
    if (!progressionByOccurrence.has(owner)) {
      progressionByOccurrence.set(owner, prog.value);
    }
  }

  const symptomsFound: ExtractedSymptom[] = [];
  for (let i = 0; i < occurrences.length; i++) {
    const occ = occurrences[i];
    const clause = clauses[occ.clauseIdx];
    const clauseText = lower.slice(clause.start, clause.end);
    const prefix = lower.slice(clause.start, occ.index);
    const postfix = lower.slice(occ.index + occ.length, clause.end);

    const symptomDef = SYMPTOM_ONTOLOGY[occ.canonicalId];
    const scopeText = `${clauseText.trim()} -> [${occ.raw}]`;

    // Pre-negation: own trigger in this clause before the mention
    let isNegated = false;
    const ownTrigger = hasTrigger(PRE_NEGATION_TRIGGERS, prefix);
    if (ownTrigger) {
      isNegated = true;
      negationScopes.push({ trigger: ownTrigger, scopeText });
    }

    // Negation carried by a denial list ("denies chest pain and shortness of breath")
    if (!isNegated && !ownTrigger && isContinuationSeparator(clause.sepBefore) && clauseNegation.has(occ.clauseIdx)) {
      isNegated = true;
      negationScopes.push({
        trigger: clauseNegation.get(occ.clauseIdx) || '',
        scopeText
      });
    }

    // Post-negation within the same clause
    if (!isNegated) {
      const postTrigger = hasTrigger(POST_NEGATION_TRIGGERS, postfix);
      if (postTrigger) {
        isNegated = true;
        negationScopes.push({
          trigger: postTrigger,
          scopeText: `[${occ.raw}] <- ${postfix.trim()}`
        });
      }
    }

    let certainty: 'certain' | 'possible' = 'certain';
    if (!isNegated) {
      const hedgeTrigger = hasTrigger(HEDGE_TRIGGERS, prefix);
      if (hedgeTrigger) {
        certainty = 'possible';
      }
    }

    const contextAround = lower.slice(
      Math.max(clause.start, occ.index - 30),
      Math.min(clause.end, occ.index + occ.length + 30)
    );
    let detectedSeverity: 'mild' | 'moderate' | 'severe' | 'unspecified' = 'unspecified';
    for (const [sevWord, level] of Object.entries(SEVERITY_PATTERNS)) {
      if (new RegExp(`(?<![a-zA-Z])${escapeRegex(sevWord)}(?![a-zA-Z])`, 'i').test(contextAround)) {
        detectedSeverity = level;
        break;
      }
    }

    const localDuration = durationByOccurrence.get(i);
    const localProgression = progressionByOccurrence.get(i);

    const baseConfidence = computeConfidence(symptomDef?.synonyms || [], occ.raw);
    symptomsFound.push({
      rawText: occ.raw,
      canonicalId: occ.canonicalId,
      canonicalName: symptomDef?.name || occ.canonicalId,
      snomedCode: symptomDef?.snomedCode || '',
      meshId: symptomDef?.meshId || '',
      isNegated,
      certainty,
      triggerSpan: {
        text: text.slice(occ.index, occ.index + occ.length),
        start: occ.index,
        end: occ.index + occ.length
      },
      severity: detectedSeverity,
      duration: localDuration?.text,
      durationDays: localDuration?.days,
      progression: localProgression,
      confidence: +(baseConfidence * (certainty === 'possible' ? 0.7 : 1)).toFixed(2)
    });
  }

  // Blanket attribution fallback: with a single distinct symptom, a global duration
  // unambiguously describes that symptom.
  if (symptomsFound.length === 1 && globalDuration) {
    symptomsFound[0].duration = symptomsFound[0].duration || globalDuration;
    symptomsFound[0].durationDays =
      symptomsFound[0].durationDays !== undefined ? symptomsFound[0].durationDays : globalDurationDays;
  }

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  return {
    rawInput: text,
    extractedSymptoms: symptomsFound,
    globalDuration,
    globalDurationDays,
    globalProgression,
    tokensAnalyzed: wordCount,
    negationScopesFound: negationScopes
  };
}
