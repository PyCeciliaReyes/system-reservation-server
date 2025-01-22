import { body } from 'express-validator';
import { Op } from 'sequelize';
import Reserva from './reserva.model.js';
import Habitacion from '../habitacion/habitacion.model.js';
import Persona from '../persona/persona.model.js';

export const validateReserva = [
  body('fechaentrada')
    .notEmpty()
    .withMessage('El campo "fechaentrada" es obligatorio')
    .isISO8601()
    .withMessage('El campo "fechaentrada" debe ser una fecha valida')
    .custom((value) => {
      const entrada = new Date(value);
      if (entrada <= new Date()) {
        throw new Error('La "fechaentrada" debe ser posterior al dia actual');
      }
      return true;
    }),
  body('fechasalida')
    .notEmpty()
    .withMessage('El campo "fechasalida" es obligatorio')
    .isISO8601()
    .withMessage('El campo "fechasalida" debe ser una fecha valida')
    .custom((value, { req }) => {
      const entrada = new Date(req.body.fechaentrada);
      const salida = new Date(value);
      if (salida <= entrada) {
        throw new Error('La "fechasalida" debe ser posterior a la "fechaentrada"');
      }
      return true;
    }),
  body('habitacionid')
    .notEmpty()
    .withMessage('El campo "habitacionid" es obligatorio')
    .custom(async (value, { req }) => {
      const habitacion = await Habitacion.findByPk(value);
      if (!habitacion) {
        throw new Error('La habitacion no existe');
      }
      const reservas = await Reserva.findAll({
        where: {
          habitacionid: value,
          fechaentrada: { [Op.lt]: req.body.fechasalida },
          fechasalida: { [Op.gt]: req.body.fechaentrada },
        },
      });
      if (reservas.length > 0) {
        throw new Error('La habitacion no esta disponible en las fechas solicitadas');
      }
      return true;
    }),
  body('personaid')
    .notEmpty()
    .withMessage('El campo "personaid" es obligatorio')
    .custom(async (value) => {
      const persona = await Persona.findByPk(value);
      if (!persona) {
        throw new Error('La persona no existe');
      }
      return true;
    }),
];