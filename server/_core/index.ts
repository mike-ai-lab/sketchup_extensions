import express from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import path from 'path';
import { fileURLToPath } from 'url';
import { appRouter } from './router';
import { createContext } from './context';
import downloadsRouter from '../routes/downloads';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../../public')));

// API routes
app.use('/api/downloads', downloadsRouter);

app.use(
  '/api/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
