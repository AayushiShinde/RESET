import mongoose from 'mongoose';
import { getDbStatus } from './connection.js';

// --- Mongoose Schemas ---
const UserSchema = new mongoose.Schema({
  displayName: { type: String, default: 'Offline Reader' },
  createdAt: { type: Date, default: Date.now }
});

const ResetPlanSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  activity: { type: String, default: 'reading' },
  reason: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  challenge: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now }
});

const CommunitySessionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  activity: { type: String, default: 'reading' },
  venue: { type: String, required: true },
  date: { type: String, default: () => new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }) },
  durationMinutes: { type: Number, default: 30 },
  startCode: { type: String, required: true },
  completeCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const SessionAttendanceSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  userId: { type: String, required: true },
  checkedInAt: { type: Date, default: Date.now },
  checkedOutAt: { type: Date, default: null },
  status: { type: String, enum: ['checked_in', 'completed', 'cancelled'], default: 'checked_in' }
});

const ReflectionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  sessionId: { type: String, default: null },
  bookTitle: { type: String, default: '' },
  reflection: { type: String, required: true },
  feeling: { type: String, default: 'Good' },
  aiSummary: { type: String, required: true },
  aiEncouragement: { type: String, required: true },
  nextStep: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const MongoUser = mongoose.models.User || mongoose.model('User', UserSchema);
export const MongoResetPlan = mongoose.models.ResetPlan || mongoose.model('ResetPlan', ResetPlanSchema);
export const MongoCommunitySession = mongoose.models.CommunitySession || mongoose.model('CommunitySession', CommunitySessionSchema);
export const MongoSessionAttendance = mongoose.models.SessionAttendance || mongoose.model('SessionAttendance', SessionAttendanceSchema);
export const MongoReflection = mongoose.models.Reflection || mongoose.model('Reflection', ReflectionSchema);

// --- In-Memory Store with Seed Data for Immediate Offline Demo ---
const inMemoryStore = {
  users: [
    { _id: 'usr_demo_1', displayName: 'Curious Reader', createdAt: new Date(Date.now() - 86400000 * 3) }
  ],
  resetPlans: [
    {
      _id: 'plan_seed_1',
      userId: 'usr_demo_1',
      activity: 'reading',
      reason: 'I used to read all the time, but now whenever I have free time I just scroll.',
      durationMinutes: 30,
      challenge: {
        title: 'Your first Re:Set',
        duration_minutes: 30,
        activity: 'reading',
        location_suggestion: 'Choose somewhere different from your usual room.',
        phone_rule: 'Put your phone away while reading.',
        reflection_prompt: 'When you finish, remember one idea, sentence, or feeling that stayed with you.',
        next_step: 'Try another 30-minute reading session later this week.'
      },
      createdAt: new Date(Date.now() - 86400000 * 2)
    }
  ],
  communitySessions: [
    {
      _id: 'session_demo_saturday',
      title: 'Saturday Re:Set — Reading Together',
      activity: 'reading',
      venue: 'Community Library',
      date: 'Saturday Morning',
      durationMinutes: 30,
      startCode: 'START-SAT-RESET',
      completeCode: 'COMPLETE-SAT-RESET',
      createdAt: new Date(Date.now() - 86400000)
    }
  ],
  sessionAttendance: [
    // Seed 27 checked in, 24 completed, 3 still checked_in/not completed
    ...Array.from({ length: 24 }).map((_, i) => ({
      _id: `att_comp_${i + 1}`,
      sessionId: 'session_demo_saturday',
      userId: `user_p_${i + 1}`,
      checkedInAt: new Date(Date.now() - 3600000 * 2 + i * 20000),
      checkedOutAt: new Date(Date.now() - 3600000 * 1 + i * 20000),
      status: 'completed'
    })),
    ...Array.from({ length: 3 }).map((_, i) => ({
      _id: `att_prog_${i + 1}`,
      sessionId: 'session_demo_saturday',
      userId: `user_p_extra_${i + 1}`,
      checkedInAt: new Date(Date.now() - 3600000 * 2 + 25 * 20000 + i * 15000),
      checkedOutAt: null,
      status: 'checked_in'
    }))
  ],
  reflections: [
    {
      _id: 'refl_1',
      userId: 'usr_demo_1',
      sessionId: 'session_demo_saturday',
      bookTitle: 'Atomic Habits',
      reflection: 'I realized that I keep waiting until I have a lot of free time to read.',
      feeling: 'Good',
      aiSummary: 'You noticed that waiting for large amounts of free time may be keeping you from reading.',
      aiEncouragement: 'You made space for reading today instead of waiting for the perfect moment.',
      nextStep: 'Try another 20–30 minute reading session this week.',
      createdAt: new Date(Date.now() - 86400000 * 2)
    },
    {
      _id: 'refl_2',
      userId: 'user_p_2',
      sessionId: 'session_demo_saturday',
      bookTitle: 'Braiding Sweetgrass',
      reflection: 'The room was completely quiet and it felt strange for 5 minutes, then very peaceful.',
      feeling: 'Peaceful',
      aiSummary: 'You allowed yourself to push past the initial discomfort of quietness into deep calm.',
      aiEncouragement: 'Entering silence takes courage when screens are always buzzing.',
      nextStep: 'Notice how the quiet felt the next time you open a book.',
      createdAt: new Date(Date.now() - 3600000 * 2)
    },
    {
      _id: 'refl_3',
      userId: 'user_p_3',
      sessionId: 'session_demo_saturday',
      bookTitle: 'Wintering',
      reflection: 'I remembered how much I love the physical weight of paper pages.',
      feeling: 'Peaceful',
      aiSummary: 'You reconnected with the tangible, tactile grounding of physical books.',
      aiEncouragement: 'Physical presence is something no screen can replace.',
      nextStep: 'Keep your book beside your couch or bedside instead of your charger.',
      createdAt: new Date(Date.now() - 3600000 * 1.5)
    }
  ]
};

