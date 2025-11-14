import { Router } from 'express';
import { submitComplaint, trackComplaint } from '../controllers/complaint.controller';
import { optionalAuth } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import {
    complaintSubmissionValidator,
    complaintIdValidator,
} from '../validators/complaint.validator';
// import { complaintLimiter } from '../middleware/rateLimit.middleware'; // DISABLED FOR TESTING

const router = Router();

/**
 * @route   POST /api/v1/complaints
 * @desc    Submit a new complaint
 * @access  Public
 */
router.post(
    '/',
    // complaintLimiter, // DISABLED FOR TESTING
    optionalAuth,
    complaintSubmissionValidator,
    validate,
    submitComplaint
);

/**
 * @route   GET /api/v1/complaints/track/:complaintId
 * @desc    Track complaint status
 * @access  Public
 */
router.get('/track/:complaintId', complaintIdValidator, validate, trackComplaint);

export default router;
