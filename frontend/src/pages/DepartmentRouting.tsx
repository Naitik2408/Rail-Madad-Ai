import { useState } from "react";
import PageMeta from "../components/common/PageMeta";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../components/ui/table";
import Badge from "../components/ui/badge/Badge";

// Define the TypeScript interface for routing rules
interface RoutingRule {
    id: number;
    category: string;
    keywords: string[];
    department: string;
    priority: "High" | "Medium" | "Low";
    autoAssign: boolean;
    avgResolutionTime: string;
    successRate: number;
}

// Define the TypeScript interface for pending routing
interface PendingComplaint {
    id: number;
    complaintId: string;
    title: string;
    category: string;
    suggestedDepartment: string;
    confidence: number;
    alternativeDept: string;
    submittedAt: string;
    priority: "High" | "Medium" | "Low";
}

// Sample routing rules data
const routingRulesData: RoutingRule[] = [
    {
        id: 1,
        category: "Coach Maintenance",
        keywords: ["seat", "window", "door", "broken", "damaged"],
        department: "Mechanical",
        priority: "High",
        autoAssign: true,
        avgResolutionTime: "4 hours",
        successRate: 95,
    },
    {
        id: 2,
        category: "HVAC",
        keywords: ["AC", "air conditioning", "cooling", "heating", "temperature"],
        department: "Electrical",
        priority: "Medium",
        autoAssign: true,
        avgResolutionTime: "6 hours",
        successRate: 92,
    },
    {
        id: 3,
        category: "Cleanliness",
        keywords: ["toilet", "washroom", "dirty", "unhygienic", "cleaning"],
        department: "Housekeeping",
        priority: "High",
        autoAssign: true,
        avgResolutionTime: "2 hours",
        successRate: 98,
    },
    {
        id: 4,
        category: "Catering",
        keywords: ["food", "pantry", "menu", "quality", "meal"],
        department: "Catering",
        priority: "Low",
        autoAssign: true,
        avgResolutionTime: "3 hours",
        successRate: 88,
    },
    {
        id: 5,
        category: "Staff Conduct",
        keywords: ["behavior", "rude", "staff", "employee", "service"],
        department: "Administration",
        priority: "Medium",
        autoAssign: false,
        avgResolutionTime: "8 hours",
        successRate: 85,
    },
    {
        id: 6,
        category: "Electrical",
        keywords: ["charging", "power", "socket", "light", "electricity"],
        department: "Electrical",
        priority: "Medium",
        autoAssign: true,
        avgResolutionTime: "5 hours",
        successRate: 93,
    },
    {
        id: 7,
        category: "Amenities",
        keywords: ["bedding", "water", "blanket", "pillow", "facilities"],
        department: "Operations",
        priority: "Low",
        autoAssign: true,
        avgResolutionTime: "3 hours",
        successRate: 90,
    },
];

// Sample pending complaints for routing
const pendingComplaintsData: PendingComplaint[] = [
    {
        id: 1,
        complaintId: "RMD2024011",
        title: "AC vent making loud noise in B2",
        category: "HVAC",
        suggestedDepartment: "Electrical",
        confidence: 96,
        alternativeDept: "Mechanical",
        submittedAt: "10 mins ago",
        priority: "Medium",
    },
    {
        id: 2,
        complaintId: "RMD2024012",
        title: "Berth not properly cleaned",
        category: "Cleanliness",
        suggestedDepartment: "Housekeeping",
        confidence: 98,
        alternativeDept: "Operations",
        submittedAt: "15 mins ago",
        priority: "High",
    },
    {
        id: 3,
        complaintId: "RMD2024013",
        title: "Staff denied providing extra pillow",
        category: "Staff Conduct",
        suggestedDepartment: "Administration",
        confidence: 89,
        alternativeDept: "Operations",
        submittedAt: "25 mins ago",
        priority: "Low",
    },
    {
        id: 4,
        complaintId: "RMD2024014",
        title: "Door lock mechanism not working",
        category: "Coach Maintenance",
        suggestedDepartment: "Mechanical",
        confidence: 94,
        alternativeDept: "Operations",
        submittedAt: "30 mins ago",
        priority: "High",
    },
    {
        id: 5,
        complaintId: "RMD2024015",
        title: "Breakfast quality poor in pantry",
        category: "Catering",
        suggestedDepartment: "Catering",
        confidence: 99,
        alternativeDept: "Administration",
        submittedAt: "45 mins ago",
        priority: "Low",
    },
];

