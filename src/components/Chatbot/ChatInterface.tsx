import React, { useState, useMemo } from 'react';
import {
  Send,
  AlertTriangle,
  ShieldCheck,
  Stethoscope,
  Clock,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import {
  ExtractedSymptom,
  TriageResult,
  TriageUrgency,
  PatientProfile
} from '../../types/clinical';
import { extractClinicalEntities } from '../../services/nlpExtractor';
import { evaluateClinicalTriage } from '../../services/triageEngine';

interface GroundedSource {
  title: string;
  url: string;
}

interface Message {
  id: string;
  sender: 'user' | 'bot' | 'system';
  text: string;
  timestamp: string;
  triageSnapshot?: TriageResult;
  extractedSnapshot?: ExtractedSymptom[];
  sources?: GroundedSource[];
}

let messageCounter = 0;
function generateMessageId(prefix: string): string {
  messageCounter += 1;
  return `${prefix}_${Date.now().toString(36)}_${messageCounter.toString(36)}`;
}

const TRIAGE_LEVEL_STYLES: Record<TriageUrgency, { card: string; accent: string; badge: string; icon: string }> = {
  EMERGENCY: {
    card: 'bg-white border border-slate-200 border-l-4 border-l-red-500',
    accent: 'text-red-600',
    badge: 'bg-red-100 text-red-700 border border-red-200',
    icon: 'text-red-600'
  },
  URGENT: {
    card: 'bg-white border border-slate-200 border-l-4 border-l-amber-500',
    accent: 'text-amber-600',
    badge: 'bg-amber-100 text-amber-800 border border-amber-200',
    icon: 'text-amber-600'
  },
  ROUTINE: {
    card: 'bg-white border border-slate-200 border-l-4 border-l-blue-500',
    accent: 'text-blue-600',
    badge: 'bg-blue-100 text-blue-700 border border-blue-200',
    icon: 'text-blue-600'
  },
  SELF_CARE: {
    card: 'bg-white border border-slate-200 border-l-4 border-l-emerald-500',
    accent: 'text-emerald-600',
    badge: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
    icon: 'text-emerald-600'
  }
};

function currentTimestamp(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function renderRichText(text: string): React.ReactNode[] {
  return text.split('\n\n').map((paragraph, pIdx) => (
    <p key={pIdx}>
      {paragraph.split('**').map((chunk, cIdx) =>
        cIdx % 2 === 1
          ? <strong key={cIdx} className="font-semibold text-teal-700">{chunk}</strong>
          : chunk
      )}
    </p>
  ));
}

function enforceQuestionBudget(answer: string, budget: number): string {
  let questionsKept = 0;
  const limit = Math.max(0, Math.min(1, budget));
  return (answer.match(/[^?]*\?(?:\s*|$)|[^?]+$/g) || [])
    .filter(part => {
      if (!part.includes('?')) return true;
      if (questionsKept >= limit) return false;
      questionsKept += 1;
      return true;
    })
    .join('')
    .trim();
}

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg_welcome',
      sender: 'bot',
      text: "Describe the main symptom in your own words. I can offer general safety guidance, but I cannot diagnose or determine the cause.",
      timestamp: currentTimestamp()
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [allExtractedSymptoms, setAllExtractedSymptoms] = useState<ExtractedSymptom[]>([]);
  const [remainingQuestions, setRemainingQuestions] = useState(3);
  const [isSending, setIsSending] = useState(false);
  const [patientProfile] = useState<PatientProfile>({
    ageGroup: 'adult',
    isPregnant: false,
    immunocompromised: false,
    chronicConditions: []
  });

  // Compute live state derived from all known symptoms
  const currentTriage = useMemo(
    () => evaluateClinicalTriage(allExtractedSymptoms, patientProfile),
    [allExtractedSymptoms, patientProfile]
  );

  const samplePrompts = [
    {
      label: 'Meningitis signs',
      query: 'I have had a high fever and severe headache for 2 days, and my neck is very stiff.'
    },
    {
      label: 'Cardiac red flags',
      query: 'I am experiencing crushing chest pressure radiating to my left arm and shortness of breath.'
    },
    {
      label: 'Flu vs bronchitis',
      query: 'I have had fever, chills, body aches and dry cough for 3 days, but no chest pain.'
    },
    {
      label: 'Migraine',
      query: 'Terrible throbbing headache on one side of my head with extreme sensitivity to light and nausea.'
    },
    {
      label: 'Condition information',
      query: 'Tell me about COVID-19 and its treatment.'
    }
  ];

  const mergeSymptom = (
    list: ExtractedSymptom[],
    incoming: ExtractedSymptom
  ): ExtractedSymptom[] => {
    const updated = [...list];
    const idx = updated.findIndex(s => s.canonicalId === incoming.canonicalId);
    if (idx !== -1) {
      updated[idx] = incoming;
    } else {
      updated.push(incoming);
    }
    return updated;
  };

  const respondToSymptoms = async (
    displayText: string,
    mergedSymptoms: ExtractedSymptom[],
    turnSymptoms: ExtractedSymptom[],
    timeStr: string
  ): Promise<void> => {
    const newTriage = evaluateClinicalTriage(mergedSymptoms, patientProfile);
    const userMsg: Message = {
      id: generateMessageId('user'),
      sender: 'user',
      text: displayText,
      timestamp: timeStr
    };

    if (newTriage.level === 'EMERGENCY') {
      const seriousPossibilities = newTriage.potentiallyLifeThreateningConditions || [];
      const matchedSymptoms = newTriage.triggers.join(' and ');
      const riskText = seriousPossibilities.length > 0
        ? `The reported combination (${matchedSymptoms}) is a recognized warning pattern for conditions such as ${seriousPossibilities.join(' or ')}. These are possibilities to rule out, not a diagnosis.`
        : 'The reported symptoms match an emergency warning pattern. This is not a diagnosis.';
      setMessages(previous => [...previous, userMsg, {
        id: generateMessageId('bot'),
        sender: 'bot',
        text: `**Emergency warning pattern**\n\n${riskText}\n\n**Act now**: ${newTriage.recommendedAction}`,
        timestamp: timeStr,
        triageSnapshot: newTriage,
        extractedSnapshot: turnSymptoms,
        sources: newTriage.riskEvidence || []
      }]);
      return;
    }

    setMessages(previous => [...previous, userMsg]);
    setIsSending(true);
    try {
      const history = messages
        .filter(message => message.sender === 'user' || message.sender === 'bot')
        .slice(-8)
        .map(message => ({
          role: message.sender === 'user' ? 'user' : 'assistant',
          content: message.text.slice(0, 1500)
        }));
      const response = await fetch('/api/clinical-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: displayText,
          history,
          remainingQuestions,
          triageNote: newTriage.level === 'SELF_CARE'
            ? 'No emergency pattern was detected by the local screen. This does not rule out serious illness.'
            : `${newTriage.level}: ${newTriage.recommendedAction} The local screen is precautionary, not a diagnosis.`
        })
      });
      const data = await response.json() as { answer?: string; sources?: GroundedSource[]; error?: string };
      if (!response.ok) throw new Error(data.error || 'Medical information service is unavailable.');

      const answer = enforceQuestionBudget(
        data.answer || 'I could not produce a verified answer. Please consult a clinician.',
        remainingQuestions
      );
      const questionsUsed = Math.min(remainingQuestions, (answer.match(/\?/g) || []).length);
      if (questionsUsed > 0) setRemainingQuestions(previous => Math.max(0, previous - questionsUsed));
      const triagePrefix = newTriage.level === 'URGENT' || newTriage.level === 'ROUTINE'
        ? `**Safety suggestion**: ${newTriage.recommendedAction}\n\nThis screening is precautionary and cannot diagnose or rule out a condition.\n\n`
        : '';
      setMessages(previous => [...previous, {
        id: generateMessageId('bot'),
        sender: 'bot',
        text: `${triagePrefix}${answer}`,
        timestamp: timeStr,
        triageSnapshot: newTriage,
        extractedSnapshot: turnSymptoms,
        sources: data.sources || []
      }]);
    } catch {
      setMessages(previous => [...previous, {
        id: generateMessageId('bot'),
        sender: 'bot',
        text: `${newTriage.level === 'URGENT' || newTriage.level === 'ROUTINE' ? `**Safety suggestion**: ${newTriage.recommendedAction}\n\n` : ''}I could not retrieve verified medical information right now, so I will not guess. Please ask a licensed clinician or pharmacist. Seek emergency help for severe or rapidly worsening symptoms.`,
        timestamp: timeStr,
        triageSnapshot: newTriage,
        extractedSnapshot: turnSymptoms
      }]);
    } finally {
      setIsSending(false);
    }
  };
  const handleSendMessage = (textToSend?: string) => {
    const raw = (textToSend || inputText).trim();
    if (!raw || isSending) return;

    const timeStr = currentTimestamp();
    setInputText('');

    // Symptom assessment mode: Run NLP extraction pipeline
    const nlpOutput = extractClinicalEntities(raw);

    let mergedSymptoms = [...allExtractedSymptoms];
    for (const newSym of nlpOutput.extractedSymptoms) {
      mergedSymptoms = mergeSymptom(mergedSymptoms, newSym);
    }
    setAllExtractedSymptoms(mergedSymptoms);

    respondToSymptoms(raw, mergedSymptoms, nlpOutput.extractedSymptoms, timeStr);
  };

  const handleReset = () => {
    setMessages([
      {
        id: generateMessageId('system'),
        sender: 'bot',
        text: 'Session reset. Describe your symptoms to begin a new clinical assessment.',
        timestamp: currentTimestamp()
      }
    ]);
    setAllExtractedSymptoms([]);
    setRemainingQuestions(3);
    setIsSending(false);
    setRemainingQuestions(3);
    setIsSending(false);
  };

  const triageStyle = TRIAGE_LEVEL_STYLES[currentTriage.level];

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
      {/* Left column: conversation stream */}
      <section
        className="lg:col-span-7 flex flex-col h-[calc(100vh-13rem)] min-h-[540px] max-h-[860px] bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
        aria-label="Symptom assessment chat"
      >
        {/* Chat header */}
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-teal-600" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 leading-tight">
                Clinical Symptom Assessment
              </div>
              <div className="text-[11px] text-slate-500 leading-tight">
                Grounded medical information with safety screening
              </div>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
            title="Reset conversation state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        {/* Quick scenarios */}
        <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/70 flex items-center gap-2 overflow-x-auto shrink-0">
          <span className="text-[11px] uppercase tracking-wide text-slate-400 font-medium shrink-0">
            Try:
          </span>
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p.query)}
              className="shrink-0 px-2.5 py-1 rounded-full bg-white border border-slate-300 text-slate-600 hover:border-teal-400 hover:text-teal-700 transition text-[11px]"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-teal-600 text-white rounded-br-md'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-md shadow-sm'
                }`}
              >
                <div className="whitespace-pre-line space-y-2">
                  {renderRichText(msg.text)}
                </div>

                {msg.sender === 'bot' && msg.triageSnapshot?.level === 'EMERGENCY' && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold uppercase tracking-wide text-red-700">
                        Red flag emergency
                      </div>
                      <div className="mt-0.5 text-red-700/90">
                        This warning is precautionary and is not a diagnosis.
                      </div>
                    </div>
                  </div>
                )}

                {msg.sender === 'bot' && msg.triageSnapshot?.level === 'URGENT' && (
                  <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="font-medium">
                      Urgent medical attention advised.
                    </div>
                  </div>
                )}
              </div>

              <div className="text-[10px] text-slate-400 mt-1 px-1">
                {msg.timestamp}
              </div>

              {msg.sender === 'bot' && msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 border-t border-slate-100 pt-2 text-xs">
                  <div className="font-semibold text-slate-500 mb-1">Sources</div>
                  <ul className="space-y-1">
                    {msg.sources.map(source => (
                      <li key={source.url}>
                        <a href={source.url} target="_blank" rel="noreferrer" className="text-teal-700 underline underline-offset-2 hover:text-teal-900">
                          {source.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
          {isSending && (
            <p className="text-xs text-slate-500" role="status">Checking medical sources...</p>
          )}
        </div>

        {/* Input area */}
        <div className="p-3 border-t border-slate-200 bg-white shrink-0">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <label htmlFor="symptom-input" className="sr-only">
              Describe your symptoms
            </label>
            <input
              id="symptom-input"
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Describe symptoms or ask about a disease, its treatment, or precautions"
              className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isSending}
              className="bg-teal-600 hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-xl font-medium text-sm inline-flex items-center gap-1.5 transition shadow-sm"
            >
              Send
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="mt-2 text-[11px] text-slate-400 px-1">
            Academic prototype, not a diagnosis. Recent chat turns are sent to Gemini for source-grounded replies; avoid sharing names or other identifying details. Contact emergency services for urgent symptoms.
          </p>
        </div>
      </section>

      {/* Right column: live clinical state */}
      <aside className="lg:col-span-5 space-y-4" aria-label="Live clinical state">
        {/* Triage card */}
        <div className={`${triageStyle.card} rounded-2xl p-4 shadow-sm`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {currentTriage.level === 'EMERGENCY' ? (
                <AlertTriangle className={`w-5 h-5 ${triageStyle.icon} animate-pulse`} />
              ) : (
                <ShieldCheck className={`w-5 h-5 ${triageStyle.icon}`} />
              )}
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Safety triage
              </span>
            </div>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-bold tracking-wide ${triageStyle.badge}`}
            >
              {currentTriage.level === 'SELF_CARE' ? 'SELF CARE' : currentTriage.level}
            </span>
          </div>

          <h3 className="font-semibold text-sm text-slate-900">{currentTriage.title}</h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{currentTriage.rationale}</p>

          <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div className="text-slate-500 font-medium">Recommended action</div>
            <div className="text-teal-700 font-semibold mt-0.5">
              {currentTriage.recommendedAction}
            </div>
            <div className="text-slate-500 text-[11px] mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Timeframe: {currentTriage.timeframe}
            </div>
          </div>
        </div>

        {/* Extracted entities */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2.5">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              Extracted entities
            </h4>
            <span className="text-[11px] text-slate-400">
              {allExtractedSymptoms.length} concepts
            </span>
          </div>

          {allExtractedSymptoms.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-2">
              No symptoms extracted yet. Describe symptoms in the chat to see concept mapping and negation status.
            </p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {allExtractedSymptoms.map(sym => (
                <li
                  key={sym.canonicalId}
                  className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center gap-1.5"
                  title={`SNOMED ${sym.snomedCode} · confidence ${sym.confidence}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      sym.isNegated
                        ? 'bg-rose-500'
                        : sym.certainty === 'possible'
                        ? 'bg-amber-500'
                        : 'bg-teal-500'
                    }`}
                  />
                  <span className="font-medium text-slate-800">{sym.canonicalName}</span>
                  <span className={`text-[10px] ${
                    sym.isNegated ? 'text-rose-600' : sym.certainty === 'possible' ? 'text-amber-700' : 'text-slate-500'
                  }`}>
                    {sym.isNegated ? 'negated' : sym.certainty === 'possible' ? 'hedged' : 'affirmed'}
                  </span>
                  {sym.duration && (
                    <span className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-600">
                      {sym.duration}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

      </aside>
    </div>
  );
};
