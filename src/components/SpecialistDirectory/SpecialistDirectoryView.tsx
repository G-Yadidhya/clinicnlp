import React, { useState } from 'react';
import {
  Stethoscope,
  Search,
  Activity,
  Wind,
  ShieldAlert,
  Brain,
  Sparkles,
  Heart,
  Bone,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ClipboardList
} from 'lucide-react';
import { MEDICAL_SPECIALISTS, MedicalSpecialist } from '../../data/medicalKnowledge';

interface SpecialistDirectoryViewProps {
  onSelectForChat?: (query: string) => void;
}

export const SpecialistDirectoryView: React.FC<SpecialistDirectoryViewProps> = ({ onSelectForChat }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSpecialistId, setActiveSpecialistId] = useState<string>(MEDICAL_SPECIALISTS[0].id);

  const categories = ['All', 'Primary Care', 'Surgical & Medical Head/Neck', 'Pulmonary Medicine', 'Gastrointestinal Medicine', 'Neurosciences', 'Dermatology', 'Cardiology', 'Orthopedics & Sports Medicine'];

  const filteredSpecialists = MEDICAL_SPECIALISTS.filter(spec => {
    const matchesSearch =
      spec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spec.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spec.commonSymptoms.some(sym => sym.toLowerCase().includes(searchQuery.toLowerCase())) ||
      spec.sampleConditions.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || spec.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const activeSpecialist =
    MEDICAL_SPECIALISTS.find(s => s.id === activeSpecialistId) ||
    filteredSpecialists[0] ||
    MEDICAL_SPECIALISTS[0];

  const getSpecialistIcon = (id: string) => {
    switch (id) {
      case 'ent_specialist':
        return <Activity className="w-5 h-5 text-teal-600" />;
      case 'pulmonologist':
        return <Wind className="w-5 h-5 text-sky-600" />;
      case 'gastroenterologist':
        return <ShieldAlert className="w-5 h-5 text-amber-600" />;
      case 'neurologist':
        return <Brain className="w-5 h-5 text-indigo-600" />;
      case 'dermatologist':
        return <Sparkles className="w-5 h-5 text-rose-500" />;
      case 'cardiologist':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'orthopedist':
        return <Bone className="w-5 h-5 text-orange-600" />;
      default:
        return <Stethoscope className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-6 space-y-5">
      {/* Search & Header banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-medium mb-1.5">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Medical Specialist Referral Guide</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Which Doctor Should You See?</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Search by symptom or condition to find the right medical specialist, diagnostic tests to expect, and questions to ask.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search symptom (e.g. sore throat, headache, rash)..."
              className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
            />
          </div>
        </div>

        {/* Quick category filter tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-4 mt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-medium shrink-0 mr-1">Filter:</span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-3 py-1 rounded-lg font-medium transition text-xs ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'All' ? 'All Specialists' : cat.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: List on Left, Comprehensive Details on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left column: Specialist list */}
        <div className="lg:col-span-5 space-y-2.5">
          {filteredSpecialists.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center text-xs text-slate-400">
              No specialists match "{searchQuery}". Try searching for generic terms like cough, fever, stomach, or joint.
            </div>
          ) : (
            filteredSpecialists.map(specialist => {
              const isActive = specialist.id === activeSpecialist.id;
              return (
                <button
                  key={specialist.id}
                  onClick={() => setActiveSpecialistId(specialist.id)}
                  className={`w-full text-left p-4 rounded-xl border transition ${
                    isActive
                      ? 'bg-teal-50/70 border-teal-300 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-xs">
                      {getSpecialistIcon(specialist.id)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className={`font-semibold text-xs leading-snug truncate ${isActive ? 'text-teal-900' : 'text-slate-900'}`}>
                          {specialist.name}
                        </h3>
                        <span className="text-[10px] text-slate-400 font-medium shrink-0">
                          {specialist.category.split(' ')[0]}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {specialist.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {specialist.commonSymptoms.slice(0, 3).map((sym, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium"
                          >
                            {sym}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Right column: In-depth specialist profile & questions */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                {getSpecialistIcon(activeSpecialist.id)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{activeSpecialist.name}</h3>
                <p className="text-xs text-slate-500">{activeSpecialist.title} · {activeSpecialist.category}</p>
              </div>
            </div>

            {onSelectForChat && (
              <button
                onClick={() => onSelectForChat(`Tell me what symptoms a ${activeSpecialist.name} treats and when I should visit them.`)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium transition shadow-xs shrink-0"
              >
                <span>Ask in Chat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Role & Expertise
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {activeSpecialist.description}
            </p>
          </div>

          {/* When to consult */}
          <div className="p-3.5 rounded-xl bg-teal-50/50 border border-teal-200/70 text-xs">
            <div className="font-semibold text-teal-900 flex items-center gap-1.5 mb-1">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              When Should You Consult This Doctor?
            </div>
            <p className="text-teal-800 leading-relaxed">
              {activeSpecialist.whenToConsult}
            </p>
          </div>

          {/* Common Symptoms Handled */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-teal-600" />
              Common Symptoms Handled
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeSpecialist.commonSymptoms.map((sym, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                  <span>{sym}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Typical Tests & Evaluations */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <ClipboardList className="w-3.5 h-3.5 text-indigo-600" />
              Diagnostic Tests They Typically Run
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeSpecialist.typicalTests.map((test, idx) => (
                <li
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                  <span>{test}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Questions to ask */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              Recommended Questions to Ask During Your Visit
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {activeSpecialist.questionsToAsk.map((q, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
