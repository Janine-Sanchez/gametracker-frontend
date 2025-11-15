import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom'; 
import './Estadisticas.css'; 

const Estadísticas = () => {
  const [estadísticas, setEstadísticas] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/estadisticas')
      .then(response => setEstadísticas(response.data))
      .catch(error => console.error('Error al obtener estadísticas', error));
  }, []);

  return (
    // AGREGA LA CLASE AL CONTENEDOR PRINCIPAL
    <div className="stats-page-container"> 
      <h1>Estadísticas Personales</h1>

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