/**
 * Custom API Error Class
 */
export class ApiError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(statusCode: number, message: string, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Standard API Response Interface
 */
export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error?: {
        message: string;
        details?: any;
    };
}

/**
 * Success Response Helper
 */
export const successResponse = <T>(data: T, message?: string): ApiResponse<T> => {
    return {
        success: true,
        message,
        data,
    };
};

/**
 * Error Response Helper
 */
export const errorResponse = (message: string, details?: any): ApiResponse => {
    return {
        success: false,
        error: {
            message,
            details,
        },
    };
};

/**
 * Pagination Response Interface
 */
export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}
