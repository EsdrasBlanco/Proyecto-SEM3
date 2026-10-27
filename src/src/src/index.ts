import express from 'express';
import type { Request, Response } from "express";

const app = express();
const PORT = 3000;
app.use(express.json());

interface Estudiante {  
  id: number;  
  nombre: string;  
  email: string;  
  bootcamp: string;
}

const estudiantes: Estudiante[] = [];
let idCounter = 1;

app.get("/api/status", function (req: Request, res: Response) {
  res.status(200).json({
    ok: true,
    status: "Servidor en línea",
    version: "1.0.0"
  });
});

app.get("/api/estudiantes", (req: Request, res: Response) => {
  res.status(200).json({
    ok: true,
    total: estudiantes.length,
    data: estudiantes
  });
});

app.post("/api/estudiantes", (req: Request, res: Response) => {
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

app.put("/api/estudiantes/:id", (req: Request, res: Response) => {
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

app.delete("/api/estudiantes/:id", (req: Request, res: Response) => {
  const idBuscando = Number(req.params.id);
  const existe = estudiantes.some(e => e.id === idBuscando);

  if (!existe) {
    res.status(404).json({
      ok: false,
      error: `El estudiante con el ID ${idBuscando} no existe.`
    });
    return;
  }

  const estudiantesActualizados = estudiantes.filter(e => e.id !== idBuscando);

  res.status(200).json({
    ok: true,
    mensaje: "Estudiante eliminado con éxito"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});