import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { QuoteProvider } from '@root/context/quote/QuoteContext';
import '@root/styles/main.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/Rimac-Frontend-Challenge">
      <QuoteProvider>
        <App />
      </QuoteProvider>
    </BrowserRouter>
  </StrictMode>
);
