import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

/**
 * Validation Middleware
 * Checks for validation errors and sends formatted response
 */
export const validate = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error: any) => ({
            field: error.type === 'field' ? error.path : 'unknown',
            message: error.msg,
        }));

        res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errorMessages,
        });
        return;
    }

    next();
};

/**
 * Helper to run validations and check for errors
 * Usage: validateRequest([body('email').isEmail(), ...])
 */
export const validateRequest = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // Run all validations
        await Promise.all(validations.map((validation) => validation.run(req)));

        // Check for errors
        validate(req, res, next);
    };
};
