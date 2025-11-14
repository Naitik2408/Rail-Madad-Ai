import jwt from 'jsonwebtoken';
import environment from '../config/environment';
import { JWTPayload } from '../types';

/**
 * Generate Access Token
 */
export const generateAccessToken = (payload: JWTPayload): string => {
    return jwt.sign(payload, environment.jwt.secret, {
        expiresIn: environment.jwt.expire as any,
    });
};

/**
 * Generate Refresh Token
 */
export const generateRefreshToken = (payload: JWTPayload): string => {
    return jwt.sign(payload, environment.jwt.refreshSecret, {
        expiresIn: environment.jwt.refreshExpire as any,
    });
};

/**
 * Verify Access Token
 */
export const verifyAccessToken = (token: string): JWTPayload => {
    return jwt.verify(token, environment.jwt.secret) as JWTPayload;
};

/**
 * Verify Refresh Token
 */
export const verifyRefreshToken = (token: string): JWTPayload => {
    return jwt.verify(token, environment.jwt.refreshSecret) as JWTPayload;
};

/**
 * Generate Token Pair (Access + Refresh)
 */
export const generateTokenPair = (payload: JWTPayload) => {
    return {
        accessToken: generateAccessToken(payload),
        refreshToken: generateRefreshToken(payload),
    };
};
