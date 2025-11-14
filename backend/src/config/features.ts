/**
 * Feature Flags Configuration (Backend)
 * 
 * Mirrors frontend feature flags to ensure consistency.
 * Backend should also validate feature access for security.
 */

export interface FeatureFlags {
    aiInsights: boolean;
    analytics: boolean;
    departmentRouting: boolean;
    predictiveMaintenance: boolean;
    advancedSettings: boolean;
    integrations: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
}

export const featureFlags: FeatureFlags = {
    // Advanced Features (v2.0) - Disabled in MVP
    aiInsights: process.env.FEATURE_AI_INSIGHTS === 'true' || false,
    analytics: process.env.FEATURE_ANALYTICS === 'true' || false,
    departmentRouting: process.env.FEATURE_DEPARTMENT_ROUTING === 'true' || false,

    // Future Features (v3.0+)
    predictiveMaintenance: process.env.FEATURE_PREDICTIVE_MAINTENANCE === 'true' || false,
    advancedSettings: false,
    integrations: false,

    // Notification Features (Future)
    emailNotifications: false,
    smsNotifications: false,
};

export const isFeatureEnabled = (feature: keyof FeatureFlags): boolean => {
    return featureFlags[feature];
};

export default featureFlags;
