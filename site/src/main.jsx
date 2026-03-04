import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { NutriProvider } from './context/NutriContext'

console.log('NutriEnclave: main.jsx loading...');
try {
  const root = document.getElementById('root');
  if (!root) console.error('NutriEnclave Error: #root element not found!');

  createRoot(root).render(
    <StrictMode>
      <NutriProvider>
        <App />
      </NutriProvider>
    </StrictMode>,
  );
  console.log('NutriEnclave: Initial render called successfully');
} catch (err) {
  console.error('NutriEnclave Critical Render Error:', err);
}
