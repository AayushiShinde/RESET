import express from 'express';
import { aiService } from '../ai/aiService.js';
import { dbRepo } from '../db/models.js';
import { captureError } from '../sentry.js';

const router = express.Router();

// Generate a personalized Re:Set challenge
router.post('/generate', async (req, res) => {
  try {
    const { activity = 'reading', reason, durationMinutes = 30, preference = '', userId = 'usr_demo_1' } = req.body;

    if (!reason || reason.trim() === '') {
      return res.status(400).json({ error: 'Please provide why you want to return to this activity.' });
    }

    const challenge = await aiService.generateReset({
      activity,
      reason,
      durationMinutes: Number(durationMinutes) || 30,
      preference
    });

    // Save to DB
    const savedPlan = await dbRepo.createResetPlan({
      userId,
      activity,
      reason,
      durationMinutes: Number(durationMinutes) || 30,
      challenge
    });

    res.json({
      success: true,
      planId: savedPlan._id,
      challenge
    });
  } catch (err) {
    captureError(err, { endpoint: '/api/reset/generate', body: req.body });
    res.status(500).json({ error: 'Failed to generate Re:Set challenge', details: err.message });
  }
});

// Get latest generated plan
router.get('/latest', async (req, res) => {
  try {
    const userId = req.query.userId || 'usr_demo_1';
    const plan = await dbRepo.getLatestPlan(userId);
    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load latest plan' });
  }
});

// Submit reflection after session
router.post('/reflect', async (req, res) => {
  try {
    const {
      userId = 'usr_demo_1',
      sessionId = null,
      bookTitle = '',
      reflection = '',
      feeling = 'Good'
    } = req.body;

    if (!reflection || reflection.trim() === '') {
      return res.status(400).json({ error: 'Please share at least one thought or feeling.' });
    }

    // AI analyzes reflection with non-guilt philosophy
    const aiAnalysis = await aiService.analyzeReflection({
      bookTitle,
      reflection,
      feeling
    });

    const savedReflection = await dbRepo.createReflection({
      userId,
      sessionId,
      bookTitle,
      reflection,
      feeling,
      aiSummary: aiAnalysis.summary,
      aiEncouragement: aiAnalysis.encouragement,
      nextStep: aiAnalysis.nextStep
    });

    res.json({
      success: true,
      reflectionId: savedReflection._id,
      aiAnalysis,
      saved: savedReflection
    });
  } catch (err) {
    captureError(err, { endpoint: '/api/reset/reflect', body: req.body });
    res.status(500).json({ error: 'Failed to process reflection', details: err.message });
  }
});

export default router;
