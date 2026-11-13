import React, { useState } from 'react';
import { Database, Search, ShieldCheck, ArrowRight, BookOpen, UserCheck, AlertTriangle } from 'lucide-react';
import { CLINICAL_DISEASE_DB, ClinicalDisease, findSpecialistForKeywords } from '../../data/medicalKnowledge';

interface DiseaseExplorerViewProps {
  onSelectForChat?: (query: string) => void;
}

const DISEASE_CATEGORY_TABS = [
  { id: 'All', label: 'All Conditions', match: () => true },
  {
    id: 'respiratory',
    label: 'Respiratory & ENT',
    match: (cat: string) => /respiratory|pulmonary|ear, nose & throat|ent/i.test(cat)
  },
  {
    id: 'infectious',
    label: 'Infectious & Viral',
    match: (cat: string) =>
      /infectious|vector-borne|parasitic|bacterial|virology|nervous system infection|gastrointestinal infection|respiratory.*infection/i.test(cat)
  },
  {
    id: 'digestive',
    label: 'Digestive & Liver',
    match: (cat: string) => /gastrointestinal|hepatology|surgical abdomen/i.test(cat)
  },
  {
    id: 'neurological',
    label: 'Neurology, Mental & Sleep',
    match: (cat: string) => /neurolog|nervous system|mental health|sleep/i.test(cat)
  },
  {
    id: 'metabolic',
    label: 'Heart, Kidney & Metabolic',
    match: (cat: string) => /cardio|endocrinology|nephrology|metabolic/i.test(cat)
  },
  {
    id: 'skin_joints_eye',
    label: 'Skin, Joints & Eye',
    match: (cat: string) => /dermatology|orthopedics|rheumatology|ophthalmology/i.test(cat)
  },
  {
    id: 'urology_women_blood',
    label: "Urology, Women's & Blood",
    match: (cat: string) => /urology|women's health|hematology|oncology|pediatrics/i.test(cat)
  }
] as const;

