import { useState } from "react";
import PageMeta from "../components/common/PageMeta";
import Badge from "../components/ui/badge/Badge";

export default function Settings() {
    const [activeTab, setActiveTab] = useState<
        "general" | "notifications" | "ai" | "security" | "integrations"
    >("general");

    // General Settings State
    const [systemName, setSystemName] = useState("Rail Madad AI");
    const [language, setLanguage] = useState("en");
    const [timezone, setTimezone] = useState("Asia/Kolkata");
    const [theme, setTheme] = useState("system");

    // Notification Settings State
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [criticalAlerts, setCriticalAlerts] = useState(true);
    const [dailyReports, setDailyReports] = useState(true);

    // AI Settings State
    const [autoRouting, setAutoRouting] = useState(true);
    const [autoAssignment, setAutoAssignment] = useState(true);
    const [sentimentAnalysis, setSentimentAnalysis] = useState(true);
    const [predictiveMaintenance, setPredictiveMaintenance] = useState(true);
    const [aiConfidenceThreshold, setAiConfidenceThreshold] = useState(85);

    // Security Settings State
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);
    const [sessionTimeout, setSessionTimeout] = useState("30");
    const [passwordExpiry, setPasswordExpiry] = useState("90");

    // API Keys (masked)
    const apiKeys = [
        {
            id: 1,
            name: "Production API Key",
            key: "sk_prod_••••••••••••5a2b",
            created: "2024-10-15",
            lastUsed: "2 hours ago",
            status: "Active",
        },
        {
            id: 2,
            name: "Development API Key",
            key: "sk_dev_••••••••••••8c9d",
            created: "2024-09-20",
            lastUsed: "1 day ago",
            status: "Active",
        },
        {
            id: 3,
            name: "Testing API Key",
            key: "sk_test_••••••••••••3f4e",
            created: "2024-08-10",
            lastUsed: "5 days ago",
            status: "Inactive",
        },
    ];

    // Integration Services
    const integrations = [
        {
            id: 1,
            name: "IRCTC Integration",
            description: "Connect with IRCTC for real-time train data",
            status: "Connected",
            lastSync: "5 mins ago",
        },
        {
            id: 2,
            name: "SMS Gateway",
            description: "Send SMS notifications to passengers",
            status: "Connected",
            lastSync: "10 mins ago",
        },
        {
            id: 3,
            name: "Email Service",
            description: "Email notifications and reports",
            status: "Connected",
            lastSync: "2 mins ago",
        },
        {
            id: 4,
            name: "Railway Database",
            description: "Connect to central railway database",
            status: "Disconnected",
            lastSync: "Never",
        },
    ];

    const handleSaveSettings = () => {
        console.log("Saving settings...");
        // Add save logic here
    };

    return (
        <>
            <PageMeta
                title="Settings | Rail Madad AI"
                description="Configure system settings and preferences"
            />

            <div className="space-y-6">
                {/* Page Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90 sm:text-3xl">
                        Settings
                    </h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Manage system configuration and preferences
                    </p>
                </div>

                {/* Settings Layout */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
                            <nav className="space-y-1">
                                <button
                                    onClick={() => setActiveTab("general")}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "general"
                                            ? "bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400"
                                            : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                                        }`}
                                >
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
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    General
                                </button>

                                <button
                                    onClick={() => setActiveTab("notifications")}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "notifications"
                                            ? "bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400"
                                            : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                                        }`}
                                >
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
                                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                        />
                                    </svg>
                                    Notifications
                                </button>

                                <button
                                    onClick={() => setActiveTab("ai")}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "ai"
                                            ? "bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400"
                                            : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                                        }`}
                                >
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
                                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                        />
                                    </svg>
                                    AI Settings
                                </button>

                                <button
                                    onClick={() => setActiveTab("security")}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "security"
                                            ? "bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400"
                                            : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                                        }`}
                                >
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
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                    Security
                                </button>

                                <button
                                    onClick={() => setActiveTab("integrations")}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "integrations"
                                            ? "bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400"
                                            : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                                        }`}
                                >
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
                                            d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                                        />
                                    </svg>
                                    Integrations
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Settings Content */}
                    <div className="lg:col-span-3">
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
                            {/* General Settings */}
                            {activeTab === "general" && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                                            General Settings
                                        </h2>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            Configure basic system settings and preferences
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        {/* System Name */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                System Name
                                            </label>
                                            <input
                                                type="text"
                                                value={systemName}
                                                onChange={(e) => setSystemName(e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
                                            />
                                        </div>

                                        {/* Language */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Language
                                            </label>
                                            <select
                                                value={language}
                                                onChange={(e) => setLanguage(e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
                                            >
                                                <option value="en">English</option>
                                                <option value="hi">Hindi</option>
                                                <option value="bn">Bengali</option>
                                                <option value="ta">Tamil</option>
                                                <option value="te">Telugu</option>
                                            </select>
                                        </div>

                                        {/* Timezone */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Timezone
                                            </label>
                                            <select
                                                value={timezone}
                                                onChange={(e) => setTimezone(e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
                                            >
                                                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                                                <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                                                <option value="UTC">UTC</option>
                                            </select>
                                        </div>

                                        {/* Theme */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Theme Preference
                                            </label>
                                            <div className="grid grid-cols-3 gap-3">
                                                <button
                                                    onClick={() => setTheme("light")}
                                                    className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-colors ${theme === "light"
                                                            ? "border-brand-500 bg-brand-50 text-brand-600 dark:bg-brand-500/10"
                                                            : "border-gray-300 bg-white text-gray-700 hover:border-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                                        }`}
                                                >
                                                    ☀️ Light
                                                </button>
                                                <button
                                                    onClick={() => setTheme("dark")}
                                                    className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-colors ${theme === "dark"
                                                            ? "border-brand-500 bg-brand-50 text-brand-600 dark:bg-brand-500/10"
                                                            : "border-gray-300 bg-white text-gray-700 hover:border-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                                        }`}
                                                >
                                                    🌙 Dark
                                                </button>
                                                <button
                                                    onClick={() => setTheme("system")}
                                                    className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-colors ${theme === "system"
                                                            ? "border-brand-500 bg-brand-50 text-brand-600 dark:bg-brand-500/10"
                                                            : "border-gray-300 bg-white text-gray-700 hover:border-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                                        }`}
                                                >
                                                    💻 System
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Notification Settings */}
                            {activeTab === "notifications" && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                                            Notification Settings
                                        </h2>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            Manage how you receive notifications and alerts
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        {/* Toggle Items */}
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg dark:bg-gray-800/50">
                                            <div>
                                                <p className="font-medium text-gray-800 dark:text-white/90">
                                                    Email Notifications
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Receive updates via email
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setEmailNotifications(!emailNotifications)}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${emailNotifications ? "bg-brand-500" : "bg-gray-300"
                                                    }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${emailNotifications ? "translate-x-6" : "translate-x-1"
                                                        }`}
                                                />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg dark:bg-gray-800/50">
                                            <div>
                                                <p className="font-medium text-gray-800 dark:text-white/90">
                                                    SMS Notifications
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Receive alerts via SMS
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setSmsNotifications(!smsNotifications)}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${smsNotifications ? "bg-brand-500" : "bg-gray-300"
                                                    }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${smsNotifications ? "translate-x-6" : "translate-x-1"
                                                        }`}
                                                />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg dark:bg-gray-800/50">
                                            <div>
                                                <p className="font-medium text-gray-800 dark:text-white/90">
                                                    Push Notifications
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Receive browser push notifications
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setPushNotifications(!pushNotifications)}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${pushNotifications ? "bg-brand-500" : "bg-gray-300"
                                                    }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${pushNotifications ? "translate-x-6" : "translate-x-1"
                                                        }`}
                                                />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg dark:bg-gray-800/50">
                                            <div>
                                                <p className="font-medium text-gray-800 dark:text-white/90">
                                                    Critical Alerts
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Get notified about critical issues
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setCriticalAlerts(!criticalAlerts)}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${criticalAlerts ? "bg-brand-500" : "bg-gray-300"
                                                    }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${criticalAlerts ? "translate-x-6" : "translate-x-1"
                                                        }`}
                                                />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg dark:bg-gray-800/50">
                                            <div>
                                                <p className="font-medium text-gray-800 dark:text-white/90">
                                                    Daily Reports
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Receive daily summary reports
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setDailyReports(!dailyReports)}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${dailyReports ? "bg-brand-500" : "bg-gray-300"
                                                    }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${dailyReports ? "translate-x-6" : "translate-x-1"
                                                        }`}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* AI Settings */}
                            {activeTab === "ai" && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                                            AI Configuration
                                        </h2>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            Configure AI features and automation settings
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg dark:bg-gray-800/50">
                                            <div>
                                                <p className="font-medium text-gray-800 dark:text-white/90">
                                                    Auto Routing
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Automatically route complaints to departments
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setAutoRouting(!autoRouting)}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${autoRouting ? "bg-brand-500" : "bg-gray-300"
                                                    }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${autoRouting ? "translate-x-6" : "translate-x-1"
                                                        }`}
                                                />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg dark:bg-gray-800/50">
                                            <div>
                                                <p className="font-medium text-gray-800 dark:text-white/90">
                                                    Auto Assignment
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Automatically assign complaints to staff
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setAutoAssignment(!autoAssignment)}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${autoAssignment ? "bg-brand-500" : "bg-gray-300"
                                                    }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${autoAssignment ? "translate-x-6" : "translate-x-1"
                                                        }`}
                                                />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg dark:bg-gray-800/50">
                                            <div>
                                                <p className="font-medium text-gray-800 dark:text-white/90">
                                                    Sentiment Analysis
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Analyze passenger sentiment from complaints
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setSentimentAnalysis(!sentimentAnalysis)}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${sentimentAnalysis ? "bg-brand-500" : "bg-gray-300"
                                                    }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${sentimentAnalysis ? "translate-x-6" : "translate-x-1"
                                                        }`}
                                                />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg dark:bg-gray-800/50">
                                            <div>
                                                <p className="font-medium text-gray-800 dark:text-white/90">
                                                    Predictive Maintenance
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Enable AI-powered failure predictions
                                                </p>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    setPredictiveMaintenance(!predictiveMaintenance)
                                                }
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${predictiveMaintenance ? "bg-brand-500" : "bg-gray-300"
                                                    }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${predictiveMaintenance ? "translate-x-6" : "translate-x-1"
                                                        }`}
                                                />
                                            </button>
                                        </div>

                                        {/* AI Confidence Threshold */}
                                        <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-800/50">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                                AI Confidence Threshold: {aiConfidenceThreshold}%
                                            </label>
                                            <input
                                                type="range"
                                                min="60"
                                                max="100"
                                                value={aiConfidenceThreshold}
                                                onChange={(e) =>
                                                    setAiConfidenceThreshold(Number(e.target.value))
                                                }
                                                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                            />
                                            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                                Minimum confidence level for AI to auto-process complaints
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Security Settings */}
                            {activeTab === "security" && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                                            Security & Privacy
                                        </h2>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            Manage security settings and access controls
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg dark:bg-gray-800/50">
                                            <div>
                                                <p className="font-medium text-gray-800 dark:text-white/90">
                                                    Two-Factor Authentication
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Add an extra layer of security
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${twoFactorAuth ? "bg-brand-500" : "bg-gray-300"
                                                    }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${twoFactorAuth ? "translate-x-6" : "translate-x-1"
                                                        }`}
                                                />
                                            </button>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Session Timeout (minutes)
                                            </label>
                                            <select
                                                value={sessionTimeout}
                                                onChange={(e) => setSessionTimeout(e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
                                            >
                                                <option value="15">15 minutes</option>
                                                <option value="30">30 minutes</option>
                                                <option value="60">1 hour</option>
                                                <option value="120">2 hours</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Password Expiry (days)
                                            </label>
                                            <select
                                                value={passwordExpiry}
                                                onChange={(e) => setPasswordExpiry(e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
                                            >
                                                <option value="30">30 days</option>
                                                <option value="60">60 days</option>
                                                <option value="90">90 days</option>
                                                <option value="never">Never</option>
                                            </select>
                                        </div>

                                        {/* API Keys Section */}
                                        <div className="mt-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                                    API Keys
                                                </h3>
                                                <button className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600">
                                                    Generate New Key
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                {apiKeys.map((key) => (
                                                    <div
                                                        key={key.id}
                                                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg dark:border-gray-700"
                                                    >
                                                        <div className="flex-1">
                                                            <p className="font-medium text-gray-800 dark:text-white/90">
                                                                {key.name}
                                                            </p>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400 font-mono mt-1">
                                                                {key.key}
                                                            </p>
                                                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                                                                <span>Created: {key.created}</span>
                                                                <span>Last used: {key.lastUsed}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Badge
                                                                size="sm"
                                                                color={key.status === "Active" ? "success" : "error"}
                                                            >
                                                                {key.status}
                                                            </Badge>
                                                            <button className="text-red-600 hover:text-red-700 dark:text-red-400">
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
                                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Integrations */}
                            {activeTab === "integrations" && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                                            Integrations
                                        </h2>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            Manage third-party integrations and connections
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {integrations.map((integration) => (
                                            <div
                                                key={integration.id}
                                                className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800/50"
                                            >
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                                                            <svg
                                                                className="w-6 h-6 text-gray-800 dark:text-white/90"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                {integration.id === 1 && (
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                                                                    />
                                                                )}
                                                                {integration.id === 2 && (
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                                                    />
                                                                )}
                                                                {integration.id === 3 && (
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                                    />
                                                                )}
                                                                {integration.id === 4 && (
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                                                                    />
                                                                )}
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold text-gray-800 dark:text-white/90">
                                                                {integration.name}
                                                            </h4>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                {integration.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between mt-4">
                                                    <div>
                                                        <Badge
                                                            size="sm"
                                                            color={
                                                                integration.status === "Connected"
                                                                    ? "success"
                                                                    : "error"
                                                            }
                                                        >
                                                            {integration.status}
                                                        </Badge>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                            Last sync: {integration.lastSync}
                                                        </p>
                                                    </div>
                                                    <button
                                                        className={`px-4 py-2 text-sm font-medium rounded-lg ${integration.status === "Connected"
                                                                ? "text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20"
                                                                : "text-white bg-brand-500 hover:bg-brand-600"
                                                            }`}
                                                    >
                                                        {integration.status === "Connected"
                                                            ? "Disconnect"
                                                            : "Connect"}
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Save Button */}
                            <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <button className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveSettings}
                                    className="px-6 py-2.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
