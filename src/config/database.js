import Sequelize from 'sequelize';
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

// Configuración de la conexión a la base de datos
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false, // Evita que los logs de consultas llenen la consola
});

export default db;

