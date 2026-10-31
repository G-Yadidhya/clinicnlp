import { TriageUrgency } from '../types/clinical';

export interface SymptomDefinition {
  id: string;
  name: string;
  snomedCode: string;
  meshId: string;
  synonyms: string[];
  isRedFlagDefault: boolean;
  questionPrompt: string;
}

export const SYMPTOM_ONTOLOGY: Record<string, SymptomDefinition> = {
  fever: {
    id: 'fever',
    name: 'Fever (Elevated body temperature)',
    snomedCode: '386661006',
    meshId: 'D005334',
    synonyms: ['fever', 'febrile', 'pyrexia', 'high temp', 'elevated temperature', 'burning up', 'chills', 'feverish'],
    isRedFlagDefault: false,
    questionPrompt: 'Do you currently have a fever, chills, or measured high body temperature?'
  },
  chest_pain: {
    id: 'chest_pain',
    name: 'Chest Pain / Pressure',
    snomedCode: '29857009',
    meshId: 'D002637',
    synonyms: ['chest pain', 'chest tightness', 'chest pressure', 'crushing chest', 'heart pain', 'heaviness in chest', 'pain radiating to arm'],
    isRedFlagDefault: true,
    questionPrompt: 'Are you feeling any chest pain, tightness, heaviness, or pressure radiating to your jaw or arm?'
  },
  shortness_of_breath: {
    id: 'shortness_of_breath',
    name: 'Shortness of Breath (Dyspnea)',
    snomedCode: '267036007',
    meshId: 'D004417',
    synonyms: ['short of breath', 'shortness of breath', 'difficulty breathing', 'breathless', 'dyspnea', 'gasping', 'struggling to breathe', 'wheezing heavily'],
    isRedFlagDefault: true,
    questionPrompt: 'Are you having difficulty catching your breath, severe shortness of breath, or breathing unusually fast?'
  },
  cough: {
    id: 'cough',
    name: 'Cough (Dry or Productive)',
    snomedCode: '49727002',
    meshId: 'D003371',
    synonyms: ['cough', 'coughing', 'hacking cough', 'dry cough', 'productive cough', 'phlegm', 'sputum'],
    isRedFlagDefault: false,
    questionPrompt: 'Do you have a persistent cough, and is it dry or producing phlegm?'
  },
  headache: {
    id: 'headache',
    name: 'Headache (Cephalgia)',
    snomedCode: '25064002',
    meshId: 'D006261',
    synonyms: ['headache', 'head pain', 'migraine', 'throbbing head', 'pounding headache', 'cephalgia', 'ache in head'],
    isRedFlagDefault: false,
    questionPrompt: 'Are you experiencing a headache, and did it come on suddenly or gradually?'
  },
  stiff_neck: {
    id: 'stiff_neck',
    name: 'Stiff Neck (Nuchal Rigidity)',
    snomedCode: '271790008',
    meshId: 'D009332',
    synonyms: ['stiff neck', 'neck stiffness', 'neck rigidity', 'cannot touch chin to chest', 'rigid neck', 'neck is stiff', 'neck is very stiff', 'neck feels stiff', 'stiffness in neck', 'pain moving neck'],
    isRedFlagDefault: true,
    questionPrompt: 'Is your neck unusually stiff, or is it painful/difficult to touch your chin down to your chest?'
  },
  fatigue: {
    id: 'fatigue',
    name: 'Fatigue / Malaise',
    snomedCode: '84229001',
    meshId: 'D005221',
    synonyms: ['fatigue', 'tired', 'exhausted', 'lethargy', 'weakness', 'feeling weak', 'run down', 'low energy', 'malaise'],
    isRedFlagDefault: false,
    questionPrompt: 'Are you feeling unusual exhaustion, general weakness, or severe fatigue?'
  },
  sore_throat: {
    id: 'sore_throat',
    name: 'Sore Throat (Pharyngitis)',
    snomedCode: '162397003',
    meshId: 'D010612',
    synonyms: ['sore throat', 'throat pain', 'scratchy throat', 'pain swallowing', 'swollen tonsils'],
    isRedFlagDefault: false,
    questionPrompt: 'Do you have a sore throat or pain when swallowing?'
  },
  loss_of_smell_taste: {
    id: 'loss_of_smell_taste',
    name: 'Loss of Smell / Taste (Anosmia/Ageusia)',
    snomedCode: '44169009',
    meshId: 'D000857',
    synonyms: ['lost smell', 'cannot smell', 'loss of taste', 'lost taste', 'anosmia', 'ageusia', 'no flavor'],
    isRedFlagDefault: false,
    questionPrompt: 'Have you noticed any sudden partial or complete loss of your sense of smell or taste?'
  },
  body_aches: {
    id: 'body_aches',
    name: 'Generalized Body Aches (Myalgia)',
    snomedCode: '68962001',
    meshId: 'D063806',
    synonyms: ['body aches', 'muscle aches', 'myalgia', 'aching all over', 'joint aches', 'sore muscles'],
    isRedFlagDefault: false,
    questionPrompt: 'Are you experiencing widespread muscle aches or severe body soreness?'
  },
  nausea_vomiting: {
    id: 'nausea_vomiting',
    name: 'Nausea or Vomiting',
    snomedCode: '422587007',
    meshId: 'D009325',
    synonyms: ['nausea', 'vomiting', 'throwing up', 'queasy', 'nauseous', 'emesis', 'upset stomach'],
    isRedFlagDefault: false,
    questionPrompt: 'Have you been experiencing nausea, or have you been vomiting?'
  },
  photophobia: {
    id: 'photophobia',
    name: 'Sensitivity to Light (Photophobia)',
    snomedCode: '409668002',
    meshId: 'D010787',
    synonyms: ['light sensitivity', 'sensitive to light', 'photophobia', 'hurts eyes to look at light', 'bright light hurts'],
    isRedFlagDefault: false,
    questionPrompt: 'Are your eyes unusually sensitive or painful in normal lighting or sunlight?'
  },
  confusion_altered_mental: {
    id: 'confusion_altered_mental',
    name: 'Confusion or Disorientation',
    snomedCode: '40917007',
    meshId: 'D003221',
    synonyms: ['confusion', 'confused', 'disoriented', 'altered mental state', 'slurred speech', 'not making sense', 'unresponsive'],
    isRedFlagDefault: true,
    questionPrompt: 'Has there been any sudden confusion, slurred speech, or difficulty recognizing familiar people?'
  },
  rash: {
    id: 'rash',
    name: 'Skin Rash or Lesions',
    snomedCode: '271807003',
    meshId: 'D005076',
    synonyms: ['rash', 'skin spots', 'petechiae', 'hives', 'purple spots', 'skin eruption', 'red patches'],
    isRedFlagDefault: false,
    questionPrompt: 'Do you have any new skin rash, red spots, or unexplained purple/dark spots on the skin?'
  },
  diarrhea: {
    id: 'diarrhea',
    name: 'Diarrhea / Loose Stool',
    snomedCode: '62315008',
    meshId: 'D003967',
    synonyms: ['diarrhea', 'loose stools', 'watery bowel movements', 'frequent loose stool'],
    isRedFlagDefault: false,
    questionPrompt: 'Are you having frequent watery or loose bowel movements?'
  },
  wheezing: {
    id: 'wheezing',
    name: 'Wheezing / Whistling Breath',
    snomedCode: '56018004',
    meshId: 'D012135',
    synonyms: ['wheezing', 'whistling sound when breathing', 'stridor', 'audible breathing sound'],
    isRedFlagDefault: false,
    questionPrompt: 'Do you hear a high-pitched whistling or wheezing sound when breathing out?'
  }
};

