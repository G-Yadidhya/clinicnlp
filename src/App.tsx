import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navigation, TabKey } from './components/Navigation';
import { ChatInterface } from './components/Chatbot/ChatInterface';
import { PipelineView } from './components/PipelineInspector/PipelineView';
import { DiseaseExplorerView } from './components/DiseaseExplorer/DiseaseExplorerView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabKey>('chat');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header />
      <Navigation currentTab={currentTab} onSelectTab={setCurrentTab} />

      <main className="flex-1">
        {currentTab === 'chat' && <ChatInterface />}
        {currentTab === 'pipeline' && <PipelineView />}
        {currentTab === 'knowledge' && <DiseaseExplorerView />}
      </main>

      <footer className="border-t border-slate-200 bg-white py-4 px-6 text-center text-xs text-slate-500">
        <p>ClinicaNLP · Academic capstone prototype · Not for real-world medical diagnosis or emergency use</p>
      </footer>
    </div>
  );
}
