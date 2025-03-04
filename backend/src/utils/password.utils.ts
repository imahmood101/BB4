import bcrypt from 'bcryptjs';
import { AppError } from '../middleware/error.middleware';

const SALT_ROUNDS = 10;

export const hashPassword = async (password: string): Promise<string> => {
  try {
    return await bcrypt.hash(password, SALT_ROUNDS);
  } catch (error) {
    throw new AppError(500, 'Error hashing password');
  }
};

export const validatePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new AppError(500, 'Error validating password');
  }
};

export const generatePasswordResetToken = (): string => {
  return Math.random().toString(36).slice(-8);
};

export const validatePasswordStrength = (password: string): void => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    throw new AppError(400, 'Password must be at least 8 characters long');
  }

  if (!hasUpperCase || !hasLowerCase) {
    throw new AppError(400, 'Password must contain both uppercase and lowercase letters');
  }

  if (!hasNumbers) {
    throw new AppError(400, 'Password must contain at least one number');
  }

  if (!hasSpecialChar) {
    throw new AppError(400, 'Password must contain at least one special character');
  }
}; 