import { Router } from 'express';
import {
  traerTodosLosEstudiantes, 
  traerUnEstudiante,
  crearEstudiante, 
  actualizarEstudiante, 
  eliminarEstudiante 
} from '../controller/estudiantes.controller.ts';
import { validarEstudiante } from '../middlewares/estudiantes.middlewares.ts';

const router = Router();

router.get('/', traerTodosLosEstudiantes);
router.get('/:id', traerUnEstudiante);
router.post('/', validarEstudiante, crearEstudiante);
router.put('/:id', validarEstudiante, actualizarEstudiante);
router.delete('/:id', eliminarEstudiante);

export default router;