// src/api.js
import axios from 'axios';

// Configuración de la instancia de axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api',  
});

export { api };
