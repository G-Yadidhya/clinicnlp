import React from 'react';
import { PanelLeft, Plus, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { NAV_ITEMS, TabKey } from './Navigation';

interface HeaderProps {
  currentTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  onNewConsultation: () => void;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onNewConsultation,
  onToggleSidebar,
  isSidebarOpen
}) => {
  return (
    <header className="bg-white/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
      {/* Zone 1: Brand + Sidebar Trigger */}
      <div className="flex items-center gap-3 shrink-0">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-2 -ml-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            title={isSidebarOpen ? 'Hide sidebar' : 'Open sidebar'}
          >
            {isSidebarOpen ? (
              <X className="w-4.5 h-4.5 lg:hidden" />
            ) : null}
            <PanelLeft
              className={`w-4.5 h-4.5 ${isSidebarOpen ? 'hidden lg:block text-teal-700' : ''}`}
            />
          </button>
        )}

        <button
          onClick={() => onSelectTab('chat')}
          className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0"
        >
          <BrandLogo size="md" />
          <span className="font-display font-bold text-lg text-slate-900 tracking-tight">
            CliniQ
          </span>
        </button>
      </div>

      {/* Zone 2: Clean Single-Row Primary Navigation */}
      <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7 h-full">
        {NAV_ITEMS.map(tab => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`relative h-full inline-flex items-center text-sm transition-colors whitespace-nowrap shrink-0 ${
                isActive
                  ? 'text-teal-700 font-semibold'
                  : 'text-slate-500 font-medium hover:text-slate-900'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-opacity duration-200 ${
                  isActive ? 'bg-teal-600 opacity-100' : 'bg-slate-300 opacity-0'
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Zone 3: Single Primary Action */}
      <div className="flex items-center shrink-0">
        <button
          onClick={onNewConsultation}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium transition-colors shadow-2xs whitespace-nowrap shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Chat</span>
        </button>
      </div>
    </header>
  );
};
