import jwt from 'jsonwebtoken';
import { AppError } from '../middleware/error.middleware';
import { UserSession } from '../types/user.types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

export const generateToken = (user: UserSession): string => {
  try {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
  } catch (error) {
    throw new AppError(500, 'Error generating token');
  }
};

export const verifyToken = (token: string): UserSession => {
  try {
    return jwt.verify(token, JWT_SECRET) as UserSession;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError(401, 'Token has expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError(401, 'Invalid token');
    }
    throw new AppError(500, 'Error verifying token');
  }
};

export const generateRefreshToken = (): string => {
  try {
    return jwt.sign({}, JWT_SECRET, { expiresIn: '7d' });
  } catch (error) {
    throw new AppError(500, 'Error generating refresh token');
  }
};

export const verifyRefreshToken = (token: string): boolean => {
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
}; 