// src/components/Reviews.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../api';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);  // Cambié 'reseñas' por 'reviews'
  const [textoReseña, setTextoReseña] = useState('');
  const [rating, setRating] = useState(1);

  useEffect(() => {
    api.get('/reseñas')  // Verifica que la URL sea correcta para el backend
      .then(response => setReviews(response.data))  // Cambié 'reseñas' por 'reviews'
      .catch(error => console.error('Error al obtener las reseñas', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaReseña = { textoReseña, rating };
    api.post('/reseñas', nuevaReseña);  // Verifica que la URL sea correcta para el backend
    setTextoReseña('');
  };

  return (
    <div>
      <h1>Reseñas</h1>  {/* Cambié 'Reseñas' por 'Reviews' si lo prefieres */}
      <form onSubmit={handleSubmit}>
        <textarea
          value={textoReseña}
          onChange={(e) => setTextoReseña(e.target.value)}
          placeholder="Escribe tu reseña"
        />
        <div>
          {[1, 2, 3, 4, 5].map(star => (
            <span
              key={star}
              onClick={() => setRating(star)}
              style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
            >
              ★
            </span>
          ))}
        </div>
        <button type="submit">Enviar Reseña</button>
      </form>

      <ul>
        {reviews.map((review) => (  // Cambié 'reseñas' por 'reviews'
          <li key={review._id}>
            <p>{review.textoReseña}</p>
            <p>⭐ {review.rating}</p>
          </li>
        ))}
      </ul>

      <footer>
        <p>©2025, Jóvenes Creativos. María Alquinga - Janine Sánchez</p>
      </footer>
    </div>
  );
};

export default Reviews;
