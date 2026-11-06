import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Stethoscope,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  UserCheck,
  ExternalLink,
  BookOpen,
  HelpCircle,
  AlertTriangle,
  Pencil,
  Check,
  X
} from 'lucide-react';
import { findSpecialistForKeywords, MedicalSpecialist, MEDICAL_SPECIALISTS } from '../../data/medicalKnowledge';

interface GroundedSource {
  title: string;
  url: string;
}

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  recommendedSpecialist?: MedicalSpecialist;
  sources?: GroundedSource[];
  isEdited?: boolean;
}

interface ChatInterfaceProps {
  onNavigateToSpecialist?: (specialistId?: string) => void;
  initialQuery?: string;
  resetTrigger?: number;
}

let messageCounter = 0;
function generateMessageId(prefix: string): string {
  messageCounter += 1;
  return `${prefix}_${Date.now().toString(36)}_${messageCounter.toString(36)}`;
}

function currentTimestamp(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Determines if an inquiry describes relatable symptoms or identifiable clinical conditions
// that warrant a specialist recommendation, versus a general conceptual doubt
function shouldRecommendSpecialist(userText: string, botResponseText?: string): boolean {
  const lower = userText.toLowerCase().trim();
  const botLower = (botResponseText || '').toLowerCase();

  // Pure conceptual, biological, or casual inquiries without personal symptoms
  const isPureGeneralDoubt = /^(what is (dna|a virus|an antibody|a cell|metabolism|homeostasis|immunity|blood pressure)|how does (the immune system|the heart pump|digestion work|breathing work)|why do (we|people) (sneeze|yawn|dream|blink|get goosebumps|shiver)|can you explain|tell me about how|is it normal to|thanks|thank you|hi|hello|hey|good morning|who are you)\b/i.test(lower);
  if (isPureGeneralDoubt) {
    return false;
  }

  // Personal symptom expressions
  const hasPersonalSymptoms = /\b(i have|i've had|i am having|i'm having|i feel|i am feeling|my (head|throat|chest|stomach|knee|back|arm|leg|skin|eye|ear|nose|belly|joints?)|suffering from|experiencing|hurts|aching|swollen|pain in|started \d+|for \d+ (days?|hours?|weeks?)|since yesterday|fever of|coughing up|shortness of breath|wheezing)\b/i.test(lower);

  // Relatable specific diseases/conditions requiring medical care
  const mentionsClinicalCondition = /\b(migraine|headache|bronchitis|pneumonia|asthma|gerd|acid reflux|sinusitis|tonsillitis|strep throat|gastroenteritis|hypertension|diabetes|arthritis|eczema|psoriasis|cancer|tumor|arrhythmia|palpitation|neuropathy|vertigo|otitis|infection)\b/i.test(lower);

  // Bot response explicitly indicates doctor/specialist consultation is advised
  const botAdvisesSpecialist = /\b(consult a|see a|referral to|visit a|schedule an appointment with|recommended (specialist|doctor))\b/i.test(botLower);

  return hasPersonalSymptoms || (mentionsClinicalCondition && botAdvisesSpecialist);
}

// Dynamically resolves the appropriate medical specialist for the active query turn
// Returns undefined if the query is a general conceptual doubt with no symptoms
function resolveSpecialistForTurn(userText: string, botResponseText?: string): MedicalSpecialist | undefined {
  if (!shouldRecommendSpecialist(userText, botResponseText)) {
    return undefined;
  }

  const userLower = userText.toLowerCase();
  const botLower = (botResponseText || '').toLowerCase();

  // Scan specifically what the model advised in its recommended specialist section
  const specialistSectionMatch = botLower.match(/(?:recommended\s+medical\s+specialist|when\s+to\s+see\s+a\s+doctor|recommended\s+doctor|specialist\s+to\s+consult)[^#]{0,400}/i);
  const specialistSectionText = specialistSectionMatch ? specialistSectionMatch[0] : '';

  // 1. Gastroenterologist (digestive system, stomach, acid reflux, GERD, heartburn, nausea, vomiting, cramps)
  if (
    /stomach|acid|reflux|gerd|heartburn|nausea|vomit|diarrhea|constipat|gut|bowel|abdominal|cramp|digest|gastric|indigestion/i.test(userLower) ||
    /gastroenterologist|digestive health specialist/i.test(specialistSectionText)
  ) {
    if (!/chest pressure|heart attack|palpitation/i.test(userLower)) {
      return MEDICAL_SPECIALISTS.find(s => s.id === 'gastroenterologist');
    }
  }

  // 2. Orthopedist (bones, joints, knees, shoulder, back pain, spine, hip, arthritis, sprain, strain)
  if (
    /joint|knee|shoulder|back pain|spine|bone|arthritis|hip pain|wrist|ankle|sprain|muscle strain|ligament/i.test(userLower) ||
    /orthopedic|orthopedist|sports medicine/i.test(specialistSectionText)
  ) {
    return MEDICAL_SPECIALISTS.find(s => s.id === 'orthopedist');
  }

  // 3. Dermatologist (skin, rash, eczema, hives, acne, mole, itching, dermatitis, psoriasis)
  if (
    /skin|rash|eczema|hive|itch|acne|mole|psoriasis|dermatitis|blister|dermatolog/i.test(userLower) ||
    /dermatologist|skin specialist/i.test(specialistSectionText)
  ) {
    return MEDICAL_SPECIALISTS.find(s => s.id === 'dermatologist');
  }

  // 4. Neurologist (headache, migraine, throbbing head, dizziness, vertigo, numbness, tingling, nerve, seizure)
  if (
    /headache|migraine|head ache|throbbing head|dizz|vertigo|numb|tingl|seiz|neurolog/i.test(userLower) ||
    /neurologist|headache specialist/i.test(specialistSectionText)
  ) {
    return MEDICAL_SPECIALISTS.find(s => s.id === 'neurologist');
  }

  // 5. Pulmonologist (lungs, asthma, bronchitis, breathing difficulty, wheezing, shortness of breath, chronic cough)
  if (
    /lung|asthma|bronch|breath|wheez|coughing up|shortness of breath|pulmonolog/i.test(userLower) ||
    /pulmonologist|respiratory specialist/i.test(specialistSectionText)
  ) {
    return MEDICAL_SPECIALISTS.find(s => s.id === 'pulmonologist');
  }

  // 6. ENT Specialist (ear, nose, throat, sinusitis, sinus, tonsils, earache, hoarse, voice, swallow)
  if (
    /throat|sinus|ear|earache|tonsil|voice|hoarse|swallow|snore|otitis|rhinitis/i.test(userLower) ||
    /otolaryngologist|ent specialist|ear, nose/i.test(specialistSectionText)
  ) {
    return MEDICAL_SPECIALISTS.find(s => s.id === 'ent_specialist');
  }

  // 7. Cardiologist (heart, palpitations, fluttering, arrhythmia, blood pressure, hypertension)
  if (
    /heart|palpitat|flutter|arrhythmia|blood pressure|hypertension|cardio/i.test(userLower) ||
    /cardiologist|cardiovascular/i.test(specialistSectionText)
  ) {
    return MEDICAL_SPECIALISTS.find(s => s.id === 'cardiologist');
  }

  // 8. General Practitioner (fever, chills, cold, flu, viral infection, dengue, general malaise)
  if (/fever|chills|dengue|infection|viral|flu|cold|body ache|fatigue/i.test(userLower) || /general practitioner|gp|primary care/i.test(specialistSectionText)) {
    return MEDICAL_SPECIALISTS.find(s => s.id === 'general_practitioner');
  }

  return MEDICAL_SPECIALISTS.find(s => s.id === 'general_practitioner');
}

interface ParsedBlock {
  type: 'heading' | 'list' | 'callout' | 'paragraph';
  headingText?: string;
  listItems?: string[];
  calloutText?: string;
  text?: string;
}

function parseResponseToBlocks(rawText: string): ParsedBlock[] {
  let text = rawText;

  // 1. Separate inline bullets (e.g. "body aches. * **Critical Phase:**" or "Typical Progression * **Febrile Phase:**")
  text = text.replace(/([^\n])\s+([*•\-–]|\d+\.)\s+(\*\*|[A-Z])/g, '$1\n$2 $3');
  text = text.replace(/([.:!?])\s+([*•\-–])\s+/g, '$1\n$2 ');

  // 2. Separate questions into their own heading block
  text = text.replace(/([^\n#]+?\?)\s*([*•\-–]|\b[A-Z])/g, '\n### $1\n$2');

  // 3. Separate common section titles that often get squashed into text
  const sectionKeywords = [
    'Typical Progression',
    'When to see a doctor',
    'How is it diagnosed and treated',
    'How is it diagnosed',
    'How is it treated',
    'Common Hallmark Symptoms',
    'Diagnostic Process',
    'Treatment & Management',
    'Next Steps & Home Care',
    'Recommended Medical Specialist',
    'Long-Term Protection and Memory',
    'How Do Antibodies Protect the Body'
  ];

  for (const header of sectionKeywords) {
    const regex = new RegExp(`(^|\\n|\\.\\s+)(#*\\s*${header}[^\\n\\?\\.:]*[:\\?]?)\\s*([*•\\-–\\w])`, 'gi');
    text = text.replace(regex, (m, p1, p2, p3) => {
      const cleanH = p2.replace(/^#+\s*/, '').trim();
      return `${p1}\n### ${cleanH}\n${p3}`;
    });
  }

  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const blocks: ParsedBlock[] = [];
  let currentList: string[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      blocks.push({ type: 'list', listItems: [...currentList] });
      currentList = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Horizontal separators (--- or ***)
    if (/^[-*_]{3,}$/.test(line)) {
      flushList();
      continue;
    }

    // Heading (e.g. ### Title or #### Subtitle)
    if (/^#{1,4}\s+/.test(line)) {
      flushList();
      blocks.push({
        type: 'heading',
        headingText: line.replace(/^#{1,4}\s+/, '').trim()
      });
      continue;
    }

    // Isolated section titles ending in : or standalone
    if (
      /^(typical progression|how is it diagnosed|how is it treated|when to see a doctor|diagnosis|treatment|prevention|causes|symptoms)\b/i.test(line) &&
      line.length < 50 &&
      !line.startsWith('*') &&
      !line.startsWith('-')
    ) {
      flushList();
      blocks.push({
        type: 'heading',
        headingText: line.replace(/[:?]$/, '').trim()
      });
      continue;
    }

    // List item (e.g. * **Item:** or - Item or 1. Item)
    const listMatch = line.match(/^([*•\-–]|\d+\.)\s+(.+)$/);
    if (listMatch) {
      currentList.push(listMatch[2]);
      continue;
    }

    // Important Callout or Warning
    if (/\b(crucially, you must avoid|warning:|caution:|important note:|danger:)\b/i.test(line)) {
      flushList();
      blocks.push({
        type: 'callout',
        calloutText: line
      });
      continue;
    }

    // Standard paragraph line
    flushList();
    blocks.push({
      type: 'paragraph',
      text: line
    });
  }

  flushList();
  return blocks;
}

function renderFormattedMessage(text: string): React.ReactNode {
  const blocks = parseResponseToBlocks(text);

  return (
    <div className="space-y-3">
      {blocks.map((block, bIdx) => {
        if (block.type === 'heading') {
          return (
            <div key={bIdx} className="pt-2 pb-1 border-b border-teal-100/90 mb-1">
              <h4 className="text-sm font-bold text-teal-900 flex items-center gap-2">
                <span className="w-1.5 h-3.5 bg-teal-600 rounded-full inline-block" />
                <span>{block.headingText}</span>
              </h4>
            </div>
          );
        }

        if (block.type === 'list' && block.listItems) {
          return (
            <ul key={bIdx} className="space-y-2 my-2 pl-0.5">
              {block.listItems.map((item, lIdx) => (
                <li
                  key={lIdx}
                  className="flex items-start gap-2.5 text-sm text-slate-800 leading-relaxed bg-slate-50/70 p-2.5 rounded-xl border border-slate-200/60 shadow-2xs"
                >
                  <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0 mt-1.5" />
                  <span className="flex-1">{parseInlineBold(item)}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === 'callout') {
          return (
            <div
              key={bIdx}
              className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed flex items-start gap-2.5 shadow-2xs my-2 font-medium"
            >
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">{parseInlineBold(block.calloutText || '')}</div>
            </div>
          );
        }

        return (
          <p key={bIdx} className="leading-relaxed text-sm text-slate-800 my-1">
            {parseInlineBold(block.text || '')}
          </p>
        );
      })}
    </div>
  );
}

function parseInlineBold(text: string): React.ReactNode {
  // Support bold (**text**), italics (*text*), and inline code (`code`)
  const parts = text.split(/(\*\*.*?\*\*|\*[^*]+?\*|`[^`]+?`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return (
        <strong key={idx} className="font-semibold text-teal-950">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
      return (
        <em key={idx} className="italic text-slate-700">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code key={idx} className="bg-slate-100 text-teal-800 text-xs px-1.5 py-0.5 rounded font-mono border border-slate-200">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  onNavigateToSpecialist,
  initialQuery,
  resetTrigger
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg_welcome',
      sender: 'bot',
      text: "Hello! I am CliniQ, your health companion. I am here to help you identify likely conditions from your symptoms, clear any medical doubts, explain diseases in plain language, and recommend the right medical specialist when relatable symptoms or conditions are identified.\n\nFeel free to ask a general medical question or describe any symptoms you are experiencing.",
      timestamp: currentTimestamp()
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [activeSpecialist, setActiveSpecialist] = useState<MedicalSpecialist | null>(null);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);

  const samplePrompts = [
    {
      label: 'Sore throat & cough',
      query: 'I have had a scratchy sore throat and mild dry cough for 2 days.'
    },
    {
      label: 'Explain Migraine & triggers',
      query: 'What is a migraine headache, what triggers it, and what specialist treats it?'
    },
    {
      label: 'What causes a Fever?',
      query: 'What causes a sudden fever and chills, and when should I see a doctor?'
    },
    {
      label: 'Understanding Cancer doubts',
      query: 'Tell me about cancer, how doctors diagnose it, and why random symptoms rarely mean cancer.'
    },
    {
      label: 'General Doubt: How immunity works',
      query: 'How does the human immune system fight viral infections?'
    }
  ];

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending]);

  useEffect(() => {
    if (initialQuery) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (resetTrigger) {
      handleReset();
    }
  }, [resetTrigger]);

  const handleSendMessage = async (textToSend?: string) => {
    const raw = (textToSend || inputText).trim();
    if (!raw || isSending) return;

    const timeStr = currentTimestamp();
    setInputText('');

    const userMsg: Message = {
      id: generateMessageId('user'),
      sender: 'user',
      text: raw,
      timestamp: timeStr
    };

    setMessages(prev => [...prev, userMsg]);
    setIsSending(true);

    try {
      const history = messages
        .filter(m => m.sender === 'user' || m.sender === 'bot')
        .slice(-8)
        .map(m => ({
          role: m.sender === 'user' ? ('user' as const) : ('assistant' as const),
          content: m.text.slice(0, 1500)
        }));

      const response = await fetch('/api/clinical-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: raw,
          history,
          remainingQuestions: 3
        })
      });

      const data = (await response.json()) as {
        answer?: string;
        sources?: GroundedSource[];
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || 'Medical assistance is temporarily unavailable.');
      }

      const botText = data.answer || 'I could not retrieve verified guidance at this moment.';
      
      // Determine if a specialist is relevant and resolve the exact specialist for this turn
      const matchedSpecialist = resolveSpecialistForTurn(raw, botText);
      setActiveSpecialist(matchedSpecialist || null);

      setMessages(prev => [
        ...prev,
        {
          id: generateMessageId('bot'),
          sender: 'bot',
          text: botText,
          timestamp: timeStr,
          recommendedSpecialist: matchedSpecialist,
          sources: data.sources || []
        }
      ]);
    } catch {
      const matchedSpecialist = resolveSpecialistForTurn(raw);
      setActiveSpecialist(matchedSpecialist || null);

      setMessages(prev => [
        ...prev,
        {
          id: generateMessageId('bot'),
          sender: 'bot',
          text: `I could not connect to the medical information service right now.\n\n${
            matchedSpecialist
              ? `**Recommended Specialist**: For these symptoms or disease concerns, consulting a **${matchedSpecialist.name}** or **Primary Care Physician (GP)** is advised for in-person evaluation.\n\n`
              : ''
          }**Next Steps**:\n• Rest, hydrate, and note down your symptoms and timeline.\n• Contact emergency services if you experience acute chest pain, shortness of breath, or sudden weakness.`,
          timestamp: timeStr,
          recommendedSpecialist: matchedSpecialist
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleStartEdit = (message: Message) => {
    setEditingMessageId(message.id);
    setEditingText(message.text);
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditingText('');
  };

  const handleSaveAndResubmitEdit = async (messageId: string) => {
    const trimmed = editingText.trim();
    if (!trimmed || isSending) return;

    const targetIdx = messages.findIndex(m => m.id === messageId);
    if (targetIdx === -1) {
      setEditingMessageId(null);
      return;
    }

    const originalMsg = messages[targetIdx];
    // If text didn't change at all, simply close edit mode
    if (trimmed === originalMsg.text.trim()) {
      setEditingMessageId(null);
      return;
    }

    const timeStr = currentTimestamp();
    const updatedUserMsg: Message = {
      ...originalMsg,
      text: trimmed,
      timestamp: timeStr,
      isEdited: true
    };

    // Keep history prior to this turn and replace with the updated user query
    const priorMessages = messages.slice(0, targetIdx);
    const newConversationHistory = [...priorMessages, updatedUserMsg];

    setMessages(newConversationHistory);
    setEditingMessageId(null);
    setIsSending(true);

    try {
      const history = priorMessages
        .filter(m => m.sender === 'user' || m.sender === 'bot')
        .slice(-8)
        .map(m => ({
          role: m.sender === 'user' ? ('user' as const) : ('assistant' as const),
          content: m.text.slice(0, 1500)
        }));

      const response = await fetch('/api/clinical-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history,
          remainingQuestions: 3
        })
      });

      const data = (await response.json()) as {
        answer?: string;
        sources?: GroundedSource[];
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || 'Medical assistance is temporarily unavailable.');
      }

      const botText = data.answer || 'I could not retrieve verified guidance at this moment.';
      const matchedSpecialist = resolveSpecialistForTurn(trimmed, botText);
      setActiveSpecialist(matchedSpecialist || null);

      setMessages(prev => [
        ...prev,
        {
          id: generateMessageId('bot'),
          sender: 'bot',
          text: botText,
          timestamp: timeStr,
          recommendedSpecialist: matchedSpecialist,
          sources: data.sources || []
        }
      ]);
    } catch {
      const matchedSpecialist = resolveSpecialistForTurn(trimmed);
      setActiveSpecialist(matchedSpecialist || null);

      setMessages(prev => [
        ...prev,
        {
          id: generateMessageId('bot'),
          sender: 'bot',
          text: `I could not connect to the medical information service right now.\n\n${
            matchedSpecialist
              ? `**Recommended Specialist**: For these symptoms or disease concerns, consulting a **${matchedSpecialist.name}** or **Primary Care Physician (GP)** is advised for in-person evaluation.\n\n`
              : ''
          }**Next Steps**:\n• Rest, hydrate, and note down your symptoms and timeline.\n• Contact emergency services if you experience acute chest pain, shortness of breath, or sudden weakness.`,
          timestamp: timeStr,
          recommendedSpecialist: matchedSpecialist
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: generateMessageId('bot'),
        sender: 'bot',
        text: "Session refreshed! Describe your symptoms or ask any question about diseases or general medical concepts. I'm here to provide calm explanations, next steps, and specialist suggestions when symptoms are identified.",
        timestamp: currentTimestamp()
      }
    ]);
    setActiveSpecialist(null);
    setEditingMessageId(null);
    setEditingText('');
    setIsSending(false);
  };

  const [isGuidanceOpen, setIsGuidanceOpen] = useState(false);

  return (
    <div className="w-full max-w-[1700px] mx-auto p-3 sm:p-5 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
      {/* Left Chat Window - Occupies dominant area */}
      <section
        className={`${
          isGuidanceOpen ? 'lg:col-span-8 xl:col-span-9' : 'lg:col-span-12'
        } flex flex-col h-[calc(100vh-12rem)] min-h-[580px] max-h-[920px] bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition-all duration-200`}
        aria-label="Health and symptom chat"
      >
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-tight">
                Health & Symptom Assistant
              </h2>
              <p className="text-[11px] text-slate-500 leading-tight flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                Disease Identification · Clear Doubts · Targeted Specialist Guidance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsGuidanceOpen(prev => !prev)}
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border transition ${
                isGuidanceOpen
                  ? 'border-teal-300 bg-teal-50 text-teal-800'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
              title="Toggle Clinical Guidance Panel"
            >
              <UserCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>{isGuidanceOpen ? 'Hide Guidance' : 'Clinical Guidance'}</span>
              {activeSpecialist && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              )}
            </button>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
              title="Start new conversation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>New Chat</span>
            </button>
          </div>
        </div>

        {/* Quick prompt suggestions */}
        <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/70 flex items-center gap-1.5 overflow-x-auto shrink-0">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Try asking:
          </span>
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p.query)}
              className="shrink-0 px-2.5 py-1 rounded-full bg-white border border-slate-300 text-slate-600 hover:border-teal-400 hover:text-teal-700 transition text-[11px] font-medium shadow-2xs"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Messages Stream - ONLY THIS SCROLLS */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 lg:p-5 space-y-4 bg-slate-50/50 overscroll-contain"
        >
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              {msg.sender === 'user' ? (
                editingMessageId === msg.id ? (
                  <div className="w-full max-w-xl bg-white border-2 border-teal-500 rounded-2xl p-3.5 shadow-md space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-teal-900 border-b border-teal-100 pb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Pencil className="w-3.5 h-3.5 text-teal-600" />
                        Edit Your Query
                      </span>
                      <span className="text-[11px] text-slate-400 font-normal">Enter to submit · Esc to cancel</span>
                    </div>
                    <textarea
                      value={editingText}
                      onChange={e => setEditingText(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSaveAndResubmitEdit(msg.id);
                        } else if (e.key === 'Escape') {
                          handleCancelEdit();
                        }
                      }}
                      rows={Math.min(5, Math.max(2, editingText.split('\n').length))}
                      className="w-full text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition resize-none leading-relaxed"
                      placeholder="Edit your health question or symptoms..."
                      autoFocus
                    />
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition inline-flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Cancel</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveAndResubmitEdit(msg.id)}
                        disabled={!editingText.trim() || isSending}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white transition inline-flex items-center gap-1 shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Save & Resubmit</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="group relative flex flex-col items-end max-w-[88%]">
                    <div className="rounded-2xl px-4 py-3 shadow-xs bg-teal-600 text-white rounded-br-xs text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.text}
                    </div>

                    <div className="flex items-center gap-2 mt-1 px-1 text-[10px] text-slate-400">
                      {msg.isEdited && (
                        <span className="italic text-teal-700 font-medium">(edited)</span>
                      )}
                      <span>{msg.timestamp}</span>
                      <button
                        type="button"
                        onClick={() => handleStartEdit(msg)}
                        disabled={isSending}
                        className="opacity-70 group-hover:opacity-100 hover:text-teal-700 text-slate-400 p-0.5 rounded transition inline-flex items-center gap-0.5"
                        title="Edit this query"
                      >
                        <Pencil className="w-3 h-3" />
                        <span className="text-[10px] font-medium">Edit</span>
                      </button>
                    </div>
                  </div>
                )
              ) : (
                <>
                  <div className="max-w-[88%] rounded-2xl px-4 py-3.5 shadow-xs bg-white text-slate-800 border border-slate-200 rounded-bl-xs">
                    {/* Message Body */}
                    {renderFormattedMessage(msg.text)}

                    {/* Recommended Specialist Card — ONLY displayed when relatable symptoms or conditions are identified */}
                    {msg.recommendedSpecialist && (
                      <div className="mt-3.5 p-3 rounded-xl bg-teal-50/80 border border-teal-200/90 text-xs">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0">
                              <UserCheck className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-800">
                                Recommended Specialist for These Symptoms
                              </span>
                              <div className="font-bold text-teal-950 text-xs">
                                {msg.recommendedSpecialist.name}
                              </div>
                            </div>
                          </div>

                          {onNavigateToSpecialist && (
                            <button
                              onClick={() => onNavigateToSpecialist(msg.recommendedSpecialist?.id)}
                              className="shrink-0 inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700 hover:text-teal-900 bg-white px-2 py-1 rounded-md border border-teal-300 transition"
                            >
                              <span>View Doctor Guide</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Verified Medical Sources */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-slate-500">
                        <div className="font-semibold text-slate-600 mb-1 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                          <span>Verified Medical Sources</span>
                        </div>
                        <ul className="space-y-0.5">
                          {msg.sources.map((s, idx) => (
                            <li key={idx}>
                              <a
                                href={s.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-teal-700 hover:text-teal-900 underline underline-offset-2 inline-flex items-center gap-1"
                              >
                                <span>{s.title}</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="text-[10px] text-slate-400 mt-1 px-1">
                    {msg.timestamp}
                  </div>
                </>
              )}
            </div>
          ))}

          {isSending && (
            <div className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-500 w-fit shadow-xs">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
              <span>Analyzing query, reviewing medical facts, and preparing response...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3.5 border-t border-slate-200 bg-white shrink-0">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Describe symptoms or ask any disease doubt..."
              className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isSending}
              className="bg-teal-600 hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-xl font-medium text-sm inline-flex items-center gap-1.5 transition shadow-sm"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="mt-2 text-[11px] text-slate-400 text-center">
            CliniQ provides educational health information and symptom guidance. It does not replace a doctor's examination. Call your local emergency number for emergencies.
          </p>
        </div>
      </section>

      {/* Right Guidance Sidebar - Only displayed when toggled open */}
      {isGuidanceOpen && (
        <aside className="lg:col-span-4 xl:col-span-3 space-y-4 lg:sticky lg:top-[9rem]" aria-label="Clinical guidance and specialist summary">
          {/* Recommended Specialist Card — ONLY shown if relatable symptoms or conditions have been discussed */}
          {activeSpecialist ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <UserCheck className="w-4 h-4 text-teal-600" />
              <span>Identified Specialist Referral</span>
            </div>

            <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-200 text-xs space-y-2">
              <div className="font-bold text-sm text-slate-900">
                {activeSpecialist.name}
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                {activeSpecialist.description}
              </p>
              <div className="pt-2 border-t border-teal-200/60 text-[11px] text-teal-800 font-medium">
                Typical conditions: {activeSpecialist.sampleConditions.slice(0, 3).join(', ')}
              </div>
            </div>

            {onNavigateToSpecialist && (
              <button
                onClick={() => onNavigateToSpecialist(activeSpecialist.id)}
                className="w-full py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition shadow-xs"
              >
                <span>Open Specialist Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <BookOpen className="w-4 h-4 text-teal-600" />
              <span>Health Doubts & Knowledge Guide</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="font-semibold text-slate-800 text-xs flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
                <span>Ask Anything Freely</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Clarify doubts about medical biology, how diseases develop, or medication principles. When you describe active symptoms or specific conditions, an active doctor referral will appear here.
              </p>
            </div>

            {onNavigateToSpecialist && (
              <button
                onClick={() => onNavigateToSpecialist()}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs flex items-center justify-center gap-1.5 transition"
              >
                <span>Browse All Specialists Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Practical Next Steps Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Clock className="w-4 h-4 text-teal-600" />
            <span>Practical Health Guidance</span>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Rest and Hydrate:</strong> Adequate fluids and rest support natural recovery and immune function.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Track Your Timeline:</strong> Note down when symptoms started and how they evolve over 2–3 days.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>In-Person Care:</strong> Consult a doctor if symptoms persist or interfere with everyday activities.</span>
            </li>
          </ul>
        </div>
      </aside>
      )}
    </div>
  );
};
