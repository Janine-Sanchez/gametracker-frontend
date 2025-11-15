// src/App.jsx
import React from 'react';
import AddGame from './components/AddGames';
import BibliotecaJuegos from './components/BibliotecaJuegos';

const App = () => {
  return (
    <div className="App">
      <h1>Bienvenido a GameTracker</h1>
      <AddGame />  {/* Componente para agregar un juego */}
      <BibliotecaJuegos />  {/* Componente para mostrar la lista de juegos */}
    </div>
  );
};

export default App;
