import React from 'react';
import { MessageSquare, Stethoscope, BookOpen } from 'lucide-react';

export type TabKey = 'chat' | 'specialists' | 'knowledge';

export const NAV_ITEMS: { id: TabKey; label: string; shortLabel: string; icon: typeof MessageSquare }[] = [
  { id: 'chat', label: 'Symptom Chat', shortLabel: 'Chat', icon: MessageSquare },
  { id: 'specialists', label: 'Doctor Directory', shortLabel: 'Doctors', icon: Stethoscope },
  { id: 'knowledge', label: 'Disease Library', shortLabel: 'Diseases', icon: BookOpen }
];

interface NavigationProps {
  currentTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentTab, onSelectTab }) => {
  return (
    <nav
      aria-label="Mobile sections"
      className="md:hidden bg-white border-t border-slate-100 px-3"
    >
      <div className="flex items-center justify-around gap-1">
        {NAV_ITEMS.map(tab => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                isActive
                  ? 'border-teal-600 text-teal-700 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.shortLabel}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
