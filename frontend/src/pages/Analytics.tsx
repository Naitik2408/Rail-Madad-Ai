import { useState } from "react";
import PageMeta from "../components/common/PageMeta";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import Badge from "../components/ui/badge/Badge";

export default function Analytics() {
    const [selectedTimeframe, setSelectedTimeframe] = useState("30days");
    const [selectedMetric, setSelectedMetric] = useState("complaints");

    // Performance Metrics Over Time
    const performanceOptions: ApexOptions = {
        chart: {
            fontFamily: "Outfit, sans-serif",
            type: "area",
            height: 350,
            toolbar: { show: false },
            zoom: { enabled: false },
        },
        colors: ["#465FFF", "#10B981", "#F59E0B"],
        dataLabels: { enabled: false },
        stroke: { curve: "smooth", width: 2 },
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
        },
        yaxis: {
            title: { text: "Number of Complaints" },
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
        tooltip: {
            shared: true,
            intersect: false,
        },
    };
    const performanceSeries = [
        { name: "Total Complaints", data: [120, 135, 142, 128, 155, 148, 162, 145] },
        { name: "Resolved", data: [110, 125, 135, 120, 145, 142, 155, 140] },
        { name: "Pending", data: [10, 10, 7, 8, 10, 6, 7, 5] },
    ];

    // Department Performance Comparison
    const departmentComparisonOptions: ApexOptions = {
        chart: {
            fontFamily: "Outfit, sans-serif",
            type: "bar",
            height: 350,
            toolbar: { show: false },
        },
        colors: ["#465FFF", "#10B981", "#F59E0B"],
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
                "Mechanical",
                "Electrical",
                "Housekeeping",
                "Catering",
                "Administration",
                "Operations",
            ],
        },
        yaxis: {
            title: { text: "Complaints" },
        },
        fill: { opacity: 1 },
        legend: {
            position: "top",
            horizontalAlign: "right",
        },
    };
    const departmentComparisonSeries = [
        { name: "Received", data: [85, 72, 65, 48, 38, 55] },
        { name: "Resolved", data: [80, 68, 64, 42, 35, 52] },
        { name: "Pending", data: [5, 4, 1, 6, 3, 3] },
    ];

    // Resolution Time Distribution
    const resolutionTimeOptions: ApexOptions = {
        chart: {
            fontFamily: "Outfit, sans-serif",
            type: "donut",
            height: 300,
        },
        colors: ["#10B981", "#465FFF", "#F59E0B", "#EF4444"],
        labels: ["< 2 hours", "2-6 hours", "6-24 hours", "> 24 hours"],
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
                            label: "Total Resolved",
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
    const resolutionTimeSeries = [35, 45, 15, 5];

    // Complaint Categories Heatmap
    const categoryTrendOptions: ApexOptions = {
        chart: {
            fontFamily: "Outfit, sans-serif",
            type: "heatmap",
            height: 350,
            toolbar: { show: false },
        },
        dataLabels: { enabled: false },
        colors: ["#465FFF"],
        xaxis: {
            categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        plotOptions: {
            heatmap: {
                shadeIntensity: 0.5,
                colorScale: {
                    ranges: [
                        { from: 0, to: 5, color: "#10B981", name: "Low" },
                        { from: 6, to: 15, color: "#F59E0B", name: "Medium" },
                        { from: 16, to: 30, color: "#EF4444", name: "High" },
                    ],
                },
            },
        },
    };
    const categoryTrendSeries = [
        { name: "Coach Maintenance", data: [12, 15, 18, 14, 20, 10, 8] },
        { name: "Cleanliness", data: [18, 20, 15, 22, 25, 12, 10] },
        { name: "HVAC", data: [10, 12, 14, 11, 15, 8, 6] },
        { name: "Catering", data: [5, 8, 6, 9, 10, 4, 3] },
        { name: "Staff Conduct", data: [7, 6, 8, 5, 9, 3, 4] },
        { name: "Electrical", data: [8, 10, 9, 12, 14, 6, 5] },
    ];

    // Customer Satisfaction Score
    const satisfactionOptions: ApexOptions = {
        chart: {
            fontFamily: "Outfit, sans-serif",
            type: "radialBar",
            height: 300,
        },
        colors: ["#10B981", "#465FFF", "#F59E0B"],
        plotOptions: {
            radialBar: {
                dataLabels: {
                    name: { fontSize: "14px" },
                    value: { fontSize: "16px" },
                    total: {
                        show: true,
                        label: "Overall",
                        formatter: function () {
                            return "87%";
                        },
                    },
                },
            },
        },
        labels: ["Resolution Quality", "Response Time", "Staff Behavior"],
    };
    const satisfactionSeries = [92, 85, 84];

    // Peak Hours Analysis
    const peakHoursOptions: ApexOptions = {
        chart: {
            fontFamily: "Outfit, sans-serif",
            type: "line",
            height: 300,
            toolbar: { show: false },
        },
        colors: ["#465FFF"],
        stroke: { curve: "smooth", width: 3 },
        xaxis: {
            categories: [
                "00:00",
                "03:00",
                "06:00",
                "09:00",
                "12:00",
                "15:00",
                "18:00",
                "21:00",
            ],
            title: { text: "Time of Day" },
        },
        yaxis: {
            title: { text: "Complaints Received" },
        },
        markers: {
            size: 5,
            colors: ["#465FFF"],
            strokeColors: "#fff",
            strokeWidth: 2,
            hover: { size: 7 },
        },
        grid: {
            borderColor: "#e7e7e7",
            row: { colors: ["#f3f3f3", "transparent"], opacity: 0.5 },
        },
    };
    const peakHoursSeries = [
        { name: "Complaints", data: [5, 3, 4, 12, 18, 25, 45, 38] },
    ];

    // Top performing metrics
    const topMetrics = [
        {
            title: "Total Complaints",
            value: "8,942",
            change: "+12.5%",
            trend: "up",
            color: "blue",
        },
        {
            title: "Resolution Rate",
            value: "94.8%",
            change: "+3.2%",
            trend: "up",
            color: "green",
        },
        {
            title: "Avg Resolution Time",
            value: "4.2h",
            change: "-0.8h",
            trend: "down",
            color: "purple",
        },
        {
            title: "Customer Satisfaction",
            value: "4.6/5",
            change: "+0.3",
            trend: "up",
            color: "yellow",
        },
    ];

    // Train-wise Statistics
    const trainStats = [
        {
            train: "12301 - Howrah Rajdhani",
            complaints: 45,
            resolved: 42,
            pending: 3,
            avgTime: "3.2h",
            satisfaction: 4.7,
        },
        {
            train: "12951 - Mumbai Rajdhani",
            complaints: 38,
            resolved: 35,
            pending: 3,
            avgTime: "4.1h",
            satisfaction: 4.5,
        },
        {
            train: "12430 - Lucknow AC SF",
            complaints: 32,
            resolved: 30,
            pending: 2,
            avgTime: "3.8h",
            satisfaction: 4.6,
        },
        {
            train: "12002 - Bhopal Shatabdi",
            complaints: 28,
            resolved: 27,
            pending: 1,
            avgTime: "3.5h",
            satisfaction: 4.8,
        },
        {
            train: "12621 - Tamil Nadu Exp",
            complaints: 25,
            resolved: 23,
            pending: 2,
            avgTime: "4.5h",
            satisfaction: 4.4,
        },
    ];

    // Category Performance
    const categoryPerformance = [
        {
            category: "Coach Maintenance",
            total: 145,
            resolved: 138,
            avgTime: "4.2h",
            efficiency: 95,
        },
        {
            category: "Cleanliness",
            total: 132,
            resolved: 130,
            avgTime: "2.1h",
            efficiency: 98,
        },
        {
            category: "HVAC",
            total: 98,
            resolved: 90,
            avgTime: "5.5h",
            efficiency: 92,
        },
        {
            category: "Catering",
            total: 75,
            resolved: 66,
            avgTime: "3.3h",
            efficiency: 88,
        },
        {
            category: "Staff Conduct",
            total: 62,
            resolved: 53,
            avgTime: "7.8h",
            efficiency: 85,
        },
        {
            category: "Electrical",
            total: 85,
            resolved: 79,
            avgTime: "5.0h",
            efficiency: 93,
        },
    ];

    return (
        <>
            <PageMeta
                title="Analytics | Rail Madad AI"
                description="Comprehensive analytics and performance insights for railway complaint management"
            />

            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90 sm:text-3xl">
                            Analytics Dashboard
                        </h1>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">
                            Comprehensive performance metrics and data insights
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <select
                            value={selectedTimeframe}
                            onChange={(e) => setSelectedTimeframe(e.target.value)}
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
                        >
                            <option value="7days">Last 7 Days</option>
                            <option value="30days">Last 30 Days</option>
                            <option value="90days">Last 90 Days</option>
                            <option value="1year">Last Year</option>
                        </select>
                        <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
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
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            Export Report
                        </button>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {topMetrics.map((metric, index) => (
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
                                            {metric.value}
                                        </p>
                                        <span
                                            className={`text-sm font-medium ${metric.trend === "up"
                                                ? "text-green-600 dark:text-green-400"
                                                : "text-green-600 dark:text-green-400"
                                                }`}
                                        >
                                            {metric.change}
                                        </span>
                                    </div>
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
                                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                            />
                                        )}
                                        {index === 1 && (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        )}
                                        {index === 2 && (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        )}
                                        {index === 3 && (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                            />
                                        )}
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Performance Over Time */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                Performance Over Time
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Weekly complaint trends and resolution rates
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setSelectedMetric("complaints")}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedMetric === "complaints"
                                    ? "bg-brand-500 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                    }`}
                            >
                                Complaints
                            </button>
                            <button
                                onClick={() => setSelectedMetric("resolution")}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedMetric === "resolution"
                                    ? "bg-brand-500 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                    }`}
                            >
                                Resolution
                            </button>
                        </div>
                    </div>
                    <Chart
                        options={performanceOptions}
                        series={performanceSeries}
                        type="area"
                        height={350}
                    />
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Department Comparison */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                Department Performance
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Comparison of complaints received vs resolved by department
                            </p>
                        </div>
                        <Chart
                            options={departmentComparisonOptions}
                            series={departmentComparisonSeries}
                            type="bar"
                            height={350}
                        />
                    </div>

                    {/* Resolution Time Distribution */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                Resolution Time Distribution
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Breakdown of complaint resolution timeframes
                            </p>
                        </div>
                        <Chart
                            options={resolutionTimeOptions}
                            series={resolutionTimeSeries}
                            type="donut"
                            height={300}
                        />
                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <div className="text-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Fast Resolution
                                </p>
                                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                                    80%
                                </p>
                                <p className="text-xs text-gray-400">&lt; 6 hours</p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Avg Time
                                </p>
                                <p className="text-xl font-bold text-gray-800 dark:text-white/90">
                                    4.2h
                                </p>
                                <p className="text-xs text-gray-400">Overall average</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Row 2 */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Peak Hours Analysis */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                Peak Hours Analysis
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Complaint volume by time of day
                            </p>
                        </div>
                        <Chart
                            options={peakHoursOptions}
                            series={peakHoursSeries}
                            type="line"
                            height={300}
                        />
                        <div className="mt-4 flex items-center gap-2 p-3 bg-blue-50 rounded-lg dark:bg-blue-900/20">
                            <svg
                                className="w-5 h-5 text-blue-600 dark:text-blue-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                Peak hours: 6 PM - 9 PM. Consider increased staffing during
                                this period.
                            </p>
                        </div>
                    </div>

                    {/* Customer Satisfaction */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                Customer Satisfaction Metrics
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Multi-dimensional satisfaction analysis
                            </p>
                        </div>
                        <Chart
                            options={satisfactionOptions}
                            series={satisfactionSeries}
                            type="radialBar"
                            height={300}
                        />
                        <div className="mt-4 space-y-2">
                            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg dark:bg-gray-800/50">
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                    Overall Rating
                                </span>
                                <span className="text-sm font-bold text-gray-800 dark:text-white/90">
                                    4.6/5.0 ⭐
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg dark:bg-gray-800/50">
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                    Total Reviews
                                </span>
                                <span className="text-sm font-bold text-gray-800 dark:text-white/90">
                                    2,847
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category Heatmap */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                            Category Trends Heatmap
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Daily complaint patterns across different categories
                        </p>
                    </div>
                    <Chart
                        options={categoryTrendOptions}
                        series={categoryTrendSeries}
                        type="heatmap"
                        height={350}
                    />
                </div>

                {/* Train-wise Statistics */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                            Top 5 Trains - Performance Statistics
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Detailed metrics for trains with highest complaint volumes
                        </p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Train
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Total Complaints
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Resolved
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Pending
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Avg Resolution Time
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                        Satisfaction
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {trainStats.map((train, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-800 dark:text-white/90">
                                            {train.train}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            {train.complaints}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-green-600 dark:text-green-400">
                                            {train.resolved}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-yellow-600 dark:text-yellow-400">
                                            {train.pending}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            {train.avgTime}
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                                                    {train.satisfaction}
                                                </span>
                                                <span className="text-yellow-500">⭐</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Category Performance */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                            Category-wise Performance
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Efficiency metrics across all complaint categories
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {categoryPerformance.map((category, index) => (
                            <div
                                key={index}
                                className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-semibold text-gray-800 dark:text-white/90">
                                        {category.category}
                                    </h4>
                                    <Badge
                                        size="sm"
                                        color={
                                            category.efficiency >= 95
                                                ? "success"
                                                : category.efficiency >= 85
                                                    ? "warning"
                                                    : "error"
                                        }
                                    >
                                        {category.efficiency}%
                                    </Badge>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">
                                            Total
                                        </span>
                                        <span className="font-medium text-gray-800 dark:text-white/90">
                                            {category.total}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">
                                            Resolved
                                        </span>
                                        <span className="font-medium text-green-600 dark:text-green-400">
                                            {category.resolved}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">
                                            Avg Time
                                        </span>
                                        <span className="font-medium text-gray-800 dark:text-white/90">
                                            {category.avgTime}
                                        </span>
                                    </div>
                                    <div className="mt-3 h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                                        <div
                                            className={`h-2 rounded-full ${category.efficiency >= 95
                                                ? "bg-green-500"
                                                : category.efficiency >= 85
                                                    ? "bg-yellow-500"
                                                    : "bg-red-500"
                                                }`}
                                            style={{ width: `${category.efficiency}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Key Insights */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
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
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                />
                            </svg>
                        </div>
                        <h4 className="font-semibold text-gray-800 dark:text-white/90 mb-2">
                            Performance Improvement
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                            Resolution rate improved by 3.2% this month. Keep up the excellent work!
                        </p>
                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium">
                            <span>↑ Trending Up</span>
                        </div>
                    </div>

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
                                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                />
                            </svg>
                        </div>
                        <h4 className="font-semibold text-gray-800 dark:text-white/90 mb-2">
                            Target Achievement
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                            94.8% resolution rate achieved. Target: 95%. You're almost there!
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-blue-200 rounded-full dark:bg-blue-900">
                                <div
                                    className="h-2 bg-blue-600 rounded-full dark:bg-blue-400"
                                    style={{ width: "99.8%" }}
                                ></div>
                            </div>
                            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                                99.8%
                            </span>
                        </div>
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
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>
                        <h4 className="font-semibold text-gray-800 dark:text-white/90 mb-2">
                            Action Required
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                            Staff conduct complaints need attention. Consider additional training.
                        </p>
                        <button className="text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400">
                            View Details →
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
