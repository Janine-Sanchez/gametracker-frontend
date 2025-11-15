// src/components/BibliotecaJuegos.jsx
import { useEffect, useState } from "react";
import { api } from "../api"; // Asegúrate de importar correctamente el archivo 'api.js'
import TarjetaJuego from "./TarjetaJuego";

export default function BibliotecaJuegos() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    api.get('/games')  // Realiza una solicitud GET para obtener los juegos
      .then((response) => {
        setGames(response.data);  // Guarda los juegos en el estado
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
