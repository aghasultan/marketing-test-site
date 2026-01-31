import { Buffer } from 'buffer';
globalThis.Buffer = Buffer;

import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import '../style.css'
import '../animations.css'
import './i18n';


import { initTracking } from './lib/tracking';

// Initialize tracking
initTracking();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
