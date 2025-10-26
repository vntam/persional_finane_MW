import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

// Entry point kept lean so future state management/bootstrap logic stays obvious.
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
