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
          viewBox="0 0 24 22"
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 -translate-x-1/2"
          style={{ bottom: "0.52em", width: "0.66em", height: "0.6em", overflow: "visible" }}
        >
          <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M12 22 C 10.5 14, 7 10.5, 4.5 4.5" />
            <path d="M12 22 C 13.5 14, 17 10.5, 19.5 4.5" />
          </g>
          <circle cx="4.5" cy="4" r="2.3" fill="currentColor" />
          <circle cx="19.5" cy="4" r="2.3" fill="currentColor" />
        </svg>
      </span>
      <span className="font-king-light">Bee</span>
    </>
  );
}
