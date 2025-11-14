import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import environment from './config/environment';
import logger from './utils/logger';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';
// import { apiLimiter } from './middleware/rateLimit.middleware'; // DISABLED FOR TESTING

// Load environment variables
dotenv.config();

// Create Express app
const app: Application = express();

// ================== Middleware ==================

// Security headers
app.use(helmet());

// CORS configuration
app.use(
    cors({
        origin: environment.cors.origin,
        credentials: true,
    })
);

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// HTTP request logger
if (environment.node.env === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// Rate limiting - DISABLED FOR TESTING
// app.use(`/api/${environment.api.version}`, apiLimiter);

// ================== Routes ==================

// Import routes
import authRoutes from './routes/auth.routes';
import complaintRoutes from './routes/complaint.routes';
import adminRoutes from './routes/admin.routes';
import dashboardRoutes from './routes/dashboard.routes';

// Health check route
app.get('/health', (_req: Request, res: Response) => {
    res.json({
        success: true,
        message: 'Rail Madad API is running',
        timestamp: new Date().toISOString(),
        environment: environment.node.env,
    });
});

// API routes
const apiVersion = `/api/${environment.api.version}`;
app.use(`${apiVersion}/auth`, authRoutes);
app.use(`${apiVersion}/complaints`, complaintRoutes);
app.use(`${apiVersion}/admin/complaints`, adminRoutes);
app.use(`${apiVersion}/admin/dashboard`, dashboardRoutes);// ================== Error Handling ==================

// 404 handler (must be after all routes)
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

// ================== Server Initialization ==================

const PORT = environment.server.port;

const startServer = async () => {
    try {
        // Connect to database
        await connectDB();

        // Start server
        app.listen(PORT, () => {
            logger.info(`Server running in ${environment.node.env} mode on port ${PORT}`);
            logger.info(`API version: ${environment.api.version}`);
            logger.info(`Health check: http://localhost:${PORT}/health`);
        });
    } catch (error) {
        logger.error('Failed to start server', error);
        process.exit(1);
    }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
    logger.error('Unhandled Promise Rejection', err);
    process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
    logger.error('Uncaught Exception', err);
    process.exit(1);
});

// Start server
startServer();

export default app;
