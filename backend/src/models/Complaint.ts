import mongoose, { Document, Schema } from 'mongoose';

/**
 * Complaint Status Enumeration
 */
export enum ComplaintStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    RESOLVED = 'resolved',
    REJECTED = 'rejected',
}

/**
 * Complaint Priority Enumeration
 */
export enum ComplaintPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    URGENT = 'urgent',
}

/**
 * Complaint Category Enumeration
 */
export enum ComplaintCategory {
    CLEANLINESS = 'cleanliness',
    STAFF_BEHAVIOR = 'staff_behavior',
    FACILITIES = 'facilities',
    SECURITY = 'security',
    TICKETING = 'ticketing',
    FOOD_QUALITY = 'food_quality',
    MAINTENANCE = 'maintenance',
    OTHER = 'other',
}

/**
 * Status Update Interface
 */
export interface IStatusUpdate {
    status: ComplaintStatus;
    updatedBy: mongoose.Types.ObjectId;
    updatedAt: Date;
    comment?: string;
}

/**
 * Complaint Interface
 */
export interface IComplaint extends Document {
    complaintId: string; // Auto-generated unique ID (e.g., CMP-2024-0001)
    userId?: mongoose.Types.ObjectId; // Optional - for registered users
    name: string; // Name of complainant
    email: string;
    phoneNumber?: string;
    pnr?: string; // PNR number
    trainNumber?: string;
    trainName?: string;
    category: ComplaintCategory;
    subcategory?: string;
    description: string;
    journeyDate?: Date;
    station?: string;
    coach?: string;
    seatNumber?: string;
    status: ComplaintStatus;
    priority: ComplaintPriority;
    aiSuggestedCategory?: ComplaintCategory;
    aiConfidence?: number; // 0-1
    assignedTo?: mongoose.Types.ObjectId; // Department/Staff ID
    department?: string;
    statusUpdates: IStatusUpdate[];
    attachments?: string[]; // URLs to uploaded files
    resolutionDetails?: string;
    resolvedAt?: Date;
    resolvedBy?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Status Update Schema
 */
const statusUpdateSchema = new Schema<IStatusUpdate>(
    {
        status: {
            type: String,
            enum: Object.values(ComplaintStatus),
            required: true,
        },
        updatedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
        comment: {
            type: String,
            maxlength: [500, 'Comment cannot exceed 500 characters'],
        },
    },
    { _id: false }
);

/**
 * Complaint Schema
 */
const complaintSchema = new Schema<IComplaint>(
    {
        complaintId: {
            type: String,
            unique: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            lowercase: true,
            trim: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Please provide a valid email address',
            ],
        },
        phoneNumber: {
            type: String,
            trim: true,
            match: [
                /^[6-9]\d{9}$/,
                'Please provide a valid 10-digit Indian mobile number',
            ],
        },
        pnr: {
            type: String,
            trim: true,
            match: [/^\d{10}$/, 'PNR must be a 10-digit number'],
        },
        trainNumber: {
            type: String,
            trim: true,
        },
        trainName: {
            type: String,
            trim: true,
        },
        category: {
            type: String,
            enum: Object.values(ComplaintCategory),
            required: [true, 'Category is required'],
        },
        subcategory: {
            type: String,
            trim: true,
            maxlength: [100, 'Subcategory cannot exceed 100 characters'],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            minlength: [10, 'Description must be at least 10 characters'],
            maxlength: [2000, 'Description cannot exceed 2000 characters'],
        },
        journeyDate: {
            type: Date,
        },
        station: {
            type: String,
            trim: true,
        },
        coach: {
            type: String,
            trim: true,
        },
        seatNumber: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: Object.values(ComplaintStatus),
            default: ComplaintStatus.PENDING,
        },
        priority: {
            type: String,
            enum: Object.values(ComplaintPriority),
            default: ComplaintPriority.MEDIUM,
        },
        aiSuggestedCategory: {
            type: String,
            enum: Object.values(ComplaintCategory),
        },
        aiConfidence: {
            type: Number,
            min: 0,
            max: 1,
        },
        assignedTo: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        department: {
            type: String,
            trim: true,
        },
        statusUpdates: [statusUpdateSchema],
        attachments: [
            {
                type: String,
            },
        ],
        resolutionDetails: {
            type: String,
            maxlength: [1000, 'Resolution details cannot exceed 1000 characters'],
        },
        resolvedAt: {
            type: Date,
        },
        resolvedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

/**
 * Auto-generate complaint ID before saving
 */
complaintSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }

    try {
        const year = new Date().getFullYear();
        const count = await mongoose.model('Complaint').countDocuments();
        const sequence = String(count + 1).padStart(4, '0');
        this.complaintId = `CMP-${year}-${sequence}`;
        next();
    } catch (error: any) {
        next(error);
    }
});

/**
 * Update statusUpdates array when status changes
 */
complaintSchema.pre('save', function (next) {
    if (this.isModified('status') && !this.isNew) {
        // This will be handled in controller with proper user context
    }
    next();
});

/**
 * Indexes for faster queries
 */
complaintSchema.index({ complaintId: 1 });
complaintSchema.index({ email: 1 });
complaintSchema.index({ status: 1 });
complaintSchema.index({ category: 1 });
complaintSchema.index({ priority: 1 });
complaintSchema.index({ createdAt: -1 });
complaintSchema.index({ assignedTo: 1, status: 1 });

export const Complaint = mongoose.model<IComplaint>('Complaint', complaintSchema);
