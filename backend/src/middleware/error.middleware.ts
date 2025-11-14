import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/response';
import logger from '../utils/logger';

/**
 * Error Handler Middleware
 * Catches all errors and sends formatted response
 */
export const errorHandler = (
    err: Error | ApiError,
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    // Log error
    logger.error('Error occurred', {
        error: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
    });

    // Check if it's an operational error (known error)
    if (err instanceof ApiError && err.isOperational) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            statusCode: err.statusCode,
        });
    }

    // For unknown errors, send generic message in production
    const isDevelopment = process.env.NODE_ENV === 'development';

    return res.status(500).json({
        success: false,
        message: isDevelopment ? err.message : 'Internal server error',
        statusCode: 500,
        ...(isDevelopment && { stack: err.stack }),
    });
};

/**
 * Not Found Handler
 * Handles 404 errors for undefined routes
 */
export const notFoundHandler = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const error = new ApiError(404, `Route ${req.originalUrl} not found`);
    next(error);
};
