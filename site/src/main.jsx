import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { NutriProvider } from './context/NutriContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NutriProvider>
      <App />
    </NutriProvider>
  </StrictMode>,
)
