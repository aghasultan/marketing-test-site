import { Buffer } from 'buffer';
globalThis.Buffer = Buffer;

import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'

import '@fontsource/inter-tight/400.css';
import '@fontsource/inter-tight/500.css';
import '@fontsource/inter-tight/600.css';
import '@fontsource/inter-tight/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';

import App from './App.tsx'
import './globals.css'
import '../../style.css'
import '../../animations.css'
import '../i18n';


import { initTracking } from '@/lib/tracking';

// Initialize tracking
initTracking();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)
