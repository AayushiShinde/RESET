import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { initSentry, Sentry } from './sentry.js';
import { connectDB } from './db/connection.js';

import healthRoutes from './routes/healthRoutes.js';
import resetRoutes from './routes/resetRoutes.js';
import communityRoutes from './routes/communityRoutes.js';
import passportRoutes from './routes/passportRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Sentry before app logic
initSentry();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', healthRoutes);
app.use('/api/reset', resetRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/passport', passportRoutes);

// In production, serve the built React static files
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

app.get('*', (req, res, next) => {
  // Pass API requests that didn't match through
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(clientDistPath, 'index.html'), (err) => {
    if (err) {
      res.status(200).send('RESET API running. In development, open Vite dev server on port 5173.');
    }
  });
});

// Centralized error handling
app.use((err, req, res, next) => {
  console.error('[Unhandled Error]', err);
  if (process.env.SENTRY_DSN) {
    Sentry.captureException(err);
  }
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// Connect Database and Start Server
async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🌿 [RESET Server] listening on port ${PORT}`);
    console.log(`   API Health: http://localhost:${PORT}/api/health`);
  });
}

start();
