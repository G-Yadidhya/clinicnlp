import { ExtractedSymptom, QuestionCandidate } from '../types/clinical';
import { CLINICAL_DISEASE_DB, SYMPTOM_ONTOLOGY } from '../data/medicalKnowledge';

const MIN_WEIGHT = 0.02;
const NEUTRAL_WEIGHT = 0.05;
const PSEUDO_COUNT = 0.001;

const supportedNegation = (weight: number) => 1 - weight * 0.8;

function diseaseLogLikelihood(
  disease: (typeof CLINICAL_DISEASE_DB)[number],
  knownPresent: Set<string>,
  knownNegated: Set<string>
): number {
  let logLikelihood = 0;
  for (const [symId, rawWeight] of Object.entries(disease.symptomWeights)) {
    const weight = Math.max(rawWeight, MIN_WEIGHT);
    if (knownPresent.has(symId)) {
      logLikelihood += Math.log(weight);
    } else if (knownNegated.has(symId)) {
      logLikelihood += Math.log(supportedNegation(weight));
    }
  }
  return logLikelihood;
}

// Normalized disease posterior over the tracked pool given observed symptoms.
// With no observations this reduces to the uniform prior.
function computeDiseasePosterior(
  knownPresent: Set<string>,
  knownNegated: Set<string>
): Record<string, number> {
  const logLikelihoods = CLINICAL_DISEASE_DB.map(disease =>
    diseaseLogLikelihood(disease, knownPresent, knownNegated)
  );
  const maxLog = Math.max(...logLikelihoods);
  const expScores = logLikelihoods.map(l => Math.exp(l - maxLog));
  const expSum = expScores.reduce((acc, val) => acc + val, 0);

  const pDiseases: Record<string, number> = {};
  CLINICAL_DISEASE_DB.forEach((disease, idx) => {
    pDiseases[disease.id] = expScores[idx] / expSum;
  });
  return pDiseases;
}

function shannonEntropy(pDiseases: Record<string, number>): number {
  let entropy = 0;
  for (const p of Object.values(pDiseases)) {
    if (p > PSEUDO_COUNT) {
      entropy -= p * Math.log2(p);
    }
  }
  return entropy;
}

export function getAdaptiveFollowUpQuestions(
  knownSymptoms: ExtractedSymptom[],
  maxQuestions: number = 3
): QuestionCandidate[] {
  const knownPresent = new Set(knownSymptoms.filter(s => !s.isNegated).map(s => s.canonicalId));
  const knownNegated = new Set(knownSymptoms.filter(s => s.isNegated).map(s => s.canonicalId));
  const evaluatedSymptoms = new Set([...knownPresent, ...knownNegated]);

  const pDiseases = computeDiseasePosterior(knownPresent, knownNegated);
  const baselineEntropy = shannonEntropy(pDiseases);

  // For every unasked symptom, compute Information Gain
  const candidates: QuestionCandidate[] = [];

  for (const [symptomId, def] of Object.entries(SYMPTOM_ONTOLOGY)) {
    if (evaluatedSymptoms.has(symptomId)) continue; // already known

    // P(S=1) = sum_d P(S=1|d) * P(d)
    let pSymptomPresent = 0;
    for (const d of CLINICAL_DISEASE_DB) {
      const pS_given_d = d.symptomWeights[symptomId] ?? NEUTRAL_WEIGHT;
      pSymptomPresent += pS_given_d * pDiseases[d.id];
    }
    pSymptomPresent = Math.min(Math.max(pSymptomPresent, 0.05), 0.95);
    const pSymptomAbsent = 1 - pSymptomPresent;

    // Calculate conditional entropy H(D | S=1)
    let entropyIfPresent = 0;
    let sumPosteriorPresent = 0;
    const postPresent: Record<string, number> = {};
    for (const d of CLINICAL_DISEASE_DB) {
      const pS_given_d = d.symptomWeights[symptomId] ?? NEUTRAL_WEIGHT;
      postPresent[d.id] = pS_given_d * pDiseases[d.id];
      sumPosteriorPresent += postPresent[d.id];
    }
    for (const d of CLINICAL_DISEASE_DB) {
      const p = postPresent[d.id] / (sumPosteriorPresent || 1);
      if (p > PSEUDO_COUNT) entropyIfPresent -= p * Math.log2(p);
    }

    // Calculate conditional entropy H(D | S=0)
    let entropyIfAbsent = 0;
    let sumPosteriorAbsent = 0;
    const postAbsent: Record<string, number> = {};
    for (const d of CLINICAL_DISEASE_DB) {
      const pS_given_d = d.symptomWeights[symptomId] ?? NEUTRAL_WEIGHT;
      postAbsent[d.id] = (1 - pS_given_d) * pDiseases[d.id];
      sumPosteriorAbsent += postAbsent[d.id];
    }
    for (const d of CLINICAL_DISEASE_DB) {
      const p = postAbsent[d.id] / (sumPosteriorAbsent || 1);
      if (p > PSEUDO_COUNT) entropyIfAbsent -= p * Math.log2(p);
    }

    // Information Gain = H(D) - [P(S=1)*H(D|S=1) + P(S=0)*H(D|S=0)]
    const expectedConditionalEntropy = (pSymptomPresent * entropyIfPresent) + (pSymptomAbsent * entropyIfAbsent);
    let infoGain = Math.max(0, baselineEntropy - expectedConditionalEntropy);

    // Boost red flags if related dangerous disease has > 15% probability in pool
    const isRedFlag = def.isRedFlagDefault;
    if (isRedFlag) {
      infoGain += 0.35; // prioritize dangerous rule-out questions
    }

    // Target diseases most affected by this question
    const affectedDiseases = CLINICAL_DISEASE_DB
      .filter(d => (d.symptomWeights[symptomId] ?? 0) >= 0.6)
      .map(d => d.name);

    candidates.push({
      symptomId,
      symptomName: def.name,
      questionText: def.questionPrompt,
      informationGain: +infoGain.toFixed(3),
      targetDiseases: affectedDiseases.slice(0, 3),
      category: isRedFlag ? 'red_flag' : 'differential'
    });
  }

  // Sort by highest information gain
  candidates.sort((a, b) => b.informationGain - a.informationGain);

  return candidates.slice(0, maxQuestions);
}
