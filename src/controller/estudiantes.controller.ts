import type { Response, Request } from "express";
import type { Estudiante } from "../interfaces/estudiantes.interfaces.ts";
import { estudiantes } from "../data/estudiantes.data.ts";

let idCounter = estudiantes.length > 0 ? Math.max(...estudiantes.map(e => e.id ?? 0)) + 1 : 1;

export function traerTodosLosEstudiantes(req: Request, res: Response) {
  return res.status(200).json({
    ok: true,
    mensaje: "La lista de todos los estudiantes",
    data: estudiantes,
  });
}

export function traerUnEstudiante(req: Request, res: Response) {
  let idBuscado = Number(req.params.id);
  let estudianteEncontrado = estudiantes.find(
    (e: Estudiante) => e.id === idBuscado,
  );

  if (!estudianteEncontrado) {
    return res.status(404).json({
      ok: false,
      mensaje: "CONSULTORIO NO ENCONTRADO O NO EXISTE",
    });
  }
  
  return res.status(200).json({
    ok: true,
    mensaje: "El estudiante fue encontrado con exito",
    data: estudianteEncontrado,
  });
}

export function crearEstudiante(req: Request, res: Response) {
  const { nombre, email, bootcamp, activo } = req.body;

  const nuevoEstudiante: Estudiante = {
    id: idCounter++,
    nombre,
    email,
    bootcamp,
    activo,
  };

  estudiantes.push(nuevoEstudiante);

  return res.status(201).json({
    ok: true,
    mensaje: "Estudiante creado con éxito",
    data: nuevoEstudiante,
  });
}

export function actualizarEstudiante(req: Request, res: Response) {
  let idBuscado = Number(req.params.id);
  let indiceEncontrado = estudiantes.findIndex(
    (e: Estudiante) => e.id === idBuscado
  );

  if (indiceEncontrado === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: "El consultorio que deseas actualizar NO EXISTE",
    });
  }

  const { nombre, email, bootcamp, activo } = req.body;
  const actual = estudiantes[indiceEncontrado];

  estudiantes[indiceEncontrado] = {
    id: idBuscado,
    nombre: nombre ?? actual?.nombre,
    email: email ?? actual?.email,
    bootcamp: bootcamp ?? actual?.bootcamp,
    activo: activo ?? actual?.activo,
  };

  return res.status(200).json({
    ok: true,
    mensaje: "Estudiante actualizado con éxito",
    data: estudiantes[indiceEncontrado],
  });
}

export function eliminarEstudiante(req: Request, res: Response) {
  let idBuscado = Number(req.params.id);
  let indiceEncontrado = estudiantes.findIndex(
    (e: Estudiante) => e.id === idBuscado
  );

  if (indiceEncontrado === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: "El estudiante que deseas eliminar NO EXISTE",
    });
  }

  estudiantes.splice(indiceEncontrado, 1);

  return res.status(200).json({
    ok: true,
    mensaje: "Estudiante eliminado con éxito",
  });
}