import { ReactNode } from 'react';
import { Link } from 'react-router';

interface ComingSoonOverlayProps {
    featureName: string;
    version: 'v2.0' | 'v3.0';
    description: string;
    estimatedRelease?: string;
    features?: string[];
    children?: ReactNode;
}

/**
 * ComingSoonOverlay Component
 * 
 * Wraps pages that are coded but not yet enabled in production.
 * Shows a beautiful "Coming Soon" message while preserving the code.
 * 
 * Usage:
 * <ComingSoonOverlay 
 *   featureName="AI Insights"
 *   version="v2.0"
 *   description="Advanced analytics powered by machine learning"
 * >
 *   <YourPageComponent />
 * </ComingSoonOverlay>
 */
const ComingSoonOverlay: React.FC<ComingSoonOverlayProps> = ({
    featureName,
    version,
    description,
    estimatedRelease = 'Q1 2026',
    features = [],
    children,
}) => {
    // In development mode with all features enabled, show the actual page
    if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_ALL_FEATURES === 'true') {
        return <>{children}</>;
    }

    return (
        <div className="relative min-h-screen">
            {/* Blurred background with the actual component (optional) */}
            {children && (
                <div className="absolute inset-0 blur-sm opacity-30 pointer-events-none">
                    {children}
                </div>
            )}

            {/* Coming Soon Overlay */}
            <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
                <div className="max-w-2xl w-full bg-white dark:bg-gray-dark border border-stroke dark:border-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
                    {/* Badge */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-brand-500/10 text-brand-500">
                            {version}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/10 text-blue-500">
                            Coming Soon
                        </span>
                    </div>

                    {/* Icon */}
                    <div className="mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {featureName}
                    </h1>

                    {/* Description */}
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                        {description}
                    </p>

                    {/* Release Info */}
                    <div className="flex items-center gap-2 mb-8 text-sm text-gray-500 dark:text-gray-500">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <span>Estimated Release: {estimatedRelease}</span>
                    </div>

                    {/* Features List */}
                    {features.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
                                Planned Features
                            </h3>
                            <ul className="space-y-2">
                                {features.map((feature, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-3 text-gray-600 dark:text-gray-400"
                                    >
                                        <svg
                                            className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Info Message */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                        <div className="flex gap-3">
                            <svg
                                className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <div className="text-sm text-blue-800 dark:text-blue-300">
                                <p className="font-medium mb-1">This feature is under development</p>
                                <p>
                                    We're working hard to bring you this feature in {version}. The code is ready but
                                    requires backend infrastructure and testing before going live.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                            to="/admin/dashboard"
                            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-brand-500 text-white font-medium hover:bg-brand-600 transition-colors"
                        >
                            Back to Dashboard
                        </Link>
                        <Link
                            to="/admin/complaints"
                            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-stroke dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            View Complaints
                        </Link>
                    </div>

                    {/* Development Mode Notice */}
                    {import.meta.env.DEV && (
                        <div className="mt-8 pt-6 border-t border-stroke dark:border-gray-700">
                            <p className="text-sm text-gray-500 dark:text-gray-500">
                                <strong>Developer Note:</strong> To view this page in development, add{' '}
                                <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                                    VITE_ENABLE_ALL_FEATURES=true
                                </code>{' '}
                                to your <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">.env</code> file
                                or enable the specific feature flag in{' '}
                                <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                                    src/config/features.ts
                                </code>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ComingSoonOverlay;

/**
 * Feature-specific wrapper components for easy usage
 */

export const AIInsightsComingSoon: React.FC<{ children?: ReactNode }> = ({ children }) => (
    <ComingSoonOverlay
        featureName="AI Insights"
        version="v2.0"
        description="Advanced analytics and insights powered by machine learning algorithms"
        estimatedRelease="Q1 2026"
        features={[
            'Real-time sentiment analysis of complaints',
            'Pattern detection and anomaly identification',
            'Predictive analytics for complaint resolution',
            'AI-powered categorization accuracy metrics',
            'Automated trend analysis and reporting',
        ]}
    >
        {children}
    </ComingSoonOverlay>
);

export const AnalyticsComingSoon: React.FC<{ children?: ReactNode }> = ({ children }) => (
    <ComingSoonOverlay
        featureName="Advanced Analytics"
        version="v2.0"
        description="Comprehensive data analysis with interactive charts and detailed reports"
        estimatedRelease="Q1 2026"
        features={[
            'Department-wise performance comparison',
            'Resolution time distribution analysis',
            'Category heatmaps and geographic insights',
            'Customer satisfaction tracking',
            'Peak hours and demand forecasting',
            'Train-wise complaint statistics',
        ]}
    >
        {children}
    </ComingSoonOverlay>
);

export const DepartmentRoutingComingSoon: React.FC<{ children?: ReactNode }> = ({ children }) => (
    <ComingSoonOverlay
        featureName="Department Routing"
        version="v2.0"
        description="Intelligent complaint routing with advanced rule management"
        estimatedRelease="Q1 2026"
        features={[
            'Automated routing based on ML predictions',
            'Custom routing rules and workflows',
            'Department performance metrics',
            'Confidence score tracking',
            'Alternative department suggestions',
            'Keyword-based routing optimization',
        ]}
    >
        {children}
    </ComingSoonOverlay>
);

export const PredictiveMaintenanceComingSoon: React.FC<{ children?: ReactNode }> = ({ children }) => (
    <ComingSoonOverlay
        featureName="Predictive Maintenance"
        version="v3.0"
        description="IoT-powered predictive maintenance for railway equipment"
        estimatedRelease="Q3 2026"
        features={[
            'Real-time equipment health monitoring',
            'Failure prediction algorithms',
            'Automated maintenance scheduling',
            'Component wear level tracking',
            'Cost savings projections',
            'Critical alerts and notifications',
        ]}
    >
        {children}
    </ComingSoonOverlay>
);
