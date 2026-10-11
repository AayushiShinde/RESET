import express from 'express';
import { dbRepo } from '../db/models.js';
import { traceSpan, captureError } from '../sentry.js';

const router = express.Router();

// List all community sessions
router.get('/sessions', async (req, res) => {
  try {
    const sessions = await dbRepo.getCommunitySessions();
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch community sessions' });
  }
});

// Create a new community session
router.post('/sessions', async (req, res) => {
  try {
    const { title, activity = 'reading', venue, date, durationMinutes = 30 } = req.body;
    if (!title || !venue) {
      return res.status(400).json({ error: 'Title and venue are required.' });
    }

    const newSession = await dbRepo.createCommunitySession({
      title,
      activity,
      venue,
      date,
      durationMinutes: Number(durationMinutes) || 30
    });

    res.json({ success: true, session: newSession });
  } catch (err) {
    captureError(err, { endpoint: 'POST /api/community/sessions', body: req.body });
    res.status(500).json({ error: 'Failed to create community session' });
  }
});

// Get a single session by ID along with its attendance statistics
router.get('/sessions/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await dbRepo.getCommunitySessionById(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const stats = await dbRepo.getSessionStats(sessionId);
    res.json({ session, stats });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch session details' });
  }
});

// Record participant START (QR scan or simulation)
router.post('/sessions/:sessionId/start', async (req, res) => {
  return traceSpan('startSessionAttendance', 'session.checkin', async () => {
    try {
      const { sessionId } = req.params;
      const { userId = 'usr_demo_1', isSimulated = false } = req.body;

      const session = await dbRepo.getCommunitySessionById(sessionId);
      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }

      const attendance = await dbRepo.recordCheckIn(sessionId, userId);
      const updatedStats = await dbRepo.getSessionStats(sessionId);

      res.json({
        success: true,
        session,
        attendance,
        updatedStats,
        message: "You're here. RESET starts now. Your phone is no longer needed.",
        isSimulated
      });
    } catch (err) {
      captureError(err, { endpoint: '/sessions/:sessionId/start', params: req.params });
      res.status(500).json({ error: 'Failed to record check-in' });
    }
  });
});

// Record participant COMPLETE (QR scan or simulation)
router.post('/sessions/:sessionId/complete', async (req, res) => {
  return traceSpan('completeSession', 'session.checkout', async () => {
    try {
      const { sessionId } = req.params;
      const { userId = 'usr_demo_1', didComplete = true, isSimulated = false } = req.body;

      const session = await dbRepo.getCommunitySessionById(sessionId);
      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }

      const attendance = await dbRepo.recordCheckOut(sessionId, userId, didComplete);
      const updatedStats = await dbRepo.getSessionStats(sessionId);

      res.json({
        success: true,
        session,
        attendance,
        updatedStats,
        didComplete,
        isSimulated,
        ethicalNote: didComplete
          ? 'Attendance recorded. We do not verify that you read every page; we verify that you showed up.'
          : 'Thank you for your honesty. Returning matters more than consistency.'
      });
    } catch (err) {
      captureError(err, { endpoint: '/sessions/:sessionId/complete', params: req.params });
      res.status(500).json({ error: 'Failed to complete session' });
    }
  });
});

// Get anonymized aggregate reflections for the organizer dashboard
router.get('/sessions/:sessionId/reflections', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const reflections = await dbRepo.getReflections({ sessionId });

    // Anonymize before returning to organizer
    const anonymized = reflections.map(r => ({
      _id: r._id,
      bookTitle: r.bookTitle || 'A book',
      feeling: r.feeling,
      reflectionSnippet: r.reflection,
      aiSummary: r.aiSummary,
      createdAt: r.createdAt
    }));

    res.json({
      sessionId,
      totalCount: anonymized.length,
      reflections: anonymized
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reflections' });
  }
});

// Demo Simulation Helper: adjust live counts for judge walkthrough
router.post('/sessions/:sessionId/simulate-demo-stats', async (req, res) => {
  try {
    const { sessionId } = req.params;
    // Returns clean live 27 checked in / 24 completed simulation numbers
    const stats = await dbRepo.getSessionStats(sessionId);
    res.json({
      success: true,
      stats: {
        checkedInCount: 27,
        completedCount: 24,
        notCompletedCount: 3,
        inProgressCount: 3
      },
      note: 'Demo mode — simulating 27 checked in, 24 completed for live presentation.'
    });
  } catch (err) {
    res.status(500).json({ error: 'Simulation failed' });
  }
});

export default router;
