import { Router } from 'express';
import {
    getAllComplaints,
    getComplaintById,
    updateComplaint,
    deleteComplaint,
} from '../controllers/admin.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { UserRole } from '../models/User';
import {
    complaintFilterValidator,
    mongoIdValidator,
    complaintUpdateValidator,
} from '../validators/admin.validator';

const router = Router();

// All admin routes require authentication and admin role
router.use(authenticate, authorize(UserRole.ADMIN));

/**
 * @route   GET /api/v1/admin/complaints
 * @desc    Get all complaints with filters
 * @access  Private (Admin)
 */
router.get('/', complaintFilterValidator, validate, getAllComplaints);

/**
 * @route   GET /api/v1/admin/complaints/:id
 * @desc    Get complaint by ID
 * @access  Private (Admin)
 */
router.get('/:id', mongoIdValidator, validate, getComplaintById);

/**
 * @route   PATCH /api/v1/admin/complaints/:id
 * @desc    Update complaint
 * @access  Private (Admin)
 */
router.patch(
    '/:id',
    mongoIdValidator,
    complaintUpdateValidator,
    validate,
    updateComplaint
);

/**
 * @route   DELETE /api/v1/admin/complaints/:id
 * @desc    Delete complaint
 * @access  Private (Admin)
 */
router.delete('/:id', mongoIdValidator, validate, deleteComplaint);

export default router;
