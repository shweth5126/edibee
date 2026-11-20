import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Feedback } from './components/Feedback.tsx'

// One extra page, so no router: /feedback is served from dist/feedback.html
// (an un-prerendered copy of index.html, see scripts/prerender.mjs).
const isFeedback = window.location.pathname.replace(/\/+$/, '') === '/feedback'
const container = document.getElementById('root')!

if (isFeedback) {
  createRoot(container).render(
    <StrictMode>
      <Feedback />
    </StrictMode>,
  )
} else if (container.hasChildNodes()) {
  // Production: the homepage HTML was pre-rendered at build time — attach to it.
  hydrateRoot(
    container,
    <StrictMode>
      <App />
    </StrictMode>,
  )
} else {
  // Dev server (no pre-render step).
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
