import { Request, Response, NextFunction } from 'express';
import { Complaint, ComplaintStatus } from '../models/Complaint';
import { ApiError, successResponse } from '../utils/response';
import { ComplaintFilterQuery, ComplaintUpdateData } from '../types';
import logger from '../utils/logger';

/**
 * @route   GET /api/v1/admin/complaints
 * @desc    Get all complaints with filters (Admin)
 * @access  Private (Admin)
 */
export const getAllComplaints = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const {
            page = 1,
            limit = 10,
            status,
            category,
            priority,
            search,
            startDate,
            endDate,
            department,
            assignedTo,
            sortBy = 'createdAt',
            sortOrder = 'desc',
        }: ComplaintFilterQuery = req.query;

        // Build query
        const query: any = {};

        if (status) query.status = status;
        if (category) query.category = category;
        if (priority) query.priority = priority;
        if (department) query.department = department;
        if (assignedTo) query.assignedTo = assignedTo;

        // Date range filter
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(endDate);
        }

        // Search filter (complaintId, email, description)
        if (search) {
            query.$or = [
                { complaintId: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { name: { $regex: search, $options: 'i' } },
            ];
        }

        // Calculate pagination
        const skip = (Number(page) - 1) * Number(limit);
        const sortOptions: any = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

        // Execute query
        const [complaints, total] = await Promise.all([
            Complaint.find(query)
                .sort(sortOptions)
                .skip(skip)
                .limit(Number(limit))
                .populate('assignedTo', 'name email')
                .populate('resolvedBy', 'name email'),
            Complaint.countDocuments(query),
        ]);

        const totalPages = Math.ceil(total / Number(limit));

        res.json(
            successResponse({
                complaints,
                pagination: {
                    currentPage: Number(page),
                    totalPages,
                    totalItems: total,
                    itemsPerPage: Number(limit),
                    hasNextPage: Number(page) < totalPages,
                    hasPrevPage: Number(page) > 1,
                },
            })
        );
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/v1/admin/complaints/:id
 * @desc    Get complaint by ID (Admin)
 * @access  Private (Admin)
 */
export const getComplaintById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;

        const complaint = await Complaint.findById(id)
            .populate('userId', 'name email phoneNumber')
            .populate('assignedTo', 'name email role')
            .populate('resolvedBy', 'name email')
            .populate('statusUpdates.updatedBy', 'name email');

        if (!complaint) {
            throw new ApiError(404, 'Complaint not found');
        }

        res.json(successResponse(complaint));
    } catch (error) {
        next(error);
    }
};

/**
 * @route   PATCH /api/v1/admin/complaints/:id
 * @desc    Update complaint (Admin)
 * @access  Private (Admin)
 */
export const updateComplaint = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const updateData: ComplaintUpdateData = req.body;
        const adminId = req.user?.id;

        const complaint = await Complaint.findById(id);

        if (!complaint) {
            throw new ApiError(404, 'Complaint not found');
        }

        // Track status change
        const statusChanged = updateData.status && updateData.status !== complaint.status;

        // Update fields
        if (updateData.status) complaint.status = updateData.status as any;
        if (updateData.priority) complaint.priority = updateData.priority as any;
        if (updateData.assignedTo) complaint.assignedTo = updateData.assignedTo as any;
        if (updateData.department) complaint.department = updateData.department;
        if (updateData.resolutionDetails) {
            complaint.resolutionDetails = updateData.resolutionDetails;
        }

        // Add status update if status changed
        if (statusChanged && adminId) {
            complaint.statusUpdates.push({
                status: updateData.status as any,
                updatedBy: adminId as any,
                updatedAt: new Date(),
                comment: updateData.comment,
            });
        }

        // Mark as resolved
        if (updateData.status === ComplaintStatus.RESOLVED && adminId) {
            complaint.resolvedAt = new Date();
            complaint.resolvedBy = adminId as any;
        }

        await complaint.save();

        logger.info(`Complaint updated: ${complaint.complaintId}`, {
            updatedBy: req.user?.email,
            status: updateData.status,
        });

        res.json(
            successResponse(complaint, 'Complaint updated successfully')
        );
    } catch (error) {
        next(error);
    }
};

/**
 * @route   DELETE /api/v1/admin/complaints/:id
 * @desc    Delete complaint (Admin)
 * @access  Private (Admin)
 */
export const deleteComplaint = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;

        const complaint = await Complaint.findByIdAndDelete(id);

        if (!complaint) {
            throw new ApiError(404, 'Complaint not found');
        }

        logger.info(`Complaint deleted: ${complaint.complaintId}`, {
            deletedBy: req.user?.email,
        });

        res.json(
            successResponse(
                { complaintId: complaint.complaintId },
                'Complaint deleted successfully'
            )
        );
    } catch (error) {
        next(error);
    }
};
