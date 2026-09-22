/**
 * Local static server for the built `dist/` output.
 *
 * Mirrors the routing Vercel applies in production closely enough to exercise the
 * site for real: clean URLs resolve to `<route>.html`, unknown paths fall back to
 * the branded 404 page, and `POST /api/subscribe` runs the real serverless
 * handler through jiti. Used by the browser check and the production verifier's
 * `--local-dist` dry run.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createJiti } from 'jiti';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.woff2': 'font/woff2',
};

/**
 * @param {{ repoRoot: string, port: number }} options
 * @returns {Promise<http.Server>}
 */
export async function startDistServer({ repoRoot, port }) {
  const distDir = path.join(repoRoot, 'dist');
  if (!fs.existsSync(path.join(distDir, 'index.html'))) {
    throw new Error('dist/index.html not found — run "npm run build" first');
  }

  const jiti = createJiti(import.meta.url);
  const loaded = await jiti.import(path.join(repoRoot, 'api', 'subscribe.ts'));
  const handler = loaded?.default ?? loaded;

  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:${port}`);

    if (url.pathname === '/api/subscribe') {
      let raw = '';
      req.setEncoding('utf8');
      req.on('data', (chunk) => {
        raw += chunk;
      });
      req.on('end', async () => {
        try {
          await handler({ method: req.method, body: raw, headers: req.headers }, res);
        } catch {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.end(JSON.stringify({ ok: false, error: 'local_server_error' }));
        }
      });
      return;
    }

    const decoded = decodeURIComponent(url.pathname);
    const candidates = [
      path.join(distDir, decoded),
      path.join(distDir, `${decoded.replace(/\/$/, '')}.html`),
      path.join(distDir, decoded, 'index.html'),
    ];

    for (const candidate of candidates) {
      if (candidate.startsWith(distDir) && fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        res.statusCode = 200;
        res.setHeader('Content-Type', MIME[path.extname(candidate)] || 'application/octet-stream');
        res.end(fs.readFileSync(candidate));
        return;
      }
    }

    const notFound = path.join(distDir, '404.html');
    res.statusCode = 404;
    res.setHeader('Content-Type', MIME['.html']);
    res.end(fs.existsSync(notFound) ? fs.readFileSync(notFound) : 'Not found');
  });

  await new Promise((resolve) => server.listen(port, resolve));
  return server;
}
