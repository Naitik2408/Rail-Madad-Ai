import { useState } from "react";
import PageMeta from "../components/common/PageMeta";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import Badge from "../components/ui/badge/Badge";
import { AIInsightsComingSoon } from "../components/common/ComingSoonOverlay";
import featureFlags from "../config/features";

export default function AIInsights() {
    // If feature is disabled, show Coming Soon overlay
    if (!featureFlags.aiInsights) {
        return <AIInsightsComingSoon />;
    }
    const [selectedTimeframe, setSelectedTimeframe] = useState("7days");

    // Sentiment Analysis Chart
    const sentimentOptions: ApexOptions = {
        chart: {
            fontFamily: "Outfit, sans-serif",
            type: "donut",
            height: 300,
        },
        colors: ["#10B981", "#F59E0B", "#EF4444"],
        labels: ["Positive", "Neutral", "Negative"],
        legend: {
            position: "bottom",
            fontSize: "14px",
        },
        plotOptions: {
            pie: {
                donut: {
                    size: "70%",
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: "Total Feedback",
                            fontSize: "16px",
                            fontWeight: 600,
                        },
                    },
                },
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val: number) {
                return val.toFixed(0) + "%";
            },
        },
    };
    const sentimentSeries = [65, 25, 10];

    // Category Prediction Chart
    const categoryPredictionOptions: ApexOptions = {
        chart: {
            fontFamily: "Outfit, sans-serif",
            type: "bar",
            height: 350,
            toolbar: { show: false },
        },
        colors: ["#465FFF", "#10B981"],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "55%",
                borderRadius: 5,
            },
        },
        dataLabels: { enabled: false },
        stroke: { show: true, width: 2, colors: ["transparent"] },
        xaxis: {
            categories: [
                "Coach Maintenance",
                "Cleanliness",
                "HVAC",
                "Catering",
                "Staff Conduct",
                "Electrical",
            ],
        },
        yaxis: {
            title: { text: "Number of Complaints" },
        },
        fill: { opacity: 1 },
        legend: {
            position: "top",
            horizontalAlign: "left",
        },
    };
    const categoryPredictionSeries = [
        {
            name: "Current Month",
            data: [45, 52, 38, 24, 33, 26],
        },
        {
            name: "AI Predicted (Next Month)",
            data: [50, 48, 42, 28, 30, 29],
        },
    ];

    // Complaint Resolution Trend
    const resolutionTrendOptions: ApexOptions = {
        chart: {
            fontFamily: "Outfit, sans-serif",
            type: "area",
            height: 350,
            toolbar: { show: false },
        },
        colors: ["#465FFF", "#10B981", "#F59E0B"],
        dataLabels: { enabled: false },
        stroke: { curve: "smooth", width: 2 },
        xaxis: {
            categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        legend: {
            position: "top",
            horizontalAlign: "right",
        },
        fill: {
            type: "gradient",
            gradient: {
                opacityFrom: 0.4,
                opacityTo: 0.1,
            },
        },
    };
    const resolutionTrendSeries = [
        { name: "New Complaints", data: [31, 40, 28, 51, 42, 39, 45] },
        { name: "Resolved", data: [28, 35, 30, 45, 40, 42, 48] },
        { name: "Pending", data: [15, 20, 18, 24, 20, 18, 15] },
    ];

    // Priority Distribution Chart
    const priorityOptions: ApexOptions = {
        chart: {
            fontFamily: "Outfit, sans-serif",
            type: "radialBar",
            height: 300,
        },
        colors: ["#EF4444", "#F59E0B", "#10B981"],
        plotOptions: {
            radialBar: {
                dataLabels: {
                    name: { fontSize: "14px" },
                    value: { fontSize: "16px" },
                    total: {
                        show: true,
                        label: "All Priorities",
                        formatter: function () {
                            return "100%";
                        },
                    },
                },
            },
        },
        labels: ["High", "Medium", "Low"],
    };
    const prioritySeries = [35, 45, 20];

    // AI Confidence Scores
    const aiMetrics = [
        {
            title: "Category Classification",
            accuracy: 94.5,
            color: "blue",
            description: "AI accuracy in categorizing complaints",
        },
        {
            title: "Priority Detection",
            accuracy: 91.2,
            color: "yellow",
            description: "Accuracy in identifying urgent issues",
        },
        {
            title: "Sentiment Analysis",
            accuracy: 88.7,
            color: "green",
            description: "Understanding passenger sentiment",
        },
        {
            title: "Auto-Routing",
            accuracy: 96.3,
            color: "purple",
            description: "Routing to correct departments",
        },
    ];    // Top Insights
    const topInsights = [
        {
            id: 1,
            type: "Trend Alert",
            title: "Increased Cleanliness Complaints in AC Coaches",
            description:
                "15% increase in cleanliness-related complaints in AC coaches over the past week. Recommend immediate inspection.",
            severity: "High",
            confidence: 92,
            timestamp: "2 hours ago",
        },
        {
            id: 2,
            type: "Predictive",
            title: "Potential HVAC Issues in Rajdhani Trains",
            description:
                "AI predicts 25% increase in AC-related complaints in Rajdhani trains next week due to weather patterns.",
            severity: "Medium",
            confidence: 87,
            timestamp: "4 hours ago",
        },
        {
            id: 3,
            type: "Pattern Detection",
            title: "Peak Complaint Hours Identified",
            description:
                "Most complaints are received between 8 PM - 10 PM. Consider increasing support staff during these hours.",
            severity: "Medium",
            confidence: 95,
            timestamp: "1 day ago",
        },
        {
            id: 4,
            type: "Recommendation",
            title: "Proactive Maintenance Suggested",
            description:
                "Recurring toilet facility complaints in coach C2 of train 12301. Schedule preventive maintenance.",
            severity: "High",
            confidence: 89,
            timestamp: "1 day ago",
        },
    ];

    // Anomaly Detection
    const anomalies = [
        {
            id: 1,
            train: "12301 - Howrah Rajdhani",
            issue: "Unusual spike in food quality complaints",
            date: "2024-11-04",
            severity: "High",
        },
        {
            id: 2,
            train: "12951 - Mumbai Rajdhani",
            issue: "Multiple AC failures in same week",
            date: "2024-11-03",
            severity: "Critical",
        },
        {
            id: 3,
            train: "12430 - Lucknow AC SF",
            issue: "Increased cleanliness complaints",
            date: "2024-11-05",
            severity: "Medium",
        },
    ];

    return (
        <>
            <PageMeta
                title="AI Insights | Rail Madad AI"
                description="Advanced AI-powered insights and analytics for railway complaint management"
            />

            <div className="space-y-6">
                {/* Info Banner */}
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-900/20">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>AI Insights:</strong> Leverage machine learning to analyze complaint patterns, detect sentiment, identify trends, and receive actionable recommendations for improving railway service quality.
                    </p>
                </div>

                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90 sm:text-3xl">
                            AI Insights
                        </h1>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">
                            Advanced analytics powered by machine learning and AI
                        </p>
                    </div>
                    <div>
                        <select
                            value={selectedTimeframe}
                            onChange={(e) => setSelectedTimeframe(e.target.value)}
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
                        >
                            <option value="24hours">Last 24 Hours</option>
                            <option value="7days">Last 7 Days</option>
                            <option value="30days">Last 30 Days</option>
                            <option value="90days">Last 90 Days</option>
                        </select>
                    </div>
                </div>

                {/* AI Metrics Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {aiMetrics.map((metric, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {metric.title}
                                    </p>
                                    <div className="mt-2 flex items-baseline gap-2">
                                        <p className="text-3xl font-bold text-gray-800 dark:text-white/90">
                                            {metric.accuracy}%
                                        </p>
                                        <span className="text-sm text-green-600 dark:text-green-400">
                                            ↑ 2.3%
                                        </span>
                                    </div>
                                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                        {metric.description}
                                    </p>
                                </div>
                                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                                    <svg
                                        className="w-6 h-6 text-gray-800 dark:text-white/90"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        {index === 0 && (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                            />
                                        )}
                                        {index === 1 && (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                            />
                                        )}
                                        {index === 2 && (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        )}
                                        {index === 3 && (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                            />
                                        )}
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>                {/* Top Insights Section */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="mb-5 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                            Top AI-Generated Insights
                        </h3>
                        <Badge size="sm" color="success">
                            Real-time
                        </Badge>
                    </div>
                    <div className="space-y-4">
                        {topInsights.map((insight) => (
                            <div
                                key={insight.id}
                                className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge
                                                size="sm"
                                                color={
                                                    insight.severity === "High" ? "error" : "warning"
                                                }
                                            >
                                                {insight.severity}
                                            </Badge>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                {insight.type}
                                            </span>
                                            <span className="text-xs text-gray-400 dark:text-gray-500">
                                                •
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                {insight.timestamp}
                                            </span>
                                        </div>
                                        <h4 className="font-semibold text-gray-800 dark:text-white/90">
                                            {insight.title}
                                        </h4>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                            {insight.description}
                                        </p>
                                        <div className="mt-3 flex items-center gap-2">
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                AI Confidence:
                                            </span>
                                            <div className="flex-1 max-w-xs">
                                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                                                    <div
                                                        className="h-2 bg-brand-500 rounded-full"
                                                        style={{ width: `${insight.confidence}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                {insight.confidence}%
                                            </span>
                                        </div>
                                    </div>
                                    <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Complaint Resolution Trend */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                Complaint Resolution Trend
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Daily complaint flow and resolution rate
                            </p>
                        </div>
                        <Chart
                            options={resolutionTrendOptions}
                            series={resolutionTrendSeries}
                            type="area"
                            height={350}
                        />
                    </div>

                    {/* Category Prediction */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                AI Category Prediction
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Current vs. predicted next month complaints
                            </p>
                        </div>
                        <Chart
                            options={categoryPredictionOptions}
                            series={categoryPredictionSeries}
                            type="bar"
                            height={350}
                        />
                    </div>
                </div>

                {/* Charts Row 2 */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Sentiment Analysis */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                Sentiment Analysis
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Passenger feedback sentiment distribution
                            </p>
                        </div>
                        <Chart
                            options={sentimentOptions}
                            series={sentimentSeries}
                            type="donut"
                            height={300}
                        />
                    </div>

                    {/* Priority Distribution */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                Priority Distribution
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                AI-assigned priority levels breakdown
                            </p>
                        </div>
                        <Chart
                            options={priorityOptions}
                            series={prioritySeries}
                            type="radialBar"
                            height={300}
                        />
                    </div>
                </div>

                {/* Anomaly Detection */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                Anomaly Detection
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                AI-detected unusual patterns requiring attention
                            </p>
                        </div>
                        <Badge size="sm" color="error">
                            {anomalies.length} Active
                        </Badge>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Train
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Detected Issue
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Date
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Severity
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {anomalies.map((anomaly) => (
                                    <tr key={anomaly.id}>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-800 dark:text-white/90">
                                            {anomaly.train}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            {anomaly.issue}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {anomaly.date}
                                        </td>
                                        <td className="px-4 py-4">
                                            <Badge
                                                size="sm"
                                                color={
                                                    anomaly.severity === "Critical"
                                                        ? "error"
                                                        : anomaly.severity === "High"
                                                            ? "warning"
                                                            : "info"
                                                }
                                            >
                                                {anomaly.severity}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-4">
                                            <button className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 text-sm font-medium">
                                                Investigate
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* AI Recommendations */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 to-blue-100 p-5 dark:border-gray-800 dark:from-blue-900/20 dark:to-blue-800/20">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-200 rounded-xl dark:bg-blue-800 mb-3">
                            <svg
                                className="w-6 h-6 text-blue-600 dark:text-blue-400"
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
                        </div>
                        <h4 className="font-semibold text-gray-800 dark:text-white/90 mb-2">
                            Optimize Response Time
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                            AI suggests increasing staff during 8-10 PM for 23% faster
                            resolution
                        </p>
                        <button className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
                            View Plan →
                        </button>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-green-50 to-green-100 p-5 dark:border-gray-800 dark:from-green-900/20 dark:to-green-800/20">
                        <div className="flex items-center justify-center w-12 h-12 bg-green-200 rounded-xl dark:bg-green-800 mb-3">
                            <svg
                                className="w-6 h-6 text-green-600 dark:text-green-400"
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
                        </div>
                        <h4 className="font-semibold text-gray-800 dark:text-white/90 mb-2">
                            Preventive Maintenance
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                            Schedule maintenance for 5 coaches showing recurring issues
                        </p>
                        <button className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
                            Schedule Now →
                        </button>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-purple-50 to-purple-100 p-5 dark:border-gray-800 dark:from-purple-900/20 dark:to-purple-800/20">
                        <div className="flex items-center justify-center w-12 h-12 bg-purple-200 rounded-xl dark:bg-purple-800 mb-3">
                            <svg
                                className="w-6 h-6 text-purple-600 dark:text-purple-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                            </svg>
                        </div>
                        <h4 className="font-semibold text-gray-800 dark:text-white/90 mb-2">
                            Training Insights
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                            Staff conduct complaints down 18% after recent training program
                        </p>
                        <button className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
                            View Report →
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
