import { validationResult } from 'express-validator';
import Habitacion from './habitacion.model.js';

// Crear una nueva habitacion
export const createHabitacion = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Error en los datos enviados',
      errors: errors.array(),
    });
  }

  try {
    const habitacion = await Habitacion.create(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Habitación creada exitosamente',
      data: habitacion,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al crear la habitación',
      error: error.message,
    });
  }
};

// Obtener todas las habitaciones
export const getAllHabitaciones = async (req, res) => {
  try {
    const habitaciones = await Habitacion.findAll();
    res.status(200).json({
      status: 'success',
      message: 'Lista de habitaciones obtenida exitosamente',
      data: habitaciones,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener las habitaciones',
      error: error.message,
    });
  }
};

// Obtener habitación por ID
export const getHabitacionById = async (req, res) => {
  try {
    const { id } = req.params;
    const habitacion = await Habitacion.findByPk(id);
    if (!habitacion) {
      return res.status(404).json({
        status: 'error',
        message: `Habitación con ID ${id} no encontrada`,
      });
    }
    res.status(200).json({
      status: 'success',
      message: `Habitación con ID ${id} obtenida exitosamente`,
      data: habitacion,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener la habitación',
      error: error.message,
    });
  }
};

// Actualizar una habitación
export const updateHabitacion = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Error en los datos enviados',
      errors: errors.array(),
    });
  }

  try {
    const { id } = req.params;
    const habitacion = await Habitacion.findByPk(id);
    if (!habitacion) {
      return res.status(404).json({
        status: 'error',
        message: `Habitación no encontrada con ID ${id}`,
      });
    }
    await habitacion.update(req.body);
    res.status(200).json({
      status: 'success',
      message: `Habitación con ID ${id} actualizada exitosamente`,
      data: habitacion,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al actualizar la habitación',
      error: error.message,
    });
  }
};

// Eliminar una habitación
export const deleteHabitacion = async (req, res) => {
  try {
    const { id } = req.params;
    const habitacion = await Habitacion.findByPk(id);
    if (!habitacion) {
      return res.status(404).json({
        status: 'error',
        message: `Habitación no encontrada con ID ${id}`,
      });
    }
    await habitacion.destroy();
    res.status(200).json({
      status: 'success',
      message: `Habitación con ID ${id} eliminada exitosamente`,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al eliminar la habitación',
      error: error.message,
    });
  }
};