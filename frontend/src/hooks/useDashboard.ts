import { useState, useEffect } from 'react';
import api from '../services/api';

interface DashboardMetrics {
    totalComplaints: number;
    resolvedComplaints: number;
    pendingComplaints: number;
    inProgressComplaints: number;
    averageResolutionTime: number;
    resolvedToday: number;
    categoryDistribution: Array<{
        category: string;
        count: number;
    }>;
    priorityDistribution: Array<{
        priority: string;
        count: number;
    }>;
}

interface ChartData {
    complaintsOverTime: Array<{
        date: string;
        count: number;
    }>;
    resolutionRate: Array<{
        date: string;
        rate: number;
    }>;
}

interface UseDashboardReturn {
    metrics: DashboardMetrics | null;
    charts: ChartData | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export const useDashboard = (): UseDashboardReturn => {
    const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
    const [charts, setCharts] = useState<ChartData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const [metricsData, chartsData] = await Promise.all([
                api.dashboard.getMetrics(),
                api.dashboard.getCharts(),
            ]);

            console.log('Metrics Response:', metricsData); // Debug log
            console.log('Charts Response:', chartsData); // Debug log

            // Handle response structure - backend returns { success, data }
            setMetrics(metricsData.data || metricsData);
            setCharts(chartsData.data || chartsData);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
        } finally {
            setIsLoading(false);
        }
    }; useEffect(() => {
        fetchData();
    }, []);

    return {
        metrics,
        charts,
        isLoading,
        error,
        refetch: fetchData,
    };
};
