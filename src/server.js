import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './config/database.js';
import { basicAuth } from './middleware/basic.Auth.js';
import personaRoutes from './persona/persona.routes.js';
import habitacionRoutes from './habitacion/habitacion.routes.js';
import reservaRoutes from './reserva/reserva.routes.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());

const allowedOrigins = [
  'https://systema-reservation.netlify.app', // Producción
  'http://localhost:5173',                   // Desarrollo
];

const corsOptions = {
  origin: (origin, callback) => {
    // Si el origen está en la lista de permitidos o no existe (para herramientas como Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  credentials: true, // Permitir cookies si es necesario
};

app.use(cors(corsOptions));

// Verificar la conexion con la base de datos
db.authenticate()
  .then(() => console.log('Conexion a la base de datos exitosa'))
  .catch((err) => console.error('Error al conectar a la base de datos:', err));

// Punto de entrada para las rutas
app.use('/api/persona', basicAuth, personaRoutes);
app.use('/api/habitacion', basicAuth, habitacionRoutes);
app.use('/api/reserva', basic, reservaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});