# CliniQ — Clinical Health Assistant & Specialist Referral Guide

I built **CliniQ** as a full-stack web application to help users explore symptoms thoughtfully, read structured medical information in plain language, and figure out which medical specialist is best suited for their concern.

Instead of jumping straight to alarming conclusions, the assistant is designed to ask clarifying follow-up questions on brief complaints, separate casual conversation from medical queries, and connect users to a curated reference library of conditions and specialist profiles.

---

## Key Features

- **Conversational Health & Symptom Chat**
  - Handles multi-turn conversations while keeping chat state preserved even when switching between tabs.
  - Asks clarifying questions (duration, severity, triggers) when symptom descriptions are vague rather than jumping to premature conclusions.
  - Supports editing and re-submitting previous messages, copying formatted answers, and deep-linking directly to a recommended doctor specialty.
  - Runs on a secure backend endpoint (`/api/clinical-chat`) with per-IP rate limiting, a multi-model Gemini fallback chain, and a built-in offline clinical knowledge fallback if no API key is configured.

- **Disease & Condition Library (48 Conditions)**
  - Covers 48 conditions across Respiratory & ENT, Infectious & Viral, Digestive & Liver, Neurology/Mental/Sleep, Heart/Kidney/Metabolic, Skin/Joints/Eye, and Urology/Women's/Blood.
  - Each entry includes hallmark symptoms, common causes, diagnostic tests, red-flag warning signs, and management notes, with category filters and instant search.

- **Doctor & Specialist Directory (18 Specialties)**
  - Helps users understand what each specialist treats, when to consult them, which diagnostic evaluations to expect, and practical questions to bring to an appointment.

- **Clinical NLP & Triage Modules (`src/services/`)**
  - **Entity & Attribute Extraction (`nlpExtractor.ts`):** Lexicon-based symptom normalization (mapped to SNOMED CT and MeSH IDs), NegEx-inspired pre/post negation scope resolution across clauses, epistemic hedging detection, and temporal/severity attribute binding.
  - **Deterministic Triage (`triageEngine.ts`):** Rule-based safety checks for urgent and emergency symptom combinations.
  - **Probabilistic Scoring & Question Ranking (`differentialDiagnostic.ts`, `adaptiveQuestionEngine.ts`):** Naive Bayes log-likelihood scoring with softmax normalization and Shannon entropy information-gain ranking for follow-up questions.

---

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons
- **Backend:** Node.js, Express 5 (`tsx`)
- **AI Integration:** `@google/genai` SDK (`gemini-4-hydrogen`, `gemini-3.1-flash-lite`)

---

## Running Locally

### Prerequisites
- **Node.js** v20 or newer (v22 LTS recommended)
- A **Gemini API key** (for live AI responses in the chat)

### Setup Steps
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure your environment variable:**
   Copy `.env.example` to `.env` (or `.env.local`) in the project root and add your API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
   *(The server automatically reads `.env` and `.env.local` on startup and keeps the key strictly on the backend, never exposing it in the browser bundle.)*

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open **http://localhost:3000** in your browser.

### Other Useful Scripts
- **Type-check the codebase:**
  ```bash
  npm run lint
  ```
- **Build for production:**
  ```bash
  npm run build
  ```
- **Run production build:**
  ```bash
  NODE_ENV=production npx tsx server.ts
  ```
  *(Or `npm start` if running on Node.js 22.6+ with native TypeScript execution.)*

---

## Project Structure

```text
├── server.ts                              # Express server, .env loader, rate limiting & /api/clinical-chat
├── server/
│   └── clinicalChat.ts                    # System instructions, Gemini model chain & offline fallback
├── src/
│   ├── App.tsx                            # Main layout & persistent tab navigation
│   ├── data/
│   │   └── medicalKnowledge.ts            # Symptom ontology, 48 conditions, triage rules & 18 specialists
│   ├── services/
│   │   ├── nlpExtractor.ts                # Symptom NER, NegEx negation & temporal/severity extraction
│   │   ├── triageEngine.ts                # Deterministic safety & red-flag triage rules
│   │   ├── differentialDiagnostic.ts      # Log-likelihood & softmax symptom-condition scoring
│   │   └── adaptiveQuestionEngine.ts      # Shannon entropy & information-gain question selection
│   └── components/
│       ├── Chatbot/ChatInterface.tsx      # Chat UI, safe markdown parser & specialist matching
│       ├── DiseaseExplorer/               # Searchable 48-condition library view
│       ├── SpecialistDirectory/           # Searchable 18-specialty doctor guide
│       └── PipelineInspector/             # Modular NLP & triage inspector component
```

---

## Disclaimer

CliniQ is built for educational and informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for medical concerns, and seek immediate emergency care for urgent or severe symptoms.
