import { Router, RequestHandler } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { authLimiter } from '../middleware/rate-limit.middleware.js';
import { authenticateJWT } from '../middleware/jwt.middleware.js';

const router = Router();

// Public routes
router.post('/login', authLimiter, AuthController.login as RequestHandler);
router.post('/register', authLimiter, AuthController.register as RequestHandler);
router.post('/refresh-token', AuthController.refreshToken as RequestHandler);

// Protected routes
router.post('/logout', authenticateJWT, AuthController.logout as RequestHandler);

export default router;