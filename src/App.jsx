// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Usar Routes en lugar de Switch
import PantallaPrincipal from './components/PantallaPrincipal';
import BibliotecaJuegos from './components/BibliotecaJuegos';
import TarjetasJuegos from './components/TarjetasJuegos';
import Reseñas from './components/Reviews';
import Estadísticas from './components/Estadisticas';
import FormularioJuego from './components/FormularioJuego';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>  {/* Usamos Routes en lugar de Switch */}
          {/* Ruta principal */}
          <Route path="/" element={<PantallaPrincipal />} />

          {/* Rutas para las otras pantallas */}
          <Route path="/biblioteca" element={<BibliotecaJuegos />} />
          <Route path="/tarjetas" element={<TarjetasJuegos />} />
          <Route path="/reseñas" element={<Reseñas />} />
          <Route path="/estadisticas" element={<Estadísticas />} />
          <Route path="/formulario-juego/:id?" element={<FormularioJuego />} /> {/* :id? es para editar un juego si tiene ID */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
