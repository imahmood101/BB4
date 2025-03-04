import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { AppError } from './error.middleware';

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: 'Too many login attempts, please try again after 15 minutes',
  handler: (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(429, 'Too many login attempts, please try again later'));
  },
});

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: 'Too many requests, please try again later',
  handler: (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(429, 'Too many requests, please try again later'));
  },
}); 