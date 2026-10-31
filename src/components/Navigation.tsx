import React from 'react';
import { MessageSquare, Stethoscope, BookOpen } from 'lucide-react';

export type TabKey = 'chat' | 'specialists' | 'knowledge';

interface NavigationProps {
  currentTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentTab, onSelectTab }) => {
  const tabs: { id: TabKey; label: string; icon: typeof MessageSquare }[] = [
    { id: 'chat', label: 'Health & Symptom Chat', icon: MessageSquare },
    { id: 'specialists', label: 'Doctor & Specialist Directory', icon: Stethoscope },
    { id: 'knowledge', label: 'Disease & Condition Library', icon: BookOpen }
  ];

  return (
    <nav
      aria-label="Main sections"
      className="bg-white border-b border-slate-200 px-4 lg:px-8"
    >
      <div className="max-w-6xl mx-auto flex gap-1 overflow-x-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors shrink-0 ${
                isActive
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
