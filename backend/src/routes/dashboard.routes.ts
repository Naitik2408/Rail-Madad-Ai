import { Router } from 'express';
import { getDashboardMetrics, getDashboardCharts } from '../controllers/dashboard.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../models/User';

const router = Router();

// All dashboard routes require authentication and admin role
router.use(authenticate, authorize(UserRole.ADMIN));

/**
 * @route   GET /api/v1/admin/dashboard/metrics
 * @desc    Get dashboard metrics
 * @access  Private (Admin)
 */
router.get('/metrics', getDashboardMetrics);

/**
 * @route   GET /api/v1/admin/dashboard/charts
 * @desc    Get dashboard chart data
 * @access  Private (Admin)
 */
router.get('/charts', getDashboardCharts);

export default router;
