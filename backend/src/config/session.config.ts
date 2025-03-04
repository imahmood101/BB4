import session from 'express-session';
import { UserSession } from '../types/user.types';

declare module 'express-session' {
  interface SessionData {
    user?: UserSession;
  }
}

export const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
  name: 'sessionId',
  rolling: true,
  store: new session.MemoryStore(), // In production, use a proper session store like Redis
}; 