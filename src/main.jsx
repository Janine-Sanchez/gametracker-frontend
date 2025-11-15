// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Asegúrate de que este sea el nombre de tu componente principal
import './index.css';     // Este archivo contiene los estilos globales de la aplicación

// Renderiza la aplicación React dentro del div con id "root" en index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
