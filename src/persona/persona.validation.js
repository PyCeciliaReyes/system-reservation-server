import { body } from 'express-validator';

export const validatePersona = [
  body('nombrecompleto')
    .notEmpty()
    .withMessage('El campo "nombrecompleto" es obligatorio'),
  body('nrodocumento')
    .notEmpty()
    .withMessage('El campo "nrodocumento" es obligatorio'),
  body('correo')
    .notEmpty()
    .withMessage('El campo "correo" es obligatorio')
    .isEmail()
    .withMessage('El campo "correo" debe ser un correo válido'),
  body('telefono')
    .optional()
    .isString()
    .withMessage('El campo "telefono" debe ser un texto'),
];
