import { validationResult } from 'express-validator';
import { differenceInDays, isAfter, isValid, parseISO } from 'date-fns';
import Reserva from './reserva.model.js';
import Habitacion from '../habitacion/habitacion.model.js';
import Persona from '../persona/persona.model.js';

// Crear una nueva reserva
export const createReserva = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Error en los datos enviados',
      errors: errors.array(),
    });
  }

  try {
    const { fechaentrada, fechasalida, habitacionid, personaid } = req.body;
    const days = (new Date(fechasalida) - new Date(fechaentrada)) / (1000 * 60 * 60 * 24);
    const montoreserva = days * 120000;

    const reserva = await Reserva.create({
      fechaentrada,
      fechasalida,
      habitacionid,
      personaid,
      montoreserva,
    });

    res.status(201).json({
      status: 'success',
      message: 'Reserva creada exitosamente',
      data: reserva,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al crear la reserva',
      error: error.message,
    });
  }
};

// Obtener todas las reservas
export const getAllReservas = async (req, res) => {
    try {
      const reservas = await Reserva.findAll({
        include: [
          { model: Habitacion, as: 'habitacion' },
          { model: Persona, as: 'persona' },
        ],
      });
  
      res.status(200).json({
        status: 'success',
        message: 'Lista de reservas obtenida exitosamente',
        data: reservas,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Error al obtener las reservas',
        error: error.message,
      });
    }
};

// Obtener una reserva por ID
export const getReservaById = async (req, res) => {
    try {
      const { id } = req.params;
      const reserva = await Reserva.findByPk(id, {
        include: [
          { model: Habitacion, as: 'habitacion' },
          { model: Persona, as: 'persona' },
        ],
      });
  
      if (!reserva) {
        return res.status(404).json({
          status: 'error',
          message: `Reserva no encontrada con el ID: ${id}`,
        });
      }
  
      res.status(200).json({
        status: 'success',
        message: `Reserva con el ID: ${id} obtenida exitosamente`,
        data: reserva,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Error al obtener la reserva',
        error: error.message,
      });
    }
};
  
// Actualizar una reserva
export const updateReserva = async (req, res) => {
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
        const { fechaentrada, fechasalida, habitacionid, personaid } = req.body;

        const reserva = await Reserva.findByPk(id);
        if (!reserva) {
        return res.status(404).json({
            status: 'error',
            message: `Reserva con el ID: ${id} no encontrada`,
        });
        }

        // Calcular el monto de la reserva
        const days = (new Date(fechasalida) - new Date(fechaentrada)) / (1000 * 60 * 60 * 24);
        const montoreserva = days * 120000;

        await reserva.update({
        fechaentrada,
        fechasalida,
        habitacionid,
        personaid,
        montoreserva,
        });

        res.status(200).json({
        status: 'success',
        message: `Reserva con el ID: ${id} actualizada exitosamente`,
        data: reserva,
        });
    } catch (error) {
        res.status(500).json({
        status: 'error',
        message: 'Error al actualizar la reserva',
        error: error.message,
        });
    }
};

// Eliminar una reserva
export const deleteReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const reserva = await Reserva.findByPk(id);

        if (!reserva) {
        return res.status(404).json({
            status: 'error',
            message: `Reserva con el ID: ${id} no encontrada`,
        });
        }

        await reserva.destroy();

        res.status(200).json({
        status: 'success',
        message: `Reserva on el ID: ${id} eliminada exitosamente`,
        });
    } catch (error) {
        res.status(500).json({
        status: 'error',
        message: 'Error al eliminar la reserva',
        error: error.message,
        });
    }
};

export const calcularMonto = (req, res) => {
  try {
    const { fechaentrada, fechasalida } = req.query;

    // Validar que las fechas existan
    if (!fechaentrada || !fechasalida) {
      return res.status(400).json({
        status: 'error',
        message: 'Ambas fechas (fechaentrada y fechasalida) son obligatorias',
      });
    }

    // Parsear las fechas
    const entrada = parseISO(fechaentrada);
    const salida = parseISO(fechasalida);

    // Validar formato y secuencia de fechas
    if (!isValid(entrada) || !isValid(salida)) {
      return res.status(400).json({
        status: 'error',
        message: 'Las fechas deben ser válidas en formato YYYY-MM-DD',
      });
    }

    if (!isAfter(salida, entrada)) {
      return res.status(400).json({
        status: 'error',
        message: 'La fecha de salida debe ser posterior a la fecha de entrada',
      });
    }

    // Calcular el monto
    const dias = differenceInDays(salida, entrada);
    const monto = dias * 120000;

    // Devolver el monto calculado
    res.status(200).json({
      status: 'success',
      message: 'Monto calculado exitosamente',
      data: { dias, monto },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al calcular el monto',
      error: error.message,
    });
  }
};