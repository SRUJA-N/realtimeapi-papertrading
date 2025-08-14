// ------------------------------
// REACT IMPORTS
// ------------------------------
import { StrictMode } from 'react';             // Enables extra checks and warnings in development
import { createRoot } from 'react-dom/client'; // React 18+ API for rendering

// ------------------------------
// STYLES & APP COMPONENT
// ------------------------------
import './index.css';  // Global CSS styles
import App from './App'; // Main App component containing all routes

// ------------------------------
// RENDERING THE APP
// ------------------------------
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* StrictMode helps highlight potential problems in the app */}
    <App />
  </StrictMode>,
);
