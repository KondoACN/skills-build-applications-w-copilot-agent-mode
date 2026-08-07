import path from 'node:path';
import { pathToFileURL } from 'node:url';
import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api';
import { connectDatabase } from './config/database';

const app = express();
const port = Number(process.env.PORT ?? 8000);

export function getApiBaseUrl() {
  const codespaceName = process.env.CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

app.get('/', (_req, res) => {
  res.json({
    message: 'OctoFit backend is running',
    apiBaseUrl: getApiBaseUrl(),
  });
});

connectDatabase()
  .then(() => {
    console.log('Database connection ready');
  })
  .catch((error) => {
    console.warn('MongoDB connection unavailable, continuing without database persistence', error);
  });

export function startServer() {
  return app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`API base URL: ${getApiBaseUrl()}`);
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  startServer();
}

export { app, port };
