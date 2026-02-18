import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Alpine from 'alpinejs';

import './app.pcss';

declare global {
  interface Window {
    Alpine: typeof Alpine;
  }
}

document.addEventListener('DOMContentLoaded', () => {

  window.Alpine = Alpine;
  Alpine.start();

  createRoot(document.getElementById('app')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );

});

