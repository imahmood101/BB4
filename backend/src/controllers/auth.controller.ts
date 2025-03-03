import { Request, Response } from 'express';
import { z } from 'zod';
import { AuthService } from '../services/auth.service.js';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  role: z.enum(['admin', 'manager', 'sales_rep']).default('sales_rep'),
});

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = loginSchema.parse(req.body);
      const user = await AuthService.findUserByEmail(email);

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isValidPassword = await AuthService.validatePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      if (user.status !== 'active') {
        return res.status(403).json({ message: 'Account is not active' });
      }

      // Set user in session
      req.session.user = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      return res.json({
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Validation error', errors: error.errors });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async register(req: Request, res: Response) {
    try {
      const userData = registerSchema.parse(req.body);
      const existingUser = await AuthService.findUserByEmail(userData.email);

      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      const user = await AuthService.createUser(userData);
      return res.status(201).json({
        message: 'Registration successful',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Validation error', errors: error.errors });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async logout(req: Request, res: Response) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error logging out' });
      }
      return res.json({ message: 'Logged out successfully' });
    });
  }
} 