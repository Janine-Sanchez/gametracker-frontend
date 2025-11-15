import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { useParams } from 'react-router-dom';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [textoReseña, setTextoReseña] = useState('');
  const [rating, setRating] = useState(1);
  const [horasJugadas, setHorasJugadas] = useState(0);
  const [dificultad, setDificultad] = useState('Normal');
  const [recomendaria, setRecomendaria] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  const { gameId } = useParams();  // Aquí obtenemos el gameId desde la URL

  // Obtener las reseñas del juego específico
  useEffect(() => {
    if (gameId) {
      api.get(`/games/${gameId}/reviews`)
        .then(response => setReviews(response.data))
        .catch(error => console.error('Error al obtener las reseñas', error));
    }
  }, [gameId]);

  // Función para agregar o actualizar la reseña
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const nuevaReseña = { 
      textoReseña, 
      rating, 
      horasJugadas, 
      dificultad, 
      recomendaria, 
      juegoId: gameId 
    };

    if (editingReview) {
      api.put(`/reviews/${editingReview._id}`, nuevaReseña)
        .then(response => {
          setReviews(reviews.map(r => (r._id === response.data._id ? response.data : r)));
          resetForm();
        })
        .catch(error => console.error('Error al actualizar la reseña', error));
    } else {
      api.post('/reviews', nuevaReseña)
        .then(response => {
          setReviews([...reviews, response.data]);
          resetForm();
        })
        .catch(error => console.error('Error al agregar la reseña', error));
    }
  };

  const resetForm = () => {
    setTextoReseña('');
    setRating(1);
    setHorasJugadas(0);
    setDificultad('Normal');
    setRecomendaria(false);
    setEditingReview(null);
  };

  const handleDelete = (reviewId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta reseña?')) {
      api.delete(`/reviews/${reviewId}`)
        .then(() => setReviews(reviews.filter(review => review._id !== reviewId)))
        .catch(error => console.error('Error al eliminar la reseña', error));
    }
  };

  const handleEdit = (review) => {
    setTextoReseña(review.textoReseña);
    setRating(review.puntuacion);
    setHorasJugadas(review.horasJugadas);
    setDificultad(review.dificultad);
    setRecomendaria(review.recomendaria);
    setEditingReview(review);
  };

  return (
    <div>
      <h1>Reseñas del Juego</h1>

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

        <div>
          <label>Horas Jugadas</label>
          <input
            type="number"
            value={horasJugadas}
            onChange={(e) => setHorasJugadas(e.target.value)}
            placeholder="Horas jugadas"
          />
        </div>

        <div>
          <label>Dificultad</label>
          <select 
            value={dificultad} 
            onChange={(e) => setDificultad(e.target.value)}
          >
            <option value="Fácil">Fácil</option>
            <option value="Normal">Normal</option>
            <option value="Difícil">Difícil</option>
          </select>
        </div>

        <div>
          <label>¿Recomendarías este juego?</label>
          <input
            type="checkbox"
            checked={recomendaria}
            onChange={() => setRecomendaria(!recomendaria)}
          />
        </div>

        <button type="submit">{editingReview ? 'Actualizar' : 'Enviar'} Reseña</button>
      </form>

      <ul>
        {reviews.map((review) => (
          <li key={review._id}>
            <p>{review.textoReseña}</p>
            <p>⭐ {review.puntuacion}</p>
            <p>Horas Jugadas: {review.horasJugadas}</p>
            <p>Dificultad: {review.dificultad}</p>
            <p>Recomendaría: {review.recomendaria ? 'Sí' : 'No'}</p>
            <button onClick={() => handleEdit(review)}>Editar</button>
            <button onClick={() => handleDelete(review._id)}>Eliminar</button>
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
