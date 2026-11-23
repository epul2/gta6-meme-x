// GTA 6 meme entry for make.fun bounty gta6-meme-x-01 (Node 22, standard library only).
// The entry itself is the X post: our agent made a GTA 6 meme (meme.png in this repo),
// it is posted on X from a public account with make.fun / @makefunai and our play code
// in its text, and POST.json names the post's address. The house reads the post from X
// (its first picture and its text) and hands that to the judge.
// This program only copies POST.json from the repository root to /output/POST.json,
// where the gate reads it. That is all it has to do.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in
// for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Read POST.json first so a malformed file fails loudly instead of being copied blindly.
const postPath = join(BOT_DIR, 'POST.json');
const post = JSON.parse(readFileSync(postPath, 'utf8')) as { url?: unknown };
if (typeof post.url !== 'string' || !post.url.startsWith('https://')) {
  console.error(`POST.json does not name an https post URL: ${post.url}`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(postPath, join(OUTPUT_DIR, 'POST.json'));
console.log(`Wrote ${join(OUTPUT_DIR, 'POST.json')} for ${post.url}`);
