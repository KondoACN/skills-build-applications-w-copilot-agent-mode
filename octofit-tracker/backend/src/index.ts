import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api';
import { connectDatabase } from './config/database';

const app = express();
const port = Number(process.env.PORT ?? 8000);

app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit backend is running' });
});

connectDatabase()
  .then(() => {
    console.log('Database connection ready');
  })
  .catch((error) => {
    console.warn('MongoDB connection unavailable, continuing without database persistence', error);
  });

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});

export { app, port };
