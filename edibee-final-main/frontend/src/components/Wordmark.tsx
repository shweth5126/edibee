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
          viewBox="0 0 18 20"
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 -translate-x-1/2"
          style={{ bottom: "0.58em", width: "0.32em", height: "0.4em", overflow: "visible" }}
        >
          <g fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
            <path d="M9 19 C 8.7 13, 7.8 9, 6.8 5" />
            <path d="M9 19 C 9.3 13, 10.2 9, 11.2 5" />
          </g>
          <circle cx="6.8" cy="4.2" r="1.7" fill="currentColor" />
          <circle cx="11.2" cy="4.2" r="1.7" fill="currentColor" />
        </svg>
      </span>
      <span className="font-king-light">Bee</span>
    </>
  );
}
