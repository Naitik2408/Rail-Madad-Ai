import { body, param } from 'express-validator';
import { ComplaintCategory } from '../models/Complaint';

/**
 * Complaint Submission Validation Rules
 */
export const complaintSubmissionValidator = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters'),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),

    body('phoneNumber')
        .optional()
        .trim()
        .matches(/^[6-9]\d{9}$/)
        .withMessage('Please provide a valid 10-digit Indian mobile number'),

    body('pnr')
        .optional()
        .trim()
        .matches(/^\d{10}$/)
        .withMessage('PNR must be a 10-digit number'),

    body('trainNumber')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('Train number cannot exceed 50 characters'),

    body('trainName')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Train name cannot exceed 100 characters'),

    body('category')
        .trim()
        .notEmpty()
        .withMessage('Category is required')
        .isIn(Object.values(ComplaintCategory))
        .withMessage('Invalid complaint category'),

    body('subcategory')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Subcategory cannot exceed 100 characters'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ min: 10, max: 2000 })
        .withMessage('Description must be between 10 and 2000 characters'),

    body('journeyDate')
        .optional()
        .isISO8601()
        .withMessage('Please provide a valid date in ISO format'),

    body('station')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Station name cannot exceed 100 characters'),

    body('coach')
        .optional()
        .trim()
        .isLength({ max: 20 })
        .withMessage('Coach cannot exceed 20 characters'),

    body('seatNumber')
        .optional()
        .trim()
        .isLength({ max: 20 })
        .withMessage('Seat number cannot exceed 20 characters'),
];

/**
 * Complaint ID Validation
 */
export const complaintIdValidator = [
    param('complaintId')
        .trim()
        .notEmpty()
        .withMessage('Complaint ID is required')
        .matches(/^CMP-\d{4}-\d{4}$/)
        .withMessage('Invalid complaint ID format. Expected format: CMP-YYYY-NNNN'),
];
