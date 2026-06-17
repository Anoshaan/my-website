// One-shot: the soften-shadows codemod was too broad — it also routed a
// few dark TEXT colours and dark inset/scrim BACKGROUNDS through
// --shadow-rgb. Those must stay dark in BOTH themes, so they get their own
// fixed-dark token (--veil-rgb), freeing --shadow-rgb to go genuinely light
// for real box-shadows. Only rewrites lines whose property is
// color/background/border (never box-shadow/drop-shadow continuation lines).

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
  const lines = readFileSync(path, "utf8").split("\n");
  let n = 0;
  const out = lines.map((line) => {
    if (
      /^\s*(color|background|background-color|border|border-color|fill|stroke)\s*:/.test(
        line
      ) &&
      line.includes("var(--shadow-rgb)")
    ) {
      n++;
      return line.replace(/var\(--shadow-rgb\)/g, "var(--veil-rgb)");
    }
    return line;
  });
  if (n) writeFileSync(path, out.join("\n"), "utf8");
  total += n;
  console.log(`${rel}: ${n} non-shadow literals moved to --veil-rgb`);
}
console.log(`\nTotal: ${total}`);
