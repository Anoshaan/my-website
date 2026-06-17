// One-shot codemod: route pure-black depth literals in the chrome CSS
// through the theme-aware --shadow-rgb token, so shadows/scrims become a
// soft cool slate on light while staying identical (pure black) on dark.
// Only matches rgba(0,0,0, <numeric-alpha>) — comment mentions using "…"
// are left untouched. Safe to run once; re-running is a no-op.

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
  css = css.replace(
    /rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*([0-9.]+)\s*\)/g,
    "rgba(var(--shadow-rgb), $1)"
  );
  const n = (before.match(/rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*[0-9.]+\s*\)/g) || [])
    .length;
  if (css !== before) writeFileSync(path, css, "utf8");
  total += n;
  console.log(`${rel}: ${n} black depth literals routed through --shadow-rgb`);
}
console.log(`\nTotal: ${total}`);
