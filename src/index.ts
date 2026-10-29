import express from 'express';
import router from './routes/estudiantes.routes.ts';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from './swagger_output.json' with { type: 'json' };

const app = express();
const PORT = 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ status: 'Servidor en línea', version: '1.0.0' });
});

app.use('/estudiantes', router);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
