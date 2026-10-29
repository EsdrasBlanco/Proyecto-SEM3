import express from 'express';
 feature/documentacion
import router from './routes/estudiantes.routes.ts';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from './swagger_output.json' with { type: 'json' };
=======
import type { Request, Response } from "express";
import estudiantesRouter from './routes/estudiantes.ts';
 src

const app = express();
const PORT = 3000;

 feature/documentacion
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ status: 'Servidor en línea', version: '1.0.0' });
});

app.use('/estudiantes', router);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
=======
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
 src
