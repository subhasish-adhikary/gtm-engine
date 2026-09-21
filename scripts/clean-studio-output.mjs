/*
 * Post-build cleanup for the Sanity Studio output.
 *
 * `sanity build public/studio` copies the project's public/ assets (images,
 * robots.txt, sitemap.xml, ...) into the output alongside the Studio bundle.
 * Those duplicates would bloat the deployment and shadow real files when the
 * cms host rewrites to /studio/, so this step keeps only what the Studio
 * itself needs: index.html and static/.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const studioDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/studio');

if (!fs.existsSync(studioDir)) {
  console.warn('public/studio not found — nothing to clean');
  process.exit(0);
}

const KEEP = new Set(['index.html', 'static']);

let removed = 0;
for (const entry of fs.readdirSync(studioDir)) {
  if (KEEP.has(entry)) continue;
  fs.rmSync(path.join(studioDir, entry), { recursive: true, force: true });
  removed++;
}
console.log(`✓ Studio output cleaned (${removed} duplicate entries removed)`);
