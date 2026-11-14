import React, { useEffect, useRef, useState } from 'react';
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
  const navRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number; ready: boolean }>({
    left: 0,
    width: 0,
    ready: false
  });

  useEffect(() => {
    const updateIndicator = () => {
      const navEl = navRef.current;
      const activeEl = tabRefs.current[currentTab];
      if (!navEl || !activeEl) return;
      const navRect = navEl.getBoundingClientRect();
      const tabRect = activeEl.getBoundingClientRect();
      setIndicator({
        left: tabRect.left - navRect.left,
        width: tabRect.width,
        ready: true
      });
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [currentTab]);

  return (
    <header className="bg-white/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
      {/* Zone 1: Brand + Sidebar Trigger */}
      <div className="flex items-center gap-3 shrink-0">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-2 -ml-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all duration-150"
            aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            title={isSidebarOpen ? 'Hide sidebar' : 'Open sidebar'}
          >
            {isSidebarOpen ? (
              <X className="w-4.5 h-4.5 lg:hidden" />
            ) : null}
            <PanelLeft
              className={`w-4.5 h-4.5 transition-colors duration-150 ${isSidebarOpen ? 'hidden lg:block text-teal-700' : ''}`}
            />
          </button>
        )}

        <button
          onClick={() => onSelectTab('chat')}
          className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 transition-opacity duration-150 hover:opacity-90"
        >
          <BrandLogo size="md" className="transition-transform duration-200 group-hover:scale-[1.03]" />
          <span className="font-display font-bold text-lg text-slate-900 tracking-tight">
            CliniQ
          </span>
        </button>
      </div>

      {/* Zone 2: Clean Single-Row Primary Navigation with Sliding Active Indicator */}
      <nav
        ref={navRef}
        aria-label="Primary navigation"
        className="relative hidden md:flex items-center gap-2 h-full"
      >
        {NAV_ITEMS.map(tab => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={el => {
                tabRefs.current[tab.id] = el;
              }}
              onClick={() => onSelectTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`group relative px-3.5 py-2 rounded-lg inline-flex items-center gap-2 text-sm transition-all duration-200 whitespace-nowrap shrink-0 active:scale-[0.98] ${
                isActive
                  ? 'text-teal-800 font-semibold bg-teal-50/70'
                  : 'text-slate-600 font-medium hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-transform duration-200 group-hover:-translate-y-px ${
                  isActive ? 'text-teal-600' : 'text-slate-400 group-hover:text-slate-700'
                }`}
              />
              <span>{tab.label}</span>
            </button>
          );
        })}

        {/* Sliding active bottom indicator */}
        <span
          aria-hidden="true"
          style={{
            transform: `translateX(${indicator.left}px)`,
            width: `${indicator.width}px`,
            opacity: indicator.ready ? 1 : 0
          }}
          className="pointer-events-none absolute bottom-0 left-0 h-0.5 bg-teal-600 rounded-full transition-[transform,width,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
        />
      </nav>

      {/* Zone 3: Single Primary Action */}
      <div className="flex items-center shrink-0">
        <button
          onClick={onNewConsultation}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 active:scale-[0.98] text-white text-xs font-medium transition-all duration-150 shadow-2xs hover:shadow-sm whitespace-nowrap shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Chat</span>
        </button>
      </div>
    </header>
  );
};
