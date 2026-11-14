import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navigation, TabKey } from './components/Navigation';
import { Sidebar } from './components/Sidebar';
import { ChatInterface } from './components/Chatbot/ChatInterface';
import { SpecialistDirectoryView } from './components/SpecialistDirectory/SpecialistDirectoryView';
import { DiseaseExplorerView } from './components/DiseaseExplorer/DiseaseExplorerView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabKey>('chat');
  const [chatInitialQuery, setChatInitialQuery] = useState<string | undefined>(undefined);
  const [selectedSpecialistId, setSelectedSpecialistId] = useState<string | undefined>(undefined);
  const [resetTrigger, setResetTrigger] = useState<number>(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNavigateToSpecialist = (specialistId?: string) => {
    setSelectedSpecialistId(specialistId);
    setCurrentTab('specialists');
  };

  const handleSelectForChat = (query: string) => {
    setChatInitialQuery(query);
    setCurrentTab('chat');
  };

  const handleNewConsultation = () => {
    setCurrentTab('chat');
    setChatInitialQuery(undefined);
    setResetTrigger(prev => prev + 1);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Pinned Top Navigation Bar */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
        <Header
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          onNewConsultation={handleNewConsultation}
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
        <Navigation currentTab={currentTab} onSelectTab={setCurrentTab} />
      </div>

      <div className="flex-1 flex w-full">
        {/* Full-Screen Left Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          onNewConsultation={handleNewConsultation}
          onSelectStarterQuery={handleSelectForChat}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1">
            <div className={currentTab === 'chat' ? 'block' : 'hidden'}>
              <ChatInterface
                onNavigateToSpecialist={handleNavigateToSpecialist}
                initialQuery={chatInitialQuery}
                onInitialQueryConsumed={() => setChatInitialQuery(undefined)}
                resetTrigger={resetTrigger}
              />
            </div>
            {currentTab === 'specialists' && (
              <SpecialistDirectoryView
                onSelectForChat={handleSelectForChat}
                initialSpecialistId={selectedSpecialistId}
              />
            )}
            {currentTab === 'knowledge' && (
              <DiseaseExplorerView onSelectForChat={handleSelectForChat} />
            )}
          </main>

          <footer className="border-t border-slate-200 bg-white py-4 px-6 text-center text-xs text-slate-500">
            <p>CliniQ · Health Information & Specialist Referral Assistant · For educational guidance, not emergency use</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
