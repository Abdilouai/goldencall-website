import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Import directly from CDN to bypass build-time resolution errors
import { inject } from 'https://esm.sh/@vercel/analytics';

// Initialize Vercel Analytics tracking immediately
inject();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
