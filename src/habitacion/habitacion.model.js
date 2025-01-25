import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const Habitacion = db.define('Habitacion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  habitacionpiso: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10,
    },
  },
  habitacionnro: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 20,
    },
  },
  cantcamas: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 4,
    },
  },
  tienetelevision: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  tienefrigobar: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  tableName: 'habitacion',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['habitacionpiso', 'habitacionnro'],
    },
  ],
});

export default Habitacion;