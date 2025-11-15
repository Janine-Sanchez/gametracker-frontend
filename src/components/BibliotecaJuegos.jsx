// src/components/BibliotecaJuegos.jsx
import { useEffect, useState } from 'react';
import { api } from '../api';
import { Link } from 'react-router-dom';

const BibliotecaJuegos = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    api.get('/games')
      .then(response => setGames(response.data))
      .catch(error => console.error('Error al obtener los juegos', error));
  }, []);

  return (
    <div>
      <h1>Biblioteca de Juegos</h1>
      <div>
        {games.map(game => (
          <div key={game._id}>
            <h3>{game.titulo}</h3>
            <p>{game.descripcion}</p>
            <a href={game.urlOfficial} target="_blank" rel="noopener noreferrer">Ir al sitio oficial</a>
          </div>
        ))}
      </div>
      <button><Link to="/formulario-juego">Agregar/Actualizar Juego</Link></button>
      <footer>
        <p>©2025, Jóvenes Creativos. María Alquinga - Janine Sánchez</p>
      </footer>
    </div>
  );
};

export default BibliotecaJuegos;
