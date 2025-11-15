import { Link } from 'react-router-dom';
import './PantallaPrincipal.css';  

const PantallaPrincipal = () => {
  return (
    <div className="main-container">
      <h1> ✨Bienvenido a nuestro GameTracker🎮</h1>
      <div className="button-container">
        <button className="styled-button"><Link to="/biblioteca">Biblioteca de Juegos</Link></button>
        <button className="styled-button"><Link to="/reviews">Reseñas</Link></button>
        <button className="styled-button"><Link to="/estadisticas">Estadísticas Personales</Link></button>
      </div>
      <footer>
        <p>©2025, Jóvenes Creativos. María Alquinga - Janine Sánchez</p>
      </footer>
    </div>
  );
};

export default PantallaPrincipal;
