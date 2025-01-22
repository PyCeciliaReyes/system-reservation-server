import express from 'express';
import {
  createReserva,
  getAllReservas,
  getReservaById,
  updateReserva,
  deleteReserva,
} from './reserva.controller.js';
import { validateReserva } from './reserva.validation.js';

const router = express.Router();

router.post('/', validateReserva, createReserva);// Crear una reserva
router.get('/', getAllReservas); // Obtener todas las reservas
router.get('/:id', getReservaById);  // Obtener una reserva por ID
router.put('/:id', validateReserva, updateReserva); // Actualizar una reserva
router.delete('/:id', deleteReserva);  // Eliminar una reserva

export default router;