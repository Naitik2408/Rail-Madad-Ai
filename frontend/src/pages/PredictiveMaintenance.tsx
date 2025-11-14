import { useState } from "react";
import PageMeta from "../components/common/PageMeta";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import Badge from "../components/ui/badge/Badge";
import { PredictiveMaintenanceComingSoon } from "../components/common/ComingSoonOverlay";
import featureFlags from "../config/features";

export default function PredictiveMaintenance() {
    // If feature is disabled, show Coming Soon overlay
    if (!featureFlags.predictiveMaintenance) {
        return <PredictiveMaintenanceComingSoon />;
    }
    const [selectedTrain, setSelectedTrain] = useState("all");
    const [selectedTimeframe, setSelectedTimeframe] = useState("30days");

    // Equipment Health Score
    const healthScoreOptions: ApexOptions = {
        chart: {
            fontFamily: "Outfit, sans-serif",
            type: "radialBar",
            height: 300,
        },
        colors: ["#10B981"],
        plotOptions: {
            radialBar: {
                hollow: {
                    size: "70%",
                },
                dataLabels: {
                    name: {
                        fontSize: "16px",
                        color: "#64748b",
                    },
                    value: {
                        fontSize: "32px",
                        fontWeight: "bold",
                        color: "#1e293b",
                        formatter: function (val: number) {
                            return val + "%";
                        },
                    },
                },
            },
        },
        labels: ["Overall Health"],
    };
    const healthScoreSeries = [87];

    // Failure Prediction Timeline
    const failurePredictionOptions: ApexOptions = {
        chart: {
            fontFamily: "Outfit, sans-serif",
            type: "line",
            height: 350,
            toolbar: { show: false },
        },
        colors: ["#EF4444", "#F59E0B", "#10B981"],
        stroke: { curve: "smooth", width: 3 },
        xaxis: {
            categories: [
                "Week 1",
                "Week 2",
                "Week 3",
                "Week 4",
                "Week 5",
                "Week 6",
                "Week 7",
                "Week 8",
            ],
            title: { text: "Timeline" },
        },
        yaxis: {
            title: { text: "Failure Risk (%)" },
            max: 100,
        },
        legend: {
            position: "top",
            horizontalAlign: "right",
        },
        markers: {
            size: 5,
            hover: { size: 7 },
        },
    };
    const failurePredictionSeries = [
        { name: "HVAC Systems", data: [15, 18, 22, 28, 35, 42, 48, 55] },
        { name: "Door Mechanisms", data: [10, 12, 15, 18, 20, 24, 28, 32] },
        { name: "Electrical Systems", data: [5, 6, 8, 10, 12, 14, 16, 18] },
    ];

    // Maintenance Schedule Bar Chart
    const maintenanceScheduleOptions: ApexOptions = {
        chart: {
            fontFamily: "Outfit, sans-serif",
            type: "bar",
            height: 350,
            stacked: true,
            toolbar: { show: false },
        },
        colors: ["#EF4444", "#F59E0B", "#10B981", "#465FFF"],
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 5,
            },
        },
        dataLabels: { enabled: false },
        xaxis: {
            categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
        },
        yaxis: {
            title: { text: "Maintenance Tasks" },
        },
        legend: {
            position: "top",
            horizontalAlign: "right",
        },
        fill: { opacity: 1 },
    };
    const maintenanceScheduleSeries = [
        { name: "Critical", data: [3, 5, 2, 4] },
        { name: "High Priority", data: [8, 10, 7, 9] },
        { name: "Medium Priority", data: [12, 15, 10, 13] },
        { name: "Low Priority", data: [5, 7, 4, 6] },
    ];

    // Component Wear Levels
    const componentWearOptions: ApexOptions = {
        chart: {
            fontFamily: "Outfit, sans-serif",
            type: "bar",
            height: 350,
            toolbar: { show: false },
        },
        colors: ["#465FFF"],
        plotOptions: {
            bar: {
                horizontal: true,
                borderRadius: 5,
                dataLabels: {
                    position: "top",
                },
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val: number) {
                return val + "%";
            },
            offsetX: 30,
            style: {
                fontSize: "12px",
                colors: ["#1e293b"],
            },
        },
        xaxis: {
            categories: [
                "Brake System",
                "AC Compressor",
                "Door Motors",
                "Toilet Pumps",
                "Lighting System",
                "Water Tanks",
            ],
            max: 100,
        },
        yaxis: {
            title: { text: "Component" },
        },
    };
    const componentWearSeries = [
        { name: "Wear Level", data: [75, 82, 65, 58, 45, 38] },
    ];

    // Cost Savings Projection
    const costSavingsOptions: ApexOptions = {
        chart: {
            fontFamily: "Outfit, sans-serif",
            type: "area",
            height: 300,
            toolbar: { show: false },
        },
        colors: ["#10B981"],
        stroke: { curve: "smooth", width: 2 },
        fill: {
            type: "gradient",
            gradient: {
                opacityFrom: 0.6,
                opacityTo: 0.1,
            },
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        },
        yaxis: {
            title: { text: "Savings (₹ Lakhs)" },
        },
        dataLabels: { enabled: false },
    };
    const costSavingsSeries = [
        { name: "Cost Savings", data: [12, 18, 25, 32, 38, 45] },
    ];

    // Critical Alerts
    const criticalAlerts = [
        {
            id: 1,
            train: "12301 - Howrah Rajdhani",
            component: "AC Compressor - Coach A1",
            severity: "Critical",
            failureRisk: 85,
            predictedFailure: "3-5 days",
            impact: "High",
            recommendation: "Immediate inspection and replacement recommended",
            estimatedCost: "₹2.5L",
        },
        {
            id: 2,
            train: "12951 - Mumbai Rajdhani",
            component: "Brake System - Coach B2",
            severity: "High",
            failureRisk: 72,
            predictedFailure: "7-10 days",
            impact: "Critical",
            recommendation: "Schedule maintenance within 48 hours",
            estimatedCost: "₹3.2L",
        },
        {
            id: 3,
            train: "12430 - Lucknow AC SF",
            component: "Door Motor - Coach C1",
            severity: "High",
            failureRisk: 68,
            predictedFailure: "10-14 days",
            impact: "Medium",
            recommendation: "Plan replacement in next maintenance cycle",
            estimatedCost: "₹1.8L",
        },
        {
            id: 4,
            train: "12002 - Bhopal Shatabdi",
            component: "Water Pump - Coach A3",
            severity: "Medium",
            failureRisk: 55,
            predictedFailure: "15-20 days",
            impact: "Low",
            recommendation: "Monitor closely, schedule preventive maintenance",
            estimatedCost: "₹0.8L",
        },
    ];

    // Upcoming Maintenance Schedule
    const upcomingMaintenance = [
        {
            id: 1,
            train: "12301 - Howrah Rajdhani",
            scheduledDate: "2024-11-08",
            type: "Preventive",
            components: ["AC System", "Brake Pads", "Door Mechanisms"],
            estimatedDuration: "6 hours",
            assignedTeam: "Team A - Mechanical",
            status: "Scheduled",
        },
        {
            id: 2,
            train: "12951 - Mumbai Rajdhani",
            scheduledDate: "2024-11-10",
            type: "Predictive",
            components: ["HVAC Compressor", "Electrical Wiring"],
            estimatedDuration: "8 hours",
            assignedTeam: "Team B - Electrical",
            status: "Scheduled",
        },
        {
            id: 3,
            train: "12430 - Lucknow AC SF",
            scheduledDate: "2024-11-12",
            type: "Routine",
            components: ["Toilet Systems", "Water Tanks", "Lighting"],
            estimatedDuration: "4 hours",
            assignedTeam: "Team C - Operations",
            status: "Pending Approval",
        },
        {
            id: 4,
            train: "12621 - Tamil Nadu Exp",
            scheduledDate: "2024-11-15",
            type: "Preventive",
            components: ["Brake System", "Suspension", "Bogies"],
            estimatedDuration: "10 hours",
            assignedTeam: "Team A - Mechanical",
            status: "Scheduled",
        },
    ];

    // Equipment Health Metrics
    const equipmentMetrics = [
        {
            title: "Critical Components",
            value: "4",
            subtitle: "Require immediate attention",
            color: "red",
        },
        {
            title: "Preventive Tasks",
            value: "23",
            subtitle: "Scheduled this month",
            color: "blue",
        },
        {
            title: "Cost Savings",
            value: "₹45L",
            subtitle: "Saved this quarter",
            color: "green",
        },
        {
            title: "Uptime Improvement",
            value: "12%",
            subtitle: "Compared to last quarter",
            color: "purple",
        },
    ];

    const getSeverityColor = (
        severity: string
    ): "error" | "warning" | "info" => {
        switch (severity) {
            case "Critical":
                return "error";
            case "High":
                return "warning";
            default:
                return "info";
        }
    };

    const getStatusColor = (status: string): "success" | "warning" | "info" => {
        switch (status) {
            case "Scheduled":
                return "success";
            case "Pending Approval":
                return "warning";
            default:
                return "info";
        }
    };

    return (
        <>
            <PageMeta
                title="Predictive Maintenance | Rail Madad AI"
                description="AI-powered predictive maintenance and equipment health monitoring"
            />

            <div className="space-y-6">
                {/* Info Banner */}
                <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-900/50 dark:bg-orange-900/20">
                    <p className="text-sm text-orange-800 dark:text-orange-200">
                        <strong>Predictive Maintenance:</strong> Monitor equipment health, predict potential failures before they occur, and schedule proactive maintenance using IoT sensors and machine learning algorithms to minimize downtime and improve service reliability.
                    </p>
                </div>

                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90 sm:text-3xl">
                            Predictive Maintenance
                        </h1>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">
                            AI-powered equipment monitoring and failure prediction
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <select
                            value={selectedTrain}
                            onChange={(e) => setSelectedTrain(e.target.value)}
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
                        >
                            <option value="all">All Trains</option>
                            <option value="12301">12301 - Howrah Rajdhani</option>
                            <option value="12951">12951 - Mumbai Rajdhani</option>
                            <option value="12430">12430 - Lucknow AC SF</option>
                            <option value="12002">12002 - Bhopal Shatabdi</option>
                        </select>
                        <select
                            value={selectedTimeframe}
                            onChange={(e) => setSelectedTimeframe(e.target.value)}
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
                        >
                            <option value="7days">7 Days</option>
                            <option value="30days">30 Days</option>
                            <option value="90days">90 Days</option>
                        </select>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {equipmentMetrics.map((metric, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {metric.title}
                                    </p>
                                    <p className="mt-2 text-3xl font-bold text-gray-800 dark:text-white/90">
                                        {metric.value}
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        {metric.subtitle}
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
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                            />
                                        )}
                                        {index === 1 && (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                            />
                                        )}
                                        {index === 2 && (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        )}
                                        {index === 3 && (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                            />
                                        )}
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Overall Health Score */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                Fleet Health Score
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Overall equipment health status
                            </p>
                        </div>
                        <Chart
                            options={healthScoreOptions}
                            series={healthScoreSeries}
                            type="radialBar"
                            height={300}
                        />
                        <div className="mt-4 space-y-2">
                            <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg dark:bg-green-900/20">
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                    Excellent Condition
                                </span>
                                <span className="text-sm font-bold text-green-600 dark:text-green-400">
                                    62%
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg dark:bg-yellow-900/20">
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                    Needs Monitoring
                                </span>
                                <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
                                    25%
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg dark:bg-red-900/20">
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                    Critical Attention
                                </span>
                                <span className="text-sm font-bold text-red-600 dark:text-red-400">
                                    13%
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                Component Wear Levels
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Current wear percentage across key components
                            </p>
                        </div>
                        <Chart
                            options={componentWearOptions}
                            series={componentWearSeries}
                            type="bar"
                            height={350}
                        />
                    </div>
                </div>

                {/* Critical Alerts */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                Critical Maintenance Alerts
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                AI-predicted equipment failures requiring immediate attention
                            </p>
                        </div>
                        <Badge size="sm" color="error">
                            {criticalAlerts.length} Active
                        </Badge>
                    </div>
                    <div className="space-y-4">
                        {criticalAlerts.map((alert) => (
                            <div
                                key={alert.id}
                                className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h4 className="font-semibold text-gray-800 dark:text-white/90">
                                                    {alert.train}
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                                    {alert.component}
                                                </p>
                                            </div>
                                            <Badge size="sm" color={getSeverityColor(alert.severity)}>
                                                {alert.severity}
                                            </Badge>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Failure Risk
                                                </p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="flex-1 h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                                                        <div
                                                            className={`h-2 rounded-full ${alert.failureRisk >= 80
                                                                ? "bg-red-500"
                                                                : alert.failureRisk >= 60
                                                                    ? "bg-yellow-500"
                                                                    : "bg-green-500"
                                                                }`}
                                                            style={{ width: `${alert.failureRisk}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm font-bold text-gray-800 dark:text-white/90">
                                                        {alert.failureRisk}%
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Predicted Failure
                                                </p>
                                                <p className="text-sm font-medium text-gray-800 dark:text-white/90 mt-1">
                                                    {alert.predictedFailure}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Impact Level
                                                </p>
                                                <p className="text-sm font-medium text-gray-800 dark:text-white/90 mt-1">
                                                    {alert.impact}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Est. Cost
                                                </p>
                                                <p className="text-sm font-medium text-gray-800 dark:text-white/90 mt-1">
                                                    {alert.estimatedCost}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-3 p-3 bg-blue-50 rounded-lg dark:bg-blue-900/20">
                                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                                <span className="font-semibold">Recommendation:</span>{" "}
                                                {alert.recommendation}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <button className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600">
                                            Schedule
                                        </button>
                                        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                                            Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Failure Prediction Timeline */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                            AI Failure Prediction Timeline
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Projected failure risk trends for critical systems
                        </p>
                    </div>
                    <Chart
                        options={failurePredictionOptions}
                        series={failurePredictionSeries}
                        type="line"
                        height={350}
                    />
                    <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                        <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg dark:bg-red-900/20">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    HVAC Systems
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    High risk - Requires immediate attention
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg dark:bg-yellow-900/20">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    Door Mechanisms
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Moderate risk - Monitor closely
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg dark:bg-green-900/20">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <div>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    Electrical Systems
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Low risk - Routine maintenance sufficient
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Maintenance Schedule and Cost Savings */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Maintenance Schedule */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                Upcoming Maintenance Schedule
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Planned maintenance tasks by priority
                            </p>
                        </div>
                        <Chart
                            options={maintenanceScheduleOptions}
                            series={maintenanceScheduleSeries}
                            type="bar"
                            height={350}
                        />
                    </div>

                    {/* Cost Savings */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                Cost Savings Projection
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Preventive maintenance cost benefits
                            </p>
                        </div>
                        <Chart
                            options={costSavingsOptions}
                            series={costSavingsSeries}
                            type="area"
                            height={300}
                        />
                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <div className="text-center p-3 bg-green-50 rounded-lg dark:bg-green-900/20">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Total Saved
                                </p>
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                                    ₹1.7Cr
                                </p>
                                <p className="text-xs text-gray-400 mt-1">This year</p>
                            </div>
                            <div className="text-center p-3 bg-blue-50 rounded-lg dark:bg-blue-900/20">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Projected Annual
                                </p>
                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                                    ₹2.8Cr
                                </p>
                                <p className="text-xs text-gray-400 mt-1">By year end</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upcoming Maintenance Tasks */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                Scheduled Maintenance Tasks
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Upcoming preventive and predictive maintenance activities
                            </p>
                        </div>
                        <button className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600">
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
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            Add Task
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Train
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Date
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Type
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Components
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Duration
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Team
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {upcomingMaintenance.map((task) => (
                                    <tr key={task.id}>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-800 dark:text-white/90">
                                            {task.train}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            {new Date(task.scheduledDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-4">
                                            <Badge
                                                size="sm"
                                                color={
                                                    task.type === "Predictive"
                                                        ? "warning"
                                                        : task.type === "Preventive"
                                                            ? "success"
                                                            : "info"
                                                }
                                            >
                                                {task.type}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex flex-wrap gap-1 max-w-xs">
                                                {task.components.slice(0, 2).map((comp, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-md dark:bg-gray-800 dark:text-gray-300"
                                                    >
                                                        {comp}
                                                    </span>
                                                ))}
                                                {task.components.length > 2 && (
                                                    <span className="px-2 py-0.5 text-xs text-gray-500 dark:text-gray-400">
                                                        +{task.components.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            {task.estimatedDuration}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            {task.assignedTeam}
                                        </td>
                                        <td className="px-4 py-4">
                                            <Badge size="sm" color={getStatusColor(task.status)}>
                                                {task.status}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-4">
                                            <button className="text-brand-600 hover:text-brand-700 dark:text-brand-400">
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
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* AI Insights */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 to-blue-100 p-5 dark:border-gray-800 dark:from-blue-900/20 dark:to-blue-800/20">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-200 rounded-xl dark:bg-blue-800 mb-3">
                            <svg
                                className="w-6 h-6 text-blue-800 dark:text-white/90"
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
                            AI-Powered Predictions
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                            Machine learning algorithms analyze 50+ parameters to predict
                            failures with 92% accuracy.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium">
                            <span>92% Prediction Accuracy</span>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-green-50 to-green-100 p-5 dark:border-gray-800 dark:from-green-900/20 dark:to-green-800/20">
                        <div className="flex items-center justify-center w-12 h-12 bg-green-200 rounded-xl dark:bg-green-800 mb-3">
                            <svg
                                className="w-6 h-6 text-green-800 dark:text-white/90"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h4 className="font-semibold text-gray-800 dark:text-white/90 mb-2">
                            Proactive Maintenance
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                            Prevent 85% of unexpected breakdowns through timely predictive
                            interventions.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium">
                            <span>85% Breakdown Prevention</span>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-purple-50 to-purple-100 p-5 dark:border-gray-800 dark:from-purple-900/20 dark:to-purple-800/20">
                        <div className="flex items-center justify-center w-12 h-12 bg-purple-200 rounded-xl dark:bg-purple-800 mb-3">
                            <svg
                                className="w-6 h-6 text-purple-800 dark:text-white/90"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h4 className="font-semibold text-gray-800 dark:text-white/90 mb-2">
                            Cost Optimization
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                            Reduce maintenance costs by 40% through optimized scheduling and
                            resource allocation.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 font-medium">
                            <span>40% Cost Reduction</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
