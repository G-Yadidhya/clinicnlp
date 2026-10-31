import React from 'react';
import { Stethoscope, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 px-4 lg:px-8 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-xs">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-base text-slate-900 leading-tight">ClinicaNLP</h1>
            <p className="text-[11px] text-slate-500 leading-tight">Health Assistant & Specialist Referral Guide</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-medium text-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Empathetic & Non-Alarmist</span>
            <span className="sm:hidden">Safe & Calm</span>
          </div>
        </div>
      </div>
    </header>
  );
};
