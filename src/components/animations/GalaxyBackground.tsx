/**
 * GalaxyBackground — one fixed, full-viewport deep-space backdrop for
 * the entire site. Intentionally quiet: layered nebula washes, three
 * parallax star layers, a few free-floating dust motes and a slow
 * ambient light beam, all drifting so slowly the atmosphere is felt
 * more than seen.
 *
 * Pure CSS (see the GALAXY BACKGROUND block in globals.css) — no canvas,
 * no JS per frame. Honors prefers-reduced-motion (drift freezes).
 */

// Deterministic pseudo-random placement so SSR and client agree.
const DUST = Array.from({ length: 14 }, (_, i) => ({
  x: `${(i * 71 + 9) % 100}%`,
  y: `${(i * 37 + 13) % 100}%`,
  dur: `${22 + (i % 5) * 6}s`,
  delay: `${-((i * 13) % 30)}s`,
  o: 0.22 + ((i * 7) % 10) / 45,
  dx: `${((i % 3) - 1) * 44}px`,
}));

export function GalaxyBackground() {
  return (
    <div className="galaxy-bg" aria-hidden>
      {/* Nebula depth — soft colored washes that never fully resolve. */}
      <div className="galaxy-nebula" />
      {/* Three star layers at different scales + drift speeds = parallax. */}
      <div className="galaxy-stars galaxy-stars-far" />
      <div className="galaxy-stars galaxy-stars-mid" />
      <div className="galaxy-stars galaxy-stars-near" />
      {/* A slow diagonal light sweep — keeps dark areas from going flat. */}
      <div className="galaxy-beam" />
      {/* Free-floating dust motes. */}
      <div className="galaxy-dust">
        {DUST.map((d, i) => (
          <span
            key={i}
            style={
              {
                "--x": d.x,
                "--y": d.y,
                "--dur": d.dur,
                "--delay": d.delay,
                "--o": d.o,
                "--dx": d.dx,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
      {/* Vignette so edges stay calm and content keeps contrast. */}
      <div className="galaxy-vignette" />
    </div>
  );
}
