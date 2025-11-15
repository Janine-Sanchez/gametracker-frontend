import React, { useState, useEffect } from 'react';
import { api } from '../api'; 
import { Link, useNavigate } from 'react-router-dom'; 
import './PantallaBiblioteca.css';

const BibliotecaJuegos = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/games')
      .then(response => {
        const gamesWithRatings = response.data.map(async (game) => {
          try {
            const reviewsResponse = await api.get(`/games/${game._id}/reviews`);
            const averageRating = reviewsResponse.data.length > 0
              ? reviewsResponse.data.reduce((acc, review) => acc + review.puntuacion, 0) /
                reviewsResponse.data.length
              : null;

            return { ...game, rating: averageRating };
          } catch (error) {
            return { ...game, rating: null };
          }
        });

        Promise.all(gamesWithRatings).then((gamesFinal) => {
          setGames(gamesFinal);
        });
      })
      .catch(error => console.error('Error al obtener los juegos', error));
  }, []);

  // Eliminar juego
  const handleDelete = async (gameId) => {
    if (window.confirm('¿Seguro deseas eliminar este juego?')) {
      try {
        await api.delete(`/games/${gameId}`);
        setGames(games.filter((game) => game._id !== gameId));
      } catch (error) {
        alert('Error al eliminar el juego');
      }
    }
  };

  return (
    <div className="biblioteca-container">
      <h1>Biblioteca de Juegos</h1>

      <div className="games-list">
        {games.map((game) => (
          <div key={game._id} className="game-card">
            <h3>{game.titulo}</h3>

            <img src={game.imagenPortada} alt={game.titulo} className="game-image" />

            <p className="descripcion">{game.descripcion}</p>

            <p className="rating">
              ⭐ Rating: {game.rating !== null ? game.rating.toFixed(1) : "No disponible"}
            </p>

            <div className="card-buttons">
              <Link to={`/formulario-juego/${game._id}`}>
                <button className="btn-edit">Editar</button>
              </Link>

              <button className="btn-delete" onClick={() => handleDelete(game._id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* BOTONES INFERIORES */}
      <div className="bottom-buttons">
        <button className="btn-primary" onClick={() => navigate('/formulario-juego')}>
          Agregar nuevo juego
        </button>

        <button className="btn-secondary" onClick={() => navigate(-1)}>
          Regresar
        </button>
      </div>

      <footer>
        <p>©2025, Jóvenes Creativos. María Alquinga - Janine Sánchez</p>
      </footer>
    </div>
  );
};

export default BibliotecaJuegos;
