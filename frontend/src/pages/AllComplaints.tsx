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

// Define the TypeScript interface for complaints
interface Complaint {
    id: number;
    complaintId: string;
    title: string;
    category: string;
    priority: "High" | "Medium" | "Low";
    status: "Resolved" | "In Progress" | "Pending";
    submittedBy: string;
    train: string;
    coach: string;
    dateSubmitted: string;
    department: string;
}

// Sample data for complaints
const complaintsData: Complaint[] = [
    {
        id: 1,
        complaintId: "RMD2024001",
        title: "Broken seat in coach B3",
        category: "Coach Maintenance",
        priority: "High",
        status: "Resolved",
        submittedBy: "Rajesh Kumar",
        train: "12301 - Howrah Rajdhani",
        coach: "B3",
        dateSubmitted: "2024-11-01",
        department: "Mechanical",
    },
    {
        id: 2,
        complaintId: "RMD2024002",
        title: "AC not working in compartment",
        category: "HVAC",
        priority: "Medium",
        status: "In Progress",
        submittedBy: "Priya Sharma",
        train: "12951 - Mumbai Rajdhani",
        coach: "A1",
        dateSubmitted: "2024-11-02",
        department: "Electrical",
    },
    {
        id: 3,
        complaintId: "RMD2024003",
        title: "Toilet facility unhygienic",
        category: "Cleanliness",
        priority: "High",
        status: "Resolved",
        submittedBy: "Amit Patel",
        train: "12430 - Lucknow AC SF",
        coach: "C2",
        dateSubmitted: "2024-11-02",
        department: "Housekeeping",
    },
    {
        id: 4,
        complaintId: "RMD2024004",
        title: "Food quality poor in pantry car",
        category: "Catering",
        priority: "Low",
        status: "Pending",
        submittedBy: "Sneha Gupta",
        train: "12002 - Bhopal Shatabdi",
        coach: "Pantry",
        dateSubmitted: "2024-11-03",
        department: "Catering",
    },
    {
        id: 5,
        complaintId: "RMD2024005",
        title: "Staff rude behavior reported",
        category: "Staff Conduct",
        priority: "Medium",
        status: "Resolved",
        submittedBy: "Vikram Singh",
        train: "12301 - Howrah Rajdhani",
        coach: "A2",
        dateSubmitted: "2024-11-03",
        department: "Administration",
    },
    {
        id: 6,
        complaintId: "RMD2024006",
        title: "Water not available in coach",
        category: "Amenities",
        priority: "High",
        status: "In Progress",
        submittedBy: "Kavita Reddy",
        train: "12621 - Tamil Nadu Exp",
        coach: "S4",
        dateSubmitted: "2024-11-04",
        department: "Operations",
    },
    {
        id: 7,
        complaintId: "RMD2024007",
        title: "Window broken causing air leakage",
        category: "Coach Maintenance",
        priority: "High",
        status: "In Progress",
        submittedBy: "Suresh Menon",
        train: "12260 - Duronto Express",
        coach: "B1",
        dateSubmitted: "2024-11-04",
        department: "Mechanical",
    },
    {
        id: 8,
        complaintId: "RMD2024008",
        title: "Charging point not working",
        category: "Electrical",
        priority: "Low",
        status: "Pending",
        submittedBy: "Neha Joshi",
        train: "12951 - Mumbai Rajdhani",
        coach: "A3",
        dateSubmitted: "2024-11-04",
        department: "Electrical",
    },
    {
        id: 9,
        complaintId: "RMD2024009",
        title: "Bedding not provided",
        category: "Amenities",
        priority: "Medium",
        status: "Resolved",
        submittedBy: "Rahul Verma",
        train: "12430 - Lucknow AC SF",
        coach: "B2",
        dateSubmitted: "2024-11-05",
        department: "Operations",
    },
    {
        id: 10,
        complaintId: "RMD2024010",
        title: "Rats spotted in coach",
        category: "Cleanliness",
        priority: "High",
        status: "In Progress",
        submittedBy: "Meena Iyer",
        train: "12002 - Bhopal Shatabdi",
        coach: "C1",
        dateSubmitted: "2024-11-05",
        department: "Housekeeping",
    },
];

