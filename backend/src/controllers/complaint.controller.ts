import { Request, Response, NextFunction } from 'express';
import { Complaint } from '../models/Complaint';
import { ApiError, successResponse } from '../utils/response';
import { ComplaintSubmissionData } from '../types';
import logger from '../utils/logger';

/**
 * @route   POST /api/v1/complaints
 * @desc    Submit a new complaint (Public)
 * @access  Public
 */
export const submitComplaint = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const complaintData: ComplaintSubmissionData = req.body;

        // Create complaint
        const complaint = await Complaint.create({
            ...complaintData,
            journeyDate: complaintData.journeyDate
                ? new Date(complaintData.journeyDate)
                : undefined,
            userId: req.user?.id, // Optional - if user is logged in
        });

        logger.info(`New complaint submitted: ${complaint.complaintId}`, {
            email: complaintData.email,
            category: complaintData.category,
        });

        res.status(201).json(
            successResponse(
                {
                    complaintId: complaint.complaintId,
                    status: complaint.status,
                    category: complaint.category,
                    createdAt: complaint.createdAt,
                    message: 'Complaint submitted successfully',
                },
                'Complaint submitted successfully'
            )
        );
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/v1/complaints/track/:complaintId
 * @desc    Track complaint status by complaint ID
 * @access  Public
 */
export const trackComplaint = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { complaintId } = req.params;

        const complaint = await Complaint.findOne({ complaintId }).select(
            '-userId -assignedTo -resolvedBy -aiSuggestedCategory -aiConfidence'
        );

        if (!complaint) {
            throw new ApiError(404, 'Complaint not found');
        }

        res.json(
            successResponse({
                complaintId: complaint.complaintId,
                status: complaint.status,
                priority: complaint.priority,
                category: complaint.category,
                subcategory: complaint.subcategory,
                description: complaint.description,
                trainNumber: complaint.trainNumber,
                trainName: complaint.trainName,
                pnr: complaint.pnr,
                journeyDate: complaint.journeyDate,
                station: complaint.station,
                coach: complaint.coach,
                seatNumber: complaint.seatNumber,
                department: complaint.department,
                statusUpdates: complaint.statusUpdates,
                resolutionDetails: complaint.resolutionDetails,
                resolvedAt: complaint.resolvedAt,
                createdAt: complaint.createdAt,
                updatedAt: complaint.updatedAt,
            })
        );
    } catch (error) {
        next(error);
    }
};
