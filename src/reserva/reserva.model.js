import { DataTypes } from 'sequelize';
import db from '../config/database.js';
import Habitacion from '../habitacion/habitacion.model.js';
import Persona from '../persona/persona.model.js';

const Reserva = db.define('Reserva', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fechareserva: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  fechaentrada: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  fechasalida: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  montoreserva: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'reserva',
  timestamps: false,
});

// Relaciones
Reserva.belongsTo(Habitacion, { foreignKey: 'habitacionid', as: 'habitacion' });
Reserva.belongsTo(Persona, { foreignKey: 'personaid', as: 'persona' });

export default Reserva;