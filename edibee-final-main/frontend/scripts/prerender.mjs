// Build-time pre-render for the homepage.
// 1. `vite build` produces dist/index.html with an empty <div id="root"></div>.
// 2. `vite build --ssr` produces dist-server/entry-server.js.
// 3. This script renders <App /> to HTML and puts it inside #root, so the page
//    text is in the HTML file itself. The browser then hydrates it as before.
// The untouched template is kept as dist/feedback.html for the /feedback page
// (served at /feedback via cleanUrls), so that page never flashes the homepage.
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = resolve(root, "dist/index.html");
const serverEntry = resolve(root, "dist-server/entry-server.js");

const template = readFileSync(indexPath, "utf8");
const EMPTY_ROOT = '<div id="root"></div>';
if (!template.includes(EMPTY_ROOT)) {
  throw new Error("prerender: could not find the empty #root div in dist/index.html");
}

const { render } = await import(pathToFileURL(serverEntry).href);
const appHtml = render();
if (!appHtml || appHtml.length < 1000) {
  throw new Error("prerender: rendered HTML looks empty — refusing to ship it");
}

writeFileSync(resolve(root, "dist/feedback.html"), template);
writeFileSync(indexPath, template.replace(EMPTY_ROOT, `<div id="root">${appHtml}</div>`));
rmSync(resolve(root, "dist-server"), { recursive: true, force: true });

console.log(`prerender: homepage baked into dist/index.html (${(appHtml.length / 1024).toFixed(0)} KB of HTML)`);
