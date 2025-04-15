import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './override.css'
import App from './App.tsx'

// Force light mode on body element
document.body.classList.add('light');
document.body.classList.remove('dark');
document.documentElement.classList.add('light');
document.documentElement.classList.remove('dark');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
