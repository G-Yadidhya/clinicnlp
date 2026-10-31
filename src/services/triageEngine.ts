import { ExtractedSymptom, PatientProfile, TriageResult } from '../types/clinical';
import { DETERMINISTIC_TRIAGE_RULES } from '../data/medicalKnowledge';

export function evaluateClinicalTriage(
  extractedSymptoms: ExtractedSymptom[],
  patientProfile?: PatientProfile
): TriageResult {
  const presentSymptomIds = new Set(
    extractedSymptoms.filter(s => !s.isNegated).map(s => s.canonicalId)
  );

  // Check emergency rules first
  for (const rule of DETERMINISTIC_TRIAGE_RULES) {
    if (rule.urgency === 'EMERGENCY') {
      let isTriggered = false;
      if (rule.logic === 'AND') {
        isTriggered = rule.triggerSymptoms.every(symId => presentSymptomIds.has(symId));
      } else {
        isTriggered = rule.triggerSymptoms.some(symId => presentSymptomIds.has(symId));
      }

      if (isTriggered) {
        if (!rule.specialQualifier || rule.specialQualifier(patientProfile)) {
          return {
            level: 'EMERGENCY',
            title: rule.title,
            rationale: rule.rationale,
            triggers: rule.triggerSymptoms.map(id => id.replace(/_/g, ' ')),
            recommendedAction: rule.recommendedAction,
            timeframe: rule.timeframe,
            isRedFlag: true,
            potentiallyLifeThreateningConditions: rule.potentiallyLifeThreateningConditions,
            riskEvidence: rule.riskEvidence,
            specialConsideration: patientProfile?.isPregnant
              ? 'Patient is currently pregnant: all red flags require emergency obstetric/ER evaluation immediately.'
              : patientProfile?.ageGroup === 'pediatric'
              ? 'Pediatric patient: emergency medical protocols applied.'
              : undefined
          };
        }
      }
    }
  }

  // Check urgent rules next
  for (const rule of DETERMINISTIC_TRIAGE_RULES) {
    if (rule.urgency === 'URGENT') {
      let isTriggered = false;
      if (rule.logic === 'AND') {
        isTriggered = rule.triggerSymptoms.every(symId => presentSymptomIds.has(symId));
      } else {
        isTriggered = rule.triggerSymptoms.some(symId => presentSymptomIds.has(symId));
      }

      if (isTriggered) {
        if (!rule.specialQualifier || rule.specialQualifier(patientProfile)) {
          return {
            level: 'URGENT',
            title: rule.title,
            rationale: rule.rationale,
            triggers: rule.triggerSymptoms.map(id => id.replace(/_/g, ' ')),
            recommendedAction: rule.recommendedAction,
            timeframe: rule.timeframe,
            isRedFlag: true,
            specialConsideration: patientProfile?.ageGroup === 'pediatric'
              ? 'Pediatric assessment protocol triggered.'
              : undefined
          };
        }
      }
    }
  }

  // Check if prolonged symptoms (> 7 days) without red flags -> Medical consultation
  const hasLongDuration = extractedSymptoms.some(s => (s.durationDays || 0) >= 7);
  if (hasLongDuration) {
    return {
      level: 'ROUTINE',
      title: 'Persistent Symptoms Requiring Medical Consultation',
      rationale: 'Symptoms lasting over a week should be evaluated in-person by a primary care clinician to ensure proper diagnosis and avoid secondary complications.',
      triggers: ['Duration ≥ 7 days'],
      recommendedAction: 'Schedule an appointment with your primary care provider or family physician this week.',
      timeframe: 'Within 2-3 business days',
      isRedFlag: false
    };
  }

  // If symptoms present but non-emergency and acute (< 7 days)
  if (presentSymptomIds.size > 0) {
    return {
      level: 'SELF_CARE',
      title: 'General Information & Symptom Monitoring',
      rationale: 'This screening did not detect its listed emergency patterns. It cannot rule out an emergency or assess symptoms it did not recognize.',
      triggers: Array.from(presentSymptomIds),
      recommendedAction: 'Rest, hydrate, and monitor your symptoms closely. If symptoms worsen, high fever develops, or any new severe pain occurs, seek medical attention promptly.',
      timeframe: 'Ongoing monitoring',
      isRedFlag: false
    };
  }

  // Baseline default when no symptoms reported yet
  return {
    level: 'SELF_CARE',
    title: 'Initial Assessment',
    rationale: 'Awaiting symptom description.',
    triggers: [],
    recommendedAction: 'Please describe what symptoms you are experiencing.',
    timeframe: 'N/A',
    isRedFlag: false
  };
}