export default function DepartmentRouting() {
    const [selectedTab, setSelectedTab] = useState<"pending" | "rules">(
        "pending"
    );
    const [searchQuery, setSearchQuery] = useState("");

    // Department stats
    const departmentStats = [
        {
            name: "Mechanical",
            active: 15,
            avgTime: "4.2h",
            efficiency: 95,
            color: "blue",
        },
        {
            name: "Electrical",
            active: 12,
            avgTime: "5.5h",
            efficiency: 92,
            color: "yellow",
        },
        {
            name: "Housekeeping",
            active: 8,
            avgTime: "2.1h",
            efficiency: 98,
            color: "green",
        },
        {
            name: "Catering",
            active: 6,
            avgTime: "3.3h",
            efficiency: 88,
            color: "purple",
        },
        {
            name: "Administration",
            active: 4,
            avgTime: "7.8h",
            efficiency: 85,
            color: "red",
        },
        {
            name: "Operations",
            active: 10,
            avgTime: "3.9h",
            efficiency: 90,
            color: "indigo",
        },
    ];

    const filteredRules = routingRulesData.filter(
        (rule) =>
            rule.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            rule.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
            rule.keywords.some((keyword) =>
                keyword.toLowerCase().includes(searchQuery.toLowerCase())
            )
    );

    const filteredPending = pendingComplaintsData.filter(
        (complaint) =>
            complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            complaint.complaintId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            complaint.suggestedDepartment
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
    );

    const handleAutoRoute = (complaintId: string, department: string) => {
        console.log(`Auto-routing ${complaintId} to ${department}`);
        // Add routing logic here
    };

    const handleManualRoute = (complaintId: string) => {
        console.log(`Manual routing for ${complaintId}`);
        // Add manual routing logic here
    };

    const getPriorityColor = (
        priority: string
    ): "error" | "warning" | "success" => {
        switch (priority) {
            case "High":
                return "error";
            case "Medium":
                return "warning";
            case "Low":
                return "success";
            default:
                return "success";
        }
    };

    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 95) return "text-green-600 dark:text-green-400";
        if (confidence >= 85) return "text-yellow-600 dark:text-yellow-400";
        return "text-red-600 dark:text-red-400";
    };

    return (
        <>
            <PageMeta
                title="Department Routing | Rail Madad AI"
                description="AI-powered intelligent routing of complaints to appropriate departments"
            />

            <div className="space-y-6">
                {/* Page Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90 sm:text-3xl">
                        Department Routing
                    </h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        AI-powered intelligent complaint routing and department management
                    </p>
                </div>

                {/* Department Stats Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    {departmentStats.map((dept, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90">
                                    {dept.name}
                                </h4>
                                <div
                                    className={`flex items-center justify-center w-8 h-8 bg-${dept.color}-100 rounded-lg dark:bg-${dept.color}-900`}
                                >
                                    <div
                                        className={`w-2 h-2 bg-${dept.color}-600 rounded-full dark:bg-${dept.color}-400`}
                                    ></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        Active
                                    </span>
                                    <span className="text-sm font-bold text-gray-800 dark:text-white/90">
                                        {dept.active}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        Avg Time
                                    </span>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {dept.avgTime}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        Efficiency
                                    </span>
                                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                        {dept.efficiency}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Routing Stats */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Auto-Routed Today
                                </p>
                                <p className="mt-2 text-2xl font-bold text-gray-800 dark:text-white/90">
                                    487
                                </p>
                                <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                                    ↑ 12% from yesterday
                                </p>
                            </div>
                            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl dark:bg-blue-900">
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
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Pending Routing
                                </p>
                                <p className="mt-2 text-2xl font-bold text-gray-800 dark:text-white/90">
                                    {pendingComplaintsData.length}
                                </p>
                                <p className="mt-1 text-xs text-yellow-600 dark:text-yellow-400">
                                    Awaiting assignment
                                </p>
                            </div>
                            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-xl dark:bg-yellow-900">
                                <svg
                                    className="w-6 h-6 text-yellow-600 dark:text-yellow-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Routing Accuracy
                                </p>
                                <p className="mt-2 text-2xl font-bold text-gray-800 dark:text-white/90">
                                    94.2%
                                </p>
                                <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                                    ↑ 2.1% this week
                                </p>
                            </div>
                            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl dark:bg-green-900">
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
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Avg Routing Time
                                </p>
                                <p className="mt-2 text-2xl font-bold text-gray-800 dark:text-white/90">
                                    1.2s
                                </p>
                                <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                                    ↓ 0.3s faster
                                </p>
                            </div>
                            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl dark:bg-purple-900">
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
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs and Search */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        {/* Tabs */}
                        <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
                            <button
                                onClick={() => setSelectedTab("pending")}
                                className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${selectedTab === "pending"
                                    ? "border-brand-500 text-brand-600 dark:text-brand-400"
                                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                    }`}
                            >
                                Pending Routing ({pendingComplaintsData.length})
                            </button>
                            <button
                                onClick={() => setSelectedTab("rules")}
                                className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${selectedTab === "rules"
                                    ? "border-brand-500 text-brand-600 dark:text-brand-400"
                                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                    }`}
                            >
                                Routing Rules ({routingRulesData.length})
                            </button>
                        </div>

                        {/* Search */}
                        <div className="w-full md:w-80">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90 dark:placeholder:text-gray-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Pending Routing Table */}
                {selectedTab === "pending" && (
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="px-4 pt-4 pb-3 sm:px-6">
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                    Pending Complaints for Routing
                                </h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Review AI suggestions and approve or manually route complaints
                                </p>
                            </div>

                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Complaint
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Category
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                AI Suggestion
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Confidence
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Alternative
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Priority
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Time
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Actions
                                            </th>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredPending.map((complaint) => (
                                            <TableRow key={complaint.id}>
                                                <TableCell className="px-4 py-3">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                                            {complaint.complaintId}
                                                        </p>
                                                        <p className="text-xs text-gray-600 dark:text-gray-300 max-w-xs">
                                                            {complaint.title}
                                                        </p>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                                    {complaint.category}
                                                </TableCell>
                                                <TableCell className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <Badge size="sm" color="primary">
                                                            {complaint.suggestedDepartment}
                                                        </Badge>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <span
                                                            className={`text-sm font-semibold ${getConfidenceColor(
                                                                complaint.confidence
                                                            )}`}
                                                        >
                                                            {complaint.confidence}%
                                                        </span>
                                                        <div className="w-16 h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                                                            <div
                                                                className={`h-2 rounded-full ${complaint.confidence >= 95
                                                                    ? "bg-green-500"
                                                                    : complaint.confidence >= 85
                                                                        ? "bg-yellow-500"
                                                                        : "bg-red-500"
                                                                    }`}
                                                                style={{ width: `${complaint.confidence}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                                    {complaint.alternativeDept}
                                                </TableCell>
                                                <TableCell className="px-4 py-3">
                                                    <Badge
                                                        size="sm"
                                                        color={getPriorityColor(complaint.priority)}
                                                    >
                                                        {complaint.priority}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                                    {complaint.submittedAt}
                                                </TableCell>
                                                <TableCell className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() =>
                                                                handleAutoRoute(
                                                                    complaint.complaintId,
                                                                    complaint.suggestedDepartment
                                                                )
                                                            }
                                                            className="px-3 py-1.5 text-xs font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleManualRoute(complaint.complaintId)
                                                            }
                                                            className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                                        >
                                                            Manual
                                                        </button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Routing Rules Table */}
                {selectedTab === "rules" && (
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="px-4 pt-4 pb-3 sm:px-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                        AI Routing Rules
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        Configure automatic routing based on category and keywords
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
                                    Add Rule
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Category
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Keywords
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Department
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Priority
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Auto-Assign
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Avg Time
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Success Rate
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Actions
                                            </th>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredRules.map((rule) => (
                                            <TableRow key={rule.id}>
                                                <TableCell className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-white/90">
                                                    {rule.category}
                                                </TableCell>
                                                <TableCell className="px-4 py-3">
                                                    <div className="flex flex-wrap gap-1 max-w-xs">
                                                        {rule.keywords.slice(0, 3).map((keyword, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-md dark:bg-gray-800 dark:text-gray-300"
                                                            >
                                                                {keyword}
                                                            </span>
                                                        ))}
                                                        {rule.keywords.length > 3 && (
                                                            <span className="px-2 py-0.5 text-xs text-gray-500 dark:text-gray-400">
                                                                +{rule.keywords.length - 3} more
                                                            </span>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-4 py-3">
                                                    <Badge size="sm" color="info">
                                                        {rule.department}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="px-4 py-3">
                                                    <Badge size="sm" color={getPriorityColor(rule.priority)}>
                                                        {rule.priority}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="px-4 py-3">
                                                    <div className="flex items-center">
                                                        {rule.autoAssign ? (
                                                            <span className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                                                                <svg
                                                                    className="w-4 h-4"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                                Enabled
                                                            </span>
                                                        ) : (
                                                            <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                                                <svg
                                                                    className="w-4 h-4"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                                Disabled
                                                            </span>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                                    {rule.avgResolutionTime}
                                                </TableCell>
                                                <TableCell className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                                                            {rule.successRate}%
                                                        </span>
                                                        <div className="w-16 h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                                                            <div
                                                                className="h-2 bg-green-500 rounded-full"
                                                                style={{ width: `${rule.successRate}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
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
                                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                                />
                                                            </svg>
                                                        </button>
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
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                )}

                {/* AI Routing Insights */}
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
                                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                />
                            </svg>
                        </div>
                        <h4 className="font-semibold text-gray-800 dark:text-white/90 mb-2">
                            Smart Routing
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                            AI automatically routes 94% of complaints to the correct
                            department on first attempt
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-blue-200 rounded-full dark:bg-blue-900">
                                <div
                                    className="h-2 bg-blue-600 rounded-full dark:bg-blue-400"
                                    style={{ width: "94%" }}
                                ></div>
                            </div>
                            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                                94%
                            </span>
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
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                        <h4 className="font-semibold text-gray-800 dark:text-white/90 mb-2">
                            Lightning Fast
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                            Average routing time of just 1.2 seconds with 99.9% uptime
                        </p>
                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="font-medium">System Healthy</span>
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
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                />
                            </svg>
                        </div>
                        <h4 className="font-semibold text-gray-800 dark:text-white/90 mb-2">
                            Continuous Learning
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                            AI model improves daily based on feedback and resolution outcomes
                        </p>
                        <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                            Last updated: 2 hours ago
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