export default function AllComplaints() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("All");
    const [filterPriority, setFilterPriority] = useState<string>("All");
    const [filterCategory, setFilterCategory] = useState<string>("All");

    // Filter complaints based on search and filters
    const filteredComplaints = complaintsData.filter((complaint) => {
        const matchesSearch =
            complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            complaint.complaintId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            complaint.train.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
            filterStatus === "All" || complaint.status === filterStatus;
        const matchesPriority =
            filterPriority === "All" || complaint.priority === filterPriority;
        const matchesCategory =
            filterCategory === "All" || complaint.category === filterCategory;

        return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "High":
                return "error";
            case "Medium":
                return "warning";
            case "Low":
                return "success";
            default:
                return "primary";
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Resolved":
                return "success";
            case "In Progress":
                return "warning";
            case "Pending":
                return "error";
            default:
                return "primary";
        }
    };

    return (
        <>
            <PageMeta
                title="All Complaints | Rail Madad AI"
                description="View and manage all railway passenger complaints in the Rail Madad AI system"
            />

            <div className="space-y-6">
                {/* Page Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90 sm:text-3xl">
                        All Complaints
                    </h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        View, filter, and manage all railway passenger complaints
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Total Complaints
                                </p>
                                <p className="mt-2 text-2xl font-bold text-gray-800 dark:text-white/90">
                                    {complaintsData.length}
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
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Resolved
                                </p>
                                <p className="mt-2 text-2xl font-bold text-gray-800 dark:text-white/90">
                                    {
                                        complaintsData.filter((c) => c.status === "Resolved")
                                            .length
                                    }
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
                                    In Progress
                                </p>
                                <p className="mt-2 text-2xl font-bold text-gray-800 dark:text-white/90">
                                    {
                                        complaintsData.filter((c) => c.status === "In Progress")
                                            .length
                                    }
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
                                    Pending
                                </p>
                                <p className="mt-2 text-2xl font-bold text-gray-800 dark:text-white/90">
                                    {
                                        complaintsData.filter((c) => c.status === "Pending").length
                                    }
                                </p>
                            </div>
                            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl dark:bg-red-900">
                                <svg
                                    className="w-6 h-6 text-red-600 dark:text-red-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {/* Search */}
                        <div className="lg:col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Search Complaints
                            </label>
                            <input
                                type="text"
                                placeholder="Search by ID, title, or train..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90 dark:placeholder:text-gray-500"
                            />
                        </div>

                        {/* Status Filter */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Status
                            </label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
                            >
                                <option value="All">All Status</option>
                                <option value="Resolved">Resolved</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Pending">Pending</option>
                            </select>
                        </div>

                        {/* Priority Filter */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Priority
                            </label>
                            <select
                                value={filterPriority}
                                onChange={(e) => setFilterPriority(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
                            >
                                <option value="All">All Priorities</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="mt-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Category
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {[
                                "All",
                                "Coach Maintenance",
                                "HVAC",
                                "Cleanliness",
                                "Catering",
                                "Staff Conduct",
                                "Amenities",
                                "Electrical",
                            ].map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setFilterCategory(category)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterCategory === category
                                            ? "bg-brand-500 text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Complaints Table */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="px-4 pt-4 pb-3 sm:px-6">
                        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                                    Complaints List
                                </h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Showing {filteredComplaints.length} of{" "}
                                    {complaintsData.length} complaints
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
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
                                    Export
                                </button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                            Complaint ID
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                            Title
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                            Train & Coach
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                            Category
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                            Priority
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                            Department
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                            Date
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                            Actions
                                        </th>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredComplaints.map((complaint) => (
                                        <TableRow key={complaint.id}>
                                            <TableCell className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-white/90">
                                                {complaint.complaintId}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                                <div className="max-w-xs">
                                                    <p className="font-medium">{complaint.title}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        By: {complaint.submittedBy}
                                                    </p>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                                <div>
                                                    <p className="font-medium">{complaint.train}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        Coach: {complaint.coach}
                                                    </p>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                                {complaint.category}
                                            </TableCell>
                                            <TableCell className="px-4 py-3">
                                                <Badge
                                                    size="sm"
                                                    color={getPriorityColor(complaint.priority)}
                                                >
                                                    {complaint.priority}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="px-4 py-3">
                                                <Badge
                                                    size="sm"
                                                    color={getStatusColor(complaint.status)}
                                                >
                                                    {complaint.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                                {complaint.department}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(complaint.dateSubmitted).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="px-4 py-3">
                                                <button className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300">
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
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {filteredComplaints.length === 0 && (
                                <div className="py-12 text-center">
                                    <svg
                                        className="w-12 h-12 mx-auto text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    <p className="mt-4 text-gray-500 dark:text-gray-400">
                                        No complaints found matching your filters
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
