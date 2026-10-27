import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Prevent unhandled cross-origin third-party iframe errors from breaking the page
window.onerror = function (msg, url) {
  if (msg === 'Script error.' || !url || (typeof msg === 'string' && msg.includes('Script error'))) {
    return true;
  }
  return false;
};

window.addEventListener('error', (event) => {
  if (event.message === 'Script error.' || !event.filename) {
    event.preventDefault();
    event.stopImmediatePropagation();
    return true;
  }
});

window.addEventListener('unhandledrejection', (event) => {
  if (event.reason && (event.reason.message === 'Script error.' || ('' + event.reason).includes('Script error'))) {
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
