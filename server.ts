import express, { Request, Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { answerClinicalQuestion } from './server/clinicalChat.ts';
import type { ChatTurn } from './server/clinicalChat.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local and .env automatically for local runs (without overriding existing shell env vars)
for (const envFile of ['.env.local', '.env']) {
  const envPath = path.resolve(__dirname, envFile);
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;
      const eqIndex = line.indexOf('=');
      if (eqIndex <= 0) continue;
      const key = line.slice(0, eqIndex).trim();
      let value = line.slice(eqIndex + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  }
}

const isProduction = process.env.NODE_ENV === 'production';
const port = Number(process.env.PORT || 3000);

const app = express();

app.use(express.json({ limit: '24kb' }));

// Rate limiting in-memory
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT_PER_IP = 20;
const requestCounts = new Map<string, { count: number; startedAt: number }>();

app.post('/api/clinical-chat', async (req: Request, res: Response) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const current = requestCounts.get(ip);
  if (!current || now - current.startedAt >= RATE_WINDOW_MS) {
    requestCounts.set(ip, { count: 1, startedAt: now });
  } else if (current.count >= RATE_LIMIT_PER_IP) {
    res.status(429).json({ error: 'Too many chat requests. Please wait a minute and try again.' });
    return;
  } else {
    current.count += 1;
  }

  if (requestCounts.size > 1000) {
    for (const [address, window] of requestCounts) {
      if (now - window.startedAt >= RATE_WINDOW_MS) requestCounts.delete(address);
    }
  }

  try {
    const { message, history: rawHistory, remainingQuestions, triageNote } = req.body || {};
    if (typeof message !== 'string' || message.trim().length === 0 || message.length > 4000) {
      res.status(400).json({ error: 'Enter a message up to 4,000 characters.' });
      return;
    }

    const history: ChatTurn[] = Array.isArray(rawHistory)
      ? rawHistory.filter((turn): turn is ChatTurn =>
          Boolean(
            turn &&
            typeof turn === 'object' &&
            (turn.role === 'user' || turn.role === 'assistant') &&
            typeof turn.content === 'string'
          )
        ).slice(-12)
      : [];

    const result = await answerClinicalQuestion({
      message: message.trim(),
      history,
      remainingQuestions: typeof remainingQuestions === 'number' ? remainingQuestions : 0,
      triageNote: typeof triageNote === 'string' ? triageNote.slice(0, 1000) : undefined,
    });

    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not answer right now.';
    const status = message.includes('not configured') ? 503 : message.includes('too large') ? 413 : 502;
    res.status(status).json({
      error: status === 503
        ? message
        : 'The medical information service is unavailable. Please try again later or contact a clinician.',
    });
  }
});

async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: 3000,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    const hasKey = Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY);
    console.log(`CliniQ full-stack server running on http://localhost:${port}`);
    console.log(
      hasKey
        ? 'Gemini API key detected: live AI clinical chat is enabled.'
        : 'Warning: GEMINI_API_KEY is not set. Chat will use the offline fallback until GEMINI_API_KEY is configured in .env or your environment.'
    );
  });
}

startServer();
