/**
 * Simple Logger Utility
 */

type LogLevel = 'error' | 'warn' | 'info' | 'debug';

const logLevelPriority: Record<LogLevel, number> = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
};

const currentLogLevel: LogLevel = (process.env.LOG_LEVEL as LogLevel) || 'debug';

const shouldLog = (level: LogLevel): boolean => {
    return logLevelPriority[level] <= logLevelPriority[currentLogLevel];
};

const formatMessage = (level: LogLevel, message: string, meta?: any): string => {
    const timestamp = new Date().toISOString();
    const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}`;
};

export const logger = {
    error: (message: string, meta?: any) => {
        if (shouldLog('error')) {
            console.error(formatMessage('error', message, meta));
        }
    },

    warn: (message: string, meta?: any) => {
        if (shouldLog('warn')) {
            console.warn(formatMessage('warn', message, meta));
        }
    },

    info: (message: string, meta?: any) => {
        if (shouldLog('info')) {
            console.log(formatMessage('info', message, meta));
        }
    },

    debug: (message: string, meta?: any) => {
        if (shouldLog('debug')) {
            console.log(formatMessage('debug', message, meta));
        }
    },
};

export default logger;
