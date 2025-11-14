import rateLimit from 'express-rate-limit';
import environment from '../config/environment';

/**
 * General API Rate Limiter
 * Applies to all API routes
 */
export const apiLimiter = rateLimit({
    windowMs: environment.rateLimit.windowMs,
    max: environment.rateLimit.maxRequests,
    message: 'Too many requests from this IP, please try again later',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

/**
 * Strict Rate Limiter for Authentication Routes
 * Prevents brute force attacks
 */
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per window
    message: 'Too many login attempts, please try again later',
    skipSuccessfulRequests: true, // Don't count successful requests
});

/**
 * Rate Limiter for Complaint Submission
 * Prevents spam submissions
 */
export const complaintLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // 10 complaints per hour
    message: 'Too many complaints submitted, please try again later',
    keyGenerator: (req) => {
        // Use email or IP for rate limiting
        return req.body.email || req.ip || 'unknown';
    },
});
