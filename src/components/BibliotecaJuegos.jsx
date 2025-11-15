// src/components/BibliotecaJuegos.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../api'; 
import { Link, useNavigate } from 'react-router-dom'; 
import './PantallaBiblioteca.css';  // Importa el archivo CSS

const BibliotecaJuegos = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate(); // Usamos useNavigate para la navegación

  useEffect(() => {
    api.get('/games')
      .then(response => {
        console.log('Juegos obtenidos:', response.data);  // Verifica que los juegos se obtienen correctamente

        const gamesWithRatings = response.data.map(async (game) => {
          try {
            // Cambia la ruta a '/games/${game._id}/reviews' si tu API la tiene así (asumiendo que es más estándar)
            // Si no, verifica en tu backend cuál es la ruta correcta para obtener reseñas por gameId
            const reviewsResponse = await api.get(`/games/${game._id}/reviews`);
            console.log(`Reseñas para ${game.titulo}:`, reviewsResponse.data);  // Verifica las reseñas para cada juego
            
            // Calcular el rating promedio
            const averageRating = reviewsResponse.data.length > 0
              ? reviewsResponse.data.reduce((acc, review) => acc + review.puntuacion, 0) / reviewsResponse.data.length
              : null;

            console.log(`Rating promedio para ${game.titulo}:`, averageRating);  // Verifica el rating calculado
            return { ...game, rating: averageRating };  // Añadir el rating al juego
          } catch (error) {
            console.error(`Error al obtener reseñas para el juego ${game.titulo}:`, error);
            return { ...game, rating: null };  // Si ocurre un error, asignamos rating null
          }
        });

        // Esperar a que todas las promesas se resuelvan
        Promise.all(gamesWithRatings).then((gamesWithRatings) => {
          console.log('Juegos con ratings:', gamesWithRatings);  // Verifica que los juegos con ratings se han guardado correctamente
          setGames(gamesWithRatings);  // Guardamos los juegos con los ratings calculados
        });
      })
      .catch(error => console.error('Error al obtener los juegos y reseñas', error));
  }, []);

  // Función para eliminar un juego
  const handleDelete = async (gameId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este juego?')) {
      try {
        const response = await api.delete(`/games/${gameId}`);
        alert(response.data.message);  // Muestra el mensaje de éxito
        // Elimina el juego de la lista en el frontend sin necesidad de recargar la página
        setGames(games.filter(game => game._id !== gameId));
      } catch (error) {
        console.error('Error al eliminar el juego', error);
        alert('Hubo un error al eliminar el juego');
      }
    }
  };

  return (
    <div className="content-container">
      <h1>Biblioteca de Juegos</h1>
      <div className="games-list">
        {games.map((game) => (
          <div key={game._id} className="game-container">
            <h3>{game.titulo}</h3>
            <img 
              src={game.imagenPortada} 
              alt={game.titulo} 
              className="game-image" 
            />
            <p>{game.descripcion}</p>

            {/* Mostrar el rating (si está disponible) */}
            <p>⭐ Rating: {game.rating !== null ? game.rating.toFixed(1) : 'No disponible'}</p>

            <Link to={`/formulario-juego/${game._id}`}>
              <button>Editar</button>
            </Link>

            {/* Botón para eliminar el juego */}
            <button onClick={() => handleDelete(game._id)}>Eliminar</button>
          </div>
        ))}
      </div>

      {/* Botón de agregar nuevo juego con navegación usando navigate */}
      <button onClick={() => navigate('/formulario-juego')}>Agregar nuevo juego</button>

      {/* Botón de regreso */}
      <button onClick={() => navigate(-1)}>Regresar</button>

      <footer>
        <p>©2025, Jóvenes Creativos. María Alquinga - Janine Sánchez</p>
      </footer>
    </div>
  );
};

export default BibliotecaJuegos;
