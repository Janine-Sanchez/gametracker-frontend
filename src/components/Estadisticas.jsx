// src/components/Estadisticas.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom'; // <-- ¡IMPORTANTE! Asegúrate de importar esto
import './Estadisticas.css'; // <-- 1. IMPORTA EL NUEVO CSS

const Estadísticas = () => {
  const [estadísticas, setEstadísticas] = useState({});
  const navigate = useNavigate(); // <-- ¡IMPORTANTE! Y definirlo aquí

  useEffect(() => {
    api.get('/estadisticas')
      .then(response => setEstadísticas(response.data))
      .catch(error => console.error('Error al obtener estadísticas', error));
  }, []);

  return (
    // 2. AGREGA LA CLASE AL CONTENEDOR PRINCIPAL
    <div className="stats-page-container"> 
      <h1>Estadísticas Personales</h1>

      {/* 2. AGREGA ESTE 'div' PARA LA TARJETA "BONITA" */}
      <div className="stat-card">
        <p>Horas jugadas totales: {estadísticas.totalHoras || 0}</p>
        <p>Promedio por juego: {estadísticas.promedioHoras || 0}</p>
      </div>

      <button className="retroceder-btn" onClick={() => navigate(-1)}>Volver</button>

      <footer>
        <p>©2025, Jóvenes Creativos. María Alquinga - Janine Sánchez</p>
      </footer>
    </div>
  );
};

export default Estadísticas;