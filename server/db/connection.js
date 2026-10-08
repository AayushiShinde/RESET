import mongoose from 'mongoose';

let dbStatus = {
  connected: false,
  mode: 'in-memory-demo',
  uri: null,
  error: null
};

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.trim() === '') {
    console.log('[Database] MONGODB_URI not provided in .env. Initializing in-memory resilient data store for instant offline demo.');
    dbStatus.mode = 'in-memory-demo';
    dbStatus.connected = true;
    return dbStatus;
  }

  try {
    console.log('[Database] Connecting to MongoDB Atlas...');
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    dbStatus.connected = true;
    dbStatus.mode = 'mongodb-atlas';
    dbStatus.uri = uri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'); // Redact credentials
    console.log('[Database] Connected successfully to MongoDB Atlas:', dbStatus.uri);
  } catch (err) {
    console.warn('[Database] Could not connect to MongoDB URI. Falling back to resilient local store so app remains 100% operational:', err.message);
    dbStatus.connected = true;
    dbStatus.mode = 'in-memory-fallback';
    dbStatus.error = err.message;
  }

  return dbStatus;
}

export function getDbStatus() {
  return dbStatus;
}
