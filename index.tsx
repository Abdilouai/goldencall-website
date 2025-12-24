import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { inject } from '@vercel/analytics';

// Initialize Vercel Analytics tracking
try {
  inject();
} catch (e) {
  console.warn("Analytics injection failed, continuing...", e);
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Critical: Could not find root element to mount the app.");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("App mounted successfully");
  } catch (error) {
    console.error("App render failed:", error);
    rootElement.innerHTML = `<div style="padding: 20px; text-align: center;"><h1>Something went wrong</h1><p>The application failed to load. Please try refreshing the page.</p></div>`;
  }
}
