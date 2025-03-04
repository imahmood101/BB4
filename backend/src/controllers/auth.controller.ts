import { Request, Response } from 'express';
import { z } from 'zod';
import { AuthService } from '../services/auth.service.js';
import { hashPassword, validatePassword, validatePasswordStrength } from '../utils/password.utils.js';
import { generateToken, generateRefreshToken } from '../utils/jwt.utils.js';
import { AppError } from '../middleware/error.middleware.js';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  role: z.enum(['admin', 'manager', 'sales_rep']).default('sales_rep'),
});

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = loginSchema.parse(req.body);
      const user = await AuthService.findUserByEmail(email);

      if (!user) {
        throw new AppError(401, 'Invalid credentials');
      }

      const isValidPassword = await validatePassword(password, user.password);
      if (!isValidPassword) {
        throw new AppError(401, 'Invalid credentials');
      }

      if (user.status !== 'active') {
        throw new AppError(403, 'Account is not active');
      }

      // Generate tokens
      const accessToken = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });
      const refreshToken = generateRefreshToken();

      // Set refresh token in HTTP-only cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        accessToken,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new AppError(400, 'Validation error', true);
      }
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(500, 'Internal server error');
    }
  }

  static async register(req: Request, res: Response): Promise<void> {
    try {
      const userData = registerSchema.parse(req.body);
      const existingUser = await AuthService.findUserByEmail(userData.email);

      if (existingUser) {
        throw new AppError(400, 'Email already registered');
      }

      // Validate password strength
      validatePasswordStrength(userData.password);

      // Hash password
      const hashedPassword = await hashPassword(userData.password);

      // Create user with hashed password
      const user = await AuthService.createUser({
        ...userData,
        password: hashedPassword,
      });

      // Generate tokens
      const accessToken = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });
      const refreshToken = generateRefreshToken();

      // Set refresh token in HTTP-only cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(201).json({
        message: 'Registration successful',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        accessToken,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new AppError(400, 'Validation error', true);
      }
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(500, 'Internal server error');
    }
  }

  static async logout(req: Request, res: Response): Promise<void> {
    // Clear refresh token cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
    });

    res.json({ message: 'Logged out successfully' });
  }

  static async refreshToken(req: Request, res: Response): Promise<void> {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new AppError(401, 'Refresh token not found');
    }

    // Verify refresh token
    const isValid = verifyRefreshToken(refreshToken);
    if (!isValid) {
      throw new AppError(401, 'Invalid refresh token');
    }

    // Get user from session
    if (!req.session.user) {
      throw new AppError(401, 'User session not found');
    }

    // Generate new tokens
    const accessToken = generateToken(req.session.user);
    const newRefreshToken = generateRefreshToken();

    // Set new refresh token in HTTP-only cookie
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      message: 'Token refreshed successfully',
      accessToken,
    });
  }
} 