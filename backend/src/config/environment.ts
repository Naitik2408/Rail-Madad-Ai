import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface Environment {
    node: {
        env: string;
    };
    server: {
        port: number;
    };
    api: {
        version: string;
    };
    database: {
        uri: string;
    };
    jwt: {
        secret: string;
        expire: string;
        refreshSecret: string;
        refreshExpire: string;
    };
    cors: {
        origin: string;
    };
    aiService: {
        url: string;
        apiKey?: string;
        timeout: number;
    };
    rateLimit: {
        windowMs: number;
        maxRequests: number;
    };
    logging: {
        level: string;
    };
    seed: {
        adminEmail: string;
        adminPassword: string;
        adminName: string;
    };
}

const environment: Environment = {
    node: {
        env: process.env.NODE_ENV || 'development',
    },
    server: {
        port: parseInt(process.env.PORT || '5000', 10),
    },
    api: {
        version: process.env.API_VERSION || 'v1',
    },
    database: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/rail-madad-ai',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'default-jwt-secret-change-in-production',
        expire: process.env.JWT_EXPIRE || '24h',
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'default-refresh-secret-change-in-production',
        refreshExpire: process.env.JWT_REFRESH_EXPIRE || '7d',
    },
    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    },
    aiService: {
        url: process.env.AI_SERVICE_URL || 'http://localhost:8000',
        apiKey: process.env.AI_SERVICE_API_KEY,
        timeout: parseInt(process.env.AI_SERVICE_TIMEOUT || '5000', 10),
    },
    rateLimit: {
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
        maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
    },
    logging: {
        level: process.env.LOG_LEVEL || 'debug',
    },
    seed: {
        adminEmail: process.env.SEED_ADMIN_EMAIL || 'admin@railmadad.com',
        adminPassword: process.env.SEED_ADMIN_PASSWORD || 'Admin@123',
        adminName: process.env.SEED_ADMIN_NAME || 'System Administrator',
    },
};

// Validate required environment variables in production
if (environment.node.env === 'production') {
    const requiredEnvVars = ['JWT_SECRET', 'JWT_REFRESH_SECRET', 'MONGODB_URI'];
    const missingEnvVars = requiredEnvVars.filter(
        (varName) => !process.env[varName] || process.env[varName]?.includes('default')
    );

    if (missingEnvVars.length > 0) {
        console.error('❌ Missing or using default values for required environment variables:');
        missingEnvVars.forEach((varName) => console.error(`   - ${varName}`));
        process.exit(1);
    }
}

export default environment;
