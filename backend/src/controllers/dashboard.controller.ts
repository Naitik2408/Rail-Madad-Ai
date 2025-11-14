import { Request, Response, NextFunction } from 'express';
import { Complaint, ComplaintStatus } from '../models/Complaint';
import { successResponse } from '../utils/response';
import { DashboardMetrics, DashboardCharts } from '../types';

/**
 * @route   GET /api/v1/admin/dashboard/metrics
 * @desc    Get dashboard metrics
 * @access  Private (Admin)
 */
export const getDashboardMetrics = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        // Get counts
        const [
            totalComplaints,
            pendingComplaints,
            inProgressComplaints,
            resolvedComplaints,
            rejectedComplaints,
            complaintsThisWeek,
            complaintsThisMonth,
            resolvedWithTime,
        ] = await Promise.all([
            Complaint.countDocuments(),
            Complaint.countDocuments({ status: ComplaintStatus.PENDING }),
            Complaint.countDocuments({ status: ComplaintStatus.IN_PROGRESS }),
            Complaint.countDocuments({ status: ComplaintStatus.RESOLVED }),
            Complaint.countDocuments({ status: ComplaintStatus.REJECTED }),
            Complaint.countDocuments({ createdAt: { $gte: oneWeekAgo } }),
            Complaint.countDocuments({ createdAt: { $gte: oneMonthAgo } }),
            Complaint.find({
                status: ComplaintStatus.RESOLVED,
                resolvedAt: { $exists: true },
            }).select('createdAt resolvedAt'),
        ]);

        // Calculate average resolution time (in hours)
        let avgResolutionTime = 0;
        if (resolvedWithTime.length > 0) {
            const totalResolutionTime = resolvedWithTime.reduce((acc, complaint) => {
                const created = new Date(complaint.createdAt).getTime();
                const resolved = complaint.resolvedAt
                    ? new Date(complaint.resolvedAt).getTime()
                    : created;
                return acc + (resolved - created);
            }, 0);
            avgResolutionTime = totalResolutionTime / resolvedWithTime.length / (1000 * 60 * 60);
        }

        // Calculate resolution rate
        const resolutionRate =
            totalComplaints > 0 ? (resolvedComplaints / totalComplaints) * 100 : 0;

        const metrics: DashboardMetrics = {
            totalComplaints,
            pendingComplaints,
            inProgressComplaints,
            resolvedComplaints,
            rejectedComplaints,
            avgResolutionTime: Math.round(avgResolutionTime * 10) / 10,
            complaintsThisWeek,
            complaintsThisMonth,
            resolutionRate: Math.round(resolutionRate * 10) / 10,
        };

        res.json(successResponse(metrics));
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/v1/admin/dashboard/charts
 * @desc    Get dashboard chart data
 * @access  Private (Admin)
 */
export const getDashboardCharts = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

        // Complaints by category
        const complaintsByCategory = await Complaint.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    label: '$_id',
                    value: '$count',
                    _id: 0,
                },
            },
            { $sort: { value: -1 } },
        ]);

        // Complaints by status
        const complaintsByStatus = await Complaint.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    label: '$_id',
                    value: '$count',
                    _id: 0,
                },
            },
        ]);

        // Complaints by priority
        const complaintsByPriority = await Complaint.aggregate([
            {
                $group: {
                    _id: '$priority',
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    label: '$_id',
                    value: '$count',
                    _id: 0,
                },
            },
        ]);

        // Complaints over time (last 30 days)
        const complaintsOverTime = await Complaint.aggregate([
            {
                $match: {
                    createdAt: { $gte: thirtyDaysAgo },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    date: '$_id',
                    count: '$count',
                    _id: 0,
                },
            },
            { $sort: { date: 1 } },
        ]);

        // Resolution time by category (average hours)
        const resolutionTimeByCategory = await Complaint.aggregate([
            {
                $match: {
                    status: ComplaintStatus.RESOLVED,
                    resolvedAt: { $exists: true },
                },
            },
            {
                $project: {
                    category: 1,
                    resolutionTime: {
                        $divide: [
                            { $subtract: ['$resolvedAt', '$createdAt'] },
                            1000 * 60 * 60, // Convert to hours
                        ],
                    },
                },
            },
            {
                $group: {
                    _id: '$category',
                    avgTime: { $avg: '$resolutionTime' },
                },
            },
            {
                $project: {
                    label: '$_id',
                    value: { $round: ['$avgTime', 1] },
                    _id: 0,
                },
            },
            { $sort: { value: -1 } },
        ]);

        const charts: DashboardCharts = {
            complaintsByCategory,
            complaintsByStatus,
            complaintsByPriority,
            complaintsOverTime,
            resolutionTimeByCategory,
        };

        res.json(successResponse(charts));
    } catch (error) {
        next(error);
    }
};
