import React from 'react';
import {
  PlusCircle,
  MessageSquare,
  Stethoscope,
  BookOpen,
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import { TabKey } from './Navigation';

interface SidebarProps {
  currentTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  onNewConsultation: () => void;
  onSelectStarterQuery: (query: string) => void;
  isOpen: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onNewConsultation,
  onSelectStarterQuery,
  isOpen,
  onClose
}) => {

  const medicalDoubts = [
    {
      title: 'How does Fever help fight infections?',
      query: 'Can you explain the biological purpose of a fever and how the body uses heat against viruses?'
    },
    {
      title: 'Understanding Cancer symptoms & anxiety',
      query: 'Why do ordinary symptoms rarely mean cancer, and how do oncologists properly screen for it?'
    },
    {
      title: 'Antibiotic resistance explained',
      query: 'Why don\'t antibiotics work against viral infections like colds or the flu?'
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-[61px] z-50 lg:z-30 h-screen lg:h-[calc(100vh-61px)] bg-white border-r border-slate-200 flex flex-col shrink-0 transition-all duration-300 ease-in-out ${
          isOpen
            ? 'w-72 sm:w-80 translate-x-0 opacity-100 visible'
            : '-translate-x-full lg:translate-x-0 lg:w-0 lg:opacity-0 lg:invisible lg:border-r-0 overflow-hidden'
        }`}
        aria-label="CliniQ Sidebar Navigation"
      >
        {/* Brand / New Chat Header */}
        <div className="p-4 border-b border-slate-200 space-y-3 shrink-0 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold text-xs">
                CQ
              </div>
              <span className="font-bold text-sm text-slate-800">CliniQ Clinical Hub</span>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden p-1 text-slate-400 hover:text-slate-600 rounded-md"
                aria-label="Close menu"
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={() => {
              onNewConsultation();
              if (onClose && window.innerWidth < 1024) onClose();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold text-xs shadow-xs transition active:scale-[0.99]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ New Consultation</span>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-3 space-y-6 text-xs">
          {/* Main Navigation Links */}
          <div className="space-y-1">
            <div className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Workspace
            </div>

            <button
              onClick={() => {
                onSelectTab('chat');
                if (onClose && window.innerWidth < 1024) onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition ${
                currentTab === 'chat'
                  ? 'bg-teal-50 text-teal-800 font-semibold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className={`w-4 h-4 ${currentTab === 'chat' ? 'text-teal-600' : 'text-slate-400'}`} />
                <span>Health & Symptom Chat</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => {
                onSelectTab('specialists');
                if (onClose && window.innerWidth < 1024) onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition ${
                currentTab === 'specialists'
                  ? 'bg-teal-50 text-teal-800 font-semibold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Stethoscope className={`w-4 h-4 ${currentTab === 'specialists' ? 'text-teal-600' : 'text-slate-400'}`} />
                <span>Doctor Directory (8 Specialties)</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => {
                onSelectTab('knowledge');
                if (onClose && window.innerWidth < 1024) onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition ${
                currentTab === 'knowledge'
                  ? 'bg-teal-50 text-teal-800 font-semibold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className={`w-4 h-4 ${currentTab === 'knowledge' ? 'text-teal-600' : 'text-slate-400'}`} />
                <span>Disease & Library (26 Conditions)</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Clarify Medical Doubts */}
          <div className="space-y-1.5">
            <div className="px-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
              <span>Medical Knowledge Doubts</span>
            </div>

            <div className="space-y-1">
              {medicalDoubts.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onSelectStarterQuery(item.query);
                    if (onClose && window.innerWidth < 1024) onClose();
                  }}
                  className="w-full text-left p-2 rounded-lg hover:bg-slate-100 group transition text-xs text-slate-600 hover:text-teal-700"
                >
                  <p className="font-medium line-clamp-2">
                    {item.title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
