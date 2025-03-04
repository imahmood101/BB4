import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { UserRole } from '../types/auth.types';
import { UserSession } from '../types/user.types';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: UserSession;
    }
  }
}

// Schema for validating user session
const userSessionSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: z.nativeEnum(UserRole),
});

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const user = userSessionSchema.parse(req.session.user);
    req.user = user;
    next();
  } catch (error) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
    });
    return res.status(401).json({ message: 'Invalid session' });
  }
};

export const requireRole = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    next();
  };
}; 