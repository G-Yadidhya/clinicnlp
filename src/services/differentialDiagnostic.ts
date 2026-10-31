import { DiseaseEvidence, ExtractedSymptom } from '../types/clinical';
import { CLINICAL_DISEASE_DB, SYMPTOM_ONTOLOGY } from '../data/medicalKnowledge';

const MIN_WEIGHT = 0.02;

export function computeDifferentialDiagnosis(
  knownSymptoms: ExtractedSymptom[]
): DiseaseEvidence[] {
  const presentSymptomIds = new Set(knownSymptoms.filter(s => !s.isNegated).map(s => s.canonicalId));
  const negatedSymptomIds = new Set(knownSymptoms.filter(s => s.isNegated).map(s => s.canonicalId));

  if (presentSymptomIds.size === 0) {
    return [];
  }

  // Log-likelihood accumulation: log P(S_observed | D) under a naive-Bayes
  // independence assumption. Unmentioned symptoms contribute no evidence;
  // negated characteristic symptoms reduce the likelihood.
  const supportedNegation = (weight: number) => 1 - weight * 0.8;

  interface DifferentialCandidate {
    disease: (typeof CLINICAL_DISEASE_DB)[number];
    logLikelihood: number;
    matchedSymptoms: string[];
    missingCore: string[];
    disqualifiedNegations: string[];
    unmatchedUserSymptoms: string[];
  }

  const candidates: DifferentialCandidate[] = [];

  for (const disease of CLINICAL_DISEASE_DB) {
    let logLikelihood = 0;
    let matchedCount = 0;
    const matchedSymptoms: string[] = [];
    const missingCore: string[] = [];
    const disqualifiedNegations: string[] = [];

    for (const [symId, rawWeight] of Object.entries(disease.symptomWeights)) {
      const weight = Math.max(rawWeight, MIN_WEIGHT);
      if (presentSymptomIds.has(symId)) {
        matchedCount += 1;
        matchedSymptoms.push(SYMPTOM_ONTOLOGY[symId]?.name || symId);
        logLikelihood += Math.log(weight);
      } else if (negatedSymptomIds.has(symId)) {
        disqualifiedNegations.push(SYMPTOM_ONTOLOGY[symId]?.name || symId);
        logLikelihood += Math.log(supportedNegation(weight));
      }
    }

    if (matchedCount === 0) {
      continue;
    }

    for (const coreId of disease.coreSymptomIds) {
      if (!presentSymptomIds.has(coreId) && !negatedSymptomIds.has(coreId)) {
        missingCore.push(SYMPTOM_ONTOLOGY[coreId]?.name || coreId);
      }
    }

    const unmatchedUserSymptoms = Array.from(presentSymptomIds)
      .filter(symId => !disease.symptomWeights[symId] || disease.symptomWeights[symId] < 0.2)
      .map(symId => SYMPTOM_ONTOLOGY[symId]?.name || symId);

    candidates.push({
      disease,
      logLikelihood,
      matchedSymptoms,
      missingCore,
      disqualifiedNegations,
      unmatchedUserSymptoms
    });
  }

  if (candidates.length === 0) {
    return [];
  }

  // Softmax normalization over the constrained candidate pool: the reported
  // percentage is the RELATIVE SHARE of the observed likelihood mass in the
  // current pool (uncalibrated, not an absolute P(D|S)).
  const maxLog = Math.max(...candidates.map(c => c.logLikelihood));
  const expScores = candidates.map(c => Math.exp(c.logLikelihood - maxLog));
  const expSum = expScores.reduce((acc, val) => acc + val, 0);

  const results: DiseaseEvidence[] = candidates.map((candidate, idx) => {
    const disease = candidate.disease;
    const relativeShare = expScores[idx] / expSum;

    return {
      id: disease.id,
      name: disease.name,
      icd10: disease.icd10,
      category: disease.category,
      summary: disease.summary,
      matchedSymptoms: candidate.matchedSymptoms,
      unmatchedPresentSymptoms: candidate.unmatchedUserSymptoms,
      missingCoreSymptoms: candidate.missingCore,
      disqualifyingNegations: candidate.disqualifiedNegations,
      likelihoodScore: +relativeShare.toFixed(3),
      clinicalConfidenceNote:
        candidate.matchedSymptoms.length >= 3
          ? 'Moderate symptom correlation; laboratory testing / physical exam required to confirm.'
          : 'Preliminary match based on non-specific clinical symptoms.',
      urgency: disease.urgency,
      causes: disease.causes,
      riskFactors: disease.riskFactors,
      warningSigns: disease.redFlags,
      howDiagnosed: disease.howDiagnosed,
      generalTreatments: disease.generalTreatments,
      prevention: disease.prevention,
      citations: disease.citations
    };
  });

  results.sort((a, b) => b.likelihoodScore - a.likelihoodScore);

  return results.slice(0, 4);
}
