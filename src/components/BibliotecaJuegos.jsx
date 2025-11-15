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
      .then(response => setGames(response.data))
      .catch(error => console.error('Error al obtener los juegos', error));
  }, []);

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
            <Link to={`/formulario-juego/${game._id}`}>
              <button>Editar</button>
            </Link>
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
