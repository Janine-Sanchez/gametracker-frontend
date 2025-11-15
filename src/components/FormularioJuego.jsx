// src/components/FormularioJuego.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { useParams } from 'react-router-dom';

const FormularioJuego = () => {
  const [game, setGame] = useState({ titulo: '', genero: '', plataforma: '', descripcion: '', imagenPortada: '' });
  const { id } = useParams();  // Para obtener el id del juego si se está editando

  useEffect(() => {
    if (id) {
      api.get(`/games/${id}`)
        .then(response => setGame(response.data))
        .catch(error => console.error('Error al obtener el juego', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      api.put(`/games/${id}`, game);  // Actualizar el juego
    } else {
      api.post('/games', game);  // Agregar un nuevo juego
    }
  };

  return (
    <div>
      <h2>{id ? 'Actualizar Juego' : 'Agregar Juego'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={game.titulo}
          onChange={(e) => setGame({ ...game, titulo: e.target.value })}
          placeholder="Título"
          required
        />
        <input
          type="text"
          value={game.genero}
          onChange={(e) => setGame({ ...game, genero: e.target.value })}
          placeholder="Género"
          required
        />
        <input
          type="text"
          value={game.plataforma}
          onChange={(e) => setGame({ ...game, plataforma: e.target.value })}
          placeholder="Plataforma"
          required
        />
        <textarea
          value={game.descripcion}
          onChange={(e) => setGame({ ...game, descripcion: e.target.value })}
          placeholder="Descripción"
        />
        <input
          type="text"
          value={game.imagenPortada}
          onChange={(e) => setGame({ ...game, imagenPortada: e.target.value })}
          placeholder="URL Imagen Portada"
        />
        <button type="submit">{id ? 'Actualizar' : 'Agregar'} Juego</button>
      </form>
      <footer>
        <p>©2025, Jóvenes Creativos. María Alquinga - Janine Sánchez</p>
      </footer>
    </div>
  );
};

export default FormularioJuego;
