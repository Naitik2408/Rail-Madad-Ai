/**
 * API Configuration
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

/**
 * Get auth token from localStorage
 */
const getAuthToken = (): string | null => {
    return localStorage.getItem('accessToken');
};

/**
 * Set auth token in localStorage
 */
export const setAuthToken = (token: string): void => {
    localStorage.setItem('accessToken', token);
};

/**
 * Set refresh token in localStorage
 */
export const setRefreshToken = (token: string): void => {
    localStorage.setItem('refreshToken', token);
};

/**
 * Clear auth tokens from localStorage
 */
export const clearAuthTokens = (): void => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
};

/**
 * Get user from localStorage
 */
export const getStoredUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

/**
 * Store user in localStorage
 */
export const storeUser = (user: any): void => {
    localStorage.setItem('user', JSON.stringify(user));
};

/**
 * API Request wrapper with auth
 */
const apiRequest = async (
    endpoint: string,
    options: RequestInit = {}
): Promise<any> => {
    const token = getAuthToken();

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'API request failed');
    }

    return data;
};

export default {
    /**
     * Authentication APIs
     */
    auth: {
        login: async (email: string, password: string) => {
            const data = await apiRequest('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });

            if (data.success && data.data) {
                setAuthToken(data.data.accessToken);
                setRefreshToken(data.data.refreshToken);
                storeUser(data.data.user);
            }

            return data;
        },

        logout: async () => {
            try {
                await apiRequest('/auth/logout', { method: 'POST' });
            } finally {
                clearAuthTokens();
            }
        },

        getMe: async () => {
            return await apiRequest('/auth/me');
        },

        refreshToken: async () => {
            const refreshToken = localStorage.getItem('refreshToken');
            const data = await apiRequest('/auth/refresh', {
                method: 'POST',
                body: JSON.stringify({ refreshToken }),
            });

            if (data.success && data.data) {
                setAuthToken(data.data.accessToken);
                setRefreshToken(data.data.refreshToken);
            }

            return data;
        },
    },

    /**
     * Public Complaint APIs
     */
    complaints: {
        submit: async (complaintData: any) => {
            return await apiRequest('/complaints', {
                method: 'POST',
                body: JSON.stringify(complaintData),
            });
        },

        trackById: async (complaintId: string) => {
            return await apiRequest(`/complaints/track/${complaintId}`);
        },

        trackByEmail: async (email: string) => {
            return await apiRequest(`/complaints/track-by-email/${email}`);
        },
    },

    /**
     * Admin Complaint Management APIs
     */
    admin: {
        getAllComplaints: async (filters?: any) => {
            const params = new URLSearchParams(filters).toString();
            const endpoint = params ? `/admin/complaints?${params}` : '/admin/complaints';
            return await apiRequest(endpoint);
        },

        getComplaintById: async (id: string) => {
            return await apiRequest(`/admin/complaints/${id}`);
        },

        updateComplaint: async (id: string, updates: any) => {
            return await apiRequest(`/admin/complaints/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(updates),
            });
        },

        deleteComplaint: async (id: string) => {
            return await apiRequest(`/admin/complaints/${id}`, {
                method: 'DELETE',
            });
        },
    },

    /**
     * Dashboard APIs
     */
    dashboard: {
        getMetrics: async () => {
            return await apiRequest('/admin/dashboard/metrics');
        },

        getCharts: async () => {
            return await apiRequest('/admin/dashboard/charts');
        },
    },
};
