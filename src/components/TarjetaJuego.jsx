// src/components/TarjetaJuego.jsx
import React from 'react';

export default function TarjetaJuego({ game }) {
  return (
    <div className="card">
      <img src={game.imagenPortada} alt={game.titulo} />
      <h3>{game.titulo}</h3>
      <p>Plataforma: {game.plataforma}</p>
      <p>Año de Lanzamiento: {game.añoLanzamiento}</p>
      <p>⭐ Rating: {game.rating || 'No rating'}</p>
    </div>
  );
}
