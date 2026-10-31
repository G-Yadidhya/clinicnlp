import React, { useState } from 'react';
import { Database, Search, AlertTriangle, ShieldCheck, BookOpen } from 'lucide-react';
import { CLINICAL_DISEASE_DB, ClinicalDisease } from '../../data/medicalKnowledge';

export const DiseaseExplorerView: React.FC = () => {
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

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-6 space-y-5">
      {/* Title & search */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Database className="w-5 h-5 text-teal-600" />
              Clinical Knowledge Base
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Prototype reference profiles. Ask the chat for current, source-linked disease information.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <label htmlFor="disease-search" className="sr-only">Search the knowledge base</label>
            <input
              id="disease-search"
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by condition or ICD-10…"
              className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
            />
          </div>
        </div>
      </div>

      {/* List + detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Disease list */}
        <nav aria-label="Disease list" className="lg:col-span-4 space-y-2">
          {filteredDiseases.length === 0 && (
            <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-400 italic text-center">
              No conditions match this search.
            </div>
          )}
          {filteredDiseases.map(disease => (
            <button
              key={disease.id}
              onClick={() => setSelectedDiseaseId(disease.id)}
              aria-current={selectedDiseaseId === disease.id ? 'true' : undefined}
              className={`w-full text-left p-3.5 rounded-xl border transition ${
                selectedDiseaseId === disease.id
                  ? 'bg-teal-50 border-teal-300'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className={`font-semibold text-xs ${selectedDiseaseId === disease.id ? 'text-teal-800' : 'text-slate-900'}`}>
                  {disease.name}
                </span>
                <span className="font-mono text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-500">
                  {disease.icd10}
                </span>
              </div>
              <div className="flex items-center justify-between mt-1.5 text-[11px]">
                <span className="text-slate-500">{disease.category}</span>
                <span className={`px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide text-[9px] ${urgencyBadge(disease.urgency)}`}>
                  {disease.urgency}
                </span>
              </div>
            </button>
          ))}
        </nav>

        {/* Disease detail */}
        <ClinicalDiseaseDetail disease={activeDisease} SectionCard={sectionCard} Heading={Heading} urgencyBadge={urgencyBadge} />
      </div>
    </div>
  );
};

interface DetailProps {
  disease: ClinicalDisease;
  SectionCard: string;
  Heading: React.FC<{ icon?: React.ReactNode; className?: string; children: React.ReactNode }>;
  urgencyBadge: (urgency: string) => string;
}

const ClinicalDiseaseDetail: React.FC<DetailProps> = ({ disease, SectionCard, Heading, urgencyBadge }) => {
  return (
    <article className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
      <div className="border-b border-slate-100 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-xl font-semibold text-slate-900">{disease.name}</h3>
          <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-600 font-mono text-xs">
            ICD-10: {disease.icd10}
          </span>
          <span className={`px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide text-[9px] ${urgencyBadge(disease.urgency)}`}>
            {disease.urgency}
          </span>
        </div>
        <div className="text-xs text-slate-500 mt-1.5">
          Category: <strong className="text-slate-700">{disease.category}</strong>
        </div>
      </div>

      <section className="space-y-1.5">
        <Heading>Clinical summary</Heading>
        <p className="text-slate-700 leading-relaxed text-sm bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          {disease.summary}
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className={SectionCard}>
          <Heading icon={<ShieldCheck className="w-4 h-4 text-teal-600" />}>
            Characteristic symptoms
          </Heading>
          <div className="space-y-1.5">
            {Object.entries(disease.symptomWeights).map(([sym, weight]) => (
              <div key={sym} className="flex items-center justify-between text-xs text-slate-700">
                <span className="capitalize">{sym.replace(/_/g, ' ')}</span>
                <span className="font-medium text-slate-500">
                  {weight >= 0.75 ? 'Prototype association: stronger' : weight >= 0.4 ? 'Prototype association: moderate' : 'Prototype association: lower'}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="p-4 rounded-xl bg-red-50 border border-red-200 space-y-2">
          <Heading icon={<AlertTriangle className="w-4 h-4 text-red-600" />} className="text-red-700!">
            Warning signs &amp; complications
          </Heading>
          <ul className="space-y-1 text-xs text-red-800 list-disc list-inside">
            {disease.redFlags.map((flag, fIdx) => (
              <li key={fIdx} className="leading-relaxed">{flag}</li>
            ))}
          </ul>
        </section>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className={SectionCard}>
          <Heading>Diagnostic approach</Heading>
          <ul className="space-y-1 text-xs text-slate-700 list-disc list-inside">
            {disease.howDiagnosed.map((diag, dIdx) => (
              <li key={dIdx} className="leading-relaxed">{diag}</li>
            ))}
          </ul>
        </section>

        <section className={SectionCard}>
          <Heading>General care notes (verify with a clinician)</Heading>
          <ul className="space-y-1 text-xs text-slate-700 list-disc list-inside">
            {disease.generalTreatments.map((tx, tIdx) => (
              <li key={tIdx} className="leading-relaxed">{tx}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="pt-4 border-t border-slate-100 space-y-2">
        <Heading icon={<BookOpen className="w-3.5 h-3.5 text-teal-600" />}>
          Guideline citations
        </Heading>
        <div className="space-y-1.5">
          {disease.citations.map((cite, cIdx) => (
            <div key={cIdx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="font-semibold text-teal-800 text-xs">{cite.source}</div>
              <div className="text-slate-500 text-[11px] mt-0.5">{cite.description}</div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};
