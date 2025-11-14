/**
 * Feature Flags Configuration
 * 
 * Control which features are visible to users without removing code.
 * This allows us to:
 * 1. Deploy MVP with only core features enabled
 * 2. Enable advanced features in future versions by changing flags
 * 3. Test features in development before production release
 * 4. A/B test features with different user groups
 */

export interface FeatureFlags {
    // Core Features (Always Enabled for MVP)
    dashboard: boolean;
    allComplaints: boolean;
    complaintChatbot: boolean;
    landingPage: boolean;

    // Advanced Admin Features (Enable in v2.0+)
    aiInsights: boolean;
    analytics: boolean;
    departmentRouting: boolean;

    // Future Features (Enable in v3.0+)
    predictiveMaintenance: boolean;
    advancedSettings: boolean;
    integrations: boolean;

    // Feature Modules (Granular Control)
    modules: {
        // Dashboard modules
        aiMetrics: boolean;
        advancedCharts: boolean;
        departmentStats: boolean;

        // Routing modules
        autoRouting: boolean;
        routingRules: boolean;
        confidenceScores: boolean;

        // AI modules
        sentimentAnalysis: boolean;
        patternDetection: boolean;
        anomalyDetection: boolean;

        // Settings modules
        apiKeys: boolean;
        twoFactorAuth: boolean;
        emailIntegration: boolean;
        smsIntegration: boolean;
    };
}

/**
 * Current Feature Configuration
 * 
 * MVP v1.0 Configuration:
 * - Core complaint management enabled
 * - Advanced features disabled but code preserved
 * - Can be toggled via environment variables in production
 */
export const featureFlags: FeatureFlags = {
    // ✅ Core Features (MVP v1.0)
    dashboard: true,
    allComplaints: true,
    complaintChatbot: true,
    landingPage: true,

    // ⏳ Advanced Features (v2.0) - ENABLED WITH STATIC DATA
    aiInsights: import.meta.env.VITE_FEATURE_AI_INSIGHTS === 'true', // Enable in v2.0 when ML models are ready
    analytics: import.meta.env.VITE_FEATURE_ANALYTICS === 'true', // Enable in v2.0 when historical data is sufficient
    departmentRouting: import.meta.env.VITE_FEATURE_DEPARTMENT_ROUTING === 'true', // Enable in v2.0 for full routing management

    // 🚀 Future Features (v3.0+) - ENABLED WITH STATIC DATA
    predictiveMaintenance: import.meta.env.VITE_FEATURE_PREDICTIVE_MAINTENANCE === 'true', // Requires IoT integration
    advancedSettings: false, // Advanced admin configurations
    integrations: false, // Third-party integrations

    // 🔧 Feature Modules
    modules: {
        // Dashboard - Keep simple for MVP
        aiMetrics: false, // Show AI performance metrics
        advancedCharts: false, // Complex visualizations
        departmentStats: false, // Per-department statistics

        // Routing - Basic for MVP
        autoRouting: true, // ✅ Keep basic auto-categorization
        routingRules: false, // Complex rule management
        confidenceScores: false, // ML confidence indicators

        // AI Features - Defer to v2.0
        sentimentAnalysis: false,
        patternDetection: false,
        anomalyDetection: false,

        // Settings - Minimal for MVP
        apiKeys: false,
        twoFactorAuth: false,
        emailIntegration: false,
        smsIntegration: false,
    },
};

/**
 * Environment-based feature overrides
 * 
 * Allows enabling features via environment variables:
 * VITE_FEATURE_AI_INSIGHTS=true
 * VITE_FEATURE_ANALYTICS=true
 */
export const getFeatureFlag = (flagPath: string): boolean => {
    const envKey = `VITE_FEATURE_${flagPath.toUpperCase().replace(/\./g, '_')}`;
    const envValue = import.meta.env[envKey];

    if (envValue !== undefined) {
        return envValue === 'true' || envValue === '1';
    }

    // Navigate nested flags
    const parts = flagPath.split('.');
    let value: any = featureFlags;

    for (const part of parts) {
        if (value && typeof value === 'object' && part in value) {
            value = value[part];
        } else {
            return false;
        }
    }

    return Boolean(value);
};

/**
 * Feature flag hooks and utilities
 */
export const isFeatureEnabled = (feature: keyof FeatureFlags): boolean => {
    return featureFlags[feature] as boolean;
};

export const isModuleEnabled = (module: keyof FeatureFlags['modules']): boolean => {
    return featureFlags.modules[module];
};

/**
 * Version-based feature sets
 */
export const VERSION = {
    current: 'v1.0-MVP',
    features: {
        'v1.0': [
            'dashboard',
            'allComplaints',
            'complaintChatbot',
            'landingPage',
            'modules.autoRouting',
        ],
        'v2.0': [
            'aiInsights',
            'analytics',
            'departmentRouting',
            'modules.sentimentAnalysis',
            'modules.routingRules',
        ],
        'v3.0': [
            'predictiveMaintenance',
            'advancedSettings',
            'integrations',
            'modules.apiKeys',
            'modules.twoFactorAuth',
        ],
    },
};

/**
 * Development mode - Enable all features for testing
 */
export const isDevelopment = import.meta.env.DEV;

export const getAllFeatures = (): FeatureFlags => {
    if (isDevelopment && import.meta.env.VITE_ENABLE_ALL_FEATURES === 'true') {
        return {
            dashboard: true,
            allComplaints: true,
            complaintChatbot: true,
            landingPage: true,
            aiInsights: true,
            analytics: true,
            departmentRouting: true,
            predictiveMaintenance: true,
            advancedSettings: true,
            integrations: true,
            modules: {
                aiMetrics: true,
                advancedCharts: true,
                departmentStats: true,
                autoRouting: true,
                routingRules: true,
                confidenceScores: true,
                sentimentAnalysis: true,
                patternDetection: true,
                anomalyDetection: true,
                apiKeys: true,
                twoFactorAuth: true,
                emailIntegration: true,
                smsIntegration: true,
            },
        };
    }
    return featureFlags;
};

export default featureFlags;
