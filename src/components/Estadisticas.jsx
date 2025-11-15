// src/components/Estadisticas.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../api';

const Estadísticas = () => {
  const [estadísticas, setEstadísticas] = useState({});

  useEffect(() => {
    api.get('/estadisticas')  // Deberías tener una ruta que devuelva las estadísticas de horas jugadas
      .then(response => setEstadísticas(response.data))
      .catch(error => console.error('Error al obtener estadísticas', error));
  }, []);

  return (
    <div>
      <h1>Estadísticas Personales</h1>
      <p>Horas jugadas totales: {estadísticas.totalHoras}</p>
      <p>Promedio de horas jugadas por juego: {estadísticas.promedioHoras}</p>
      <footer>
        <p>©2025, Jóvenes Creativos. María Alquinga - Janine Sánchez</p>
      </footer>
    </div>
  );
};

export default Estadísticas;
