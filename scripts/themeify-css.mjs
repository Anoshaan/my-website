// One-time codemod: route white literals in the site-chrome CSS through theme
// tokens so they flip under [data-theme="light"]. In dark mode the tokens
// resolve to the exact same values, so dark rendering is unchanged.
//
// White ink (text, borders, highlights, light surfaces) -> --c-fg / --c-fg-rgb.
// Black literals are intentionally left alone: they are shadows/depth and read
// correctly dark on both themes.
//
// Mockup CSS (ChronosMockup, MidFi, WorkforceDashboard, FigmaWorkspace,
// ScrollingImage) is excluded — those are product depictions ("content").

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const FILES = [
  "src/app/globals.css",
  "src/components/sections/about/about.css",
  "src/components/sections/brand/brand.css",
  "src/components/sections/systems/systems.css",
];

let total = 0;
for (const rel of FILES) {
  const path = resolve(process.cwd(), rel);
  let css = readFileSync(path, "utf8");
  const before = css;

  // --- FOREGROUND / HIGHLIGHT WHITES -> --c-fg-rgb / --c-fg ---
  // rgba(255,255,255, A)
  css = css.replace(
    /rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*([0-9.]+)\s*\)/g,
    "rgba(var(--c-fg-rgb), $1)"
  );
  // rgb(255,255,255)
  css = css.replace(
    /rgb\(\s*255\s*,\s*255\s*,\s*255\s*\)/g,
    "rgb(var(--c-fg-rgb))"
  );
  // Near-white "shine" highlights (all channels 244–255) e.g. hero title shine.
  css = css.replace(
    /rgba\(\s*2(?:4[4-9]|5[0-5])\s*,\s*2(?:4[4-9]|5[0-5])\s*,\s*2(?:4[4-9]|5[0-5])\s*,\s*([0-9.]+)\s*\)/g,
    "rgba(var(--c-fg-rgb), $1)"
  );
  // #ffffff / #fff
  css = css.replace(/#ffffff(?![0-9a-fA-F])/gi, "var(--c-fg)");
  css = css.replace(/#fff(?![0-9a-fA-F])/gi, "var(--c-fg)");

  // --- WARM-WHITE INK (brand fg #ecebe6) -> --c-ink-rgb / --c-ink ---
  css = css.replace(
    /rgba\(\s*236\s*,\s*235\s*,\s*230\s*,\s*([0-9.]+)\s*\)/g,
    "rgba(var(--c-ink-rgb), $1)"
  );
  css = css.replace(/#ecebe6(?![0-9a-fA-F])/gi, "var(--c-ink)");

  // --- LAVENDER ACCENT (#cfd9ff = 207,217,255) -> accent tokens ---
  css = css.replace(
    /rgba\(\s*207\s*,\s*217\s*,\s*255\s*,\s*([0-9.]+)\s*\)/g,
    "rgba(var(--c-accent-rgb), $1)"
  );
  css = css.replace(/#cfd9ff(?![0-9a-fA-F])/gi, "var(--color-accent)");

  if (css !== before) {
    writeFileSync(path, css, "utf8");
  }
  // count changes
  const count =
    (before.match(/rgba\(\s*255\s*,\s*255\s*,\s*255/g) || []).length +
    (before.match(/rgb\(\s*255\s*,\s*255\s*,\s*255\s*\)/g) || []).length +
    (before.match(/#ffffff(?![0-9a-fA-F])/gi) || []).length +
    (before.match(/#fff(?![0-9a-fA-F])/gi) || []).length;
  total += count;
  console.log(`${rel}: ${count} white literals routed through --c-fg`);
}
console.log(`\nTotal: ${total} replacements`);
