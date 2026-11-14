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
              className={`relative flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-t-lg transition-all duration-200 whitespace-nowrap shrink-0 active:scale-[0.98] ${
                isActive
                  ? 'text-teal-700 font-semibold bg-teal-50/50'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 transition-colors duration-200 ${isActive ? 'text-teal-600' : ''}`} />
              <span>{tab.shortLabel}</span>
              <span
                aria-hidden="true"
                className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-teal-600 transition-transform duration-200 ease-out origin-center ${
                  isActive ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
};
