import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navigation, TabKey } from './components/Navigation';
import { ChatInterface } from './components/Chatbot/ChatInterface';
import { SpecialistDirectoryView } from './components/SpecialistDirectory/SpecialistDirectoryView';
import { DiseaseExplorerView } from './components/DiseaseExplorer/DiseaseExplorerView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabKey>('chat');
  const [chatInitialQuery, setChatInitialQuery] = useState<string | undefined>(undefined);

  const handleNavigateToSpecialist = (specialistId?: string) => {
    setCurrentTab('specialists');
  };

  const handleSelectForChat = (query: string) => {
    setChatInitialQuery(query);
    setCurrentTab('chat');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header />
      <Navigation currentTab={currentTab} onSelectTab={setCurrentTab} />

      <main className="flex-1">
        {currentTab === 'chat' && (
          <ChatInterface
            onNavigateToSpecialist={handleNavigateToSpecialist}
            initialQuery={chatInitialQuery}
          />
        )}
        {currentTab === 'specialists' && (
          <SpecialistDirectoryView onSelectForChat={handleSelectForChat} />
        )}
        {currentTab === 'knowledge' && (
          <DiseaseExplorerView onSelectForChat={handleSelectForChat} />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-4 px-6 text-center text-xs text-slate-500">
        <p>ClinicaNLP · Health Information & Specialist Referral Assistant · For educational guidance, not emergency use</p>
      </footer>
    </div>
  );
}
