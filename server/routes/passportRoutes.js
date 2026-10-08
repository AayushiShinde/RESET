import express from 'express';
import { dbRepo } from '../db/models.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId || 'usr_demo_1';
    const passportStats = await dbRepo.getPassportStats(userId);
    res.json({
      success: true,
      passport: passportStats,
      philosophy: {
        metric: 'time spent living offline',
        antiPatternsAvoided: [
          'No streaks',
          'No XP points',
          'No leaderboards',
          'No guilt notifications'
        ]
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch passport statistics' });
  }
});

export default router;
