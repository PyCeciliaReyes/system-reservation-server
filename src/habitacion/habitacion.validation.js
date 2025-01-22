import { body } from 'express-validator';

export const validateHabitacion = [
  body('habitacionpiso')
    .notEmpty()
    .withMessage('El campo "habitacionpiso" es obligatorio')
    .isInt({ min: 1, max: 10 })
    .withMessage('El "habitacionpiso" debe ser un número entre 1 y 10'),
  body('habitacionnro')
    .notEmpty()
    .withMessage('El campo "habitacionnro" es obligatorio')
    .isInt({ min: 1, max: 20 })
    .withMessage('El "habitacionnro" debe ser un número entre 1 y 20'),
  body('cantcamas')
    .notEmpty()
    .withMessage('El campo "cantcamas" es obligatorio')
    .isInt({ min: 1, max: 4 })
    .withMessage('El "cantcamas" debe ser un número entre 1 y 4'),
  body('tienetelevision')
    .notEmpty()
    .withMessage('El campo "tienetelevision" es obligatorio')
    .isBoolean()
    .withMessage('El campo "tienetelevision" debe ser verdadero o falso'),
  body('tienefrigobar')
    .notEmpty()
    .withMessage('El campo "tienefrigobar" es obligatorio')
    .isBoolean()
    .withMessage('El campo "tienefrigobar" debe ser verdadero o falso'),
];