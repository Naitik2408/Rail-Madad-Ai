import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api, { getStoredUser, clearAuthTokens } from '../services/api';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = async () => {
        const storedUser = getStoredUser();
        if (storedUser) {
            try {
                const response = await api.auth.getMe();
                if (response.success) {
                    setUser(response.data);
                } else {
                    clearAuthTokens();
                    setUser(null);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                clearAuthTokens();
                setUser(null);
            }
        }
        setIsLoading(false);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await api.auth.login(email, password);
            if (response.success && response.data) {
                setUser(response.data.user);
            }
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        api.auth.logout();
        setUser(null);
    };

    const value = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        checkAuth,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
