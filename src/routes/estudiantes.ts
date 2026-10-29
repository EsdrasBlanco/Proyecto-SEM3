import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

interface Estudiante {  
  id: number;  
  nombre: string;  
  email: string;  
  bootcamp: string;
}

let estudiantes: Estudiante[] = [];
let idCounter = 1;

router.get("/", (req: Request, res: Response) => {
  const bootcampQuery = req.query.bootcamp;

  let resultado = estudiantes;

  if (bootcampQuery && typeof bootcampQuery === 'string') {
    resultado = estudiantes.filter(
      e => e.bootcamp.toLowerCase() === bootcampQuery.toLowerCase()
    );
  }

  res.status(200).json({
    ok: true,
    total: resultado.length,
    data: resultado
  });
});

router.get("/:id", (req: Request, res: Response) => {
  const idBuscando = Number(req.params.id);
  const estudianteEncontrado = estudiantes.find(e => e.id === idBuscando);

  if (!estudianteEncontrado) {
    res.status(404).json({
      ok: false,
      error: `El estudiante con el ID ${idBuscando} no existe.`
    });
    return;
  }

  res.status(200).json({
    ok: true,
    data: estudianteEncontrado
  });
});

router.post("/", (req: Request, res: Response) => {
  const { nombre, email, bootcamp } = req.body;

  if (!email || typeof email !== 'string' || email.trim() === '') {
    res.status(400).json({
      ok: false,
      error: "El campo email es obligatorio."
    });
    return;
  }

  const nuevoEstudiante: Estudiante = {
    id: idCounter++,
    nombre: nombre || "Sin nombre",
    email: email.trim(),
    bootcamp: bootcamp || "General"
  };

  estudiantes.push(nuevoEstudiante);

  res.status(201).json({
    ok: true,
    mensaje: "Estudiante creado con éxito",
    data: nuevoEstudiante
  });
});

router.put("/:id", (req: Request, res: Response) => {
  const idBuscando = Number(req.params.id);
  const indiceEncontrado = estudiantes.findIndex(e => e.id === idBuscando);

  if (indiceEncontrado === -1) {
    res.status(404).json({
      ok: false,
      error: `El estudiante con el ID ${idBuscando} no existe.`
    });
    return;
  }

  const estudianteExistente = estudiantes[indiceEncontrado];
  if (!estudianteExistente) {
    res.status(404).json({
      ok: false,
      error: "Estudiante no encontrado."
    });
    return;
  }

  const { nombre, email, bootcamp } = req.body;

  estudiantes[indiceEncontrado] = {
    id: idBuscando,
    nombre: nombre ?? estudianteExistente.nombre,
    email: email ?? estudianteExistente.email,
    bootcamp: bootcamp ?? estudianteExistente.bootcamp
  };

  res.status(200).json({
    ok: true,
    mensaje: "Estudiante actualizado con éxito",
    data: estudiantes[indiceEncontrado]
  });
});

router.delete("/:id", (req: Request, res: Response) => {
  const idBuscando = Number(req.params.id);
  const existe = estudiantes.some(e => e.id === idBuscando);

  if (!existe) {
    res.status(404).json({
      ok: false,
      error: `El estudiante con el ID ${idBuscando} no existe.`
    });
    return;
  }

  estudiantes = estudiantes.filter(e => e.id !== idBuscando);

  res.status(200).json({
    ok: true,
    mensaje: "Estudiante eliminado con éxito"
  });
});

export default router;