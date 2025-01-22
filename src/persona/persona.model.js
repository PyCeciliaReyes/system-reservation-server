//modelo de 'Persona' con la definición de la tabla y sus campos
import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const Persona = db.define('Persona', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombrecompleto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nrodocumento: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'persona',
  timestamps: false,
});

export default Persona;