console.log('NutriEnclave: Top of main.jsx reached');
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { NutriProvider } from './context/NutriContext'

console.log('NutriEnclave: Imports complete');

try {
  const rootElement = document.getElementById('root');
  console.log('NutriEnclave: #root element is:', rootElement);

  if (!rootElement) {
    throw new Error('Could not find #root element');
  }

  const root = createRoot(rootElement);
  root.render(
    <NutriProvider>
      <App />
    </NutriProvider>
  );
  console.log('NutriEnclave: Initial render called');
} catch (err) {
  console.error('NutriEnclave: Error during initialization:', err);
}
