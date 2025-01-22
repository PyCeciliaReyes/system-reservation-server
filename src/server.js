import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import db from './config/database.js';
import personaRoutes from './persona/persona.routes.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Verificar la conexión con la base de datos
db.authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch((err) => console.error('Error al conectar a la base de datos:', err));

// Punto de entrada para las rutas
app.use('/api/persona', personaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});