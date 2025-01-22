import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './config/database.js';
import personaRoutes from './persona/persona.routes.js';
import habitacionRoutes from './habitacion/habitacion.routes.js';
import reservaRoutes from './reserva/reserva.routes.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:5173', // Reemplaza con la URL del frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metodos permitidos
}));

// Verificar la conexion con la base de datos
db.authenticate()
  .then(() => console.log('Conexion a la base de datos exitosa'))
  .catch((err) => console.error('Error al conectar a la base de datos:', err));

// Punto de entrada para las rutas
app.use('/api/persona', personaRoutes);
app.use('/api/habitacion', habitacionRoutes);
app.use('/api/reserva', reservaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});