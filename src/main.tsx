import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import '@itsect3r/bortx/borders/styles';
import '@itsect3r/bortx/text/styles';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
