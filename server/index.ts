import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { answerClinicalQuestion } from './clinicalChat.ts';
import type { ChatTurn } from './clinicalChat.ts';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(projectRoot, 'dist');
try {
  process.loadEnvFile(path.join(projectRoot, '.env.local'));
} catch {
  // Environment variables may be provided directly by the hosting platform.
}
const port = Number(process.env.PORT || process.env.API_PORT || 3001);
const MAX_BODY_BYTES = 24_000;
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT_PER_IP = 20;
const requestCounts = new Map<string, { count: number; startedAt: number }>();

function sendJson(res: import('node:http').ServerResponse, status: number, data: unknown): void {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

async function readJsonBody(req: import('node:http').IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  let byteCount = 0;
  for await (const chunk of req) {
    const data = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    byteCount += data.length;
    if (byteCount > MAX_BODY_BYTES) throw new Error('Request is too large.');
    chunks.push(data);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

async function handleChat(req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse): Promise<void> {
  const ip = req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const current = requestCounts.get(ip);
  if (!current || now - current.startedAt >= RATE_WINDOW_MS) {
    requestCounts.set(ip, { count: 1, startedAt: now });
  } else if (current.count >= RATE_LIMIT_PER_IP) {
    sendJson(res, 429, { error: 'Too many chat requests. Please wait a minute and try again.' });
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
    const body = await readJsonBody(req) as {
      message?: unknown;
      history?: unknown;
      remainingQuestions?: unknown;
      triageNote?: unknown;
    };
    if (typeof body.message !== 'string' || body.message.trim().length === 0 || body.message.length > 4000) {
      sendJson(res, 400, { error: 'Enter a message up to 4,000 characters.' });
      return;
    }
    const history: ChatTurn[] = Array.isArray(body.history)
      ? body.history.filter((turn): turn is ChatTurn =>
          !!turn && typeof turn === 'object' &&
          ((turn as ChatTurn).role === 'user' || (turn as ChatTurn).role === 'assistant') &&
          typeof (turn as ChatTurn).content === 'string'
        ).slice(-12)
      : [];

    const result = await answerClinicalQuestion({
      message: body.message.trim(),
      history,
      remainingQuestions: typeof body.remainingQuestions === 'number' ? body.remainingQuestions : 0,
      triageNote: typeof body.triageNote === 'string' ? body.triageNote.slice(0, 1000) : undefined
    });
    sendJson(res, 200, result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not answer right now.';
    const status = message.includes('not configured') ? 503 : message.includes('too large') ? 413 : 502;
    sendJson(res, status, { error: status === 503 ? message : 'The medical information service is unavailable. Please try again later or contact a clinician.' });
  }
}

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8'
};

async function serveBuiltApp(req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse): Promise<void> {
  const requestedPath = decodeURIComponent(new URL(req.url || '/', 'http://localhost').pathname);
  const safePath = path.resolve(distRoot, `.${requestedPath}`);
  if (!safePath.startsWith(`${distRoot}${path.sep}`) && safePath !== distRoot) {
    res.writeHead(403).end('Forbidden');
    return;
  }
  let filePath = safePath;
  try {
    if (!(await stat(filePath)).isFile()) filePath = path.join(distRoot, 'index.html');
  } catch {
    filePath = path.join(distRoot, 'index.html');
  }
  try {
    const contents = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': MIME_TYPES[path.extname(filePath)] || 'application/octet-stream' });
    res.end(contents);
  } catch {
    res.writeHead(404).end('Build not found. Run npm run build first.');
  }
}

createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/api/clinical-chat') {
    await handleChat(req, res);
    return;
  }
  if (req.url?.startsWith('/api/')) {
    sendJson(res, 404, { error: 'API route not found.' });
    return;
  }
  await serveBuiltApp(req, res);
}).listen(port, '0.0.0.0', () => {
  console.log(`ClinicaNLP server listening on http://localhost:${port}`);
});
