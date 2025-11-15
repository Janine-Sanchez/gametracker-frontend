import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import PantallaPrincipal from './components/PantallaPrincipal';
import BibliotecaJuegos from './components/BibliotecaJuegos';
import Reseñas from './components/Reviews';
import Estadísticas from './components/Estadisticas';
import FormularioJuego from './components/FormularioJuego';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes> 
          {/* Ruta principal */}
          <Route path="/" element={<PantallaPrincipal />} />

          {/* Rutas para las otras pantallas */}
          <Route path="/biblioteca" element={<BibliotecaJuegos />} />
          <Route path="/reviews" element={<Reseñas />} />
          <Route path="/estadisticas" element={<Estadísticas />} />
          <Route path="/formulario-juego/:id?" element={<FormularioJuego />} /> {/* :id? es para editar un juego si tiene ID */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
