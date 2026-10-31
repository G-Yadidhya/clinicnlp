import React, { useState } from 'react';
import { Database, Search, ShieldCheck, ArrowRight, BookOpen, UserCheck, AlertTriangle } from 'lucide-react';
import { CLINICAL_DISEASE_DB, ClinicalDisease, findSpecialistForKeywords } from '../../data/medicalKnowledge';

interface DiseaseExplorerViewProps {
  onSelectForChat?: (query: string) => void;
}

export const DiseaseExplorerView: React.FC<DiseaseExplorerViewProps> = ({ onSelectForChat }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string>(CLINICAL_DISEASE_DB[0].id);

  const filteredDiseases = CLINICAL_DISEASE_DB.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.icd10.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeDisease = CLINICAL_DISEASE_DB.find(d => d.id === selectedDiseaseId) || CLINICAL_DISEASE_DB[0];

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
    <div className="max-w-6xl mx-auto p-4 lg:p-6 space-y-5">
      {/* Title & search */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-medium mb-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Medical Knowledge & Doubts Library</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Explore Conditions & Understand Doubts</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Learn about common conditions, typical symptoms, home precautions, and specialist recommendations.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <label htmlFor="disease-search" className="sr-only">Search conditions</label>
            <input
              id="disease-search"
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by condition or ICD-10…"
              className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
            />
          </div>
        </div>
      </div>

      {/* List + detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Disease list */}
        <nav aria-label="Disease list" className="lg:col-span-4 space-y-2">
          {filteredDiseases.length === 0 && (
            <div className="p-5 rounded-xl bg-white border border-slate-200 text-xs text-slate-400 italic text-center">
              No conditions match "{searchQuery}".
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
