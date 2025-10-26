import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import apiRouter from './routes';

// Factory for Express app to keep testing/composability simple.
export function createServer() {
  const app = express();
  app.use(cors({ origin: env.CLIENT_ORIGIN }));
  app.use(express.json());
  app.use('/api', apiRouter);

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  return app;
}
