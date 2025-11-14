import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { ApiError, successResponse } from '../utils/response';
import { generateTokenPair, verifyRefreshToken } from '../utils/jwt';
import { UserLoginData } from '../types';
import logger from '../utils/logger';

/**
 * @route   POST /api/v1/auth/login
 * @desc    Admin login
 * @access  Public
 */
export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email, password }: UserLoginData = req.body;

        // Find user by email and include password field
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            throw new ApiError(401, 'Invalid credentials');
        }

        // Check if user is active
        if (!user.isActive) {
            throw new ApiError(401, 'Account is inactive. Please contact administrator.');
        }

        // Verify password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new ApiError(401, 'Invalid credentials');
        }

        // Generate tokens
        const tokens = generateTokenPair({
            userId: (user._id as any).toString(),
            email: user.email,
            role: user.role,
        });

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        logger.info(`User logged in: ${email}`);

        // Send response
        res.json(
            successResponse({
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                ...tokens,
            })
        );
    } catch (error) {
        next(error);
    }
};

/**
 * @route   POST /api/v1/auth/refresh
 * @desc    Refresh access token using refresh token
 * @access  Public
 */
export const refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            throw new ApiError(400, 'Refresh token is required');
        }

        // Verify refresh token
        const decoded = verifyRefreshToken(refreshToken);

        // Check if user still exists
        const user = await User.findById(decoded.userId);
        if (!user || !user.isActive) {
            throw new ApiError(401, 'User no longer exists or is inactive');
        }

        // Generate new token pair
        const tokens = generateTokenPair({
            userId: (user._id as any).toString(),
            email: user.email,
            role: user.role,
        });

        logger.info(`Token refreshed for user: ${user.email}`);

        res.json(successResponse(tokens));
    } catch (error: any) {
        if (error.name === 'JsonWebTokenError') {
            return next(new ApiError(401, 'Invalid refresh token'));
        }
        if (error.name === 'TokenExpiredError') {
            return next(new ApiError(401, 'Refresh token expired'));
        }
        next(error);
    }
};

/**
 * @route   GET /api/v1/auth/me
 * @desc    Get current user profile
 * @access  Private
 */
export const getMe = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.user) {
            throw new ApiError(401, 'Not authenticated');
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        res.json(
            successResponse({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phoneNumber: user.phoneNumber,
                isActive: user.isActive,
                lastLogin: user.lastLogin,
                createdAt: user.createdAt,
            })
        );
    } catch (error) {
        next(error);
    }
};

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Logout user (client-side token removal)
 * @access  Private
 */
export const logout = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        logger.info(`User logged out: ${req.user?.email || 'unknown'}`);

        res.json(
            successResponse({
                message: 'Logged out successfully',
            })
        );
    } catch (error) {
        next(error);
    }
};
