//controlador de la entidad persona. Implementa las funciones CRUD para la entidad persona.
import { validationResult } from 'express-validator';
import Persona from './persona.model.js';

// Crear una nueva persona
export const createPersona = async (req, res) => {
    // Validar los datos de entrada
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Error en los datos enviados',
      errors: errors.array(),
    });
  }

  try {
    const { nombrecompleto, nrodocumento, correo, telefono } = req.body;
    const newPersona = await Persona.create({ nombrecompleto, nrodocumento, correo, telefono });
    res.status(201).json({
      status: 'success',
      message: 'Persona creada exitosamente',
      data: newPersona,
    });
  } catch (error) {
    res.status(500).json({
        status: 'error',
        message: 'Error al crear la persona',
        error: error.message,
    });
  }
};

// Obtener todas las personas
export const getAllPersonas = async (req, res) => {
  try {
    const personas = await Persona.findAll();
    res.status(200).json({
        status: 'success',
        message: 'Lista de personas obtenida exitosamente',
        data: personas,
    });
  } catch (error) {
    res.status(500).json({
        status: 'error',
        message: 'Error al obtener las personas',
        error: error.message,
    });
  }
};

// Obtener una persona por ID
export const getPersonaById = async (req, res) => {
  try {
    const { id } = req.params;
    const persona = await Persona.findByPk(id);
    if (!persona) return res.status(404).json({ message: `Persona no encontrada con el ID: ${id}` });
    res.status(200).json({
        status: 'success',
        message: `Persona obtenida exitosamente con ID: ${id}`,
        data: persona,
    });
  } catch (error) {
    res.status(500).json({
        status: 'error',
        message: `Error al obtener las personas con el ID: ${id}`, 
        error: error.message 
    });
  }
};

// Actualizar una persona
export const updatePersona = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombrecompleto, nrodocumento, correo, telefono } = req.body;

    const persona = await Persona.findByPk(id);
    if (!persona) return res.status(404).json({ message: 'Persona no encontrada' });

    persona.nombrecompleto = nombrecompleto || persona.nombrecompleto;
    persona.nrodocumento = nrodocumento || persona.nrodocumento;
    persona.correo = correo || persona.correo;
    persona.telefono = telefono || persona.telefono;

    await persona.save();
    res.status(200).json({
        status: 'success',
        message: `Persona con id: ${id} actualizada exitosamente`,
        data: persona,
    });
  } catch (error) {
    res.status(500).json({
        status: 'error',
        message: `Error al actualizar la persona con ID: ${id}`,
        error: error.message, 
    });
  }
};

// Eliminar una persona
export const deletePersona = async (req, res) => {
  try {
    const { id } = req.params;
    const persona = await Persona.findByPk(id);
    if (!persona) return res.status(404).json({ message: `Persona con ID: ${id} no encontrada` });

    await persona.destroy();
    res.status(200).json({
        status: 'success', 
        message: `Persona con ID: ${id} eliminada exitosamente` 
    });
  } catch (error) {
    res.status(500).json({
        status: 'error',
        message: `Error al eliminar a la persona con ID: ${id}`, 
        error: error.message, 
    });
  }
};