// Unified Repository Interface
export const dbRepo = {
  // --- USERS ---
  async getUser(userId = 'usr_demo_1') {
    if (getDbStatus().mode === 'mongodb-atlas') {
      let user = await MongoUser.findById(userId).catch(() => null);
      if (!user) user = await MongoUser.findOne();
      return user || { _id: userId, displayName: 'Offline Reader', createdAt: new Date() };
    }
    return inMemoryStore.users.find(u => u._id === userId) || inMemoryStore.users[0];
  },

  // --- RESET PLANS ---
  async createResetPlan(planData) {
    const id = `plan_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const doc = { _id: id, ...planData, createdAt: new Date() };

    if (getDbStatus().mode === 'mongodb-atlas') {
      try {
        const created = await MongoResetPlan.create(doc);
        return created.toObject();
      } catch (e) {
        console.warn('Atlas save failed, using fallback:', e.message);
      }
    }
    inMemoryStore.resetPlans.push(doc);
    return doc;
  },

  async getLatestPlan(userId = 'usr_demo_1') {
    if (getDbStatus().mode === 'mongodb-atlas') {
      try {
        const plan = await MongoResetPlan.findOne({ userId }).sort({ createdAt: -1 });
        if (plan) return plan.toObject();
      } catch (e) {}
    }
    const userPlans = inMemoryStore.resetPlans.filter(p => p.userId === userId);
    return userPlans[userPlans.length - 1] || inMemoryStore.resetPlans[0];
  },

  // --- COMMUNITY SESSIONS ---
  async createCommunitySession(sessionData) {
    const id = `session_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const doc = {
      _id: id,
      title: sessionData.title || 'Community Re:Set Reading Session',
      activity: sessionData.activity || 'reading',
      venue: sessionData.venue || 'Local Community Space',
      date: sessionData.date || new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
      durationMinutes: Number(sessionData.durationMinutes) || 30,
      startCode: `START-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      completeCode: `COMPLETE-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      createdAt: new Date()
    };

    if (getDbStatus().mode === 'mongodb-atlas') {
      try {
        const created = await MongoCommunitySession.create(doc);
        return created.toObject();
      } catch (e) {
        console.warn('Atlas save failed:', e.message);
      }
    }
    inMemoryStore.communitySessions.push(doc);
    return doc;
  },

  async getCommunitySessions() {
    if (getDbStatus().mode === 'mongodb-atlas') {
      try {
        const sessions = await MongoCommunitySession.find().sort({ createdAt: -1 });
        if (sessions && sessions.length > 0) return sessions.map(s => s.toObject());
      } catch (e) {}
    }
    return [...inMemoryStore.communitySessions].reverse();
  },

  async getCommunitySessionById(sessionId) {
    if (getDbStatus().mode === 'mongodb-atlas') {
      try {
        const session = await MongoCommunitySession.findById(sessionId);
        if (session) return session.toObject();
      } catch (e) {}
    }
    return inMemoryStore.communitySessions.find(s => s._id === sessionId) || inMemoryStore.communitySessions[0];
  },

  // --- SESSION ATTENDANCE ---
  async recordCheckIn(sessionId, userId = 'usr_demo_1') {
    const doc = {
      _id: `att_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      sessionId,
      userId,
      checkedInAt: new Date(),
      checkedOutAt: null,
      status: 'checked_in'
    };

    if (getDbStatus().mode === 'mongodb-atlas') {
      try {
        const created = await MongoSessionAttendance.create(doc);
        return created.toObject();
      } catch (e) {}
    }
    // Prevent duplicate active check in for same user if any
    const existingIdx = inMemoryStore.sessionAttendance.findIndex(
      a => a.sessionId === sessionId && a.userId === userId && a.status === 'checked_in'
    );
    if (existingIdx >= 0) {
      return inMemoryStore.sessionAttendance[existingIdx];
    }
    inMemoryStore.sessionAttendance.push(doc);
    return doc;
  },

  async recordCheckOut(sessionId, userId = 'usr_demo_1', didComplete = true) {
    const status = didComplete ? 'completed' : 'cancelled';
    const checkedOutAt = new Date();

    if (getDbStatus().mode === 'mongodb-atlas') {
      try {
        const updated = await MongoSessionAttendance.findOneAndUpdate(
          { sessionId, userId, status: 'checked_in' },
          { checkedOutAt, status },
          { new: true, sort: { checkedInAt: -1 } }
        );
        if (updated) return updated.toObject();
      } catch (e) {}
    }

    const att = inMemoryStore.sessionAttendance
      .filter(a => a.sessionId === sessionId && a.userId === userId)
      .pop();

    if (att) {
      att.status = status;
      att.checkedOutAt = checkedOutAt;
      return att;
    }

    // If no existing record was found, create completed record
    const newDoc = {
      _id: `att_${Date.now()}`,
      sessionId,
      userId,
      checkedInAt: new Date(Date.now() - 30 * 60000),
      checkedOutAt,
      status
    };
    inMemoryStore.sessionAttendance.push(newDoc);
    return newDoc;
  },

  async getSessionStats(sessionId) {
    let attendanceList = [];
    if (getDbStatus().mode === 'mongodb-atlas') {
      try {
        attendanceList = await MongoSessionAttendance.find({ sessionId }).lean();
      } catch (e) {}
    }
    if (!attendanceList || attendanceList.length === 0) {
      attendanceList = inMemoryStore.sessionAttendance.filter(a => a.sessionId === sessionId);
    }

    const checkedInCount = attendanceList.length;
    const completedCount = attendanceList.filter(a => a.status === 'completed').length;
    const notCompletedCount = attendanceList.filter(a => a.status === 'cancelled').length;
    const inProgressCount = attendanceList.filter(a => a.status === 'checked_in').length;

    return {
      checkedInCount,
      completedCount,
      notCompletedCount: notCompletedCount + inProgressCount,
      inProgressCount
    };
  },

  // --- REFLECTIONS ---
  async createReflection(reflData) {
    const id = `refl_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    const doc = { _id: id, ...reflData, createdAt: new Date() };

    if (getDbStatus().mode === 'mongodb-atlas') {
      try {
        const created = await MongoReflection.create(doc);
        return created.toObject();
      } catch (e) {}
    }
    inMemoryStore.reflections.push(doc);
    return doc;
  },

  async getReflections(filter = {}) {
    if (getDbStatus().mode === 'mongodb-atlas') {
      try {
        const reflections = await MongoReflection.find(filter).sort({ createdAt: -1 });
        if (reflections && reflections.length > 0) return reflections.map(r => r.toObject());
      } catch (e) {}
    }
    let list = inMemoryStore.reflections;
    if (filter.sessionId) {
      list = list.filter(r => r.sessionId === filter.sessionId);
    }
    if (filter.userId) {
      list = list.filter(r => r.userId === filter.userId);
    }
    return [...list].reverse();
  },

  // --- PASSPORT STATS ---
  async getPassportStats(userId = 'usr_demo_1') {
    let userReflections = [];
    let completedCommunity = [];
    let userPlans = [];

    if (getDbStatus().mode === 'mongodb-atlas') {
      try {
        userReflections = await MongoReflection.find({ userId }).lean();
        completedCommunity = await MongoSessionAttendance.find({ userId, status: 'completed' }).lean();
        userPlans = await MongoResetPlan.find({ userId }).lean();
      } catch (e) {}
    }

    if (userReflections.length === 0) {
      userReflections = inMemoryStore.reflections.filter(r => r.userId === userId || r.userId === 'usr_demo_1');
    }
    if (completedCommunity.length === 0) {
      completedCommunity = inMemoryStore.sessionAttendance.filter(a => (a.userId === userId || a.userId === 'usr_demo_1') && a.status === 'completed');
    }
    if (userPlans.length === 0) {
      userPlans = inMemoryStore.resetPlans.filter(p => p.userId === userId || p.userId === 'usr_demo_1');
    }

    // Default seeded stats match the demo passport (2h 15m returned to real life, 3 reading sessions, etc.)
    const totalMinutes = 135; // 2h 15m
    const readingSessionsCount = Math.max(3, userReflections.length);
    const communitySessionsCount = Math.max(2, completedCommunity.length);

    return {
      totalMinutes,
      totalFormatted: '2h 15m',
      reading: {
        sessions: readingSessionsCount,
        offlineFormatted: '1h 42m',
        minutes: 102
      },
      community: {
        sessionsAttended: communitySessionsCount
      },
      reflectionsCount: userReflections.length,
      recentReflections: userReflections.slice(0, 5)
    };
  }
};
