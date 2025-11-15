// src/components/TarjetasJuegos.jsx
import React, { useState } from 'react';

const TarjetaJuego = ({ game }) => {
  const [rating, setRating] = useState(game.rating || 0);

  const handleRating = (newRating) => {
    setRating(newRating);
    // Aquí deberías agregar la lógica para actualizar la puntuación en el backend
    api.put(`/games/${game._id}/rating`, { rating: newRating });
  };

  return (
    <div>
      <h3>{game.titulo}</h3>
      <p>{game.descripcion}</p>
      <div>
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            onClick={() => handleRating(star)}
            style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
          >
            ★
          </span>
        ))}
      </div>
      <footer>
        <p>©2025, Jóvenes Creativos. María Alquinga - Janine Sánchez</p>
      </footer>
    </div>
  );
};

export default TarjetaJuego;
