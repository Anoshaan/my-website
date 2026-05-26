/**
 * One-shot image compressor.
 *
 * Walks `public/` and produces an optimized WebP next to every PNG/JPG that
 * exceeds the size threshold. Keeps the original on disk (Next image
 * optimizer still likes a high-quality source for AVIF), but writes
 * `<name>.webp` so the app can switch references to the small file.
 *
 *   node scripts/compress-images.mjs
 *
 * Tunable per directory below.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(process.cwd(), "public");

// dir → max width to resize down to before encoding (px), and WebP quality.
const RULES = [
  { match: /\\interests\\/, maxWidth: 1600, quality: 78 },
  { match: /\\craft-lab\\/, maxWidth: 1600, quality: 78 },
  { match: /\\case-studies\\/, maxWidth: 1800, quality: 80 },
  { match: /\\testimonials\\/, maxWidth: 320, quality: 80 },
  { match: /\\logos\\/, maxWidth: 320, quality: 88 },
  { match: /\\about\\.*\.(jpg|jpeg|png)$/i, maxWidth: 1280, quality: 78 },
];

const SKIP_BYTES = 60 * 1024; // don't bother re-encoding sub-60KB sources

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

function ruleFor(file) {
  const norm = file.split(path.sep).join("\\");
  return RULES.find((r) => r.match.test(norm));
}

let savedTotal = 0;
let count = 0;

for await (const file of walk(ROOT)) {
  if (!/\.(png|jpg|jpeg)$/i.test(file)) continue;
  const rule = ruleFor(file);
  if (!rule) continue;
  const stat = await fs.stat(file);
  if (stat.size < SKIP_BYTES) continue;

  const out = file.replace(/\.(png|jpg|jpeg)$/i, ".webp");
  const pipeline = sharp(file).rotate();
  const meta = await pipeline.metadata();
  if (meta.width && meta.width > rule.maxWidth) {
    pipeline.resize({ width: rule.maxWidth, withoutEnlargement: true });
  }
  await pipeline
    .webp({ quality: rule.quality, effort: 5, smartSubsample: true })
    .toFile(out);
  const outStat = await fs.stat(out);
  const saved = stat.size - outStat.size;
  savedTotal += saved;
  count++;
  const pct = ((1 - outStat.size / stat.size) * 100).toFixed(0);
  console.log(
    `${path.relative(ROOT, file)} ${(stat.size / 1024).toFixed(0)}KB → ` +
      `${path.relative(ROOT, out)} ${(outStat.size / 1024).toFixed(0)}KB ` +
      `(-${pct}%)`
  );
}

console.log(
  `\nRewrote ${count} images, saved ${(savedTotal / 1024 / 1024).toFixed(2)} MB.`
);
