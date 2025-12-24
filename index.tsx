import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Failed to render app:", error);
    rootElement.innerHTML = '<div style="padding:20px"><h2>Application Error</h2><p>Please check the console for details.</p></div>';
  }
} else {
  console.error("Critical: Could not find root element to mount the app.");
}
