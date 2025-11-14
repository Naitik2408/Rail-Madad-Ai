/**
 * Common TypeScript Types and Interfaces
 */

/**
 * Generic Pagination Query Parameters
 */
export interface PaginationQuery {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

/**
 * Complaint Filter Query Parameters
 */
export interface ComplaintFilterQuery extends PaginationQuery {
    status?: string;
    category?: string;
    priority?: string;
    search?: string;
    startDate?: string;
    endDate?: string;
    department?: string;
    assignedTo?: string;
}

/**
 * Dashboard Metrics Response
 */
export interface DashboardMetrics {
    totalComplaints: number;
    pendingComplaints: number;
    inProgressComplaints: number;
    resolvedComplaints: number;
    rejectedComplaints: number;
    avgResolutionTime: number; // in hours
    complaintsThisWeek: number;
    complaintsThisMonth: number;
    resolutionRate: number; // percentage
}

/**
 * Chart Data Point
 */
export interface ChartDataPoint {
    label: string;
    value: number;
}

/**
 * Time Series Data Point
 */
export interface TimeSeriesDataPoint {
    date: string;
    count: number;
}

/**
 * Dashboard Charts Data
 */
export interface DashboardCharts {
    complaintsByCategory: ChartDataPoint[];
    complaintsByStatus: ChartDataPoint[];
    complaintsByPriority: ChartDataPoint[];
    complaintsOverTime: TimeSeriesDataPoint[];
    resolutionTimeByCategory: ChartDataPoint[];
}

/**
 * JWT Payload
 */
export interface JWTPayload {
    userId: string;
    email: string;
    role: string;
}

/**
 * Auth Response
 */
export interface AuthResponse {
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
    accessToken: string;
    refreshToken: string;
}

/**
 * File Upload Response
 */
export interface FileUploadResponse {
    url: string;
    filename: string;
    size: number;
    mimetype: string;
}

/**
 * AI Service Request
 */
export interface AIServiceRequest {
    text: string;
    type: 'categorize' | 'sentiment' | 'priority';
}

/**
 * AI Service Response
 */
export interface AIServiceResponse {
    category?: string;
    confidence?: number;
    sentiment?: 'positive' | 'neutral' | 'negative';
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    keywords?: string[];
}

/**
 * Request with User (after authentication middleware)
 */
export interface AuthenticatedRequest {
    user: {
        id: string;
        email: string;
        role: string;
    };
}

/**
 * Complaint Submission Data
 */
export interface ComplaintSubmissionData {
    name: string;
    email: string;
    phoneNumber?: string;
    pnr?: string;
    trainNumber?: string;
    trainName?: string;
    category: string;
    subcategory?: string;
    description: string;
    journeyDate?: string;
    station?: string;
    coach?: string;
    seatNumber?: string;
}

/**
 * Complaint Update Data (Admin)
 */
export interface ComplaintUpdateData {
    status?: string;
    priority?: string;
    assignedTo?: string;
    department?: string;
    resolutionDetails?: string;
    comment?: string;
}

/**
 * User Registration Data
 */
export interface UserRegistrationData {
    name: string;
    email: string;
    password: string;
    phoneNumber?: string;
}

/**
 * User Login Data
 */
export interface UserLoginData {
    email: string;
    password: string;
}

/**
 * Routing Rule Data
 */
export interface RoutingRuleData {
    name: string;
    description?: string;
    category: string;
    keywords: string[];
    department: string;
    priority?: number;
    assignToUserId?: string;
}

export default {};
