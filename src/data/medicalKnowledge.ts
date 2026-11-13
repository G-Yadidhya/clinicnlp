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
  },
  {
    id: 'dengue_fever',
    name: 'Dengue Fever (Breakbone Fever)',
    icd10: 'A90',
    category: 'Vector-Borne Viral Infection',
    urgency: 'URGENT',
    summary: 'A mosquito-borne tropical viral disease transmitted by Aedes mosquitoes, causing sudden high fever, retro-orbital eye pain, severe joint and muscle pains, and potential thrombocytopenia (low platelets).',
    symptomWeights: {
      fever: 0.98,
      body_aches: 0.95,
      headache: 0.90,
      fatigue: 0.85,
      nausea_vomiting: 0.65,
      rash: 0.55
    },
    coreSymptomIds: ['fever', 'body_aches', 'headache'],
    redFlags: [
      'Severe abdominal pain or tenderness',
      'Persistent vomiting (≥3 episodes in 24 hours)',
      'Mucosal bleeding (bleeding gums, nosebleeds, blood in stool or vomit)',
      'Lethargy, extreme restlessness, or fluid accumulation',
      'Rapid drop in platelet count with rising hematocrit'
    ],
    causes: ['Dengue virus serotypes (DENV-1, 2, 3, 4) transmitted through the bite of infected Aedes aegypti or Aedes albopictus mosquitoes.'],
    riskFactors: ['Living in or traveling to tropical or subtropical regions', 'Secondary infection with a different dengue serotype (increased risk of Severe Dengue)'],
    howDiagnosed: [
      'Dengue NS1 antigen test (detectable within days 1-5 of symptom onset)',
      'Dengue IgM/IgG antibody ELISA / Rapid Test (typically positive after day 4-5)',
      'Serial Complete Blood Count (CBC) monitoring hematocrit and platelet counts'
    ],
    generalTreatments: [
      'Oral or intravenous hydration with balanced electrolytes (ORS, fluids) — the cornerstone of recovery',
      'Acetaminophen / Paracetamol for fever and body ache management',
      'CRITICAL: STRICTLY AVOID NSAIDs (Ibuprofen, Aspirin, Naproxen) as they worsen bleeding risk and antiplatelet effects',
      'Rest and careful observation during the critical phase (days 3–7 as fever drops)'
    ],
    prevention: ['Mosquito bite prevention (DEET repellents, bed nets, long clothing)', 'Eliminating standing water containers around homes', 'Dengue vaccination in endemic regions for eligible populations'],
    citations: [
      { source: 'WHO Dengue Guidelines for Diagnosis, Treatment, Prevention and Control', description: 'Global warning signs, clinical phases (febrile, critical, recovery), and fluid algorithms.' },
      { source: 'CDC Dengue Clinical Management', description: 'Diagnostic testing timelines and warning signs of severe dengue.' }
    ]
  },
  {
    id: 'malaria',
    name: 'Malaria (Plasmodium Infection)',
    icd10: 'B54',
    category: 'Parasitic Vector-Borne Infection',
    urgency: 'URGENT',
    summary: 'A life-threatening parasitic blood infection caused by Plasmodium parasites transmitted by female Anopheles mosquitoes, characterized by cyclical high fevers, shaking chills, and profuse sweating.',
    symptomWeights: {
      fever: 0.98,
      body_aches: 0.90,
      headache: 0.85,
      fatigue: 0.90,
      nausea_vomiting: 0.60
    },
    coreSymptomIds: ['fever', 'body_aches', 'fatigue'],
    redFlags: [
      'Impaired consciousness, coma, or seizures (Cerebral Malaria)',
      'Severe anemia or jaundice (yellow eyes/skin)',
      'Difficulty breathing or pulmonary edema',
      'Hemoglobinuria (dark or black tea-colored urine)',
      'Spontaneous bleeding or circulatory shock'
    ],
    causes: ['Plasmodium falciparum, Plasmodium vivax, Plasmodium ovale, or Plasmodium malariae parasites injected via mosquito saliva into the bloodstream.'],
    riskFactors: ['Travel to malaria-endemic regions (Sub-Saharan Africa, South Asia, parts of South America)', 'Lack of chemoprophylaxis'],
    howDiagnosed: [
      'Microscopic examination of Giemsa-stained thick and thin blood smears (gold standard)',
      'Malaria Rapid Diagnostic Test (RDT) detecting Plasmodium antigens (HRP-2 / pLDH)'
    ],
    generalTreatments: [
      'Physician-prescribed Artemisinin-based Combination Therapies (ACTs) such as artemether-lumefantrine',
      'Intravenous artesunate for complicated or severe malaria in hospital settings',
      'Primaquine or tafenoquine for liver hypnozoite eradication in P. vivax / P. ovale'
    ],
    prevention: ['Insecticide-treated bed nets', 'Indoor residual spraying', 'Prescription travel chemoprophylaxis (atovaquone-proguanil, doxycycline, or mefloquine)'],
    citations: [
      { source: 'WHO Guidelines for Malaria', description: 'Evidence-based recommendations on ACT regimens and management of severe malaria.' },
      { source: 'CDC Malaria Diagnosis and Treatment Guidelines', description: 'Microscopy and emergency treatment protocols.' }
    ]
  },
  {
    id: 'typhoid_fever',
    name: 'Typhoid Fever (Enteric Fever)',
    icd10: 'A01.0',
    category: 'Systemic Bacterial Infection',
    urgency: 'URGENT',
    summary: 'A systemic bacterial illness caused by Salmonella enterica serotype Typhi, presenting with step-ladder prolonged fever, severe fatigue, abdominal discomfort, and headache.',
    symptomWeights: {
      fever: 0.96,
      headache: 0.85,
      fatigue: 0.90,
      body_aches: 0.70,
      nausea_vomiting: 0.50,
      diarrhea: 0.45
    },
    coreSymptomIds: ['fever', 'headache', 'fatigue'],
    redFlags: [
      'Intestinal perforation or massive gastrointestinal hemorrhage',
      'Extreme delirium or typhoid state (muttering stupor)',
      'Hypotension and septic shock',
      'Persistent vomiting preventing oral medication'
    ],
    causes: ['Ingestion of food or water contaminated with Salmonella enterica serovar Typhi from human carriers.'],
    riskFactors: ['Travel to areas with poor sanitation', 'Consuming untreated street food or non-potable ice/water'],
    howDiagnosed: [
      'Blood culture (most sensitive in week 1-2)',
      'Stool and bone marrow culture',
      'Widal or Typhidot serological assays (interpreted alongside clinical presentation)'
    ],
    generalTreatments: [
      'Physician-prescribed targeted antibiotics (such as azithromycin, ceftriaxone, or ciprofloxacin based on regional resistance patterns)',
      'Adequate oral rehydration and easily digestible nutrition'
    ],
    prevention: ['Typhoid conjugate vaccine (TCV) before travel', 'Drinking boiled or bottled water', 'Thorough handwashing and eating freshly cooked piping-hot foods'],
    citations: [
      { source: 'WHO Typhoid Fact Sheet & TCV Position Paper', description: 'Global disease burden, diagnostic considerations, and vaccination schedules.' }
    ]
  },
  {
    id: 'tension_headache',
    name: 'Tension-Type Headache (TTH)',
    icd10: 'G44.2',
    category: 'Neurological / Primary Headache',
    urgency: 'ROUTINE',
    summary: 'The most common form of primary headache, described as a dull, non-pulsatile band-like pressure or tightness around the forehead, temples, or back of the neck without nausea.',
    symptomWeights: {
      headache: 0.99,
      fatigue: 0.45,
      photophobia: 0.15,
      stiff_neck: 0.40
    },
    coreSymptomIds: ['headache'],
    redFlags: [
      'Sudden thunderclap onset (worst headache of life in seconds)',
      'Headache with fever and neck stiffness (meningism)',
      'New neurological focal signs (weakness, numbness, speech changes)',
      'New onset in individuals older than 50 years'
    ],
    causes: ['Myofascial trigger points, sustained contraction of pericranial and cervical muscles, mental stress, eye strain, and poor workstation posture.'],
    riskFactors: ['High stress, lack of sleep, extended screen time, dehydration, anxiety, neck strain'],
    howDiagnosed: ['Clinical criteria according to ICHD-3: Bilateral location, pressing/tightening non-throbbing quality, mild-to-moderate intensity, not aggravated by routine physical activity.'],
    generalTreatments: [
      'Over-the-counter pain relief (acetaminophen, ibuprofen) used sparingly to avoid medication-overuse headaches',
      'Warm neck compresses, gentle cervical stretches, and massage',
      'Stress management, regular sleep, and ergonomic desk adjustments'
    ],
    prevention: ['Regular exercise, routine hydration, taking scheduled screen breaks (20-20-20 rule), posture correction'],
    citations: [
      { source: 'International Headache Society (IHS) ICHD-3', description: 'Diagnostic criteria for episodic and chronic tension-type headaches.' }
    ]
  },
  {
    id: 'acute_sinusitis',
    name: 'Acute Rhinosinusitis (Sinus Infection)',
    icd10: 'J01.9',
    category: 'Ear, Nose & Throat (ENT)',
    urgency: 'ROUTINE',
    summary: 'Inflammation of the mucosal lining of the nasal passages and paranasal sinuses, typically developing after a viral common cold and causing facial pressure, nasal obstruction, and discolored discharge.',
    symptomWeights: {
      headache: 0.85,
      fever: 0.40,
      fatigue: 0.60,
      cough: 0.50,
      sore_throat: 0.45
    },
    coreSymptomIds: ['headache', 'cough'],
    redFlags: [
      'Periorbital swelling, redness, or pain around the eyes (orbital cellulitis risk)',
      'Double vision (diplopia) or reduced visual acuity',
      'Severe frontal headache with high fever and neck stiffness'
    ],
    causes: ['Secondary bacterial proliferation (Streptococcus pneumoniae, Haemophilus influenzae) or prolonged mucosal swelling following viral rhinitis.'],
    riskFactors: ['Allergic rhinitis, deviated nasal septum, smoking exposure, dental infections'],
    howDiagnosed: ['Clinical examination based on symptoms lasting >10 days without improvement, or "double sickening" (worsening after initial recovery).'],
    generalTreatments: [
      'Isotonic nasal saline rinses (neti pot or spray) to flush sinuses',
      'Intranasal corticosteroid sprays (e.g., fluticasone)',
      'Pain relievers for facial pressure',
      'Physician-prescribed antibiotics only if bacterial symptoms persist >10 days or worsen severely'
    ],
    prevention: ['Managing seasonal allergies, using a room humidifier, avoiding cigarette smoke'],
    citations: [
      { source: 'American Academy of Otolaryngology-Head and Neck Surgery (AAO-HNS)', description: 'Clinical Practice Guideline: Adult Sinusitis.' }
    ]
  },
  {
    id: 'strep_throat',
    name: 'Streptococcal Pharyngitis (Strep Throat)',
    icd10: 'J02.0',
    category: 'Ear, Nose & Throat (ENT)',
    urgency: 'ROUTINE',
    summary: 'A bacterial throat infection caused by Group A Streptococcus (GAS), distinguished by severe sudden sore throat, fever, tonsillar exudate, and tender cervical lymph nodes without cough.',
    symptomWeights: {
      sore_throat: 0.98,
      fever: 0.85,
      headache: 0.65,
      body_aches: 0.55,
      fatigue: 0.70
    },
    coreSymptomIds: ['sore_throat', 'fever'],
    redFlags: [
      'Inability to swallow saliva / drooling (quinsy or peritonsillar abscess)',
      'Stridor or difficulty breathing',
      'Inability to open mouth fully (trismus)',
      'Sandpaper-like scarlet fever rash'
    ],
    causes: ['Group A Streptococcus (Streptococcus pyogenes) transmitted through respiratory droplets or shared drinks.'],
    riskFactors: ['School-age children (5-15 years) and parents, crowded indoor settings'],
    howDiagnosed: [
      'Centor / McIsaac Clinical Scoring Criteria',
      'Rapid Antigen Detection Test (RADT) throat swab',
      'Throat culture for confirmation'
    ],
    generalTreatments: [
      'Physician-prescribed oral penicillin or amoxicillin (or cephalosporin/macrolide if penicillin-allergic) to prevent acute rheumatic fever',
      'Warm saltwater gargles and throat lozenges',
      'Acetaminophen or ibuprofen for pain relief'
    ],
    prevention: ['Prompt treatment of infected individuals', 'Replacing toothbrush 24h after starting antibiotics', 'Hand hygiene'],
    citations: [
      { source: 'Infectious Diseases Society of America (IDSA)', description: 'Clinical Practice Guideline for the Diagnosis and Management of Group A Streptococcal Pharyngitis.' }
    ]
  },
  {
    id: 'gerd',
    name: 'Gastroesophageal Reflux Disease (GERD / Acid Reflux)',
    icd10: 'K21.9',
    category: 'Gastrointestinal Medicine',
    urgency: 'ROUTINE',
    summary: 'A chronic digestive disorder where stomach acid or bile irritates the esophageal food pipe lining, producing retrosternal burning (heartburn), regurgitation, and sour taste.',
    symptomWeights: {
      chest_pain: 0.65,
      cough: 0.40,
      nausea_vomiting: 0.35,
      sore_throat: 0.35
    },
    coreSymptomIds: ['chest_pain'],
    redFlags: [
      'Progressive difficulty swallowing solid foods (dysphagia)',
      'Painful swallowing (odynophagia)',
      'Unexplained weight loss or recurrent vomiting with blood',
      'Symptoms mimicking acute heart attack (sudden crushing chest pain radiating to left arm/jaw requires immediate 911)'
    ],
    causes: ['Transient lower esophageal sphincter (LES) relaxations, hiatal hernia, delayed gastric emptying.'],
    riskFactors: ['Obesity, pregnancy, smoking, eating large or fatty meals, lying down immediately after dining, caffeine, chocolate, citrus, spicy foods'],
    howDiagnosed: ['Clinical response to lifestyle modifications and empiric acid suppression', 'Upper endoscopy (EGD) if red flag alarm features exist', '24-hour esophageal pH monitoring'],
    generalTreatments: [
      'Dietary adjustments: avoid eating within 3 hours of bedtime, elevate head of bed by 6 inches',
      'Over-the-counter antacids or H2 blockers for occasional symptoms',
      'Physician-prescribed Proton Pump Inhibitors (PPIs) for erosive esophagitis'
    ],
    prevention: ['Maintaining healthy weight, smoking cessation, eating smaller frequent meals'],
    citations: [
      { source: 'American College of Gastroenterology (ACG)', description: 'Guidelines for the Diagnosis and Management of Gastroesophageal Reflux Disease.' }
    ]
  },
  {
    id: 'bronchial_asthma',
    name: 'Bronchial Asthma (Exacerbation / Chronic)',
    icd10: 'J45.9',
    category: 'Pulmonary Medicine',
    urgency: 'ROUTINE',
    summary: 'A chronic inflammatory disorder of the airways characterized by variable and recurring episodes of wheezing, shortness of breath, chest tightness, and nighttime or early morning cough.',
    symptomWeights: {
      wheezing: 0.95,
      shortness_of_breath: 0.90,
      cough: 0.85,
      fatigue: 0.60
    },
    coreSymptomIds: ['wheezing', 'shortness_of_breath', 'cough'],
    redFlags: [
      'Inability to speak in full sentences without pausing for breath',
      'Silent chest (absence of wheezing due to severe airflow limitation)',
      'Cyanosis (blue lips or nail beds)',
      'Peak flow meter reading < 50% personal best or lack of response to rescue inhaler',
      'Accessory muscle use (intercostal retractions)'
    ],
    causes: ['Airway hyperresponsiveness and chronic eosinophilic or neutrophilic mucosal inflammation triggered by allergens, exercise, cold air, or viral infections.'],
    riskFactors: ['Atopy (allergies, eczema), family history of asthma, childhood viral respiratory infections, air pollution'],
    howDiagnosed: ['Spirometry demonstrating reversible airflow obstruction after bronchodilator inhalation', 'Peak expiratory flow (PEF) variability'],
    generalTreatments: [
      'Inhaled corticosteroids (ICS) controller therapy (e.g., budesonide, fluticasone)',
      'Rapid-acting beta-2 agonist (SABA like albuterol) rescue inhaler',
      'Written Asthma Action Plan formulated with your pulmonologist or GP'
    ],
    prevention: ['Identifying and minimizing personal allergens (dust mites, pet dander, mold)', 'Annual influenza and pneumococcal vaccination'],
    citations: [
      { source: 'Global Initiative for Asthma (GINA)', description: 'Global Strategy for Asthma Management and Prevention.' }
    ]
  },
  {
    id: 'osteoarthritis',
    name: 'Osteoarthritis (Degenerative Joint Disease)',
    icd10: 'M19.9',
    category: 'Orthopedics & Rheumatology',
    urgency: 'ROUTINE',
    summary: 'The most prevalent form of arthritis, caused by gradual breakdown of joint cartilage and underlying bone, typically affecting knees, hips, hands, and lower spine.',
    symptomWeights: {
      body_aches: 0.90,
      fatigue: 0.40
    },
    coreSymptomIds: ['body_aches'],
    redFlags: [
      'Hot, severely red, swollen joint with fever (septic arthritis emergency)',
      'Sudden inability to bear any weight on a joint after a pop or injury',
      'Rapidly progressing numbness or loss of bladder/bowel control (cauda equina warning in spine)'
    ],
    causes: ['Progressive biomechanical cartilage wear-and-tear, low-grade subchondral bone remodeling, and mild synovial inflammation.'],
    riskFactors: ['Advancing age, obesity, prior joint injuries, female sex, repetitive occupational joint loading'],
    howDiagnosed: ['Weight-bearing joint X-rays demonstrating joint space narrowing, subchondral sclerosis, and osteophytes', 'Clinical physical exam'],
    generalTreatments: [
      'Low-impact physical therapy and quadriceps/gluteal strengthening (swimming, cycling, walking)',
      'Weight management to decrease compressive joint loads',
      'Topical NSAID gels (diclofenac) or oral analgesics under physician supervision',
      'Joint injections or orthopedic joint replacement for advanced severe cartilage loss'
    ],
    prevention: ['Maintaining healthy body mass index (BMI)', 'Protecting joints from sports trauma', 'Regular low-impact exercise'],
    citations: [
      { source: 'American College of Rheumatology (ACR) / Arthritis Foundation', description: 'Guideline for the Management of Osteoarthritis of the Hand, Hip, and Knee.' }
    ]
  },
  {
    id: 'atopic_dermatitis_eczema',
    name: 'Atopic Dermatitis (Eczema) & Contact Dermatitis',
    icd10: 'L20.9',
    category: 'Dermatology',
    urgency: 'ROUTINE',
    summary: 'A chronic pruritic inflammatory skin condition characterized by defective skin barrier function, intense itching, red dry patches, and lichenification on flexural folds.',
    symptomWeights: {
      rash: 0.98,
      fatigue: 0.30
    },
    coreSymptomIds: ['rash'],
    redFlags: [
      'Rapidly spreading clusters of painful fluid-filled blisters (Eczema herpeticum emergency)',
      'Honey-colored crusting or pus indicating secondary bacterial impetiginization',
      'High fever accompanying sudden skin erythema covering >50% of body surface'
    ],
    causes: ['Filaggrin gene mutations, immune dysregulation (Th2 pathway), and environmental triggers disrupting stratum corneum skin moisture.'],
    riskFactors: ['Personal or family history of atopic triad (asthma, allergic rhinitis, eczema)', 'Cold dry weather, harsh soaps, fragrances'],
    howDiagnosed: ['Clinical examination based on Hanifin and Rajka criteria; patch testing to differentiate allergic contact dermatitis.'],
    generalTreatments: [
      'Frequent application of thick, fragrance-free ceramide-rich emollients (ointments or creams, not watery lotions) within 3 minutes of bathing',
      'Short-term physician-prescribed topical corticosteroids or calcineurin inhibitors for acute flare-ups',
      'Oral antihistamines for nighttime itch relief and cotton clothing'
    ],
    prevention: ['Lukewarm brief showers, fragrance-free detergents, avoiding wool against bare skin, using room humidifiers in winter'],
    citations: [
      { source: 'American Academy of Dermatology (AAD)', description: 'Guidelines of Care for the Management of Atopic Dermatitis.' }
    ]
  },
  {
    id: 'type2_diabetes',
    name: 'Type 2 Diabetes Mellitus (Screening & Doubts)',
    icd10: 'E11.9',
    category: 'Endocrinology & Primary Care',
    urgency: 'ROUTINE',
    summary: 'A metabolic disorder characterized by high blood glucose levels resulting from progressive insulin resistance and relative insulin deficiency, frequently asymptomatic in early stages.',
    symptomWeights: {
      fatigue: 0.80,
      headache: 0.35
    },
    coreSymptomIds: ['fatigue'],
    redFlags: [
      'Diabetic ketoacidosis (DKA) or hyperosmolar hyperglycemic state (HHS): fruity breath odor, deep rapid breathing, confusion, severe dehydration',
      'Non-healing foot ulcers with redness or dark discoloration',
      'Sudden vision blurring or dark floaters'
    ],
    causes: ['Combination of genetic susceptibility, peripheral insulin resistance in muscle/liver tissues, and pancreatic beta-cell dysfunction.'],
    riskFactors: ['Overweight/obesity, physical inactivity, age ≥ 35, family history, gestational diabetes, hypertension or dyslipidemia'],
    howDiagnosed: [
      'Hemoglobin A1c (HbA1c) ≥ 6.5%',
      'Fasting plasma glucose ≥ 126 mg/dL (7.0 mmol/L)',
      '2-hour oral glucose tolerance test (OGTT) ≥ 200 mg/dL'
    ],
    generalTreatments: [
      'Nutritional counseling focusing on whole foods, fiber, and lower refined carbohydrates',
      'At least 150 minutes of moderate aerobic exercise weekly plus resistance training',
      'Physician-prescribed medications (such as metformin, SGLT2 inhibitors, GLP-1 receptor agonists) when indicated'
    ],
    prevention: ['Moderate weight loss (5-7% of body weight), routine annual metabolic screening, balanced physical activity'],
    citations: [
      { source: 'American Diabetes Association (ADA)', description: 'Standards of Care in Diabetes.' }
    ]
  },
  {
    id: 'hypertension_doubts',
    name: 'Essential Hypertension (High Blood Pressure)',
    icd10: 'I10',
    category: 'Cardiology & Primary Care',
    urgency: 'ROUTINE',
    summary: 'A common chronic cardiovascular condition where systemic arterial pressure is persistently elevated (≥130/80 mmHg), often nicknamed the "silent killer" because it rarely causes symptoms in early stages.',
    symptomWeights: {
      headache: 0.40,
      fatigue: 0.30
    },
    coreSymptomIds: ['headache'],
    redFlags: [
      'Hypertensive Emergency: Blood pressure > 180/120 mmHg accompanied by chest pain, shortness of breath, severe headache, vision changes, or confusion (requires immediate ER care)',
      'Sudden neurological weakness or numbness'
    ],
    causes: ['Arterial stiffness, renal sodium handling dysregulation, sympathetic overactivity, and genetic factors.'],
    riskFactors: ['High dietary sodium, lack of physical exercise, obesity, excessive alcohol intake, chronic stress, smoking, family history'],
    howDiagnosed: ['Properly calibrated in-office resting blood pressure measurements taken on at least 2 separate occasions', '24-hour ambulatory blood pressure monitoring (ABPM)'],
    generalTreatments: [
      'DASH (Dietary Approaches to Stop Hypertension) diet low in sodium (<2,300 mg/day)',
      'Regular cardiovascular exercise (brisk walking, swimming)',
      'Physician-prescribed antihypertensive medications (ACE inhibitors, ARBs, CCBs, or thiazide diuretics)'
    ],
    prevention: ['Maintaining healthy weight, limiting alcohol, stress management, routine blood pressure checks at home'],
    citations: [
      { source: 'ACC / AHA High Blood Pressure Clinical Practice Guidelines', description: 'Classification, prevention, detection, and management of high blood pressure in adults.' }
    ]
  },
  {
    id: 'cancer_awareness_doubts',
    name: 'Cancer Doubts & Screening Guidance',
    icd10: 'Z12.9',
    category: 'Oncology & Preventative Health',
    urgency: 'ROUTINE',
    summary: 'Educational guidance for users with health anxiety or concerns about cancer. Clarifies that random everyday symptoms (like headaches, mild fever, or transient aches) are overwhelmingly caused by common benign conditions, while outlining evidence-based screening recommendations.',
    symptomWeights: {
      fatigue: 0.50,
      headache: 0.20
    },
    coreSymptomIds: ['fatigue'],
    redFlags: [
      'Unexplained, unintentional weight loss (>10 lbs without trying)',
      'A persistent firm, non-tender lump or mass that is growing',
      'Persistent hoarseness or difficulty swallowing lasting > 4 weeks',
      'Unexplained visible bleeding: hemoptysis (blood in sputum), hematuria (blood in urine), or rectal bleeding',
      'ABCDE skin changes in moles (Asymmetry, Border irregularity, Color variegation, Diameter >6mm, Evolving)'
    ],
    causes: ['Accumulation of genetic mutations affecting cellular DNA regulation, influenced by environmental exposures, viral triggers, and lifestyle factors.'],
    riskFactors: ['Tobacco and alcohol use, persistent HPV or Hepatitis infections, excessive UV sunlight exposure, advanced age, specific inherited gene variants (e.g., BRCA)'],
    howDiagnosed: [
      'Evidence-based age-appropriate screening: Mammograms (breast), Colonoscopy / FIT stool tests (colorectal), Pap/HPV tests (cervical), Low-dose CT scans (for heavy long-term smokers)',
      'Definitive diagnosis requires tissue biopsy and histopathological examination — never symptoms alone'
    ],
    generalTreatments: [
      'Multidisciplinary oncological team care (surgical resection, medical oncology chemotherapy, immunotherapy, targeted therapy, radiation therapy)',
      'Regular primary care preventive health evaluations'
    ],
    prevention: ['Tobacco cessation', 'HPV and Hepatitis B vaccination', 'Sunscreen usage', 'Healthy diet and regular physical activity', 'Adherence to routine screening guidelines'],
    citations: [
      { source: 'American Cancer Society (ACS) Screening Guidelines', description: 'Evidence-based early detection guidelines for breast, cervical, colorectal, and lung cancer.' },
      { source: 'National Cancer Institute (NCI)', description: 'Understanding Cancer series and symptom differentiation.' }
    ]
  },
  {
    id: 'hemorrhoids',
    name: 'Hemorrhoids (Piles)',
    icd10: 'K64.9',
    category: 'Gastrointestinal & Colorectal Medicine',
    urgency: 'ROUTINE',
    summary: 'Swollen and inflamed veins in the rectum and anus (internal or external), commonly caused by straining during bowel movements, chronic constipation, pregnancy, or heavy lifting.',
    symptomWeights: {
      body_aches: 0.60
    },
    coreSymptomIds: ['body_aches'],
    redFlags: [
      'Large amounts of bright or dark red rectal bleeding causing weakness or dizziness',
      'Severe intractable anal pain with a firm, tender lump (thrombosed external hemorrhoid requiring prompt evaluation)',
      'Fever, chills, or perianal redness and drainage (suspected perianal abscess or fistula)',
      'Black, tarry, sticky stools (melena - indicates upper GI bleeding rather than hemorrhoids)'
    ],
    causes: ['Elevated intra-abdominal venous pressure from prolonged sitting on the toilet, chronic straining, low dietary fiber, pregnancy, and chronic heavy lifting.'],
    riskFactors: ['Chronic constipation or diarrhea', 'Low dietary fiber intake', 'Obesity', 'Sedentary occupation with long sitting', 'Aging (weakening of supporting connective tissues)'],
    howDiagnosed: [
      'Visual perianal inspection and Digital Rectal Examination (DRE)',
      'Anoscopy or sigmoidoscopy to inspect internal hemorrhoids and exclude rectal polyps/fissures',
      'Colonoscopy if age > 45 or family history to rule out colorectal pathology'
    ],
    generalTreatments: [
      'High-fiber nutrition (25–35 grams/day) plus psyllium husk fiber supplements and abundant water (2+ liters/day)',
      'Warm sitz baths (sitting in plain warm water for 15 minutes, 2–3 times daily)',
      'Short-term soothing topical witch hazel pads, hydrocortisone/pramoxine ointments (limited to 7 days)',
      'Stool softeners (docusate sodium) or osmotic laxatives (polyethylene glycol / PEG)',
      'Outpatient procedures (Rubber Band Ligation, infrared coagulation, or hemorrhoidectomy) for persistent high-grade prolapse'
    ],
    prevention: ['Avoid straining or delaying bowel urges', 'Limit time on the toilet bowl (<5 minutes, no phone browsing)', 'Increase dietary fiber and daily hydration', 'Regular physical walking'],
    citations: [
      { source: 'American Society of Colon and Rectal Surgeons (ASCRS)', description: 'Clinical Practice Guidelines for the Management of Hemorrhoids.' },
      { source: 'National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK)', description: 'Hemorrhoids: Symptoms, causes, and conservative home care.' }
    ]
  },
  {
    id: 'chronic_constipation',
    name: 'Constipation (Functional & Chronic)',
    icd10: 'K59.0',
    category: 'Gastrointestinal Medicine',
    urgency: 'ROUTINE',
    summary: 'A very common gastrointestinal condition characterized by infrequent bowel movements (<3 per week), hard, lumpy or dry stools, excessive straining, or a feeling of incomplete rectal evacuation.',
    symptomWeights: {
      body_aches: 0.40,
      nausea_vomiting: 0.30
    },
    coreSymptomIds: ['body_aches'],
    redFlags: [
      'Unexplained weight loss accompanying bowel changes',
      'Blood in or on the stool (hematochezia)',
      'Severe abdominal distension and intractable vomiting (mechanical bowel obstruction emergency)',
      'New onset of constipation after age 50 without prior history',
      'Family history of colorectal cancer or inflammatory bowel disease (IBD)'
    ],
    causes: ['Slow colonic transit, pelvic floor dyssynergia, low dietary fiber, inadequate fluid intake, sedentary lifestyle, and medications (opioids, iron supplements, calcium channel blockers, anticholinergics).'],
    riskFactors: ['Advanced age, female sex, low physical mobility, ignoring the urge to defecate, high dairy or processed food diets'],
    howDiagnosed: [
      'Rome IV Diagnostic Criteria for Functional Constipation (straining, lumpy/hard stools Bristol Type 1-2, <3 spontaneous movements/week for >3 months)',
      'Digital rectal exam, metabolic blood panel (checking thyroid TSH, calcium, electrolytes)',
      'Colonoscopy recommended if alarm signs or age ≥ 45'
    ],
    generalTreatments: [
      'Stepwise dietary fiber increase to 25–30g daily (kiwi, prunes, oats, flaxseed, chia seeds, vegetables)',
      'Osmotic laxatives as first-line safe therapy (Polyethylene glycol 3350 / MiraLAX)',
      'Adequate morning hydration with a warm beverage to stimulate the gastrocolic reflex',
      'Using a footstool (e.g., Squatty Potty) to angle the anorectal canal during evacuation',
      'Stimulant laxatives (senna, bisacodyl) used intermittently if osmotic laxatives are insufficient'
    ],
    prevention: ['Daily morning routine allowing unhurried toilet time', 'Regular aerobic exercise (walking 30 min daily improves gut motility)', 'Consistent high-fiber and fluid intake'],
    citations: [
      { source: 'American Gastroenterological Association (AGA)', description: 'Clinical Practice Guideline on the Medical Management of Constipation.' },
      { source: 'Rome IV Diagnostic Criteria', description: 'Functional Gastrointestinal Disorders - Bowel Disorders.' }
    ]
  },
  {
    id: 'smallpox_mpox',
    name: 'Smallpox (Variola) & Mpox (Monkeypox)',
    icd10: 'B03 / B04',
    category: 'Infectious Diseases & Virology',
    urgency: 'URGENT',
    summary: 'Viral illnesses caused by Orthopoxviruses. Smallpox (Variola virus) was declared globally eradicated by the WHO in 1980 after historic vaccination campaigns. Mpox (formerly Monkeypox) is a related zoonotic orthopoxvirus that causes fever, swollen lymph nodes (lymphadenopathy), and characteristic umbilicated vesicular and pustular skin lesions.',
    symptomWeights: {
      fever: 0.95,
      rash: 0.95,
      body_aches: 0.85,
      headache: 0.80,
      fatigue: 0.85,
      sore_throat: 0.50
    },
    coreSymptomIds: ['fever', 'rash', 'body_aches'],
    redFlags: [
      'Lesions near or directly in the eye (corneal ulceration and visual loss risk)',
      'Severe bacterial superinfection of pox lesions with spreading cellulitis or sepsis',
      'Difficulty breathing, swallowing, or severe laryngeal edema',
      'Severe unremitting anorectal or pharyngeal pain preventing oral fluid intake'
    ],
    causes: ['Orthopoxvirus family (Variola virus eradicated; Monkeypox virus clade I and clade II transmitted through close physical/skin-to-skin contact, respiratory droplets, or contaminated linens).'],
    riskFactors: ['Direct close skin-to-skin or sexual contact with someone with active lesions', 'Contact with infected animals or contaminated materials', 'Immunocompromised individuals (e.g., uncontrolled HIV) have higher risk of severe disease'],
    howDiagnosed: [
      'Real-time Polymerase Chain Reaction (PCR) swab directly from lesion fluid, crusts, or vigorous swab of lesion base (definitive test)',
      'Clinical history noting fever, prodrome, prominent lymphadenopathy, and progressive centrifugal rash'
    ],
    generalTreatments: [
      'Isolation until all scab crusts have fallen off and fresh underlying skin has fully formed',
      'Pain management (topical lidocaine, oral analgesics, sitz baths for genital/anal lesions)',
      'Antiviral medication (Tecovirimat / TPOXX) prescribed under CDC/WHO protocols for patients with severe disease, ocular involvement, or high risk of complications',
      'Skin care keeping lesions dry and clean; avoiding scratching to prevent secondary bacterial infection'
    ],
    prevention: ['Smallpox/Mpox Vaccines: JYNNEOS (Modified Vaccinia Ankara) 2-dose subcutaneous regimen for at-risk individuals', 'Avoiding close physical contact with symptomatic persons', 'Wearing gloves when handling contaminated bedding'],
    citations: [
      { source: 'WHO Global Health Emergency Information on Mpox & Smallpox Eradication', description: 'Surveillance, infection prevention, and historical eradication records.' },
      { source: 'CDC Guidelines on Mpox Clinical Management', description: 'Testing algorithms, Tecovirimat (TPOXX) indications, and JYNNEOS vaccination.' }
    ]
  },
  {
    id: 'irritable_bowel_syndrome',
    name: 'Irritable Bowel Syndrome (IBS)',
    icd10: 'K58.9',
    category: 'Gastrointestinal Medicine',
    urgency: 'ROUTINE',
    summary: 'A common disorder of gut-brain interaction characterized by recurrent abdominal cramping, bloating, gas, and altered bowel habits (IBS-Constipation, IBS-Diarrhea, or Mixed).',
    symptomWeights: {
      diarrhea: 0.70,
      body_aches: 0.60,
      nausea_vomiting: 0.40
    },
    coreSymptomIds: ['diarrhea'],
    redFlags: [
      'Nocturnal diarrhea awakening the patient from sleep (suggests organic disease like IBD rather than IBS)',
      'Rectal bleeding or unintentional rapid weight loss',
      'Unexplained iron-deficiency anemia',
      'Elevated fecal calprotectin or inflammatory markers'
    ],
    causes: ['Visceral hypersensitivity, abnormal gut motility, altered gut-brain communication, and post-infectious intestinal microflora alterations.'],
    riskFactors: ['Prior acute gastroenteritis (post-infectious IBS), chronic psychological stress, anxiety, food intolerances'],
    howDiagnosed: ['Rome IV criteria: Recurrent abdominal pain at least 1 day per week related to defecation, change in stool frequency or form, for at least 3 months.'],
    generalTreatments: [
      'Low-FODMAP diet trial guided by a clinical dietitian to identify fermentable carb triggers',
      'Soluble fiber (psyllium) rather than insoluble wheat bran',
      'Antispasmodics (peppermint oil, dicyclomine) for abdominal cramps',
      'Probiotics and gut-directed hypnotherapy or cognitive behavioral therapy'
    ],
    prevention: ['Stress management, regular eating schedules, avoiding carbonated drinks and artificial sweeteners (sorbitol, xylitol)'],
    citations: [
      { source: 'American College of Gastroenterology (ACG) IBS Monograph', description: 'Evidence-based management of Irritable Bowel Syndrome.' }
    ]
  },
  {
    id: 'peptic_ulcer_disease',
    name: 'Peptic Ulcer Disease (Gastric & Duodenal Ulcers)',
    icd10: 'K27.9',
    category: 'Gastrointestinal Medicine',
    urgency: 'ROUTINE',
    summary: 'Sores or breaks in the protective mucosal lining of the stomach (gastric) or upper small intestine (duodenal), presenting with burning epigastric stomach pain often worse between meals or at night.',
    symptomWeights: {
      chest_pain: 0.70,
      nausea_vomiting: 0.50
    },
    coreSymptomIds: ['chest_pain'],
    redFlags: [
      'Vomiting bright red blood or "coffee-ground" emesis (active upper GI bleed)',
      'Black tarry foul-smelling stools (melena)',
      'Sudden severe, knife-like, rigid abdominal pain (acute ulcer perforation emergency)'
    ],
    causes: ['Helicobacter pylori bacterial infection (60-80% of cases) and frequent use of NSAID pain relievers (aspirin, ibuprofen, naproxen).'],
    riskFactors: ['H. pylori colonization, regular NSAID use, tobacco smoking, older age, concurrent corticosteroid or anticoagulant use'],
    howDiagnosed: [
      'Upper gastrointestinal endoscopy (Esophagogastroduodenoscopy / EGD) with mucosal biopsy',
      'H. pylori testing (urea breath test, stool antigen test, or endoscopic biopsy)'
    ],
    generalTreatments: [
      'H. pylori eradication regimen (quadruple therapy: bismuth + PPI + two targeted antibiotics)',
      'Proton Pump Inhibitors (PPIs like omeprazole, pantoprazole) for 4-8 weeks to allow mucosal healing',
      'Immediate discontinuation of NSAIDs'
    ],
    prevention: ['Avoid unprescribed chronic NSAIDs', 'Take NSAIDs with food or a protective PPI if clinically required', 'Smoking cessation'],
    citations: [
      { source: 'American College of Gastroenterology (ACG)', description: 'Management of Ulcer Bleeding and H. Pylori Guidelines.' }
    ]
  },
  {
    id: 'acute_appendicitis',
    name: 'Acute Appendicitis',
    icd10: 'K35.8',
    category: 'Surgical Abdomen & Emergency Medicine',
    urgency: 'EMERGENCY',
    summary: 'Acute inflammation of the vermiform appendix, typically beginning as dull periumbilical pain that migrates to the right lower quadrant (McBurney\'s point) with localized guarding, rebound tenderness, and low-grade fever.',
    symptomWeights: {
      nausea_vomiting: 0.85,
      fever: 0.75,
      body_aches: 0.60
    },
    coreSymptomIds: ['nausea_vomiting', 'fever'],
    redFlags: [
      'Sudden temporary relief of pain followed by diffuse peritonitis (suggests appendiceal rupture)',
      'Rigid "board-like" abdominal wall and high fever',
      'Inability to walk upright due to right lower quadrant pain',
      'Rapid heart rate and low blood pressure (septic shock)'
    ],
    causes: ['Obstruction of the appendiceal lumen by a fecalith (hardened stool), lymphoid hyperplasia, or foreign body, leading to bacterial overgrowth and ischemia.'],
    riskFactors: ['Most common between ages 10 and 30, though can occur at any age'],
    howDiagnosed: [
      'Abdominal ultrasound (preferred in children and pregnancy)',
      'Contrast-enhanced Abdominal CT scan (high sensitivity in adults)',
      'Complete blood count (elevated white blood cells with left shift) and inflammatory markers'
    ],
    generalTreatments: [
      'EMERGENCY INPATIENT EVALUATION: Do NOT eat or drink (keep NPO for surgery)',
      'Surgical laparoscopic or open appendectomy',
      'Intravenous hydration and broad-spectrum IV antibiotics'
    ],
    prevention: ['No established preventive measure; prompt surgical evaluation prevents life-threatening rupture and peritonitis.'],
    citations: [
      { source: 'World Society of Emergency Surgery (WSES) Jerusalem Guidelines', description: 'Diagnosis and treatment of acute appendicitis.' }
    ]
  },
  {
    id: 'allergic_rhinitis',
    name: 'Allergic Rhinitis (Hay Fever & Environmental Allergies)',
    icd10: 'J30.9',
    category: 'Allergy, Immunology & ENT',
    urgency: 'ROUTINE',
    summary: 'An IgE-mediated inflammatory response of the nasal mucosa to airborne allergens, resulting in sneezing, nasal congestion, clear rhinorrhea, and itchy watery eyes.',
    symptomWeights: {
      fatigue: 0.50,
      cough: 0.40,
      sore_throat: 0.35,
      headache: 0.35
    },
    coreSymptomIds: ['cough'],
    redFlags: [
      'Associated wheezing, acute shortness of breath, or asthma exacerbation',
      'Unilateral nasal obstruction or blood-stained discharge',
      'Facial swelling, severe pain, or vision changes'
    ],
    causes: ['Pollen from trees, grasses, weeds (seasonal), or dust mites, mold spores, and pet dander (perennial).'],
    riskFactors: ['Family history of atopy, asthma, eczema'],
    howDiagnosed: ['Clinical history linking symptoms to specific allergen exposures, skin prick testing, or allergen-specific serum IgE blood testing.'],
    generalTreatments: [
      'Intranasal corticosteroid sprays (e.g., fluticasone, mometasone) — most effective first-line therapy',
      'Second-generation oral non-drowsy antihistamines (cetirizine, fexofenadine, loratadine)',
      'Nasal saline irrigation to clear airborne allergens',
      'Allergen immunotherapy (allergy shots or sublingual tablets) for refractory cases'
    ],
    prevention: ['HEPA air filters indoors', 'Keeping windows closed during peak pollen counts', 'Washing bedding in hot water weekly'],
    citations: [
      { source: 'American Academy of Otolaryngology-Head and Neck Surgery (AAO-HNS)', description: 'Clinical Practice Guideline: Allergic Rhinitis.' }
    ]
  },
  {
    id: 'hypothyroidism',
    name: 'Hypothyroidism (Underactive Thyroid)',
    icd10: 'E03.9',
    category: 'Endocrinology & Primary Care',
    urgency: 'ROUTINE',
    summary: 'A common endocrine disorder where the thyroid gland produces insufficient thyroid hormone, leading to generalized metabolic slowing, fatigue, cold intolerance, constipation, weight gain, and dry skin.',
    symptomWeights: {
      fatigue: 0.95,
      body_aches: 0.50,
      headache: 0.30
    },
    coreSymptomIds: ['fatigue'],
    redFlags: [
      'Myxedema coma (extreme emergency: severe hypothermia, confusion, profound lethargy, and bradycardia)',
      'Severe shortness of breath or pericardial effusion'
    ],
    causes: ['Hashimoto\'s thyroiditis (autoimmune destruction of thyroid tissue), prior radioiodine therapy, thyroid surgery, or iodine deficiency.'],
    riskFactors: ['Female sex (5-8 times more common than in men), advancing age, personal or family history of autoimmune diseases (Type 1 diabetes, celiac disease)'],
    howDiagnosed: [
      'Serum Thyroid Stimulating Hormone (TSH) test (elevated in primary hypothyroidism)',
      'Free Thyroxine (Free T4) test (low in overt hypothyroidism)',
      'Thyroid Peroxidase (TPO) antibodies to confirm Hashimoto\'s thyroiditis'
    ],
    generalTreatments: [
      'Physician-prescribed synthetic thyroid hormone replacement (Levothyroxine / T4 taken once daily on an empty stomach with water 30-60 min before breakfast)',
      'Periodic TSH blood monitoring to optimize dosage'
    ],
    prevention: ['Adequate dietary iodine through iodized salt; routine screening in women after age 50 or postpartum'],
    citations: [
      { source: 'American Thyroid Association (ATA) / American Association of Clinical Endocrinologists (AACE)', description: 'Clinical Practice Guidelines for Hypothyroidism in Adults.' }
    ]
  },
  {
    id: 'urinary_tract_infection',
    name: 'Urinary Tract Infection (UTI / Cystitis)',
    icd10: 'N39.0',
    category: 'Urology & Infectious Diseases',
    urgency: 'ROUTINE',
    summary: 'A common bacterial infection of the bladder or urethra causing painful burning urination (dysuria), frequent urinary urgency, cloudy urine, and lower pelvic discomfort.',
    symptomWeights: {
      fever: 0.35,
      body_aches: 0.35,
      nausea_vomiting: 0.15
    },
    coreSymptomIds: ['fever'],
    redFlags: [
      'High fever with shaking chills and flank/lower back pain (suspected kidney infection / pyelonephritis)',
      'Persistent nausea and vomiting preventing fluid intake',
      'Visible gross blood clots in urine or sudden confusion in older adults'
    ],
    causes: ['Escherichia coli (E. coli) or other gastrointestinal bacteria ascending into the urethra and bladder.'],
    riskFactors: ['Female anatomy (shorter urethra), dehydration, sexual activity, menopause, urinary retention, kidney stones'],
    howDiagnosed: [
      'Urinalysis (urine dipstick checking leukocyte esterase and nitrites)',
      'Microscopic urine culture and antibiotic sensitivity testing'
    ],
    generalTreatments: [
      'Physician-prescribed short course of targeted oral antibiotics (e.g., nitrofurantoin, fosfomycin, or trimethoprim-sulfamethoxazole)',
      'Abundant water intake to flush bacteria from the urinary tract',
      'Phenazopyridine (short-term urinary pain relief) as advised by a clinician'
    ],
    prevention: ['Stay well hydrated, avoid holding urine for long periods, urinate after sexual intercourse, wipe front to back'],
    citations: [
      { source: 'Infectious Diseases Society of America (IDSA)', description: 'International Clinical Practice Guidelines for Acute Uncomplicated Cystitis.' }
    ]
  },
  {
    id: 'kidney_stones',
    name: 'Kidney Stones (Nephrolithiasis / Renal Calculi)',
    icd10: 'N20.0',
    category: 'Urology & Nephrology',
    urgency: 'URGENT',
    summary: 'Hard mineral and salt deposits (calcium oxalate, uric acid) that form inside the kidneys and cause intense wave-like flank or lower abdominal pain when passing through the ureter.',
    symptomWeights: {
      nausea_vomiting: 0.70,
      body_aches: 0.70,
      fever: 0.25
    },
    coreSymptomIds: ['nausea_vomiting'],
    redFlags: [
      'Flank pain accompanied by fever and chills (obstructed infected kidney — urological emergency)',
      'Complete inability to pass urine (anuria) or pain in a solitary kidney',
      'Intractable vomiting or unbearable pain unresponsive to oral analgesics'
    ],
    causes: ['Low urine volume, concentrated urinary minerals (calcium, oxalate, uric acid), or low urinary citrate.'],
    riskFactors: ['Chronic dehydration, high sodium or high animal protein diet, family history of stones, gout, obesity'],
    howDiagnosed: [
      'Non-contrast low-dose Abdominal/Pelvic CT scan (gold standard for stone size and location)',
      'Renal ultrasound and urinalysis (looking for microscopic hematuria)'
    ],
    generalTreatments: [
      'Aggressive hydration (2.5–3 liters of water daily) to help pass small stones (<5 mm)',
      'Pain management (NSAIDs or clinician-prescribed analgesics) and medical expulsive therapy (tamsulosin)',
      'Urological procedures (extracorporeal shock wave lithotripsy or ureteroscopy) for larger or obstructing stones'
    ],
    prevention: ['Drink enough water to keep urine pale yellow, add fresh lemon juice (citrate), limit excess sodium and high-oxalate foods'],
    citations: [
      { source: 'American Urological Association (AUA)', description: 'Medical and Surgical Management of Kidney Stones.' }
    ]
  },
  {
    id: 'conjunctivitis',
    name: 'Conjunctivitis (Pink Eye)',
    icd10: 'H10.9',
    category: 'Ophthalmology (Eye Care)',
    urgency: 'ROUTINE',
    summary: 'Inflammation of the thin transparent conjunctiva lining the eyelid and eyeball, presenting with eye redness, gritty irritation, tearing, or sticky morning discharge.',
    symptomWeights: {
      photophobia: 0.40,
      sore_throat: 0.25
    },
    coreSymptomIds: ['photophobia'],
    redFlags: [
      'Sudden decreased or blurry vision that does not clear with blinking',
      'Moderate-to-severe deep eye pain or intense light sensitivity',
      'Contact lens wearer with focal white spot on the cornea (corneal ulcer emergency)',
      'Profuse thick yellow-green pus rapidly re-accumulating within minutes'
    ],
    causes: ['Adenoviruses (most common, often with cold symptoms), bacteria (Staphylococcus, Streptococcus), or seasonal/environmental allergens.'],
    riskFactors: ['Close contact with someone with pink eye, sharing towels/cosmetics, seasonal allergies, improper contact lens hygiene'],
    howDiagnosed: ['Clinical slit-lamp or penlight eye examination; viral vs bacterial vs allergic differentiation based on discharge and history.'],
    generalTreatments: [
      'Preservative-free lubricating artificial tears and cool/warm clean compresses',
      'Discontinue contact lens wear immediately until fully resolved',
      'Topical antihistamine drops for allergic pink eye; physician-prescribed antibiotic drops only if bacterial'
    ],
    prevention: ['Frequent handwashing, avoid rubbing eyes, wash pillowcases and discard contaminated eye makeup'],
    citations: [
      { source: 'American Academy of Ophthalmology (AAO)', description: 'Conjunctivitis Preferred Practice Pattern.' }
    ]
  },
  {
    id: 'iron_deficiency_anemia',
    name: 'Anemia (Iron-Deficiency & Nutritional)',
    icd10: 'D50.9',
    category: 'Hematology & Primary Care',
    urgency: 'ROUTINE',
    summary: 'A reduction in healthy red blood cells or hemoglobin needed to carry oxygen to tissues, commonly causing persistent fatigue, pale skin, cold hands/feet, dizziness, and exertional breathlessness.',
    symptomWeights: {
      fatigue: 0.96,
      shortness_of_breath: 0.50,
      headache: 0.45
    },
    coreSymptomIds: ['fatigue'],
    redFlags: [
      'Chest pain, fainting (syncope), or shortness of breath at rest',
      'Rapidly worsening pallor with black tarry stools or heavy acute blood loss',
      'Very low hemoglobin (<7–8 g/dL) requiring urgent evaluation'
    ],
    causes: ['Inadequate dietary iron intake, heavy menstrual bleeding, occult gastrointestinal bleeding (ulcers, polyps), or poor intestinal absorption (celiac disease, Vitamin B12/folate deficiency).'],
    riskFactors: ['Women of childbearing age, pregnancy, vegetarian/vegan diets without supplementation, frequent blood donors, chronic GI conditions'],
    howDiagnosed: [
      'Complete Blood Count (CBC) showing low hemoglobin and low MCV (microcytic)',
      'Serum ferritin (most sensitive marker for iron stores), serum iron, TIBC, and Vitamin B12/folate levels'
    ],
    generalTreatments: [
      'Evaluating and treating the underlying source of iron loss or malabsorption',
      'Physician-guided oral iron supplementation (ferrous sulfate or bisglycinate, often paired with Vitamin C to boost absorption)',
      'Iron-rich foods (lean meats, lentils, spinach, fortified cereals); intravenous iron if oral therapy is poorly tolerated'
    ],
    prevention: ['Balanced iron- and B12-rich nutrition, routine prenatal vitamins during pregnancy, timely screening for heavy menstrual bleeding'],
    citations: [
      { source: 'American Society of Hematology (ASH)', description: 'Clinical Overview and Management of Iron-Deficiency Anemia.' }
    ]
  },
  {
    id: 'gout',
    name: 'Gout (Acute Gouty Arthritis)',
    icd10: 'M10.9',
    category: 'Rheumatology & Musculoskeletal',
    urgency: 'ROUTINE',
    summary: 'A painful inflammatory arthritis caused by needle-shaped monosodium urate crystal deposits in joints, classically starting suddenly overnight as intense swelling, redness, and warmth in the base of the big toe.',
    symptomWeights: {
      body_aches: 0.85,
      fever: 0.25
    },
    coreSymptomIds: ['body_aches'],
    redFlags: [
      'Single hot swollen joint accompanied by high fever and chills (must rule out bacterial septic arthritis urgently)',
      'Inability to bear any weight with rapidly spreading skin warmth up the leg'
    ],
    causes: ['Hyperuricemia (elevated blood uric acid) from decreased kidney excretion or increased purine breakdown.'],
    riskFactors: ['High-purine diet (red meat, organ meats, shellfish), high-fructose beverages, beer/alcohol, kidney disease, diuretics, obesity'],
    howDiagnosed: [
      'Synovial joint fluid aspiration showing negatively birefringent urate crystals under polarized microscopy (gold standard)',
      'Serum uric acid test (note: may be temporarily normal during an acute flare) and joint ultrasound'
    ],
    generalTreatments: [
      'Acute flare relief: physician-prescribed NSAIDs, low-dose colchicine, or short oral/intra-articular corticosteroids',
      'Rest, elevation, and gentle ice packs on the affected joint',
      'Long-term urate-lowering therapy (allopurinol or febuxostat) for recurrent flares or kidney stones'
    ],
    prevention: ['Adequate water hydration, limiting alcohol and sugary sodas, moderating red meat and seafood intake, maintaining healthy weight'],
    citations: [
      { source: 'American College of Rheumatology (ACR)', description: 'Guideline for the Management of Gout.' }
    ]
  },
  {
    id: 'rheumatoid_arthritis',
    name: 'Rheumatoid Arthritis (RA)',
    icd10: 'M06.9',
    category: 'Rheumatology & Autoimmune',
    urgency: 'ROUTINE',
    summary: 'A chronic autoimmune inflammatory disorder in which the immune system attacks the synovial lining of joints, typically causing symmetrical swelling, warmth, and morning stiffness lasting over 60 minutes in hands, wrists, and feet.',
    symptomWeights: {
      body_aches: 0.90,
      fatigue: 0.80,
      fever: 0.20
    },
    coreSymptomIds: ['body_aches', 'fatigue'],
    redFlags: [
      'Sudden single markedly hot, red joint with high fever (possible septic joint infection)',
      'New numbness, tingling, or weakness in hands/legs (cervical spine instability)',
      'Sudden chest pain or progressive shortness of breath (pleuritis or interstitial lung involvement)'
    ],
    causes: ['Autoimmune synovial inflammation driven by genetic susceptibility (HLA-DR4) and environmental triggers such as smoking.'],
    riskFactors: ['Female sex (2–3x higher), family history, cigarette smoking, age 30–60'],
    howDiagnosed: [
      'Rheumatoid Factor (RF) and Anti-Cyclic Citrullinated Peptide (anti-CCP) antibody blood tests',
      'Inflammatory markers (ESR and CRP) plus joint ultrasound or hand/foot X-rays'
    ],
    generalTreatments: [
      'Early Disease-Modifying Antirheumatic Drugs (DMARDs such as methotrexate) prescribed by a rheumatologist to halt joint damage',
      'Targeted biologics or JAK inhibitors when conventional DMARDs are insufficient',
      'Joint-preserving physical and occupational therapy'
    ],
    prevention: ['Smoking cessation (the strongest modifiable risk factor), early rheumatology referral within weeks of persistent joint swelling'],
    citations: [
      { source: 'American College of Rheumatology (ACR)', description: 'Guideline for the Treatment of Rheumatoid Arthritis.' }
    ]
  },
  {
    id: 'pcos',
    name: 'Polycystic Ovary Syndrome (PCOS)',
    icd10: 'E28.2',
    category: "Women's Health & Endocrinology",
    urgency: 'ROUTINE',
    summary: 'A common hormonal and metabolic condition in reproductive-age women characterized by irregular menstrual periods, elevated androgen levels (acne or excess facial hair), and small ovarian follicles on ultrasound.',
    symptomWeights: {
      fatigue: 0.55
    },
    coreSymptomIds: ['fatigue'],
    redFlags: [
      'Sudden severe one-sided pelvic pain with nausea (possible ovarian cyst rupture or torsion)',
      'Very heavy, prolonged vaginal bleeding causing dizziness or anemia',
      'Absence of periods for >3–6 months (endometrial protection evaluation needed)'
    ],
    causes: ['Hormonal imbalance involving insulin resistance, elevated luteinizing hormone (LH), and increased ovarian androgen production.'],
    riskFactors: ['Family history of PCOS or Type 2 diabetes, insulin resistance, weight gain'],
    howDiagnosed: [
      'Rotterdam Criteria (at least 2 of 3: irregular/absent ovulation, clinical or blood signs of high androgens, polycystic ovaries on pelvic ultrasound)',
      'Blood tests ruling out thyroid disorders, hyperprolactinemia, and screening for insulin resistance/lipids'
    ],
    generalTreatments: [
      'Balanced low-glycemic nutrition and regular strength + aerobic exercise to improve insulin sensitivity',
      'Combined hormonal contraceptives to regulate menstrual cycles and reduce acne/hair growth',
      'Metformin or anti-androgen medications (e.g., spironolactone) under gynecologist/endocrinologist guidance'
    ],
    prevention: ['Routine metabolic health monitoring (blood glucose, blood pressure, cholesterol) and steady physical activity'],
    citations: [
      { source: 'International Evidence-Based Guideline for the Assessment and Management of PCOS', description: 'Diagnostic criteria, metabolic screening, and symptom management.' }
    ]
  },
  {
    id: 'hyperthyroidism',
    name: 'Hyperthyroidism (Overactive Thyroid / Graves’ Disease)',
    icd10: 'E05.9',
    category: 'Endocrinology & Metabolism',
    urgency: 'ROUTINE',
    summary: 'Excessive production of thyroid hormones accelerating the body’s metabolism, commonly causing unintended weight loss, racing heartbeat (palpitations), hand tremors, heat intolerance, anxiety, and insomnia.',
    symptomWeights: {
      fatigue: 0.70,
      diarrhea: 0.35
    },
    coreSymptomIds: ['fatigue'],
    redFlags: [
      'Thyroid Storm (life-threatening emergency): high fever, very rapid irregular heartbeat (>140 bpm), extreme agitation, or confusion',
      'New eye bulging, double vision, or painful eye redness (Graves’ orbitopathy)',
      'Chest pain or sudden shortness of breath'
    ],
    causes: ['Graves’ disease (autoimmune stimulation of the thyroid), toxic thyroid nodules, or transient thyroiditis.'],
    riskFactors: ['Female sex, family history of autoimmune thyroid disease, recent pregnancy (postpartum thyroiditis)'],
    howDiagnosed: [
      'Low/suppressed Thyroid Stimulating Hormone (TSH) with elevated Free T4 and Free T3 blood tests',
      'TSH receptor antibodies (TRAb) and thyroid ultrasound or radioactive iodine uptake scan'
    ],
    generalTreatments: [
      'Beta-blockers (e.g., propranolol) for rapid symptom relief of palpitations and tremors',
      'Antithyroid medications (methimazole, or propylthiouracil in early pregnancy)',
      'Radioactive iodine therapy or thyroid surgery in selected cases under endocrinologist care'
    ],
    prevention: ['Avoid unnecessary high-dose iodine/kelp supplements; seek timely thyroid blood testing for unexplained palpitations or weight loss'],
    citations: [
      { source: 'American Thyroid Association (ATA)', description: 'Guidelines for Diagnosis and Management of Hyperthyroidism.' }
    ]
  },
  {
    id: 'psoriasis',
    name: 'Psoriasis (Plaque Psoriasis)',
    icd10: 'L40.0',
    category: 'Dermatology',
    urgency: 'ROUTINE',
    summary: 'An immune-mediated chronic skin condition causing rapid skin cell turnover, forming well-defined raised red/violet plaques topped with silvery-white scales commonly on elbows, knees, scalp, and lower back.',
    symptomWeights: {
      rash: 0.96,
      body_aches: 0.30
    },
    coreSymptomIds: ['rash'],
    redFlags: [
      'Widespread fiery redness covering >90% of skin with fever/chills (erythrodermic psoriasis emergency)',
      'Sudden crops of painful pus-filled blisters (generalized pustular psoriasis)',
      'Joint stiffness, swollen "sausage" fingers/toes, or back pain (psoriatic arthritis)'
    ],
    causes: ['Overactive IL-17 / IL-23 / TNF-alpha immune signaling accelerating epidermal keratinocyte proliferation.'],
    riskFactors: ['Family history, strep throat triggers (guttate psoriasis), smoking, obesity, skin trauma (Koebner phenomenon), stress'],
    howDiagnosed: ['Clinical skin, nail (pitting/oil spots), and scalp inspection by a dermatologist; occasional skin biopsy if uncertain.'],
    generalTreatments: [
      'Topical corticosteroids paired with Vitamin D analogs (calcipotriene) and salicylic acid/urea emollients',
      'Narrowband UVB phototherapy for widespread plaques',
      'Systemic immunomodulators or targeted biologics for moderate-to-severe psoriasis or psoriatic arthritis'
    ],
    prevention: ['Daily gentle moisturization, avoiding picking/scratching plaques, stress reduction, smoking cessation'],
    citations: [
      { source: 'American Academy of Dermatology (AAD) / National Psoriasis Foundation', description: 'Joint Guidelines of Care for the Management of Psoriasis.' }
    ]
  },
  {
    id: 'urticaria_hives',
    name: 'Urticaria (Hives & Acute Allergic Reaction)',
    icd10: 'L50.9',
    category: 'Dermatology & Allergy',
    urgency: 'ROUTINE',
    summary: 'Raised, intensely itchy, pink or skin-colored welts (wheals) that change shape, fade, and reappear over minutes to hours, frequently triggered by mild viral bugs, foods, medications, or stress.',
    symptomWeights: {
      rash: 0.98
    },
    coreSymptomIds: ['rash'],
    redFlags: [
      'ANAPHYLAXIS EMERGENCY: Swelling of the lips, tongue, or throat, hoarse voice, wheezing, difficulty breathing, or sudden dizziness/fainting (call 911 immediately)'
    ],
    causes: ['Mast cell histamine release triggered by viral infections, food/drug allergies, insect stings, physical pressure/cold, or idiopathic chronic autoimmunity.'],
    riskFactors: ['History of allergies or asthma, recent new medication (e.g., antibiotics, NSAIDs), recent viral illness'],
    howDiagnosed: ['Clinical inspection of transient migrating wheals (individual hives last <24 hours); allergy testing if a specific trigger is suspected.'],
    generalTreatments: [
      'Second-generation non-drowsy oral antihistamines (cetirizine, fexofenadine, loratadine)',
      'Cool compresses, loose cotton clothing, and lukewarm oatmeal baths',
      'Immediate emergency epinephrine auto-injector + 911 if any airway swelling or breathing symptoms appear'
    ],
    prevention: ['Identify and avoid confirmed food/medication triggers, keep a symptom log of exposures prior to flares'],
    citations: [
      { source: 'American Academy of Allergy, Asthma & Immunology (AAAAI)', description: 'Practice Parameter for Acute and Chronic Urticaria.' }
    ]
  },
  {
    id: 'varicella_shingles',
    name: 'Chickenpox (Varicella) & Shingles (Herpes Zoster)',
    icd10: 'B01.9 / B02.9',
    category: 'Infectious Diseases & Dermatology',
    urgency: 'ROUTINE',
    summary: 'Viral conditions caused by the Varicella-Zoster Virus (VZV). Chickenpox causes fever and generalized itchy fluid-filled blisters on a red base; Shingles occurs when dormant VZV reactivates along one nerve pathway, causing a painful burning blistering stripe on one side of the body.',
    symptomWeights: {
      rash: 0.96,
      fever: 0.70,
      fatigue: 0.65,
      headache: 0.50,
      body_aches: 0.55
    },
    coreSymptomIds: ['rash', 'fever'],
    redFlags: [
      'Shingles blisters on the tip of the nose, forehead, or around the eye (ophthalmic zoster — urgent eye evaluation needed)',
      'Severe headache, confusion, or stiff neck',
      'Difficulty breathing or immunocompromised state'
    ],
    causes: ['Primary infection (chickenpox) or sensory nerve ganglion reactivation (shingles) of Varicella-Zoster Virus.'],
    riskFactors: ['Unvaccinated status (chickenpox), age ≥ 50, stress, or weakened immunity (shingles)'],
    howDiagnosed: ['Distinctive clinical rash appearance ("dewdrop on a rose petal" blisters or unilateral dermatomal stripe); PCR swab if atypical.'],
    generalTreatments: [
      'Early prescription oral antivirals (valacyclovir or acyclovir — ideally started within 72 hours of shingles rash onset to reduce nerve pain)',
      'Calamine lotion, cool colloidal oatmeal baths, and acetaminophen (AVOID aspirin in children due to Reye syndrome)',
      'Keep blisters covered and isolate from pregnant women, newborns, and immunocompromised people until crusted'
    ],
    prevention: ['Varicella childhood vaccine (chickenpox) and recombinant Shingrix 2-dose vaccine for adults aged 50+'],
    citations: [
      { source: 'CDC Varicella & Shingles (Herpes Zoster) Clinical Guidelines', description: 'Antiviral timing, isolation precautions, and vaccination schedules.' }
    ]
  },
  {
    id: 'measles_rubeola',
    name: 'Measles (Rubeola)',
    icd10: 'B05.9',
    category: 'Infectious Diseases & Pediatrics',
    urgency: 'URGENT',
    summary: 'A highly contagious viral illness beginning with high fever, cough, runny nose, and red watery eyes (the "3 Cs"), followed by tiny white spots inside the mouth (Koplik spots) and a blotchy red rash spreading downward from the hairline.',
    symptomWeights: {
      fever: 0.98,
      rash: 0.96,
      cough: 0.90,
      photophobia: 0.60,
      fatigue: 0.80
    },
    coreSymptomIds: ['fever', 'rash', 'cough'],
    redFlags: [
      'Rapid breathing, chest retractions, or pneumonia symptoms',
      'Severe drowsiness, seizures, or neck stiffness (measles encephalitis risk)',
      'Severe dehydration in young children'
    ],
    causes: ['Measles morbillivirus transmitted easily via airborne respiratory droplets that linger in rooms up to 2 hours.'],
    riskFactors: ['Unvaccinated status, international travel to outbreak regions, Vitamin A deficiency'],
    howDiagnosed: ['Measles-specific IgM blood antibody test and throat/nasal swab RT-PCR (call clinic BEFORE arriving to prevent waiting room exposure).'],
    generalTreatments: [
      'Strict respiratory isolation and supportive hydration/fever care',
      'WHO-recommended Vitamin A supplementation in children to prevent eye damage and reduce complications',
      'Prompt medical treatment for secondary ear infections or bacterial pneumonia'
    ],
    prevention: ['MMR (Measles, Mumps, Rubella) 2-dose vaccination provides ~97% lifelong protection'],
    citations: [
      { source: 'WHO & CDC Measles Clinical Guidance', description: 'Case identification, airborne precautions, and Vitamin A protocols.' }
    ]
  },
  {
    id: 'tuberculosis',
    name: 'Tuberculosis (Pulmonary TB)',
    icd10: 'A15.0',
    category: 'Infectious Diseases & Pulmonology',
    urgency: 'URGENT',
    summary: 'A bacterial infection caused by Mycobacterium tuberculosis that primarily affects the lungs, characteristically causing a persistent cough lasting >3 weeks, drenching night sweats, evening low-grade fever, and unintentional weight loss.',
    symptomWeights: {
      cough: 0.95,
      fever: 0.75,
      fatigue: 0.85,
      shortness_of_breath: 0.45,
      chest_pain: 0.40
    },
    coreSymptomIds: ['cough', 'fever', 'fatigue'],
    redFlags: [
      'Coughing up blood or blood-streaked sputum (hemoptysis)',
      'Severe shortness of breath or chest pain',
      'Headache, neck stiffness, or confusion (TB meningitis)'
    ],
    causes: ['Inhalation of Mycobacterium tuberculosis airborne droplet nuclei expelled when an active pulmonary TB patient coughs or speaks.'],
    riskFactors: ['Close household contact with active TB, living/traveling in high-incidence regions, HIV or immunosuppression, diabetes, malnutrition'],
    howDiagnosed: [
      'Chest X-ray showing upper-lobe infiltrates or cavities',
      'Sputum Acid-Fast Bacilli (AFB) smear, rapid molecular Xpert MTB/RIF PCR test, and mycobacterial culture',
      'Tuberculin Skin Test (TST) or IGRA blood test (QuantiFERON) for latent TB screening'
    ],
    generalTreatments: [
      'Standardized multi-drug antibiotic regimen (RIPE: rifampin, isoniazid, pyrazinamide, ethambutol) taken strictly for 4–9 months under public health supervision',
      'Airborne isolation during initial contagious weeks until sputum clears'
    ],
    prevention: ['Prompt treatment of latent TB infection, good indoor ventilation, respiratory masks, BCG vaccine in endemic countries'],
    citations: [
      { source: 'WHO Consolidated Guidelines on Tuberculosis', description: 'Rapid molecular diagnostics and standardized drug-susceptible TB regimens.' }
    ]
  },
  {
    id: 'viral_hepatitis',
    name: 'Viral Hepatitis (Hepatitis A, B & C)',
    icd10: 'B19.9',
    category: 'Gastrointestinal & Hepatology',
    urgency: 'ROUTINE',
    summary: 'Viral inflammation of the liver causing fatigue, loss of appetite, nausea, right upper abdominal discomfort, dark tea-colored urine, pale stools, and yellowing of the eyes/skin (jaundice).',
    symptomWeights: {
      fatigue: 0.90,
      nausea_vomiting: 0.75,
      fever: 0.45,
      body_aches: 0.50
    },
    coreSymptomIds: ['fatigue', 'nausea_vomiting'],
    redFlags: [
      'New confusion, slurred speech, or excessive sleepiness (hepatic encephalopathy / acute liver failure emergency)',
      'Easy bruising, nosebleeds, or vomiting blood',
      'Rapid abdominal swelling (ascites)'
    ],
    causes: ['Hepatitis A (contaminated food/water — acute only); Hepatitis B and C (blood/body fluid exposure — can become chronic liver disease).'],
    riskFactors: ['Unprotected blood/needle exposure, unscreened transfusions, unsafe street food/water (Hep A), unvaccinated close contacts'],
    howDiagnosed: [
      'Liver Function Tests (elevated ALT/AST transaminases and bilirubin)',
      'Viral serology panel (Anti-HAV IgM, HBsAg, Anti-HCV antibody with HCV RNA PCR)'
    ],
    generalTreatments: [
      'Hepatitis A & acute Hep B: supportive rest, hydration, and strict avoidance of alcohol and liver-toxic medications (such as high-dose acetaminophen)',
      'Chronic Hepatitis B: antiviral suppressive pills (tenofovir or entecavir)',
      'Chronic Hepatitis C: short 8–12 week oral direct-acting antivirals (DAAs) that cure >95% of patients'
    ],
    prevention: ['Hepatitis A and Hepatitis B vaccines, universal Hepatitis C adult blood screening, safe food/water and sterile needles'],
    citations: [
      { source: 'AASLD / IDSA Hepatitis Guidance', description: 'Evidence-based testing, vaccination, and curative antiviral therapy.' }
    ]
  },
  {
    id: 'otitis_media',
    name: 'Ear Infection (Otitis Media / Swimmer’s Ear)',
    icd10: 'H66.9',
    category: 'Ear, Nose & Throat (ENT)',
    urgency: 'ROUTINE',
    summary: 'Inflammation or fluid buildup behind the eardrum (middle ear) or in the outer ear canal, causing throbbing earache, muffled hearing, ear fullness, and sometimes mild fever following a cold.',
    symptomWeights: {
      fever: 0.55,
      headache: 0.40,
      sore_throat: 0.30
    },
    coreSymptomIds: ['fever'],
    redFlags: [
      'Redness, tender swelling, or protrusion behind the ear (mastoiditis — urgent ENT care)',
      'Severe spinning dizziness, facial muscle weakness, or high fever with stiff neck',
      'Sudden pus or bloody fluid draining from the ear canal'
    ],
    causes: ['Eustachian tube swelling trapping middle ear fluid after a cold/allergies (bacterial/viral otitis media) or water trapped in the ear canal (otitis externa).'],
    riskFactors: ['Recent upper respiratory infection, seasonal allergies, young children (shorter Eustachian tubes), frequent swimming'],
    howDiagnosed: ['Otoscopic examination of the eardrum (checking redness, bulging, or fluid level) and gentle ear canal inspection.'],
    generalTreatments: [
      'Pain control with acetaminophen or ibuprofen and warm dry compresses against the outer ear',
      'Observation ("watchful waiting") for mild adult/older-child cases, or physician-prescribed oral/ear-drop antibiotics when bacterial signs are clear'
    ],
    prevention: ['Manage nasal allergies during colds, dry outer ears gently after swimming, avoid inserting cotton swabs inside the ear canal'],
    citations: [
      { source: 'American Academy of Pediatrics (AAP) / AAO-HNS', description: 'Diagnosis and Management of Acute Otitis Media.' }
    ]
  },
  {
    id: 'vertigo_bppv',
    name: 'Vertigo & Inner Ear Balance Disorder (BPPV)',
    icd10: 'H81.1',
    category: 'Neurological & ENT Balance',
    urgency: 'ROUTINE',
    summary: 'A false spinning or whirling sensation triggered especially when rolling over in bed, looking up, or tilting the head, most commonly caused by tiny displaced calcium crystals inside the inner ear balance canals (BPPV).',
    symptomWeights: {
      nausea_vomiting: 0.70,
      headache: 0.30
    },
    coreSymptomIds: ['nausea_vomiting'],
    redFlags: [
      'Vertigo accompanied by double vision, slurred speech, facial droop, limb weakness, or inability to walk unassisted (possible posterior stroke — call 911)',
      'Sudden hearing loss in one ear or severe new headache'
    ],
    causes: ['Benign Paroxysmal Positional Vertigo (loose otoconia crystals in semicircular canals), vestibular neuritis (post-viral nerve inflammation), or Meniere’s disease.'],
    riskFactors: ['Mild head bump, aging, inner ear viral inflammation, prolonged bed rest, Vitamin D deficiency'],
    howDiagnosed: ['Dix-Hallpike bedside positional test observing characteristic eye movement (nystagmus) and cranial nerve neurological exam.'],
    generalTreatments: [
      'Epley Canalith Repositioning Maneuver (guided by a physician, ENT, or vestibular physical therapist — often resolves BPPV in 1–2 sessions)',
      'Short-term motion-sickness relief (meclizine) only during severe acute spinning, as prolonged use slows brain compensation',
      'Sit slowly at the edge of the bed before standing to prevent falls'
    ],
    prevention: ['Stay hydrated, get up slowly from lying down, perform prescribed vestibular balance exercises'],
    citations: [
      { source: 'AAO-HNS Clinical Practice Guideline: BPPV', description: 'Diagnostic maneuvers and particle repositioning therapy.' }
    ]
  },
  {
    id: 'anxiety_panic_disorder',
    name: 'Generalized Anxiety & Panic Attacks',
    icd10: 'F41.1',
    category: 'Mental Health & Behavioral Medicine',
    urgency: 'ROUTINE',
    summary: 'Excessive persistent worry or sudden surges of intense fear (panic attacks) triggering real physical symptoms via the fight-or-flight nervous system: racing heart, chest tightness, shortness of breath, dizziness, and muscle tension.',
    symptomWeights: {
      fatigue: 0.75,
      shortness_of_breath: 0.55,
      chest_pain: 0.45,
      headache: 0.50,
      nausea_vomiting: 0.40
    },
    coreSymptomIds: ['fatigue', 'shortness_of_breath'],
    redFlags: [
      'First-ever severe chest pain or breathing trouble (always evaluate medically to rule out cardiac or lung causes before assuming panic)',
      'Thoughts of self-harm or severe hopelessness (contact a crisis helpline or emergency care immediately)'
    ],
    causes: ['Dysregulation of amygdala threat circuits, chronic life stressors, genetics, sleep deprivation, or stimulants like excess caffeine.'],
    riskFactors: ['Chronic work/family stress, family history, thyroid imbalance (rule out hyperthyroidism), poor sleep, excessive caffeine'],
    howDiagnosed: ['Clinical mental health screening (GAD-7 questionnaire) after baseline medical labs (TSH, CBC, ECG) rule out physical mimics.'],
    generalTreatments: [
      'Cognitive Behavioral Therapy (CBT) — the gold-standard evidence-based psychological therapy',
      'Slow diaphragmatic breathing (e.g., 4-second inhale, 6-second exhale) and regular aerobic exercise',
      'Physician-prescribed SSRIs/SNRIs when daily function is affected'
    ],
    prevention: ['Consistent sleep routine, reducing caffeine/alcohol, mindfulness practice, talking openly with a primary doctor or therapist'],
    citations: [
      { source: 'National Institute of Mental Health (NIMH)', description: 'Anxiety Disorders: Symptoms, Diagnosis, and Evidence-Based Therapies.' }
    ]
  },
  {
    id: 'insomnia_sleep_disorder',
    name: 'Chronic Insomnia & Sleep Disruption',
    icd10: 'G47.0',
    category: 'Mental Health & Sleep Medicine',
    urgency: 'ROUTINE',
    summary: 'Persistent difficulty falling asleep, staying asleep, or waking up too early despite adequate opportunity to sleep, resulting in daytime fatigue, poor concentration, and irritability.',
    symptomWeights: {
      fatigue: 0.95,
      headache: 0.45
    },
    coreSymptomIds: ['fatigue'],
    redFlags: [
      'Loud gasping, choking, or witnessed breathing pauses during sleep (Obstructive Sleep Apnea — raises blood pressure & heart risk)',
      'Irresistible daytime sleep episodes while driving'
    ],
    causes: ['Hyperarousal, irregular circadian schedules, evening blue-light screen exposure, stress, late caffeine, acid reflux, or restless legs.'],
    riskFactors: ['Shift work, anxiety/depression, chronic pain, high evening screen use, late meals or caffeine after 2 PM'],
    howDiagnosed: ['2-week sleep diary and clinical sleep history; overnight sleep study (polysomnography) if sleep apnea is suspected.'],
    generalTreatments: [
      'Cognitive Behavioral Therapy for Insomnia (CBT-I) — first-line long-term cure',
      'Strict sleep hygiene: consistent wake time daily, cool dark bedroom, no screens 45–60 min before bed, reserve bed only for sleep',
      'Short-term physician-supervised sleep aids only when behavioral therapy alone is not enough'
    ],
    prevention: ['Morning outdoor sunlight exposure within 30 minutes of waking, regular daytime exercise, caffeine cutoff 8+ hours before bed'],
    citations: [
      { source: 'American Academy of Sleep Medicine (AASM)', description: 'Clinical Practice Guideline for Chronic Insomnia in Adults.' }
    ]
  },
  {
    id: 'sciatica_lumbar_disc',
    name: 'Sciatica & Lumbar Disc Herniation',
    icd10: 'M54.3',
    category: 'Orthopedics & Neurology',
    urgency: 'ROUTINE',
    summary: 'Sharp, shooting, or burning nerve pain radiating from the lower back down through one buttock and the back of the leg, often accompanied by numbness or pins-and-needles tingling along the sciatic nerve.',
    symptomWeights: {
      body_aches: 0.95
    },
    coreSymptomIds: ['body_aches'],
    redFlags: [
      'CAUDA EQUINA EMERGENCY: New loss of bowel or bladder control, or numbness in the groin/saddle area',
      'Sudden progressive foot drop (inability to lift the front of the foot while walking) or severe leg weakness',
      'Back pain accompanied by fever or unexplained weight loss'
    ],
    causes: ['A bulging or herniated lower lumbar intervertebral disc (typically L4-L5 or L5-S1) or piriformis muscle tightness irritating the sciatic nerve root.'],
    riskFactors: ['Prolonged sitting, improper heavy lifting, sudden twisting, core muscle deconditioning, smoking'],
    howDiagnosed: ['Physical straight-leg raise neurological exam; Lumbar Spine MRI if pain persists >4–6 weeks or neurological deficits appear.'],
    generalTreatments: [
      'Gentle daily walking and avoiding prolonged strict bed rest (gentle movement speeds disc healing)',
      'Targeted physical therapy focusing on lumbar stabilization and McKenzie extension exercises',
      'Short-term anti-inflammatory pain relievers or nerve-calming medications under clinician advice'
    ],
    prevention: ['Lumbar chair support, lifting with legs instead of bending the waist, regular core-strengthening exercises'],
    citations: [
      { source: 'American College of Physicians (ACP)', description: 'Noninvasive Treatments for Acute, Subacute, and Chronic Low Back Pain.' }
    ]
  },
  {
    id: 'gallstones',
    name: 'Gallstones (Cholelithiasis / Biliary Colic)',
    icd10: 'K80.2',
    category: 'Gastrointestinal Medicine',
    urgency: 'URGENT',
    summary: 'Hardened cholesterol or pigment stones inside the gallbladder that can temporarily block bile ducts after fatty meals, causing sharp cramping pain in the right upper abdomen radiating to the right shoulder blade.',
    symptomWeights: {
      nausea_vomiting: 0.75,
      fever: 0.35,
      chest_pain: 0.35
    },
    coreSymptomIds: ['nausea_vomiting'],
    redFlags: [
      'Right upper abdominal pain lasting >4–6 hours accompanied by fever and chills (acute cholecystitis)',
      'Yellowing of the eyes or skin (jaundice), pale stools, or dark urine (bile duct obstruction)',
      'Severe pain radiating straight to the back with persistent vomiting (gallstone pancreatitis)'
    ],
    causes: ['Cholesterol supersaturation in bile, sluggish gallbladder emptying, or rapid weight loss.'],
    riskFactors: ['Female sex, age >40, overweight/obesity, pregnancy, rapid weight loss diets, family history'],
    howDiagnosed: ['Right upper quadrant abdominal ultrasound (rapid, non-invasive, >95% accurate for gallstones) and liver/pancreas blood enzymes.'],
    generalTreatments: [
      'Small low-fat meals while awaiting specialist evaluation to reduce gallbladder contractions',
      'Elective laparoscopic cholecystectomy (minimally invasive gallbladder removal) for recurring symptomatic attacks',
      'Urgent hospital antibiotics and surgery if acute gallbladder infection develops'
    ],
    prevention: ['Balanced fiber-rich diet with healthy unsaturated fats, gradual rather than crash weight loss, regular physical exercise'],
    citations: [
      { source: 'American Gastroenterological Association (AGA) / SAGES', description: 'Management of Symptomatic Cholelithiasis and Acute Cholecystitis.' }
    ]
  },
  {
    id: 'chronic_kidney_disease',
    name: 'Chronic Kidney Disease (CKD)',
    icd10: 'N18.9',
    category: 'Nephrology & Metabolic Medicine',
    urgency: 'ROUTINE',
    summary: 'Gradual, long-term decline in the kidneys’ filtering ability (eGFR), frequently silent until later stages when it may cause ankle swelling, foamy urine, fatigue, and rising blood pressure.',
    symptomWeights: {
      fatigue: 0.80
    },
    coreSymptomIds: ['fatigue'],
    redFlags: [
      'Sudden marked drop in urine output, severe shortness of breath (fluid overload), or chest pain',
      'Severe confusion, uncontrolled nausea, or dangerously high potassium on blood tests'
    ],
    causes: ['Long-standing poorly controlled diabetes and high blood pressure (responsible for ~2/3 of cases), chronic NSAID overuse, or autoimmune nephritis.'],
    riskFactors: ['Diabetes mellitus, hypertension, heart disease, family history of kidney failure, age ≥ 60, frequent NSAID painkiller use'],
    howDiagnosed: [
      'Blood creatinine and Estimated Glomerular Filtration Rate (eGFR)',
      'Urine Albumin-to-Creatinine Ratio (uACR) checking early protein leakage',
      'Renal ultrasound'
    ],
    generalTreatments: [
      'Tight blood pressure (<120-130/80 mmHg) and blood sugar control',
      'Kidney-protective medications (ACE inhibitors/ARBs and SGLT2 inhibitors) prescribed by a nephrologist or GP',
      'Avoiding unnecessary NSAIDs (ibuprofen, naproxen) and tailoring dietary sodium/potassium as advised'
    ],
    prevention: ['Annual eGFR and urine albumin screening if diabetic or hypertensive, stay hydrated, avoid chronic over-the-counter NSAIDs'],
    citations: [
      { source: 'KDIGO (Kidney Disease: Improving Global Outcomes)', description: 'Clinical Practice Guideline for the Evaluation and Management of CKD.' }
    ]
  },
  {
    id: 'fungal_skin_infection',
    name: 'Fungal Skin Infections (Ringworm / Athlete’s Foot)',
    icd10: 'B35.9',
    category: 'Dermatology',
    urgency: 'ROUTINE',
    summary: 'Superficial dermatophyte fungal infections of the skin, scalp, groin, or feet causing itchy, scaly, circular red rings with clearer centers (ringworm / tinea corporis) or peeling skin between the toes (athlete’s foot).',
    symptomWeights: {
      rash: 0.95
    },
    coreSymptomIds: ['rash'],
    redFlags: [
      'Spreading warmth, pus, red streaks, or fever (secondary bacterial cellulitis)',
      'Patchy hair loss with tender boggy scalp swelling in children (kerion requiring oral antifungal therapy)'
    ],
    causes: ['Trichophyton, Microsporum, or Epidermophyton fungi thriving in warm, moist skin folds and shared damp floors.'],
    riskFactors: ['Sweaty athletic gear, communal locker rooms/showers, tight non-breathable footwear, diabetes, close contact with pets'],
    howDiagnosed: ['Classic ring-shaped scaling border on clinical exam; skin scraping KOH microscopic prep if atypical.'],
    generalTreatments: [
      'Over-the-counter topical antifungal creams (terbinafine, clotrimazole, miconazole) applied for 2–4 weeks (continuing 1 week after rash clears)',
      'Avoid using plain steroid creams alone on fungal rashes (steroids worsen fungal spread)',
      'Oral antifungal prescriptions (terbinafine, fluconazole) for scalp or thick nail involvement'
    ],
    prevention: ['Keep skin dry, wear breathable cotton socks and shower sandals in public pools/gyms, do not share towels'],
    citations: [
      { source: 'American Academy of Dermatology (AAD)', description: 'Management of Superficial Cutaneous Fungal Infections.' }
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

export interface MedicalSpecialist {
  id: string;
  name: string;
  title: string;
  category: string;
  description: string;
  commonSymptoms: string[];
  sampleConditions: string[];
  whenToConsult: string;
  typicalTests: string[];
  questionsToAsk: string[];
  icon: string;
}

export const MEDICAL_SPECIALISTS: MedicalSpecialist[] = [
  {
    id: 'general_practitioner',
    name: 'Primary Care Physician (GP / Family Doctor)',
    title: 'General Practitioner & Internal Medicine',
    category: 'Primary Care',
    description: 'The first line of defense for non-emergency symptoms, routine health concerns, initial blood work, and holistic medical assessments.',
    commonSymptoms: ['Mild fever', 'General fatigue', 'Unexplained weight changes', 'Routine cough or cold', 'General body aches', 'Health checkup'],
    sampleConditions: ['Seasonal viral infection', 'Mild hypertension', 'Vitamin deficiencies', 'Routine bronchitis', 'General fatigue'],
    whenToConsult: 'Consult first for any new symptom lasting more than a few days, routine screening, or when unsure which specialist you need.',
    typicalTests: ['Complete blood count (CBC)', 'Metabolic panels', 'Urinalysis', 'Vital signs & physical exam'],
    questionsToAsk: [
      'What are the most likely common causes for what I am feeling?',
      'Do I need diagnostic blood work or imaging?',
      'Should I be referred to a specialist if symptoms do not improve?'
    ],
    icon: 'Stethoscope'
  },
  {
    id: 'ent_specialist',
    name: 'Otolaryngologist (ENT Specialist)',
    title: 'Ear, Nose & Throat Specialist',
    category: 'Surgical & Medical Head/Neck',
    description: 'Specializes in diseases and conditions affecting the ears, nose, sinuses, throat, vocal cords, and related structures.',
    commonSymptoms: ['Persistent sore throat', 'Sinus pressure or pain', 'Earache or clogged ears', 'Nasal congestion', 'Difficulty swallowing', 'Hoarse voice'],
    sampleConditions: ['Sinusitis', 'Strep throat', 'Tonsillitis', 'Allergic rhinitis', 'Ear infection (Otitis media)', 'Vocal strain'],
    whenToConsult: 'Consult if throat or sinus pain persists over 7 days, if you experience recurrent ear infections, or voice changes lasting weeks.',
    typicalTests: ['Nasal endoscopy', 'Throat swab culture', 'Audiometry (hearing test)', 'Sinus CT scan'],
    questionsToAsk: [
      'Is my throat or sinus inflammation bacterial, viral, or allergic?',
      'What safe decongestants or nasal sprays do you recommend?',
      'Could environmental allergens or acid reflux be aggravating my throat?'
    ],
    icon: 'Activity'
  },
  {
    id: 'pulmonologist',
    name: 'Pulmonologist',
    title: 'Chest & Respiratory Specialist',
    category: 'Pulmonary Medicine',
    description: 'Diagnoses and manages acute and chronic conditions of the lungs, bronchial tubes, and respiratory tract.',
    commonSymptoms: ['Chronic or hacking cough', 'Shortness of breath on exertion', 'Wheezing', 'Chest tightness without heart pain', 'Phlegm production'],
    sampleConditions: ['Asthma', 'Chronic Bronchitis', 'Pneumonia', 'COPD', 'Post-viral bronchial hyperreactivity'],
    whenToConsult: 'Consult for a cough lasting more than 3 weeks, unexplained wheezing, or difficulty catching your breath during regular activities.',
    typicalTests: ['Spirometry / Pulmonary function test', 'Chest X-ray or high-resolution CT', 'Pulse oximetry', 'Fractional exhaled nitric oxide (FeNO)'],
    questionsToAsk: [
      'Is my cough related to asthma, bronchial irritation, or allergies?',
      'Would an inhaler or nebulizer therapy be appropriate?',
      'Are there specific environmental triggers I should avoid at home?'
    ],
    icon: 'Wind'
  },
  {
    id: 'gastroenterologist',
    name: 'Gastroenterologist',
    title: 'Digestive & Liver Specialist',
    category: 'Gastrointestinal Medicine',
    description: 'Focuses on the digestive system, including the esophagus, stomach, intestines, liver, gallbladder, and pancreas.',
    commonSymptoms: ['Acid reflux / Heartburn', 'Stomach pain or cramping', 'Persistent nausea', 'Bloating and gas', 'Diarrhea or constipation', 'Indigestion'],
    sampleConditions: ['GERD (Acid Reflux)', 'Gastritis', 'Irritable Bowel Syndrome (IBS)', 'Food intolerances (lactose, gluten)', 'Peptic ulcer'],
    whenToConsult: 'Consult for persistent acid reflux, stomach pain after eating, recurrent diarrhea or constipation, or unexplained digestive discomfort.',
    typicalTests: ['Upper endoscopy (EGD)', 'Abdominal ultrasound', 'Stool antigen tests', 'H. pylori breath test'],
    questionsToAsk: [
      'Could my symptoms be managed with dietary adjustments or antacids?',
      'Is an endoscopy warranted to inspect my stomach lining?',
      'Could food sensitivities or microbiome imbalance be contributing?'
    ],
    icon: 'ShieldAlert'
  },
  {
    id: 'neurologist',
    name: 'Neurologist',
    title: 'Brain, Spine & Nerve Specialist',
    category: 'Neurosciences',
    description: 'Specializes in diagnosing and treating disorders of the central and peripheral nervous system, including the brain, spinal cord, and nerves.',
    commonSymptoms: ['Severe or recurring headaches', 'Migraine with light sensitivity', 'Dizziness or balance trouble', 'Numbness or tingling in limbs', 'Nerve pain'],
    sampleConditions: ['Migraine', 'Tension headache', 'Cluster headache', 'Peripheral neuropathy', 'Vertigo / Vestibular disorders'],
    whenToConsult: 'Consult when headaches are recurring, throbbing, interfere with daily work, or when you experience unexplained tingling or dizziness.',
    typicalTests: ['Brain MRI or CT scan', 'Neurological reflex & cranial nerve exam', 'Electromyography (EMG)', 'Vestibular function test'],
    questionsToAsk: [
      'What type of headache or migraine pattern do I have?',
      'What preventive or abortive treatments are safest for me?',
      'Are there lifestyle or ergonomic triggers I should manage?'
    ],
    icon: 'Brain'
  },
  {
    id: 'dermatologist',
    name: 'Dermatologist',
    title: 'Skin, Hair & Nail Specialist',
    category: 'Dermatology',
    description: 'Expert in the diagnosis and management of diseases affecting the skin, scalp, hair, nails, and cutaneous membranes.',
    commonSymptoms: ['Skin rash or redness', 'Itching or hives', 'Dry, scaly patches', 'Unusual moles or spots', 'Acne or facial breakouts', 'Hair thinning'],
    sampleConditions: ['Contact dermatitis', 'Eczema (Atopic dermatitis)', 'Psoriasis', 'Hives (Urticaria)', 'Fungal skin infection'],
    whenToConsult: 'Consult for rashes that do not improve within a week, spreading itchy patches, or new/changing skin lesions.',
    typicalTests: ['Skin scraping / KOH prep', 'Patch testing for contact allergies', 'Dermoscopy', 'Skin punch biopsy'],
    questionsToAsk: [
      'Is this rash an allergic reaction, infection, or chronic eczema?',
      'What barrier creams or non-steroidal ointments do you recommend?',
      'What gentle, fragrance-free skincare products should I switch to?'
    ],
    icon: 'Sparkles'
  },
  {
    id: 'cardiologist',
    name: 'Cardiologist',
    title: 'Heart & Cardiovascular Specialist',
    category: 'Cardiology',
    description: 'Specializes in the prevention, diagnosis, and medical management of diseases affecting the heart and blood vessels.',
    commonSymptoms: ['Chest tightness or discomfort', 'Heart palpitations / Racing pulse', 'Dizziness when standing up', 'Shortness of breath on exertion', 'Swelling in ankles'],
    sampleConditions: ['Hypertension', 'Arrhythmia (Palpitations)', 'Coronary artery disease', 'Mild postural tachycardia'],
    whenToConsult: 'Consult for non-emergency heart palpitations, high blood pressure management, or cardiovascular risk screening. (Note: For sudden, crushing chest pain, call 911 immediately).',
    typicalTests: ['Electrocardiogram (ECG / EKG)', 'Echocardiogram (Heart Ultrasound)', 'Holter monitor (24-48h tracking)', 'Cardiac stress test'],
    questionsToAsk: [
      'Are my palpitations benign, stress-related, or do they indicate an arrhythmia?',
      'What is my cardiovascular risk profile and target blood pressure?',
      'What heart-healthy lifestyle changes should I prioritize?'
    ],
    icon: 'Heart'
  },
  {
    id: 'orthopedist',
    name: 'Orthopedic Specialist',
    title: 'Bones, Joints & Musculoskeletal Specialist',
    category: 'Orthopedics & Sports Medicine',
    description: 'Diagnoses and treats injuries and degenerative conditions of bones, joints, ligaments, tendons, and muscles.',
    commonSymptoms: ['Joint pain (knee, shoulder, hip)', 'Back or neck pain from posture/strain', 'Swelling after activity', 'Limited range of motion', 'Stiffness in the morning'],
    sampleConditions: ['Osteoarthritis', 'Tendonitis / Bursitis', 'Lumbar strain (Back pain)', 'Rotator cuff irritation', 'Ligament sprain'],
    whenToConsult: 'Consult if joint or back pain persists over 2 weeks, worsens with movement, or limits normal walking or lifting.',
    typicalTests: ['X-ray imaging', 'Musculoskeletal MRI or Ultrasound', 'Joint aspiration', 'Range-of-motion physical testing'],
    questionsToAsk: [
      'Is my joint pain caused by inflammation, wear-and-tear, or muscle strain?',
      'Would physical therapy or targeted strengthening exercises help most?',
      'What ergonomic supports or braces should I use?'
    ],
    icon: 'Bone'
  },
  {
    id: 'endocrinologist',
    name: 'Endocrinologist',
    title: 'Hormone, Thyroid & Diabetes Specialist',
    category: 'Endocrinology & Metabolism',
    description: 'Specializes in glands and hormone-related conditions including diabetes, thyroid disorders, PCOS, osteoporosis, and metabolic imbalances.',
    commonSymptoms: ['Persistent unexplained fatigue', 'Unexplained weight gain or loss', 'Feeling constantly cold or overheated', 'Excessive thirst or frequent urination', 'Irregular hormonal cycles'],
    sampleConditions: ['Type 2 & Type 1 Diabetes', 'Hypothyroidism (Hashimoto’s)', 'Hyperthyroidism (Graves’)', 'PCOS', 'Osteoporosis'],
    whenToConsult: 'Consult for abnormal TSH/thyroid labs, elevated HbA1c or blood sugar management, or persistent hormonal symptoms.',
    typicalTests: ['HbA1c & fasting glucose', 'TSH, Free T4, Free T3 & thyroid antibodies', 'Thyroid ultrasound', 'Hormone panels (insulin, cortisol, prolactin)'],
    questionsToAsk: [
      'Are my symptoms linked to thyroid function, blood sugar, or another hormone?',
      'How often should I repeat my hormone or A1c blood panels?',
      'What nutrition and daily routine habits support my hormone balance?'
    ],
    icon: 'Activity'
  },
  {
    id: 'infectious_disease',
    name: 'Infectious Disease Specialist',
    title: 'Viral, Bacterial & Tropical Infection Specialist',
    category: 'Infectious Diseases',
    description: 'Diagnoses and treats complex, prolonged, vector-borne, or unusual viral, bacterial, parasitic, and fungal infections.',
    commonSymptoms: ['Prolonged unexplained fever', 'Fever after tropical travel', 'Body aches with rash', 'Chronic cough with night sweats', 'Slow-to-resolve infections'],
    sampleConditions: ['Dengue Fever', 'Malaria', 'Typhoid Fever', 'Tuberculosis', 'Viral Hepatitis', 'Complex Shingles / Mpox'],
    whenToConsult: 'Consult for fevers lasting over 5–7 days, illnesses acquired during travel, or infections not responding to initial primary care treatment.',
    typicalTests: ['Blood, urine & sputum cultures', 'Targeted PCR & antigen panels (e.g., Dengue NS1, Malaria smear)', 'Serology antibody titers', 'Inflammatory markers (CRP, ESR)'],
    questionsToAsk: [
      'Is this infection viral, bacterial, or parasitic, and what confirmatory test do I need?',
      'Are antibiotics or antivirals indicated, or is supportive hydration safest?',
      'What warning signs require immediate hospital monitoring?'
    ],
    icon: 'Microscope'
  },
  {
    id: 'ophthalmologist',
    name: 'Ophthalmologist',
    title: 'Eye & Vision Specialist',
    category: 'Ophthalmology (Eye Care)',
    description: 'Medical and surgical eye doctor trained to diagnose and treat eye infections, vision changes, corneal issues, glaucoma, and retinal conditions.',
    commonSymptoms: ['Red, irritated, or watery eyes', 'Eye pain or light sensitivity', 'Sudden blurry vision', 'New floaters or flashes of light', 'Sticky eye discharge'],
    sampleConditions: ['Conjunctivitis (Pink Eye)', 'Dry Eye Syndrome', 'Glaucoma', 'Cataracts', 'Corneal abrasion / ulcer', 'Diabetic retinopathy'],
    whenToConsult: 'Consult promptly for eye pain, sudden vision changes, contact lens discomfort with redness, or eye redness lasting more than a few days.',
    typicalTests: ['Slit-lamp biomicroscopy', 'Visual acuity & refraction exam', 'Tonometry (eye pressure check)', 'Dilated retinal fundus exam'],
    questionsToAsk: [
      'Is my eye redness infectious, allergic, or caused by dry eyes?',
      'Should I pause wearing contact lenses and for how long?',
      'Do my prescription eye drops contain steroids or antibiotics?'
    ],
    icon: 'Eye'
  },
  {
    id: 'urologist',
    name: 'Urologist',
    title: 'Urinary Tract & Kidney Stone Specialist',
    category: 'Urology',
    description: 'Diagnoses and manages conditions of the kidneys, ureters, bladder, urethra, and male reproductive system.',
    commonSymptoms: ['Burning or pain when urinating', 'Frequent or urgent urination', 'Sharp flank or lower back side pain', 'Blood in urine', 'Weak urine stream'],
    sampleConditions: ['Urinary Tract Infection (UTI)', 'Kidney Stones', 'Benign Prostatic Hyperplasia (BPH)', 'Overactive bladder', 'Prostatitis'],
    whenToConsult: 'Consult for recurrent UTIs, suspected kidney stones, visible blood in the urine, or persistent urinary difficulty.',
    typicalTests: ['Urinalysis & urine culture', 'Renal & bladder ultrasound', 'Low-dose non-contrast CT scan', 'PSA & post-void residual scan'],
    questionsToAsk: [
      'Are my urinary symptoms due to an infection, a stone, or bladder irritation?',
      'Will a small kidney stone pass naturally with hydration and medication?',
      'How can I prevent recurrent urinary infections or stones?'
    ],
    icon: 'Droplets'
  },
  {
    id: 'gynecologist',
    name: 'Gynecologist / OB-GYN',
    title: "Women's Reproductive & Pelvic Health Specialist",
    category: "Women's Health & OB-GYN",
    description: "Focuses on women's reproductive health, menstrual cycles, hormonal balance, pelvic pain, pregnancy care, and preventive cervical/breast screening.",
    commonSymptoms: ['Irregular or missed periods', 'Severe menstrual cramps or pelvic pain', 'Unusually heavy bleeding', 'Hormonal acne', 'Vaginal itching or discharge'],
    sampleConditions: ['Polycystic Ovary Syndrome (PCOS)', 'Endometriosis', 'Uterine fibroids', 'Yeast / bacterial vaginosis', 'Menopause transition'],
    whenToConsult: 'Consult for annual preventive screenings, irregular cycles, severe pelvic pain, or pregnancy planning and care.',
    typicalTests: ['Pelvic ultrasound', 'Pap smear & HPV screening', 'Hormone panel (LH, FSH, estrogen, testosterone)', 'STI & vaginal swab testing'],
    questionsToAsk: [
      'Could my irregular periods or pelvic pain be related to PCOS, fibroids, or thyroid health?',
      'Which preventive screenings (Pap, HPV, mammogram) am I due for?',
      'What hormonal or non-hormonal management options fit my goals?'
    ],
    icon: 'HeartHandshake'
  },
  {
    id: 'pediatrician',
    name: 'Pediatrician',
    title: 'Infant, Child & Adolescent Specialist',
    category: 'Pediatrics',
    description: 'Specializes in the physical, developmental, and preventive medical care of infants, children, and teenagers from birth through age 18.',
    commonSymptoms: ['Childhood fever', 'Ear pulling or crying', 'Childhood rashes (chickenpox, measles)', 'Barking cough or wheezing', 'Poor appetite or lethargy in a child'],
    sampleConditions: ['Childhood ear infections', 'Chickenpox / Viral exanthems', 'Croup & RSV', 'Strep throat', 'Asthma & growth milestones'],
    whenToConsult: 'Consult immediately for any fever in a baby under 3 months, persistent high fever, breathing difficulty, or poor hydration in a child.',
    typicalTests: ['Pediatric physical & growth chart exam', 'Rapid strep / RSV / flu swabs', 'Otoscopic ear exam', 'Routine childhood immunization checks'],
    questionsToAsk: [
      'What weight-based dose of fever reducer is safe for my child?',
      'What signs of dehydration should I monitor at home?',
      'When is it safe for my child to return to school or daycare?'
    ],
    icon: 'Baby'
  },
  {
    id: 'psychiatrist',
    name: 'Psychiatrist / Mental Health Specialist',
    title: 'Anxiety, Mood & Sleep Medicine Specialist',
    category: 'Psychiatry & Mental Health',
    description: 'Medical doctor specializing in emotional well-being, anxiety, panic attacks, depression, insomnia, and stress-related physical symptoms.',
    commonSymptoms: ['Persistent worry or panic episodes', 'Chronic trouble falling or staying asleep', 'Low mood or emotional burnout', 'Stress-triggered racing heart', 'Difficulty concentrating'],
    sampleConditions: ['Generalized Anxiety Disorder (GAD)', 'Panic Disorder', 'Chronic Insomnia', 'Major Depressive Disorder', 'Work & caregiver burnout'],
    whenToConsult: 'Consult when worry, low mood, panic, or poor sleep lasts more than 2 weeks and interferes with daily life or work.',
    typicalTests: ['Validated clinical questionnaires (GAD-7, PHQ-9)', 'Sleep diary review', 'Baseline lab exclusions (thyroid TSH, Vitamin B12, Vitamin D)'],
    questionsToAsk: [
      'Would structured therapy like CBT or CBT-I help before or alongside medication?',
      'Could physical factors like thyroid or sleep quality be worsening my symptoms?',
      'What daily habits make the biggest difference for nervous system recovery?'
    ],
    icon: 'Brain'
  },
  {
    id: 'rheumatologist',
    name: 'Rheumatologist',
    title: 'Autoimmune & Inflammatory Joint Specialist',
    category: 'Rheumatology & Autoimmune',
    description: 'Diagnoses and treats autoimmune disorders and inflammatory arthritis affecting joints, connective tissues, muscles, and blood vessels.',
    commonSymptoms: ['Symmetrical swollen hand or foot joints', 'Morning joint stiffness lasting >1 hour', 'Sudden hot swollen big toe', 'Widespread fatigue with joint aches', 'Butterfly facial rash'],
    sampleConditions: ['Rheumatoid Arthritis', 'Gout', 'Systemic Lupus Erythematosus (SLE)', 'Psoriatic Arthritis', 'Ankylosing Spondylitis'],
    whenToConsult: 'Consult for persistent joint swelling, morning stiffness lasting over an hour, or recurring gout flares.',
    typicalTests: ['Rheumatoid Factor (RF) & anti-CCP antibodies', 'ANA & autoimmune panels', 'ESR / CRP inflammation markers', 'Joint ultrasound or synovial fluid analysis'],
    questionsToAsk: [
      'Is my joint pain inflammatory/autoimmune rather than mechanical wear-and-tear?',
      'Do I need early DMARD therapy to protect my joints long-term?',
      'What low-impact exercises are safest during a flare vs remission?'
    ],
    icon: 'Flame'
  },
  {
    id: 'oncologist',
    name: 'Hematologist / Oncologist',
    title: 'Blood Disorders & Cancer Care Specialist',
    category: 'Oncology & Hematology',
    description: 'Specializes in blood conditions (like anemia and clotting disorders) as well as cancer screening evaluation, diagnostic staging, and targeted oncology care.',
    commonSymptoms: ['Severe unexplained fatigue with pallor', 'Unexplained weight loss (>10 lbs)', 'Persistent painless swollen lymph nodes or lump', 'Unusual bruising or bleeding', 'Abnormal blood count results'],
    sampleConditions: ['Iron-Deficiency & B12 Anemia', 'Suspicious masses requiring biopsy', 'Breast, colorectal, lung & skin cancer care', 'Lymphoma / Blood disorders'],
    whenToConsult: 'Consult upon referral from your GP for persistently abnormal CBC blood counts, unexplained persistent lumps, or specialized cancer screening and care.',
    typicalTests: ['Complete Blood Count & peripheral smear', 'Iron / ferritin / B12 studies', 'Diagnostic CT / MRI / PET imaging', 'Image-guided tissue biopsy'],
    questionsToAsk: [
      'Are my blood counts or imaging findings benign, or is a biopsy needed to be certain?',
      'What age-appropriate preventive screenings should I keep up with?',
      'What targeted, minimally invasive, or supportive options are available?'
    ],
    icon: 'ShieldCheck'
  },
  {
    id: 'nephrologist',
    name: 'Nephrologist',
    title: 'Kidney Health & Blood Pressure Specialist',
    category: 'Nephrology (Kidney Care)',
    description: 'Focuses on preserving kidney filtering function, managing chronic kidney disease, evaluating protein in urine, and treating complex high blood pressure.',
    commonSymptoms: ['Swelling in feet, ankles, or around eyes', 'Foamy or bubbly urine', 'Elevated blood creatinine / low eGFR', 'Hard-to-control high blood pressure', 'Fatigue with kidney lab changes'],
    sampleConditions: ['Chronic Kidney Disease (CKD)', 'Diabetic kidney protection', 'Proteinuria / Glomerulonephritis', 'Resistant hypertension', 'Recurrent kidney stone prevention'],
    whenToConsult: 'Consult if routine labs show reduced eGFR, persistent protein in the urine, or swelling paired with blood pressure changes.',
    typicalTests: ['Serum creatinine & eGFR calculation', 'Urine Albumin-to-Creatinine Ratio (uACR)', 'Electrolyte panel (potassium, bicarbonate)', 'Renal Doppler ultrasound'],
    questionsToAsk: [
      'What is my current eGFR stage and how can I protect my remaining kidney function?',
      'Which pain relievers (like NSAIDs) should I strictly avoid?',
      'Would kidney-protective medications or specific fluid/salt limits help?'
    ],
    icon: 'Activity'
  }
];

export function findSpecialistForKeywords(text: string): MedicalSpecialist {
  const lower = text.toLowerCase();

  if (/eye|vision|blurry|pink eye|conjunctiv|cataract|glaucoma|cornea|ophthalm/i.test(lower)) {
    return MEDICAL_SPECIALISTS.find(s => s.id === 'ophthalmologist')!;
  }
  if (/uti|urinar|bladder|kidney stone|flank pain|prostat|burning urine|hematuria|urolog/i.test(lower)) {
    return MEDICAL_SPECIALISTS.find(s => s.id === 'urologist')!;
  }
  if (/kidney disease|ckd|creatinine|egfr|proteinuria|dialysis|nephro/i.test(lower)) {
    return MEDICAL_SPECIALISTS.find(s => s.id === 'nephrologist')!;
  }
  if (/pcos|period|menstru|pelvic pain|ovary|uter|pregnan|endometri|gynecol|vaginal/i.test(lower)) {
    return MEDICAL_SPECIALISTS.find(s => s.id === 'gynecologist')!;
  }
  if (/child|infant|baby|toddler|pediatric|measles|chickenpox|croup/i.test(lower)) {
    return MEDICAL_SPECIALISTS.find(s => s.id === 'pediatrician')!;
  }
  if (/anxiety|panic|insomnia|sleep disorder|depress|stress|mental health|psychiatr/i.test(lower)) {
    return MEDICAL_SPECIALISTS.find(s => s.id === 'psychiatrist')!;
  }
  if (/gout|rheumatoid|lupus|autoimmune|morning stiffness|rheumatol/i.test(lower)) {
    return MEDICAL_SPECIALISTS.find(s => s.id === 'rheumatologist')!;
  }
  if (/anemia|iron deficien|hemoglobin|cancer|tumor|oncolog|hematol|biopsy|lump/i.test(lower)) {
    return MEDICAL_SPECIALISTS.find(s => s.id === 'oncologist')!;
  }
  if (/thyroid|hypothyroid|hyperthyroid|diabetes|insulin|hormone|endocrin|a1c/i.test(lower)) {
    return MEDICAL_SPECIALISTS.find(s => s.id === 'endocrinologist')!;
  }
  if (/dengue|malaria|typhoid|tuberculosis|mpox|smallpox|shingles|infectious|parasit/i.test(lower)) {
    return MEDICAL_SPECIALISTS.find(s => s.id === 'infectious_disease')!;
  }
  if (/ear|nose|throat|sinus|tonsil|voice|hoarse|swallow|snore|otitis|vertigo|bppv/i.test(lower)) {
    return MEDICAL_SPECIALISTS.find(s => s.id === 'ent_specialist')!;
  }
  if (/cough|phlegm|wheez|breath|lung|bronch|asthma|pneumonia|pulmon/i.test(lower)) {
    return MEDICAL_SPECIALISTS.find(s => s.id === 'pulmonologist')!;
  }
  if (/stomach|digest|acid|reflux|heartburn|nausea|vomit|diarrhea|constipat|gut|bowel|cramp|hemorrhoid|piles|ulcer|gallstone|hepatitis|appendic|ibs|gastro/i.test(lower)) {
    return MEDICAL_SPECIALISTS.find(s => s.id === 'gastroenterologist')!;
  }
  if (/headache|migraine|tingl|numb|dizz|nerve|seiz|sciatica|neuro/i.test(lower)) {
    return MEDICAL_SPECIALISTS.find(s => s.id === 'neurologist')!;
  }
  if (/skin|rash|itch|hive|urticaria|acne|mole|eczema|psoriasis|fungal|ringworm|scab|scalp|derma/i.test(lower)) {
    return MEDICAL_SPECIALISTS.find(s => s.id === 'dermatologist')!;
  }
  if (/heart|palpitat|chest tight|blood pressure|hypertension|pulse|cardio/i.test(lower)) {
    return MEDICAL_SPECIALISTS.find(s => s.id === 'cardiologist')!;
  }
  if (/joint|knee|bone|shoulder|back pain|spine|muscle strain|sprain|osteoarthritis|orthoped/i.test(lower)) {
    return MEDICAL_SPECIALISTS.find(s => s.id === 'orthopedist')!;
  }

  // Default to General Practitioner
  return MEDICAL_SPECIALISTS.find(s => s.id === 'general_practitioner')!;
}