export const DiseaseExplorerView: React.FC<DiseaseExplorerViewProps> = ({ onSelectForChat }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string>(CLINICAL_DISEASE_DB[0].id);

  const cleanQuery = searchQuery.toLowerCase().trim().replace(/[-_]/g, ' ');
  const activeCategoryDef =
    DISEASE_CATEGORY_TABS.find(t => t.id === selectedCategory) || DISEASE_CATEGORY_TABS[0];

  const filteredDiseases = CLINICAL_DISEASE_DB.filter(d => {
    const matchesCategory = activeCategoryDef.match(d.category);
    if (!matchesCategory) return false;
    if (!cleanQuery) return true;
    const nameMatch = d.name.toLowerCase().replace(/[-_]/g, ' ').includes(cleanQuery);
    const categoryMatch = d.category.toLowerCase().includes(cleanQuery);
    const icdMatch = d.icd10.toLowerCase().includes(cleanQuery);
    const summaryMatch = d.summary.toLowerCase().includes(cleanQuery);
    const causesMatch = d.causes.some(c => c.toLowerCase().includes(cleanQuery));
    const symptomsMatch = d.coreSymptomIds.some(s => s.toLowerCase().includes(cleanQuery));
    return nameMatch || categoryMatch || icdMatch || summaryMatch || causesMatch || symptomsMatch;
  });

  const activeDisease =
    filteredDiseases.find(d => d.id === selectedDiseaseId) ||
    filteredDiseases[0] ||
    CLINICAL_DISEASE_DB[0];

  const urgencyBadge = (urgency: string): string =>
    urgency === 'EMERGENCY'
      ? 'bg-red-100 text-red-700 border border-red-200'
      : urgency === 'URGENT'
      ? 'bg-amber-100 text-amber-800 border border-amber-200'
      : 'bg-emerald-100 text-emerald-700 border border-emerald-200';

  const sectionCard = 'p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2';

  const Heading: React.FC<{ icon?: React.ReactNode; className?: string; children: React.ReactNode }> = ({
    icon,
    className = '',
    children
  }) => (
    <h4 className={`font-semibold uppercase tracking-wide text-[11px] text-slate-500 flex items-center gap-1.5 ${className}`}>
      {icon}
      {children}
    </h4>
  );

  const matchedSpecialist = findSpecialistForKeywords(activeDisease.name + ' ' + activeDisease.category);

  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 space-y-5">
      {/* Title & search */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-medium mb-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Medical Knowledge & Doubts Library</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Explore Conditions & Understand Doubts ({CLINICAL_DISEASE_DB.length} Conditions)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Learn about common conditions, typical symptoms, home precautions, and specialist recommendations.
            </p>
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Quick searches:</span>
              {['Hemorrhoids', 'Constipation', 'UTI', 'Kidney Stones', 'Pink Eye', 'Anemia', 'PCOS', 'Gout', 'Anxiety', 'Dengue'].map(tag => (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery(tag);
                  }}
                  className="px-2 py-0.5 rounded-full text-[11px] bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 border border-slate-200 transition"
                >
                  {tag}
                </button>
              ))}
              {(searchQuery || selectedCategory !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="px-2 py-0.5 rounded-full text-[11px] bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition font-medium"
                >
                  Clear filters ✕
                </button>
              )}
            </div>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <label htmlFor="disease-search" className="sr-only">Search conditions</label>
            <input
              id="disease-search"
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={`Search ${CLINICAL_DISEASE_DB.length} conditions, e.g. Hemorrhoids, Constipation, Smallpox…`}
              className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
            />
          </div>
        </div>

        {/* Category filter tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-4 mt-4 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-medium shrink-0 mr-1">Category:</span>
          {DISEASE_CATEGORY_TABS.map(tab => {
            const count = CLINICAL_DISEASE_DB.filter(d => tab.match(d.category)).length;
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`shrink-0 px-3 py-1.5 rounded-full font-medium transition inline-flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-teal-700 text-teal-50' : 'bg-white text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* List + detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Disease list */}
        <nav
          aria-label="Disease list"
          className="lg:col-span-4 space-y-2 max-h-[720px] overflow-y-auto pr-1"
        >
          {filteredDiseases.length === 0 && (
            <div className="p-5 rounded-xl bg-white border border-slate-200 text-xs text-slate-400 italic text-center">
              No conditions match "{searchQuery}"{selectedCategory !== 'All' ? ` in ${activeCategoryDef.label}` : ''}.
            </div>
          )}
          {filteredDiseases.map(disease => (
            <button
              key={disease.id}
              onClick={() => setSelectedDiseaseId(disease.id)}
              aria-current={selectedDiseaseId === disease.id ? 'true' : undefined}
              className={`w-full text-left p-3.5 rounded-xl border transition ${
                selectedDiseaseId === disease.id
                  ? 'bg-teal-50/70 border-teal-300 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className={`font-semibold text-xs ${selectedDiseaseId === disease.id ? 'text-teal-900' : 'text-slate-900'}`}>
                  {disease.name}
                </span>
                <span className="font-mono text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-500">
                  {disease.icd10}
                </span>
              </div>
              <div className="flex items-center justify-between mt-1.5 text-[11px]">
                <span className="text-slate-500">{disease.category}</span>
                <span className={`px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide text-[9px] ${urgencyBadge(disease.urgency)}`}>
                  {disease.urgency === 'SELF_CARE' ? 'SELF CARE' : disease.urgency}
                </span>
              </div>
            </button>
          ))}
        </nav>

        {/* Disease detail */}
        <ClinicalDiseaseDetail
          disease={activeDisease}
          SectionCard={sectionCard}
          Heading={Heading}
          urgencyBadge={urgencyBadge}
          onSelectForChat={onSelectForChat}
          specialist={matchedSpecialist}
        />
      </div>
    </div>
  );
};

interface DetailProps {
  disease: ClinicalDisease;
  SectionCard: string;
  Heading: React.FC<{ icon?: React.ReactNode; className?: string; children: React.ReactNode }>;
  urgencyBadge: (urgency: string) => string;
  onSelectForChat?: (query: string) => void;
  specialist: ReturnType<typeof findSpecialistForKeywords>;
}

const ClinicalDiseaseDetail: React.FC<DetailProps> = ({
  disease,
  SectionCard,
  Heading,
  urgencyBadge,
  onSelectForChat,
  specialist
}) => {
  return (
    <article className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
      <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-bold text-slate-900">{disease.name}</h3>
            <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-600 font-mono text-xs">
              ICD-10: {disease.icd10}
            </span>
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Category: <strong className="text-slate-700">{disease.category}</strong>
          </div>
        </div>

        {onSelectForChat && (
          <button
            onClick={() => onSelectForChat(`Tell me about ${disease.name}, practical home precautions, and when to see a specialist.`)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium transition shadow-xs shrink-0"
          >
            <span>Ask in Health Chat</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Recommended Specialist Box */}
      <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-teal-800">
              Recommended Medical Specialist
            </div>
            <div className="font-bold text-teal-950 text-xs">
              {specialist.name}
            </div>
          </div>
        </div>
        <span className="text-[11px] text-teal-700 hidden sm:inline">
          {specialist.title}
        </span>
      </div>

      <section className="space-y-1.5">
        <Heading>Overview & Summary</Heading>
        <p className="text-slate-700 leading-relaxed text-sm bg-slate-50 p-4 rounded-xl border border-slate-200">
          {disease.summary}
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className={SectionCard}>
          <Heading icon={<ShieldCheck className="w-4 h-4 text-teal-600" />}>
            Common Hallmark Symptoms
          </Heading>
          <div className="space-y-1.5">
            {Object.entries(disease.symptomWeights).map(([sym, weight]) => (
              <div key={sym} className="flex items-center justify-between text-xs text-slate-700 py-0.5">
                <span className="capitalize">{sym.replace(/_/g, ' ')}</span>
                <span className="text-slate-400 font-medium text-[11px]">
                  {weight >= 0.75 ? 'Very Common' : weight >= 0.4 ? 'Occasional' : 'Less Common'}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className={SectionCard}>
          <Heading icon={<AlertTriangle className="w-4 h-4 text-amber-600" />}>
            When to Seek In-Person Medical Attention
          </Heading>
          <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
            {disease.redFlags.map((rf, idx) => (
              <li key={idx} className="leading-relaxed">
                {rf}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className={SectionCard}>
          <Heading>General Supportive Care & Next Steps</Heading>
          <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
            {disease.generalTreatments.map((gt, idx) => (
              <li key={idx} className="leading-relaxed">
                {gt}
              </li>
            ))}
          </ul>
        </section>

        <section className={SectionCard}>
          <Heading>How Doctors Diagnose It</Heading>
          <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
            {disease.howDiagnosed.map((hd, idx) => (
              <li key={idx} className="leading-relaxed">
                {hd}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
};
