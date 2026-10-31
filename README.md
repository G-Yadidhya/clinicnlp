<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/0023e23a-37fc-4572-8590-2db76d57f79e

## Run Locally

**Prerequisites:** Node.js 22.6 or newer

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY` to a Gemini API key. Keep this file private; the key is read by the server and is not included in the browser bundle.
3. Start the API server in one terminal with `npm run dev:api`.
4. Start the web app in another terminal with `npm run dev`, then open `http://localhost:3000`.

For a production-style local run, use `npm run build` and then `npm start`. The server serves the built app and the grounded chat API on the same port.

## Medical answer behavior

The chat can discuss symptom-based possibilities and answer disease questions using Gemini with Google Search grounding. It shows the sources returned for each answer, avoids diagnostic probability percentages, and limits clarifying questions to three per session. A deterministic symptom screen takes priority for emergency warning patterns and explains which serious conditions the pattern is meant to rule out.

This is still an academic prototype, not a clinical decision system. Search grounding and citations reduce unsupported claims but cannot guarantee that every answer is correct. The emergency rules are intentionally narrow and cannot rule out serious illness when they do not trigger. Do not delay emergency care to use the chat.
