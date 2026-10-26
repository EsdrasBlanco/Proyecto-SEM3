import express from 'express';

const app = express();
const PORT = 3000;

const status = { "status": "Servidor en línea", "version": "1.0.0" };
const scripts = {
  "dev": "ts-node-dev --respawn --transpile-only src/index.ts"
};

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});