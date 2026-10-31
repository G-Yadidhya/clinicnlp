import React, { useState, useMemo } from 'react';
import {
  Cpu,
  Layers,
  ShieldCheck,
  Binary,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { extractClinicalEntities } from '../../services/nlpExtractor';
import { evaluateClinicalTriage } from '../../services/triageEngine';
import { getAdaptiveFollowUpQuestions } from '../../services/adaptiveQuestionEngine';
import { SYMPTOM_ONTOLOGY, DETERMINISTIC_TRIAGE_RULES } from '../../data/medicalKnowledge';

export const PipelineView: React.FC = () => {
  const [testSentence, setTestSentence] = useState<string>(
    'Patient has high fever and severe headache for 3 days, but denies chest pain and denies shortness of breath.'
  );

  const presets = [
    {
      title: 'Meningitis emergency',
      text: 'I have had a high fever and excruciating headache for 2 days, and my neck is very stiff.'
    },
    {
      title: 'Cardiac red flags with negation',
      text: 'Patient feels crushing chest pain and shortness of breath, but has no fever and no cough.'
    },
    {
      title: 'Respiratory viral presentation',
      text: 'I have had fever, chills, severe muscle aches and dry cough for 4 days, without chest pressure.'
    },
    {
      title: 'Migraine with aura',
      text: 'Severe throbbing headache on left side with extreme light sensitivity and nausea for 6 hours.'
    }
  ];

  const analysis = useMemo(() => {
    const nlpResult = extractClinicalEntities(testSentence);
    const triageResult = evaluateClinicalTriage(nlpResult.extractedSymptoms);
    const adaptiveCandidates = getAdaptiveFollowUpQuestions(nlpResult.extractedSymptoms, 3);
    return { nlpResult, triageResult, adaptiveCandidates };
  }, [testSentence]);

  const { nlpResult, triageResult, adaptiveCandidates } = analysis;

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-6 space-y-5">
      {/* Input console */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-teal-600" />
              NLP Pipeline Inspector
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Type or pick a clinical sentence to inspect every layer of the engine in real time.
            </p>
          </div>
          <span className="text-[11px] font-medium bg-teal-50 text-teal-700 border border-teal-200 px-3 py-1 rounded-full shrink-0">
            Real-time analysis
          </span>
        </div>

        <label htmlFor="pipeline-input" className="sr-only">
          Clinical sentence to analyze
        </label>
        <textarea
          id="pipeline-input"
          value={testSentence}
          onChange={e => setTestSentence(e.target.value)}
          rows={3}
          className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition resize-none"
          placeholder="Type any natural language medical statement..."
        />

        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="text-[11px] uppercase tracking-wide text-slate-400 font-medium">Sample cases:</span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setTestSentence(p.text)}
              className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-teal-50 text-slate-600 hover:text-teal-700 border border-slate-300 hover:border-teal-300 transition text-[11px]"
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      {/* Layer grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Layer 1: extraction */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-semibold text-sm text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-600" />
              Layer 1 · Entity &amp; negation extraction
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              {nlpResult.extractedSymptoms.length} concepts
            </span>
          </div>

          {/* Attributes */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-slate-400 text-[10px] uppercase font-medium">First duration found</div>
              <div className="text-teal-700 font-medium text-xs mt-0.5">
                {nlpResult.globalDuration || 'None specified'}
                {nlpResult.globalDurationDays !== undefined ? ` (${nlpResult.globalDurationDays} days)` : ''}
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-slate-400 text-[10px] uppercase font-medium">Progression</div>
              <div className="text-teal-700 font-medium text-xs mt-0.5 capitalize">
                {nlpResult.globalProgression || 'Unspecified'}
              </div>
            </div>
          </div>

          {/* Concepts */}
          <div className="space-y-2">
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wide">
              Normalized concepts
            </div>
            {nlpResult.extractedSymptoms.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-400 italic text-center">
                No recognized clinical symptoms in this text. Try keywords like fever, headache, chest pain, cough.
              </div>
            ) : (
              <ul className="space-y-2">
                {nlpResult.extractedSymptoms.map(sym => (
                  <li
                    key={sym.canonicalId}
                    className={`p-3 rounded-xl border bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                      sym.isNegated ? 'border-rose-200' : sym.certainty === 'possible' ? 'border-amber-200' : 'border-teal-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                            sym.isNegated ? 'bg-rose-500' : sym.certainty === 'possible' ? 'bg-amber-500' : 'bg-teal-500'
                          }`}
                        />
                        <span className="font-semibold text-slate-900 text-xs">{sym.canonicalName}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide border ${
                            sym.isNegated
                              ? 'bg-rose-50 text-rose-600 border-rose-200'
                              : sym.certainty === 'possible'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-teal-50 text-teal-700 border-teal-200'
                          }`}
                        >
                          {sym.isNegated ? 'Negated' : sym.certainty === 'possible' ? 'Hedged' : 'Affirmed'}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Matched <code className="text-slate-700 bg-white border border-slate-200 px-1 py-0.5 rounded">"{sym.triggerSpan?.text ?? sym.rawText}" @ {sym.triggerSpan?.start ?? 0}</code>
                        {sym.severity !== 'unspecified' && (
                          <span className="ml-2 text-amber-700">Severity: {sym.severity}</span>
                        )}
                        {sym.duration && (
                          <span className="ml-2 text-teal-700">Duration: {sym.duration}</span>
                        )}
                        {sym.progression && (
                          <span className="ml-2 text-slate-600">Trajectory: {sym.progression}</span>
                        )}
                      </div>
                    </div>

                    <div className="text-right sm:border-l sm:border-slate-200 sm:pl-3">
                      <div className="text-[10px] font-mono text-slate-400">
                        SNOMED <span className="text-teal-700">{sym.snomedCode}</span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        MeSH <span className="text-cyan-700">{sym.meshId}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* NegEx scopes */}
          {nlpResult.negationScopesFound.length > 0 && (
            <div className="p-3 bg-rose-50/60 border border-rose-200 rounded-xl space-y-1">
              <div className="text-rose-600 font-semibold text-[11px] flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                Negation scopes triggered
              </div>
              {nlpResult.negationScopesFound.map((neg, nIdx) => (
                <div key={nIdx} className="text-slate-600 font-mono text-[11px]">
                  • Trigger <code className="text-rose-700 bg-white border border-rose-200 px-1 rounded">"{neg.trigger}"</code> scope: <span className="text-slate-500">{neg.scopeText}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Layer 2: triage */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-semibold text-sm text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              Layer 2 · Clinical safety triage
            </h3>
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wide ${
                triageResult.level === 'EMERGENCY'
                  ? 'bg-red-100 text-red-700 border border-red-200'
                  : triageResult.level === 'URGENT'
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
              }`}
            >
              {triageResult.level === 'SELF_CARE' ? 'SELF CARE' : triageResult.level}
            </span>
          </div>

          <div
            className={`p-3.5 rounded-xl border text-xs ${
              triageResult.level === 'EMERGENCY'
                ? 'bg-red-50 border-red-200 text-red-800'
                : triageResult.level === 'URGENT'
                ? 'bg-amber-50 border-amber-200 text-amber-800'
                : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <div className="font-bold text-sm text-slate-900">{triageResult.title}</div>
            <p className="mt-1 leading-relaxed">{triageResult.rationale}</p>
            <div className="mt-2.5 pt-2 border-t border-slate-200 font-medium">
              Action: <span className="text-teal-700 font-semibold">{triageResult.recommendedAction}</span>
            </div>
          </div>

          {/* Rule verification strip */}
          <div className="space-y-2">
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wide">
              Safety rules evaluated
            </div>
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {DETERMINISTIC_TRIAGE_RULES.map(rule => {
                const presentSet = new Set(
                  nlpResult.extractedSymptoms.filter(s => !s.isNegated).map(s => s.canonicalId)
                );
                const isTriggered =
                  rule.logic === 'AND'
                    ? rule.triggerSymptoms.every(id => presentSet.has(id))
                    : rule.triggerSymptoms.some(id => presentSet.has(id));

                return (
                  <div
                    key={rule.id}
                    className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                      isTriggered
                        ? 'bg-red-50 border-red-200'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-slate-800 flex items-center gap-1.5">
                        {isTriggered ? (
                          <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        )}
                        <span>{rule.name}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Triggers: [{rule.triggerSymptoms.join(` ${rule.logic} `)}]
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        isTriggered ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-white text-slate-400 border border-slate-200'
                      }`}
                    >
                      {isTriggered ? 'TRIGGERED' : 'PASSED'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Layer 3: information gain */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-semibold text-sm text-slate-900 flex items-center gap-2">
              <Binary className="w-4 h-4 text-teal-600" />
              Layer 3 · Adaptive questions (information gain)
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              H(D) − E[H(D|S)]
            </span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            The engine ranks candidate questions by which unknown symptom maximizes mutual information
            reduction across the active differential distribution.
          </p>

          <div className="space-y-2.5">
            {adaptiveCandidates.map((cand, idx) => (
              <div
                key={cand.symptomId}
                className="p-3 rounded-xl bg-slate-50/50 border border-slate-200 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center text-[10px] font-bold">
                      #{idx + 1}
                    </span>
                    {cand.symptomName}
                    {cand.category === 'red_flag' && (
                      <span className="text-[9px] font-bold uppercase bg-red-50 text-red-600 border border-red-200 px-1.5 py-0.5 rounded-full">
                        Red flag
                      </span>
                    )}
                  </span>
                  <span className="font-mono text-teal-700 font-bold">
                    IG: +{cand.informationGain.toFixed(3)}
                  </span>
                </div>
                <p className="text-slate-500 text-[11px] italic">
                  "{cand.questionText}"
                </p>
                <div className="text-[10px] text-slate-400">
                  Category: {cand.category.replace('_', ' ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-sm text-amber-900">Diagnostic limits</h3>
          <p className="text-xs text-amber-800 mt-1 leading-relaxed">
            This prototype does not identify diseases or estimate diagnostic probabilities. Its symptom matching and triage rules can miss important details; use results only as general safety guidance and contact a licensed clinician for medical advice.
          </p>
        </div>
      </div>
    </div>
  );
};
