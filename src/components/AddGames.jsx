// src/components/AddGames.jsx
import React, { useState } from 'react';
import { api } from '../api'; // Importa la instancia de axios configurada

const AddGame = () => {
  const [titulo, setTitulo] = useState('');
  const [genero, setGenero] = useState('');
  const [plataforma, setPlataforma] = useState('');
  const [añoLanzamiento, setAñoLanzamiento] = useState('');
  const [desarrollador, setDesarrollador] = useState('');
  const [imagenPortada, setImagenPortada] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [completado, setCompletado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newGame = {
      titulo,
      genero,
      plataforma,
      añoLanzamiento,
      desarrollador,
      imagenPortada,
      descripcion,
      completado
    };

    try {
      await api.post('/games', newGame);  // Enviar datos al backend
      alert('Juego agregado con éxito');
      setTitulo('');
      setGenero('');
      setPlataforma('');
      setAñoLanzamiento('');
      setDesarrollador('');
      setImagenPortada('');
      setDescripcion('');
      setCompletado(false);
    } catch (error) {
      console.error('Hubo un error al agregar el juego', error);
    }
  };

  return (
    <div>
      <h2>Agregar un nuevo juego</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título" required />
        <input type="text" value={genero} onChange={(e) => setGenero(e.target.value)} placeholder="Género" required />
        <input type="text" value={plataforma} onChange={(e) => setPlataforma(e.target.value)} placeholder="Plataforma" required />
        <input type="number" value={añoLanzamiento} onChange={(e) => setAñoLanzamiento(e.target.value)} placeholder="Año de Lanzamiento" required />
        <input type="text" value={desarrollador} onChange={(e) => setDesarrollador(e.target.value)} placeholder="Desarrollador" required />
        <input type="text" value={imagenPortada} onChange={(e) => setImagenPortada(e.target.value)} placeholder="URL de la Imagen de Portada" required />
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción"></textarea>
        <label>
          Juego completado
          <input type="checkbox" checked={completado} onChange={() => setCompletado(!completado)} />
        </label>
        <button type="submit">Agregar Juego</button>
      </form>
    </div>
  );
};

export default AddGame;
