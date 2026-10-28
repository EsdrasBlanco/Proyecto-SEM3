import express from 'express';
import type { Request, Response } from "express";
import estudiantesRouter from './routes/estudiantes.ts';

const app = express();
const PORT = 3000;

// Middleware global para parsear JSON
app.use(express.json());

// Ruta de estado general
app.get("/api/status", (req: Request, res: Response) => {
  res.status(200).json({
    ok: true,
    status: "Servidor en línea",
    version: "1.0.0"
  });
});

// Montar las rutas de estudiantes bajo el prefijo /api/estudiantes
app.use('/api/estudiantes', estudiantesRouter);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});