// src/components/PantallaPrincipal.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PantallaPrincipal = () => {
  return (
    <div>
      <h1>Bienvenido a nuestro GameTracker</h1>
      <div>
        <button><Link to="/biblioteca">Biblioteca de Juegos</Link></button>
        <button><Link to="/tarjetas">Tarjetas de Juegos</Link></button>
        <button><Link to="/reseñas">Reseñas</Link></button>
        <button><Link to="/estadisticas">Estadísticas Personales</Link></button>
      </div>
      <footer>
        <p>©2025, Jóvenes Creativos. María Alquinga - Janine Sánchez</p>
      </footer>
    </div>
  );
};

export default PantallaPrincipal;
