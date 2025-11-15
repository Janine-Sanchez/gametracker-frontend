import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import './FormularioJuego.css';

const FormularioJuego = () => {
  const [game, setGame] = useState({
    titulo: '',
    genero: '',
    plataforma: '',
    añoLanzamiento: '',
    desarrollador: '',
    imagenPortada: '',
    descripcion: '',
    completado: false,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get(`/games/${id}`)
        .then(response => setGame(response.data))
        .catch(error => console.error('Error al obtener el juego:', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      api.put(`/games/${id}`, game)
        .then(response => {
          alert('Juego actualizado con éxito');
          navigate('/biblioteca');
        })
        .catch(error => {
          console.error('Error al actualizar el juego:', error);
          alert('Hubo un error al actualizar el juego.');
        });
    } else {
      api.post('/games', game)
        .then(response => {
          alert('Juego agregado con éxito');
          navigate('/biblioteca');
        })
        .catch(error => {
          console.error('Error al agregar el juego:', error);
          alert('Hubo un error al agregar el juego.');
        });
    }
  };

  return (
    <div className="formulario-container">
      <h2>{id ? 'Actualizar Juego' : 'Agregar Juego'}</h2>
      <form onSubmit={handleSubmit} className="form">
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
        <input
          type="number"
          value={game.añoLanzamiento}
          onChange={(e) => setGame({ ...game, añoLanzamiento: e.target.value })}
          placeholder="Año de Lanzamiento"
          required
        />
        <input
          type="text"
          value={game.desarrollador}
          onChange={(e) => setGame({ ...game, desarrollador: e.target.value })}
          placeholder="Desarrollador"
          required
        />
        <input
          type="text"
          value={game.imagenPortada}
          onChange={(e) => setGame({ ...game, imagenPortada: e.target.value })}
          placeholder="URL Imagen Portada (ejemplo: /images/juego1.jpg)"
        />
        <textarea
          value={game.descripcion}
          onChange={(e) => setGame({ ...game, descripcion: e.target.value })}
          placeholder="Descripción"
        />
        <label>
          Juego completado
          <input
            type="checkbox"
            checked={game.completado}
            onChange={() => setGame({ ...game, completado: !game.completado })}
          />
        </label>
        
        {/* Contenedor de los botones */}
        <div className="button-container">
          <button type="submit">{id ? 'Actualizar' : 'Agregar'} Juego</button>
          <button type="button" onClick={() => navigate(-1)}>Regresar</button>
        </div>
      </form>

      <footer>
        <p>©2025, Jóvenes Creativos. María Alquinga - Janine Sánchez</p>
      </footer>
    </div>
  );
};

export default FormularioJuego;
