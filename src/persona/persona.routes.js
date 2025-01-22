//Rutas del CRUD de la entidad persona
import express from 'express';
import {
  createPersona,
  getAllPersonas,
  getPersonaById,
  updatePersona,
  deletePersona,
} from './persona.controller.js';
import { validatePersona } from './persona.validation.js';

export const router = express.Router();

router.post('/', validatePersona, createPersona); // Crear persona
router.get('/', getAllPersonas); // Obtener todas las personas
router.get('/:id', getPersonaById);// Obtener persona por ID
router.put('/:id', validatePersona, updatePersona);// Actualizar persona
router.delete('/:id', deletePersona); // Eliminar persona

export default router;