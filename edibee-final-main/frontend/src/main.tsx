import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Feedback } from './components/Feedback.tsx'

// One extra page, so no router: /feedback (rewritten to index.html in vercel.json).
const isFeedback = window.location.pathname.replace(/\/+$/, '') === '/feedback'

createRoot(document.getElementById('root')!).render(
  <StrictMode>{isFeedback ? <Feedback /> : <App />}</StrictMode>,
)
