import express from 'express';
import { getDbStatus } from '../db/connection.js';
import { aiService } from '../ai/aiService.js';
import { isSentryEnabled } from '../sentry.js';

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'Re:Set',
    version: '1.0.0',
    tagline: 'Return to what matters. An AI that helps you use your phone less.',
    challenge: 'Hacktoberfest 2026 Open-Source AI Challenge — Week 1: Touch Grass',
    database: getDbStatus(),
    ai: aiService.getStatus(),
    sentry: {
      enabled: isSentryEnabled
    },
    timestamp: new Date().toISOString()
  });
});

export default router;
