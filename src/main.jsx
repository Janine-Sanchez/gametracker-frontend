import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; 
import './index.css';   

// Renderiza la aplicación React dentro del div con id "root" en index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
