import { useEffect, useState } from 'react';
import { api } from '../api';  // Esto es para hacer las peticiones al backend
import TarjetaJuego from './TarjetaJuego';  // Este es el componente que mostrará cada juego

export default function BibliotecaJuegos() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    // Obtener los juegos desde el backend
    api.get('/games')
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => {
        console.error('Hubo un error al obtener los juegos:', error);
      });
  }, []);

  return (
    <div>
      <h1>Mi Biblioteca de Juegos</h1>
      <div>
        {games.map((game) => (
          <TarjetaJuego key={game._id} game={game} />
        ))}
      </div>
    </div>
  );
}
