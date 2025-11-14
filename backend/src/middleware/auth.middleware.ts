import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/response';
import { User, UserRole } from '../models/User';
import { JWTPayload } from '../types';
import environment from '../config/environment';

/**
 * Extend Express Request to include user
 */
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                role: string;
            };
        }
    }
}

/**
 * Authentication Middleware
 * Verifies JWT token and attaches user to request
 */
export const authenticate = async (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new ApiError(401, 'No token provided');
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        // Verify token
        const decoded = jwt.verify(
            token,
            environment.jwt.secret
        ) as JWTPayload;

        // Check if user still exists
        const user = await User.findById(decoded.userId);
        if (!user || !user.isActive) {
            throw new ApiError(401, 'User no longer exists or is inactive');
        }

        // Attach user to request
        req.user = {
            id: decoded.userId,
            email: decoded.email,
            role: decoded.role,
        };

        next();
    } catch (error: any) {
        if (error.name === 'JsonWebTokenError') {
            return next(new ApiError(401, 'Invalid token'));
        }
        if (error.name === 'TokenExpiredError') {
            return next(new ApiError(401, 'Token expired'));
        }
        next(error);
    }
};

/**
 * Authorization Middleware
 * Checks if user has required role
 */
export const authorize = (...roles: UserRole[]) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(new ApiError(401, 'Authentication required'));
        }

        if (!roles.includes(req.user.role as UserRole)) {
            return next(
                new ApiError(403, 'You do not have permission to perform this action')
            );
        }

        next();
    };
};

/**
 * Optional Authentication Middleware
 * Attaches user if token is valid, but doesn't throw error if not
 */
export const optionalAuth = async (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            const decoded = jwt.verify(
                token,
                environment.jwt.secret
            ) as JWTPayload;

            const user = await User.findById(decoded.userId);
            if (user && user.isActive) {
                req.user = {
                    id: decoded.userId,
                    email: decoded.email,
                    role: decoded.role,
                };
            }
        }
    } catch (error) {
        // Silently fail - user remains undefined
    }
    next();
};
