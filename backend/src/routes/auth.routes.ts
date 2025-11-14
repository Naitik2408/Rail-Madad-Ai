import { Router } from 'express';
import { login, refreshToken, getMe, logout } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { loginValidator, refreshTokenValidator } from '../validators/auth.validator';
// import { authLimiter } from '../middleware/rateLimit.middleware'; // DISABLED FOR TESTING

const router = Router();

/**
 * @route   POST /api/v1/auth/login
 * @desc    Admin login
 * @access  Public
 */
router.post('/login', loginValidator, validate, login); // authLimiter removed for testing

/**
 * @route   POST /api/v1/auth/refresh
 * @desc    Refresh access token
 * @access  Public
 */
router.post('/refresh', refreshTokenValidator, validate, refreshToken);

/**
 * @route   GET /api/v1/auth/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/me', authenticate, getMe);

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Logout user
 * @access  Private
 */
router.post('/logout', authenticate, logout);

export default router;