export interface ClinicalDisease {
  id: string;
  name: string;
  icd10: string;
  category: string;
  urgency: TriageUrgency;
  summary: string;
  symptomWeights: Record<string, number>; // symptomId -> probability P(S|D)
  coreSymptomIds: string[];
  redFlags: string[];
  causes: string[];
  riskFactors: string[];
  howDiagnosed: string[];
  generalTreatments: string[];
  prevention: string[];
  citations: { source: string; url?: string; description: string }[];
}

export const CLINICAL_DISEASE_DB: ClinicalDisease[] = [
  {
    id: 'influenza',
    name: 'Influenza (Seasonal Flu)',
    icd10: 'J10.1',
    category: 'Respiratory Infection',
    urgency: 'ROUTINE',
    summary: 'A contagious acute viral respiratory infection caused by influenza viruses A or B, characterized by rapid onset of systemic and respiratory symptoms.',
    symptomWeights: {
      fever: 0.95,
      body_aches: 0.90,
      fatigue: 0.90,
      cough: 0.80,
      headache: 0.75,
      sore_throat: 0.65,
      shortness_of_breath: 0.25,
      nausea_vomiting: 0.20
    },
    coreSymptomIds: ['fever', 'body_aches', 'fatigue', 'cough'],
    redFlags: [
      'Difficulty breathing or shortness of breath',
      'Persistent chest pain or pressure',
      'Sudden dizziness, confusion, or inability to stay awake',
      'Fever or cough that improves but then returns worse'
    ],
    causes: ['Infection by Influenza type A or B viruses spread via aerosolized respiratory droplets.'],
    riskFactors: ['Age ≥ 65 or < 5 years', 'Chronic lung disease (asthma, COPD)', 'Diabetes mellitus', 'Pregnancy', 'Immunosuppression'],
    howDiagnosed: ['Rapid molecular influenza assay (RT-PCR)', 'Rapid influenza diagnostic test (RIDT) swab', 'Clinical presentation during known seasonal community outbreaks.'],
    generalTreatments: [
      'Hydration, rest, and conservative antipyretics (acetaminophen or ibuprofen as age-appropriate)',
      'Prescription antiviral agents (e.g., Oseltamivir/Tamiflu) initiated within 48 hours for high-risk patients under physician guidance'
    ],
    prevention: ['Annual influenza vaccination', 'Frequent hand hygiene', 'Respiratory etiquette (masking when symptomatic)'],
    citations: [
      { source: 'CDC Guidelines on Influenza', description: 'Clinical overview, antiviral timing, and seasonal vaccination recommendations.' },
      { source: 'WHO Fact Sheet - Influenza (Seasonal)', description: 'Global burden, high-risk stratification, and surveillance protocols.' }
    ]
  },
  {
    id: 'covid19',
    name: 'COVID-19 (SARS-CoV-2 Infection)',
    icd10: 'U07.1',
    category: 'Respiratory Viral Infection',
    urgency: 'ROUTINE',
    summary: 'A systemic respiratory syndrome caused by the SARS-CoV-2 coronavirus with variable clinical presentations ranging from mild upper respiratory illness to severe pneumonia and hypoxia.',
    symptomWeights: {
      fever: 0.85,
      cough: 0.85,
      fatigue: 0.80,
      loss_of_smell_taste: 0.65,
      body_aches: 0.70,
      sore_throat: 0.60,
      headache: 0.65,
      shortness_of_breath: 0.35,
      diarrhea: 0.25
    },
    coreSymptomIds: ['fever', 'cough', 'fatigue'],
    redFlags: [
      'Pulse oximetry reading below 92-94%',
      'Persistent chest pressure or pain',
      'Cyanosis (bluish tint to lips or face)',
      'New confusion or inability to wake'
    ],
    causes: ['Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) airborne transmission.'],
    riskFactors: ['Advanced age', 'Cardiovascular disease', 'Obesity', 'Chronic kidney disease', 'Unvaccinated status'],
    howDiagnosed: ['Nucleic acid amplification test (RT-PCR swab)', 'Rapid antigen testing', 'Chest imaging in hospitalized patients.'],
    generalTreatments: [
      'Self-isolation and symptomatic supportive care',
      'Prescription targeted oral antivirals (e.g., nirmatrelvir/ritonavir) for high-risk outpatient candidates within 5 days of onset under medical supervision'
    ],
    prevention: ['Updated SARS-CoV-2 vaccines and boosters', 'Ventilation in indoor spaces', 'Masking in crowded environments during surges'],
    citations: [
      { source: 'NIH COVID-19 Treatment Guidelines', description: 'Evidence-based clinical guidelines on outpatient management and risk stratification.' },
      { source: 'CDC Clinical Care for SARS-CoV-2', description: 'Symptom timeline, diagnostic criteria, and warning signs.' }
    ]
  },
  {
    id: 'acute_bronchitis',
    name: 'Acute Bronchitis',
    icd10: 'J20.9',
    category: 'Lower Respiratory Tract',
    urgency: 'ROUTINE',
    summary: 'Self-limiting inflammation of the large airways (bronchi) following a viral upper respiratory infection, presenting predominantly with a persistent cough.',
    symptomWeights: {
      cough: 0.98,
      fatigue: 0.65,
      sore_throat: 0.50,
      fever: 0.30,
      body_aches: 0.40,
      wheezing: 0.45,
      shortness_of_breath: 0.20
    },
    coreSymptomIds: ['cough'],
    redFlags: [
      'Coughing up gross blood (hemoptysis)',
      'Fever exceeding 38.5°C persisting beyond 3 days',
      'Shortness of breath at rest',
      'History of chronic obstructive pulmonary disease (COPD)'
    ],
    causes: ['Respiratory viruses (rhinovirus, adenovirus, respiratory syncytial virus, parainfluenza) in >90% of cases.'],
    riskFactors: ['Active or passive tobacco smoking', 'Underlying airway hyperresponsiveness', 'Air pollutant exposure'],
    howDiagnosed: ['Clinical diagnosis based on cough duration (1-3 weeks) with normal lung auscultation and absence of pneumonia signs.'],
    generalTreatments: [
      'Symptomatic relief (hydration, honey for cough in patients >1 yr, humidified air)',
      'Antibiotics are NOT routinely indicated as >90% are viral (anti-antimicrobial stewardship guideline)'
    ],
    prevention: ['Smoking cessation', 'Hand hygiene', 'Avoiding secondhand smoke'],
    citations: [
      { source: 'American College of Physicians (ACP) Bronchitis Guidelines', description: 'Recommends against routine antibiotic prescribing in acute uncomplicated bronchitis.' }
    ]
  },
  {
    id: 'migraine',
    name: 'Migraine with or without Aura',
    icd10: 'G43.9',
    category: 'Neurological Disorder',
    urgency: 'ROUTINE',
    summary: 'A primary neurovascular headache disorder characterized by recurrent attacks of moderate-to-severe throbbing unilateral or bilateral headache, often accompanied by photophobia, phonophobia, and nausea.',
    symptomWeights: {
      headache: 0.99,
      photophobia: 0.85,
      nausea_vomiting: 0.80,
      fatigue: 0.60,
      fever: 0.02,
      stiff_neck: 0.20
    },
    coreSymptomIds: ['headache', 'photophobia'],
    redFlags: [
      'Thunderclap headache (reaching peak intensity within 60 seconds) - emergency SNOOP red flag',
      'New neurological deficits: asymmetric limb weakness, acute vision loss, facial droop',
      'Headache accompanied by high fever, confusion, or neck rigidity',
      'Onset of new headaches after age 50'
    ],
    causes: ['Neurogenic inflammation and activation of the trigeminovascular sensory system with cortical spreading depression.'],
    riskFactors: ['Female sex (3:1 ratio)', 'Family history of migraines', 'Sleep deprivation, stress, skipping meals, hormonal fluctuations'],
    howDiagnosed: ['International Classification of Headache Disorders (ICHD-3) clinical criteria', 'Brain MRI/CT performed if red flags are present.'],
    generalTreatments: [
      'Dark quiet room, cold compresses',
      'Physician-prescribed triptans, CGRP antagonists, or NSAIDs taken at earliest onset',
      'Preventive therapies for frequent or disabling attacks'
    ],
    prevention: ['Headache diary to identify triggers', 'Regular sleep and meal schedules', 'Stress reduction'],
    citations: [
      { source: 'American Headache Society (AHS) Guidelines', description: 'Evidence-based consensus on acute and preventive migraine treatment.' },
      { source: 'ICHD-3 Diagnostic Criteria', description: 'Standardized operational criteria for primary headache classification.' }
    ]
  },
  {
    id: 'meningitis_suspect',
    name: 'Acute Bacterial / Viral Meningitis (Clinical Suspect)',
    icd10: 'G03.9',
    category: 'Central Nervous System Infection',
    urgency: 'EMERGENCY',
    summary: 'Acute inflammation of the protective membranes covering the brain and spinal cord, representing a medical emergency when bacterial in origin.',
    symptomWeights: {
      fever: 0.95,
      stiff_neck: 0.90,
      headache: 0.90,
      photophobia: 0.75,
      confusion_altered_mental: 0.70,
      nausea_vomiting: 0.70,
      rash: 0.40
    },
    coreSymptomIds: ['fever', 'stiff_neck', 'headache'],
    redFlags: [
      'Classic triad of fever, neck stiffness, and altered mental status',
      'Non-blanching petechial or purpuric rash (Meningococcal sign)',
      'Severe lethargy, delirium, or seizures'
    ],
    causes: ['Streptococcus pneumoniae, Neisseria meningitidis, Listeria monocytogenes, or enteroviruses.'],
    riskFactors: ['Crowded living conditions (dormitories)', 'Asplenia or complement deficiency', 'Extreme age groups'],
    howDiagnosed: ['Emergency lumbar puncture with CSF analysis (cell count, glucose, protein, gram stain, PCR)', 'Blood cultures'],
    generalTreatments: [
      'EMERGENCY INPATIENT ADMISSION',
      'Immediate empiric intravenous antibiotics and dexamethasone prior to lumbar puncture if delay anticipated'
    ],
    prevention: ['Meningococcal conjugate and serogroup B vaccines', 'Pneumococcal vaccines', 'Chemoprophylaxis for close contacts'],
    citations: [
      { source: 'Infectious Diseases Society of America (IDSA) Meningitis Practice Guidelines', description: 'Urgent management protocols and empiric therapy.' }
    ]
  },
  {
    id: 'acute_coronary_syndrome',
    name: 'Acute Coronary Syndrome (ACS / Myocardial Infarction Suspect)',
    icd10: 'I21.9',
    category: 'Cardiovascular Emergency',
    urgency: 'EMERGENCY',
    summary: 'A spectrum of acute myocardial ischemia ranging from unstable angina to ST-segment elevation myocardial infarction (STEMI) resulting from sudden coronary artery occlusion.',
    symptomWeights: {
      chest_pain: 0.95,
      shortness_of_breath: 0.75,
      fatigue: 0.60,
      nausea_vomiting: 0.45,
      body_aches: 0.30,
      fever: 0.05
    },
    coreSymptomIds: ['chest_pain', 'shortness_of_breath'],
    redFlags: [
      'Substernal chest pressure or crushing sensation lasting > 10 minutes',
      'Pain radiating to left arm, shoulder, jaw, neck, or back',
      'Associated diaphoresis (cold sweats), lightheadedness, or syncope',
      'Acute dyspnea without respiratory explanation'
    ],
    causes: ['Atherosclerotic plaque rupture or erosion with overlying thrombus formation in coronary arteries.'],
    riskFactors: ['Smoking', 'Hypertension', 'Dyslipidemia', 'Diabetes mellitus', 'Age > 45 in males or > 55 in females', 'Family history'],
    howDiagnosed: ['Immediate 12-lead Electrocardiogram (ECG)', 'Serial high-sensitivity cardiac troponin assays', 'Coronary angiography'],
    generalTreatments: [
      'IMMEDIATE EMERGENCY MEDICAL SERVICES (CALL 911 / 112 / LOCAL EMS)',
      'Chewed aspirin (if instructed by emergency dispatch with no contraindications)',
      'Coronary reperfusion (Percutaneous Coronary Intervention / thrombolysis) in catheterization lab'
    ],
    prevention: ['Atherosclerotic cardiovascular risk reduction', 'Smoking cessation', 'Statin therapy, blood pressure control'],
    citations: [
      { source: 'American College of Cardiology (ACC) / American Heart Association (AHA) ACS Guidelines', description: 'Universal definition and emergency triage pathways.' }
    ]
  },
  {
    id: 'gastroenteritis',
    name: 'Acute Viral / Bacterial Gastroenteritis',
    icd10: 'A09',
    category: 'Gastrointestinal Infection',
    urgency: 'ROUTINE',
    summary: 'Acute inflammation of the gastrointestinal lining commonly caused by Norovirus, Rotavirus, or bacterial foodborne pathogens resulting in watery diarrhea and vomiting.',
    symptomWeights: {
      diarrhea: 0.95,
      nausea_vomiting: 0.90,
      body_aches: 0.50,
      fever: 0.45,
      fatigue: 0.70,
      headache: 0.40
    },
    coreSymptomIds: ['diarrhea', 'nausea_vomiting'],
    redFlags: [
      'Signs of severe dehydration: inability to keep any fluids down for >12-24 hours, lack of urination, orthostatic dizziness',
      'Visible blood or black tarry material in stool or vomit',
      'Severe intractable abdominal pain with abdominal rigidity',
      'High persistent fever above 38.5°C'
    ],
    causes: ['Norovirus, rotavirus, Salmonella, Campylobacter, Escherichia coli ingested via contaminated food/water.'],
    riskFactors: ['Recent travel, daycares, raw shell food, contaminated food sharing'],
    howDiagnosed: ['Clinical assessment of dehydration', 'Stool antigen or PCR testing if persistent or bloody'],
    generalTreatments: [
      'Oral Rehydration Solution (ORS) containing balanced glucose and electrolytes',
      'Avoid high-sugar juices and caffeine',
      'Seek prompt medical care if unable to hydrate orally'
    ],
    prevention: ['Thorough handwashing with soap and water (alcohol sanitizer is less effective against Norovirus)', 'Food safety'],
    citations: [
      { source: 'CDC Division of Foodborne, Waterborne, and Environmental Diseases', description: 'Clinical management of acute viral and foodborne gastroenteritis.' }
    ]
  },
  {
    id: 'community_acquired_pneumonia',
    name: 'Community-Acquired Pneumonia (CAP)',
    icd10: 'J18.9',
    category: 'Lower Respiratory Tract Infection',
    urgency: 'URGENT',
    summary: 'Infection of the pulmonary parenchyma causing alveolar consolidation, typically presenting with fever, productive cough, pleuritic chest discomfort, and dyspnea.',
    symptomWeights: {
      cough: 0.95,
      fever: 0.88,
      shortness_of_breath: 0.75,
      fatigue: 0.80,
      body_aches: 0.55,
      chest_pain: 0.50,
      headache: 0.35
    },
    coreSymptomIds: ['cough', 'fever', 'shortness_of_breath'],
    redFlags: [
      'Resting respiratory rate > 30 breaths/min (tachypnea)',
      'Oxygen saturation < 92%',
      'New confusion or mental disorientation (CURB-65 criteria)',
      'Hypotension (systolic BP < 90 mmHg)'
    ],
    causes: ['Streptococcus pneumoniae, Mycoplasma pneumoniae, respiratory viruses, Legionella.'],
    riskFactors: ['Age ≥ 65', 'Smoking', 'Chronic pulmonary disease', 'Immunosuppression'],
    howDiagnosed: ['Chest radiograph (X-ray showing consolidation or infiltrates)', 'Pulse oximetry', 'Sputum and blood cultures'],
    generalTreatments: [
      'Physician-prescribed targeted antibiotic therapy based on local susceptibility',
      'Supplemental oxygen and hydration if hospitalized'
    ],
    prevention: ['Pneumococcal vaccines (PCV20/PCV15)', 'Annual flu and COVID-19 vaccination', 'Smoking cessation'],
    citations: [
      { source: 'American Thoracic Society / IDSA Guideline on CAP', description: 'Diagnostic criteria, CURB-65 severity scoring, and outpatient vs inpatient decision trees.' }
    ]
  }
];

