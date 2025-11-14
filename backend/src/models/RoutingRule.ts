import mongoose, { Document, Schema } from 'mongoose';
import { ComplaintCategory } from './Complaint';

/**
 * Routing Rule Interface
 * For future use in Department Routing feature (v2.0+)
 */
export interface IRoutingRule extends Document {
    name: string;
    description?: string;
    category: ComplaintCategory;
    keywords: string[]; // Keywords to match in complaint description
    department: string;
    priority: number; // Higher number = higher priority when multiple rules match
    assignToUserId?: mongoose.Types.ObjectId; // Specific user to assign to
    isActive: boolean;
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Routing Rule Schema
 */
const routingRuleSchema = new Schema<IRoutingRule>(
    {
        name: {
            type: String,
            required: [true, 'Rule name is required'],
            trim: true,
            maxlength: [100, 'Rule name cannot exceed 100 characters'],
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, 'Description cannot exceed 500 characters'],
        },
        category: {
            type: String,
            enum: Object.values(ComplaintCategory),
            required: [true, 'Category is required'],
        },
        keywords: [
            {
                type: String,
                lowercase: true,
                trim: true,
            },
        ],
        department: {
            type: String,
            required: [true, 'Department is required'],
            trim: true,
        },
        priority: {
            type: Number,
            default: 1,
            min: 1,
            max: 10,
        },
        assignToUserId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

/**
 * Indexes for faster queries
 */
routingRuleSchema.index({ category: 1, isActive: 1 });
routingRuleSchema.index({ department: 1, isActive: 1 });
routingRuleSchema.index({ priority: -1 });

export const RoutingRule = mongoose.model<IRoutingRule>(
    'RoutingRule',
    routingRuleSchema
);
