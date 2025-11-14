import { useState, useEffect } from 'react';
import api from '../services/api';

export interface Complaint {
    _id: string;
    complaintId: string;
    name: string;
    email: string;
    phoneNumber?: string;
    title?: string;
    description: string;
    category: string;
    priority: 'high' | 'medium' | 'low' | 'urgent'; // Backend format: lowercase
    status: 'resolved' | 'in_progress' | 'pending' | 'rejected'; // Backend format: lowercase with underscore
    trainNumber?: string;
    trainName?: string;
    coach?: string;
    pnr?: string;
    journeyDate?: string;
    station?: string;
    department?: string;
    assignedTo?: string;
    media?: string[];
    createdAt: string;
    updatedAt: string;
}

interface ComplaintsFilters {
    status?: string;
    priority?: string;
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
}

interface UseComplaintsReturn {
    complaints: Complaint[];
    isLoading: boolean;
    error: string | null;
    totalCount: number;
    refetch: (filters?: ComplaintsFilters) => Promise<void>;
    updateComplaint: (id: string, updates: any) => Promise<void>;
    deleteComplaint: (id: string) => Promise<void>;
}

export const useComplaints = (initialFilters?: ComplaintsFilters): UseComplaintsReturn => {
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState(0);

    const fetchComplaints = async (filters?: ComplaintsFilters) => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await api.admin.getAllComplaints(filters);

            console.log('API Response:', response); // Debug log

            // Backend returns: { success: true, data: { complaints: [...], pagination: {...} } }
            let complaintsArray: Complaint[] = [];
            let total = 0;

            if (response.success && response.data) {
                complaintsArray = response.data.complaints || [];
                total = response.data.pagination?.totalItems || complaintsArray.length;
            } else if (Array.isArray(response)) {
                complaintsArray = response;
                total = response.length;
            } else if (response.data && Array.isArray(response.data)) {
                complaintsArray = response.data;
                total = response.data.length;
            }

            setComplaints(complaintsArray);
            setTotalCount(total);
        } catch (err) {
            console.error('Error fetching complaints:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch complaints');
            setComplaints([]); // Set empty array on error
        } finally {
            setIsLoading(false);
        }
    }; const updateComplaint = async (id: string, updates: any) => {
        try {
            await api.admin.updateComplaint(id, updates);
            // Refresh the list after update
            await fetchComplaints(initialFilters);
        } catch (err) {
            console.error('Error updating complaint:', err);
            throw err;
        }
    };

    const deleteComplaint = async (id: string) => {
        try {
            await api.admin.deleteComplaint(id);
            // Refresh the list after deletion
            await fetchComplaints(initialFilters);
        } catch (err) {
            console.error('Error deleting complaint:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchComplaints(initialFilters);
    }, []);

    return {
        complaints,
        isLoading,
        error,
        totalCount,
        refetch: fetchComplaints,
        updateComplaint,
        deleteComplaint,
    };
};
