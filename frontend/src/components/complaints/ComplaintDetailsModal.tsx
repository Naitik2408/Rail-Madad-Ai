import { useState } from 'react';
import { Complaint } from '../../hooks/useComplaints';
import Badge from '../ui/badge/Badge';

interface ComplaintDetailsModalProps {
    complaint: Complaint | null;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (id: string, updates: any) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

export default function ComplaintDetailsModal({
    complaint,
    isOpen,
    onClose,
    onUpdate,
    onDelete,
}: ComplaintDetailsModalProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [status, setStatus] = useState(complaint?.status || 'pending');
    const [priority, setPriority] = useState(complaint?.priority || 'medium');
    const [department, setDepartment] = useState(complaint?.department || '');
    const [isLoading, setIsLoading] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    if (!isOpen || !complaint) return null;

    // Helper functions to convert between display format and backend format
    const toDisplayStatus = (backendStatus: string): string => {
        const map: { [key: string]: string } = {
            'pending': 'Pending',
            'in_progress': 'In Progress',
            'resolved': 'Resolved',
            'rejected': 'Rejected',
        };
        return map[backendStatus] || backendStatus;
    };

    const toDisplayPriority = (backendPriority: string): string => {
        return backendPriority.charAt(0).toUpperCase() + backendPriority.slice(1);
    };

    const toDisplayCategory = (backendCategory: string): string => {
        return backendCategory
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            await onUpdate(complaint._id, {
                status,
                priority,
                department: department || undefined,
            });
            setIsEditing(false);
            onClose();
        } catch (error) {
            console.error('Error updating complaint:', error);
            alert('Failed to update complaint');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            await onDelete(complaint._id);
            setShowDeleteConfirm(false);
            onClose();
        } catch (error) {
            console.error('Error deleting complaint:', error);
            alert('Failed to delete complaint');
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/50">
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">
                            Complaint Details
                        </h2>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {complaint.complaintId}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Status and Priority */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Status
                            </label>
                            {isEditing ? (
                                <select
                                    id="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value as 'pending' | 'in_progress' | 'resolved')}
                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="resolved">Resolved</option>
                                </select>
                            ) : (
                                <Badge color={status === 'resolved' ? 'success' : status === 'in_progress' ? 'warning' : 'error'}>
                                    {toDisplayStatus(status)}
                                </Badge>
                            )}
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Priority
                            </label>
                            {isEditing ? (
                                <select
                                    id="priority"
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high' | 'urgent')}
                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                            ) : (
                                <Badge color={priority === 'high' || priority === 'urgent' ? 'error' : priority === 'medium' ? 'warning' : 'success'}>
                                    {toDisplayPriority(priority)}
                                </Badge>
                            )}
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Department
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    placeholder="Department"
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
                                />
                            ) : (
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    {complaint.department || 'Unassigned'}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Passenger Information */}
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
                        <h3 className="mb-3 text-lg font-semibold text-gray-800 dark:text-white/90">
                            Passenger Information
                        </h3>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div>
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Name:</span>
                                <p className="text-sm text-gray-800 dark:text-white/90">{complaint.name || 'N/A'}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Email:</span>
                                <p className="text-sm text-gray-800 dark:text-white/90">{complaint.email || 'N/A'}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone:</span>
                                <p className="text-sm text-gray-800 dark:text-white/90">{complaint.phoneNumber || 'N/A'}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">PNR:</span>
                                <p className="text-sm text-gray-800 dark:text-white/90">{complaint.pnr || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Journey Details */}
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
                        <h3 className="mb-3 text-lg font-semibold text-gray-800 dark:text-white/90">
                            Journey Details
                        </h3>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div>
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Train Number:</span>
                                <p className="text-sm text-gray-800 dark:text-white/90">{complaint.trainNumber || 'N/A'}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Train Name:</span>
                                <p className="text-sm text-gray-800 dark:text-white/90">{complaint.trainName || 'N/A'}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Coach:</span>
                                <p className="text-sm text-gray-800 dark:text-white/90">{complaint.coach || 'N/A'}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Station:</span>
                                <p className="text-sm text-gray-800 dark:text-white/90">{complaint.station || 'N/A'}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Journey Date:</span>
                                <p className="text-sm text-gray-800 dark:text-white/90">
                                    {complaint.journeyDate ? new Date(complaint.journeyDate).toLocaleDateString('en-IN') : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Complaint Details */}
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
                        <h3 className="mb-3 text-lg font-semibold text-gray-800 dark:text-white/90">
                            Complaint Details
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Category:</span>
                                <p className="text-sm text-gray-800 dark:text-white/90">{toDisplayCategory(complaint.category)}</p>
                            </div>
                            {complaint.title && (
                                <div>
                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Title:</span>
                                    <p className="text-sm text-gray-800 dark:text-white/90">{complaint.title}</p>
                                </div>
                            )}
                            <div>
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Description:</span>
                                <p className="mt-1 text-sm text-gray-800 dark:text-white/90 whitespace-pre-wrap">
                                    {complaint.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Timestamps */}
                    <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                        <div>
                            <span className="font-medium text-gray-500 dark:text-gray-400">Created:</span>
                            <p className="text-gray-800 dark:text-white/90">{formatDate(complaint.createdAt)}</p>
                        </div>
                        <div>
                            <span className="font-medium text-gray-500 dark:text-gray-400">Last Updated:</span>
                            <p className="text-gray-800 dark:text-white/90">{formatDate(complaint.updatedAt)}</p>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="sticky bottom-0 flex items-center justify-between gap-3 p-6 border-t border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800">
                    {!showDeleteConfirm ? (
                        <>
                            <button
                                onClick={() => setShowDeleteConfirm(true)}
                                className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            >
                                Delete Complaint
                            </button>
                            <div className="flex gap-3">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
                                        >
                                            Cancel Edit
                                        </button>
                                        <button
                                            onClick={handleUpdate}
                                            disabled={isLoading}
                                            className="px-4 py-2.5 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? 'Saving...' : 'Save Changes'}
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-4 py-2.5 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700"
                                    >
                                        Edit Complaint
                                    </button>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="text-sm font-medium text-red-600 dark:text-red-400">
                                Are you sure you want to delete this complaint?
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={isLoading}
                                    className="px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? 'Deleting...' : 'Yes, Delete'}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
