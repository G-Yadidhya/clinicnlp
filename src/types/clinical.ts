export type TriageUrgency = 'EMERGENCY' | 'URGENT' | 'ROUTINE' | 'SELF_CARE';

export interface TriageResult {
  level: TriageUrgency;
  title: string;
  rationale: string;
  triggers: string[];
  recommendedAction: string;
  timeframe: string;
  isRedFlag: boolean;
  specialConsideration?: string;
  potentiallyLifeThreateningConditions?: string[];
  riskEvidence?: { title: string; url: string }[];
}

export interface TokenSpan {
  text: string;
  start: number;
  end: number;
}

export interface ExtractedSymptom {
  rawText: string;
  canonicalId: string;
  canonicalName: string;
  snomedCode: string;
  meshId: string;
  isNegated: boolean;
  certainty?: 'certain' | 'possible';
  triggerSpan?: TokenSpan;
  severity?: 'mild' | 'moderate' | 'severe' | 'unspecified';
  duration?: string;
  durationDays?: number;
  progression?: 'improving' | 'worsening' | 'stable' | 'fluctuating';
  confidence: number;
}

export interface DiseaseEvidence {
  id: string;
  name: string;
  icd10: string;
  category: string;
  summary: string;
  matchedSymptoms: string[];
  unmatchedPresentSymptoms: string[];
  missingCoreSymptoms: string[];
  disqualifyingNegations: string[];
  likelihoodScore: number; // 0 to 1 relative match
  clinicalConfidenceNote: string;
  urgency: TriageUrgency;
  causes: string[];
  riskFactors: string[];
  warningSigns: string[];
  howDiagnosed: string[];
  generalTreatments: string[];
  prevention: string[];
  citations: { source: string; url?: string; description: string }[];
}

export interface QuestionCandidate {
  symptomId: string;
  symptomName: string;
  questionText: string;
  informationGain: number; // calculated entropy reduction
  targetDiseases: string[];
  category: 'red_flag' | 'differential' | 'timeline' | 'severity';
}

export interface PatientProfile {
  ageGroup: 'pediatric' | 'young_adult' | 'adult' | 'elderly' | 'unspecified';
  isPregnant: boolean;
  immunocompromised: boolean;
  chronicConditions: string[];
}

export interface ResearchDirectionInfo {
  id: string;
  title: string;
  shortDesc: string;
  coreContribution: string;
  noveltyScore: number; // 1-10
  feasibilityScore: number; // 1-10
  academicValueScore: number; // 1-10
  implementationDifficulty: 'Low-Medium' | 'Medium' | 'High';
  targetDatasets: string[];
  nlpTasks: string[];
  pros: string[];
  cons: string[];
  recommended: boolean;
}
