import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User, UserRole } from '../models/User';
import { Complaint, ComplaintCategory, ComplaintStatus, ComplaintPriority } from '../models/Complaint';
import environment from '../config/environment';
import logger from './logger';

// Load environment variables
dotenv.config();

/**
 * Database Seeder
 * Creates initial admin user and sample complaints for testing
 */
export const seedDatabase = async (): Promise<void> => {
    try {
        // Connect to database
        await mongoose.connect(environment.database.uri);
        logger.info('Connected to MongoDB for seeding');

        // Clear existing data (optional - comment out if you want to keep existing data)
        const clearData = process.argv.includes('--clear');
        if (clearData) {
            await User.deleteMany({});
            await Complaint.deleteMany({});
            logger.info('Cleared existing data');
        }

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: environment.seed.adminEmail });
        if (existingAdmin) {
            logger.info('Admin user already exists');
        } else {
            // Create admin user
            const admin = await User.create({
                name: environment.seed.adminName,
                email: environment.seed.adminEmail,
                password: environment.seed.adminPassword,
                role: UserRole.ADMIN,
                isActive: true,
            });
            logger.info(`✅ Admin user created: ${admin.email}`);
        }

        // Create sample complaints
        const sampleComplaints = [
            {
                name: 'Rajesh Kumar',
                email: 'rajesh.kumar@example.com',
                phoneNumber: '9876543210',
                pnr: '1234567890',
                trainNumber: '12345',
                trainName: 'Rajdhani Express',
                category: ComplaintCategory.CLEANLINESS,
                description: 'The coach was not properly cleaned. There was garbage under the seats and the washroom was dirty.',
                journeyDate: new Date('2024-11-10'),
                station: 'New Delhi',
                coach: 'A1',
                seatNumber: '45',
                status: ComplaintStatus.PENDING,
                priority: ComplaintPriority.MEDIUM,
            },
            {
                name: 'Priya Sharma',
                email: 'priya.sharma@example.com',
                phoneNumber: '9123456789',
                trainNumber: '12301',
                trainName: 'Howrah Rajdhani',
                category: ComplaintCategory.STAFF_BEHAVIOR,
                description: 'The TTE was very rude and did not help with our queries regarding the seat arrangement.',
                journeyDate: new Date('2024-11-09'),
                station: 'Howrah',
                coach: 'B2',
                status: ComplaintStatus.IN_PROGRESS,
                priority: ComplaintPriority.HIGH,
            },
            {
                name: 'Amit Patel',
                email: 'amit.patel@example.com',
                phoneNumber: '9988776655',
                pnr: '9876543210',
                trainNumber: '12951',
                trainName: 'Mumbai Rajdhani',
                category: ComplaintCategory.FACILITIES,
                description: 'AC was not working in our coach. It was very uncomfortable during the journey.',
                journeyDate: new Date('2024-11-08'),
                station: 'Mumbai Central',
                coach: 'C1',
                seatNumber: '12',
                status: ComplaintStatus.RESOLVED,
                priority: ComplaintPriority.URGENT,
                resolutionDetails: 'AC was repaired and tested. Issue resolved.',
                resolvedAt: new Date('2024-11-09'),
            },
            {
                name: 'Sunita Verma',
                email: 'sunita.verma@example.com',
                phoneNumber: '9871234567',
                trainNumber: '12009',
                trainName: 'Shatabdi Express',
                category: ComplaintCategory.FOOD_QUALITY,
                description: 'The food served was stale and had a bad smell. Received cold food.',
                journeyDate: new Date('2024-11-11'),
                station: 'Chennai Central',
                status: ComplaintStatus.PENDING,
                priority: ComplaintPriority.HIGH,
            },
            {
                name: 'Vikram Singh',
                email: 'vikram.singh@example.com',
                phoneNumber: '9654321098',
                pnr: '5678901234',
                trainNumber: '12002',
                trainName: 'Bhopal Shatabdi',
                category: ComplaintCategory.SECURITY,
                description: 'I witnessed theft in the coach. Security personnel were not available when needed.',
                journeyDate: new Date('2024-11-07'),
                station: 'Bhopal Junction',
                coach: 'D3',
                status: ComplaintStatus.IN_PROGRESS,
                priority: ComplaintPriority.URGENT,
            },
            {
                name: 'Anita Reddy',
                email: 'anita.reddy@example.com',
                trainNumber: '12430',
                trainName: 'Lucknow Mail',
                category: ComplaintCategory.TICKETING,
                description: 'Unable to book tickets online. Website was showing errors repeatedly.',
                status: ComplaintStatus.RESOLVED,
                priority: ComplaintPriority.LOW,
                resolutionDetails: 'Technical issue was fixed. Booking system is now working properly.',
                resolvedAt: new Date('2024-11-10'),
            },
            {
                name: 'Manoj Gupta',
                email: 'manoj.gupta@example.com',
                phoneNumber: '9876509876',
                trainNumber: '12423',
                trainName: 'Dibrugarh Rajdhani',
                category: ComplaintCategory.MAINTENANCE,
                description: 'The berth was broken and could not be used. Requested change but no action was taken.',
                journeyDate: new Date('2024-11-06'),
                coach: 'E1',
                seatNumber: '28',
                status: ComplaintStatus.PENDING,
                priority: ComplaintPriority.MEDIUM,
            },
            {
                name: 'Kavita Joshi',
                email: 'kavita.joshi@example.com',
                phoneNumber: '9123450987',
                trainNumber: '22691',
                trainName: 'Rajdhani Express',
                category: ComplaintCategory.CLEANLINESS,
                description: 'Washroom water supply was not working throughout the journey.',
                journeyDate: new Date('2024-11-05'),
                station: 'Bangalore City',
                coach: 'F2',
                status: ComplaintStatus.RESOLVED,
                priority: ComplaintPriority.MEDIUM,
                resolutionDetails: 'Water tank was refilled at the next station.',
                resolvedAt: new Date('2024-11-05'),
            },
        ];

        const complaintCount = await Complaint.countDocuments();
        if (complaintCount === 0) {
            // Use create instead of insertMany to trigger pre-save hooks
            for (const complaintData of sampleComplaints) {
                await Complaint.create(complaintData);
            }
            logger.info(`✅ Created ${sampleComplaints.length} sample complaints`);
        } else {
            logger.info('Sample complaints already exist');
        }

        logger.info('✅ Database seeding completed successfully');
        process.exit(0);
    } catch (error) {
        logger.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

// Run seeder if this file is executed directly
if (require.main === module) {
    seedDatabase();
}
