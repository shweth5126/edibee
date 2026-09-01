/**
 * "ediBee" wordmark — "edi" in King Rounded, "Bee" in King ExtraLight, and the
 * logo's two little antennae growing out of the dot on the "i". The antennae
 * inherit the text colour (currentColor) and scale with font-size (em units),
 * so this one component works at every size (hero, navbar, footer).
 *
 * The parent element sets the font-size, colour and tracking; it should also
 * carry `font-king-rounded`.
 */
export function Wordmark() {
  return (
    <>
      ed
      <span className="relative inline-block">
        i
        <svg
          viewBox="0 30 19 15"
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 -translate-x-1/2"
          style={{ bottom: "0.15em", width: "1em", height: "0.25em", overflow: "visible" }}
        >
          <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
            <path d="M10 15 C 9.2 4, 7.5 5.5, 5.5 5" />

            <path d="M10 15 C 10.8 4, 12.5 5.5, 14.5 5" />
          </g>
        </svg>
      </span>
      <span className="font-king-light">Bee</span>
    </>
  );
}
