import { body, param, query } from 'express-validator';
import { ComplaintStatus, ComplaintPriority } from '../models/Complaint';

/**
 * Complaint Update Validation (Admin)
 */
export const complaintUpdateValidator = [
    body('status')
        .optional()
        .isIn(Object.values(ComplaintStatus))
        .withMessage('Invalid status'),

    body('priority')
        .optional()
        .isIn(Object.values(ComplaintPriority))
        .withMessage('Invalid priority'),

    body('assignedTo')
        .optional()
        .isMongoId()
        .withMessage('Invalid user ID format'),

    body('department')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Department name cannot exceed 100 characters'),

    body('resolutionDetails')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Resolution details cannot exceed 1000 characters'),

    body('comment')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Comment cannot exceed 500 characters'),
];

/**
 * MongoDB ObjectId Validation
 */
export const mongoIdValidator = [
    param('id').isMongoId().withMessage('Invalid complaint ID format'),
];

/**
 * Complaint Filter Validation
 */
export const complaintFilterValidator = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),

    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100'),

    query('status')
        .optional()
        .isIn(Object.values(ComplaintStatus))
        .withMessage('Invalid status'),

    query('priority')
        .optional()
        .isIn(Object.values(ComplaintPriority))
        .withMessage('Invalid priority'),

    query('search')
        .optional()
        .trim()
        .isLength({ max: 200 })
        .withMessage('Search query cannot exceed 200 characters'),

    query('sortBy')
        .optional()
        .isIn(['createdAt', 'updatedAt', 'priority', 'status'])
        .withMessage('Invalid sort field'),

    query('sortOrder')
        .optional()
        .isIn(['asc', 'desc'])
        .withMessage('Sort order must be asc or desc'),
];
