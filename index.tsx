import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const mountApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Critical: Could not find root element to mount the app.");
    return;
  }

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
    rootElement.innerHTML = `
      <div style="padding: 40px; text-align: center; font-family: sans-serif;">
        <h1 style="color: #1A8FD8;">Something went wrong</h1>
        <p>The application encountered an error while loading.</p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; background: #1A8FD8; color: white; border: none; border-radius: 5px; cursor: pointer;">
          Refresh Page
        </button>
      </div>
    `;
  }
};

// Use DOMContentLoaded to ensure the root element exists
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