export interface TriageRule {
  id: string;
  name: string;
  triggerSymptoms: string[]; // all must match or any based on logic
  logic: 'AND' | 'OR';
  urgency: TriageUrgency;
  title: string;
  rationale: string;
  recommendedAction: string;
  timeframe: string;
  potentiallyLifeThreateningConditions?: string[];
  riskEvidence?: { title: string; url: string }[];
  specialQualifier?: (profile?: { ageGroup?: string; isPregnant?: boolean }) => boolean;
}

export const DETERMINISTIC_TRIAGE_RULES: TriageRule[] = [
  {
    id: 'rule_cardiac_emergency',
    name: 'Chest Pain with Shortness of Breath / Radiation (ACS Suspect)',
    triggerSymptoms: ['chest_pain', 'shortness_of_breath'],
    logic: 'AND',
    urgency: 'EMERGENCY',
    title: 'Chest Pain and Breathing Difficulty Need Immediate Assessment',
    rationale: 'This combination can signal a serious problem and needs immediate medical assessment. This tool cannot determine the cause.',
    recommendedAction: 'Call your local emergency number now. Do not drive yourself if you may be seriously unwell.',
    timeframe: 'Immediate - Do not wait',
    potentiallyLifeThreateningConditions: ['Heart attack or another serious heart or lung emergency'],
    riskEvidence: [{ title: 'NHS: Chest pain', url: 'https://www.nhs.uk/symptoms/chest-pain/' }]
  },
  {
    id: 'rule_meningismus',
    name: 'Fever with Stiff Neck / Photophobia (Meningitis Suspect)',
    triggerSymptoms: ['fever', 'stiff_neck'],
    logic: 'AND',
    urgency: 'EMERGENCY',
    title: 'Fever with a Stiff Neck Needs Immediate Assessment',
    rationale: 'This symptom combination may be serious and needs immediate medical assessment. This tool cannot determine the cause.',
    recommendedAction: 'Seek emergency medical assessment now. Call your local emergency number if you cannot travel safely.',
    timeframe: 'Immediate - Minutes to hours count',
    potentiallyLifeThreateningConditions: ['Meningitis or another serious infection'],
    riskEvidence: [{ title: 'NHS: Meningitis', url: 'https://www.nhs.uk/conditions/meningitis/' }]
  },
  {
    id: 'rule_altered_mental',
    name: 'Sudden Confusion or Altered Mental State',
    triggerSymptoms: ['confusion_altered_mental'],
    logic: 'OR',
    urgency: 'EMERGENCY',
    title: 'Sudden Confusion or Speech Changes Need Immediate Assessment',
    rationale: 'Sudden confusion or speech changes may be serious and need immediate medical assessment. This tool cannot determine the cause.',
    recommendedAction: 'Call your local emergency number for immediate medical assessment.',
    timeframe: 'Immediate',
    potentiallyLifeThreateningConditions: ['Stroke or another serious, time-sensitive condition'],
    riskEvidence: [{ title: 'CDC: Signs and symptoms of stroke', url: 'https://www.cdc.gov/stroke/signs-symptoms/' }]
  },
  {
    id: 'rule_severe_respiratory',
    name: 'Severe Shortness of Breath / Wheezing',
    triggerSymptoms: ['shortness_of_breath'],
    logic: 'OR',
    urgency: 'URGENT',
    title: 'Breathing Difficulty Needs Prompt Assessment',
    rationale: 'Breathing difficulty needs prompt medical assessment. This tool cannot assess its severity or determine the cause.',
    recommendedAction: 'Visit an urgent care center or emergency department today. If breathing becomes labored or gasping, call emergency services.',
    timeframe: 'Within 2-4 hours'
  },
  {
    id: 'rule_pediatric_fever',
    name: 'Pediatric High Fever Risk',
    triggerSymptoms: ['fever'],
    logic: 'OR',
    urgency: 'URGENT',
    title: 'Child with Fever Needs Prompt Assessment',
    rationale: 'Fever in a child may need prompt medical assessment. A pediatric clinician can advise based on the child’s age and condition.',
    recommendedAction: 'Contact your pediatrician or pediatric urgent care center promptly.',
    timeframe: 'Same day consultation',
    specialQualifier: (profile) => profile?.ageGroup === 'pediatric'
  }
];
