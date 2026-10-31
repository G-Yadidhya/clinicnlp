import React from 'react';
import { Activity, ShieldAlert } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 px-4 lg:px-8 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center text-white">
            <Activity className="w-4.5 h-4.5" />
          </div>
          <div>
            <h1 className="font-semibold text-base text-slate-900 leading-tight">ClinicaNLP</h1>
            <p className="text-[11px] text-slate-500 leading-tight">Symptom Assessment Workbench</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[11px] font-medium text-amber-800">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Prototype — not for medical use</span>
        </div>
      </div>
    </header>
  );
};
