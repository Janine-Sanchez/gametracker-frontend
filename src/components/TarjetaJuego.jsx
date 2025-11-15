import React from 'react';

export default function TarjetaJuego({ game }) {
  return (
    <div className="card">
      <img src={game.coverUrl} alt={game.title} />
      <h3>{game.title}</h3>
      <p>Plataforma: {game.platform}</p>
      <p>Horas Jugadas: {game.hoursPlayed}</p>
      <p>⭐ Rating: {game.rating}</p>
    </div>
  );
}
