/**
 * GalaxyBackground — one fixed, full-viewport deep-space backdrop for
 * the entire site. Intentionally quiet: layered nebula washes plus
 * three parallax star layers that drift very slowly so the page feels
 * like it floats in a far-away galaxy without ever pulling attention.
 *
 * Pure CSS (see the GALAXY BACKGROUND block in globals.css) — no canvas,
 * no JS per frame. Honors prefers-reduced-motion (drift freezes).
 */
export function GalaxyBackground() {
  return (
    <div className="galaxy-bg" aria-hidden>
      {/* Nebula depth — soft colored washes that never fully resolve. */}
      <div className="galaxy-nebula" />
      {/* Three star layers at different scales + drift speeds = parallax. */}
      <div className="galaxy-stars galaxy-stars-far" />
      <div className="galaxy-stars galaxy-stars-mid" />
      <div className="galaxy-stars galaxy-stars-near" />
      {/* Vignette so edges stay calm and content keeps contrast. */}
      <div className="galaxy-vignette" />
    </div>
  );
}
