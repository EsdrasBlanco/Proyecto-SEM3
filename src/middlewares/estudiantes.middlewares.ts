import type { Request, Response, NextFunction } from 'express';
import type { Estudiante } from '../interfaces/estudiantes.interfaces.ts';

export const validarEstudiante = (req: Request, res: Response, next: NextFunction): void => {
  const { nombre, email, bootcamp, activo } = req.body as Partial<Estudiante>;

  if (!nombre || typeof nombre !== 'string' || !nombre) {
    res.status(400).json({ ok: false, error: 'El campo "nombre" es obligatorio y debe ser texto.' });
    return;
  }

  if (email === undefined || email === null || typeof email !== 'string' || !email) {
    res.status(400).json({ ok: false, error: 'El campo "email" es obligatorio y debe ser texto.' });
    return;
  }

  if (bootcamp === undefined || bootcamp === null || typeof bootcamp !== 'string' || !bootcamp) {
    res.status(400).json({ ok: false, error: 'El campo "bootcamp" es obligatorio y debe ser texto.' });
    return;
  }

  if (activo === undefined || activo === null || typeof activo !== 'boolean') {
    res.status(400).json({ ok: false, error: 'El campo "activo" es obligatorio y debe ser booleano.' });
    return;
  }

  next();
};