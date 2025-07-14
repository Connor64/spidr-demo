import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <title>Spidr Form Demo</title>
    
    <App />
  </StrictMode>,
)
