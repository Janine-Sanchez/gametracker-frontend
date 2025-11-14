// src/components/AddGames.js
import React, { useState } from 'react';
import axios from 'axios';

const AddGame = () => {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [platform, setPlatform] = useState('');
  const [hoursPlayed, setHoursPlayed] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    // Verificar los datos antes de enviarlos
    const newGame = { name, genre, platform, hoursPlayed };
    console.log("Datos del juego a enviar:", newGame);  // Agrega esto para comprobar los datos

    try {
      // Enviar los datos al backend
      await axios.post('http://localhost:5000/api/games', newGame);
      alert('Juego agregado con éxito');

      // Limpiar el formulario después de agregar el juego
      setName('');
      setGenre('');
      setPlatform('');
      setHoursPlayed(0);
    } catch (error) {
      console.error('Hubo un error al agregar el juego', error);
    }
  };

  return (
    <div>
      <h2>Agregar un nuevo juego</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre del juego"
          required
        />
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Género"
          required
        />
        <input
          type="text"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          placeholder="Plataforma"
          required
        />
        <input
          type="number"
          value={hoursPlayed}
          onChange={(e) => setHoursPlayed(e.target.value)}
          placeholder="Horas jugadas"
          required
        />
        <button type="submit">Agregar Juego</button>
      </form>
    </div>
  );
};

export default AddGame;
