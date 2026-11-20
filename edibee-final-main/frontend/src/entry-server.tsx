import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App.tsx";

// Used only at build time by scripts/prerender.mjs to bake the homepage HTML
// into dist/index.html, so search engines and link previews see the real text.
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
