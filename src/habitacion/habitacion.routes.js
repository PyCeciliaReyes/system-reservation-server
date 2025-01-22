import express from 'express';
import {
  createHabitacion,
  getAllHabitaciones,
  getHabitacionById,
  updateHabitacion,
  deleteHabitacion,
} from './habitacion.controller.js';
import { validateHabitacion } from './habitacion.validation.js';

const router = express.Router();

router.post('/', validateHabitacion, createHabitacion);
router.get('/', getAllHabitaciones);
router.get('/:id', getHabitacionById);
router.put('/:id', validateHabitacion, updateHabitacion);
router.delete('/:id', deleteHabitacion);

export default router;