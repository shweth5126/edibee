/**
 * "ediBee" wordmark — "edi" in King Rounded, "Bee" in King ExtraLight, and the
 * logo's two little antennae growing out of the dot on the "i". The antennae
 * inherit the text colour (currentColor) and scale with font-size (em units),
 * so this one component works at every size (hero, navbar, footer).
 *
 * The parent element sets the font-size, colour and tracking; it should also
 * carry `font-king-rounded`.
 *
 * The antennae hang off a zero-size anchor that sits exactly ON the text baseline
 * (an empty inline-block's bottom edge is the baseline). Positioning them from the
 * bottom of the line box instead made them drift on phones/Macs, because font
 * ascent/descent metrics differ per platform. Values are calibrated to the
 * desktop (Windows) look: 0.108em above the baseline, centred on the "i".
 */
export function Wordmark() {
  return (
    <>
      ed
      <span className="relative inline-block">
        i
        <span aria-hidden="true" className="pointer-events-none relative inline-block h-0 w-0 align-baseline">
          <svg
            viewBox="0 30 19 15"
            className="absolute -translate-x-1/2"
            style={{ left: "-0.098em", bottom: "0.108em", width: "1em", height: "0.25em", overflow: "visible" }}
          >
            <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
              <path d="M10 15 C 9.2 4, 7.5 5.5, 5.5 5" />

              <path d="M10 15 C 10.8 4, 12.5 5.5, 14.5 5" />
            </g>
          </svg>
        </span>
      </span>
      <span className="font-king-light">Bee</span>
    </>
  );
}
