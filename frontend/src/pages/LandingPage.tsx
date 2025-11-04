import { Link } from "react-router";
import PageMeta from "../components/common/PageMeta";

export default function LandingPage() {
    return (
        <>
            <PageMeta
                title="Rail Madad - AI-Powered Railway Complaint Management System"
                description="Transforming railway passenger complaint management with AI-powered automation, intelligent routing, and predictive maintenance"
            />

            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
                {/* Hero Section */}
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center">
                        <div className="flex justify-center mb-8">
                            <img src="/logo.png" alt="Rail Madad Logo" className="h-24 w-24" />
                        </div>

                        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            Rail Madad AI
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                            Revolutionizing railway passenger complaint management with AI-powered automation,
                            intelligent categorization, and real-time resolution tracking
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/complaints"
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
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
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    />
                                </svg>
                                File a Complaint
                            </Link>
                            <Link
                                to="/admin/dashboard"
                                className="px-8 py-4 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                Admin Dashboard
                            </Link>
                            <a
                                href="#features"
                                className="px-8 py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div id="features" className="container mx-auto px-4 py-16">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                        Key Features
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Automated Categorization
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                AI-powered image, video, and text analysis to automatically classify complaints with high accuracy
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Smart Routing
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Intelligent routing algorithms to assign complaints to the most appropriate department or official
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Real-time Analytics
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Comprehensive analytics dashboard with complaint trends, resolution metrics, and performance insights
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Priority Detection
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Automatically detect and prioritize urgent complaints to ensure passenger safety and service quality
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Predictive Maintenance
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Analyze complaint trends to predict recurring issues and enable proactive maintenance planning
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                WhatsApp Integration
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Submit complaints via WhatsApp for easy access and improved user experience with automated workflows
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-blue-600 dark:bg-blue-800 py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div>
                                <div className="text-4xl font-bold text-white mb-2">8,942</div>
                                <div className="text-blue-100">Total Complaints Processed</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-white mb-2">75.5%</div>
                                <div className="text-blue-100">Average Resolution Rate</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-white mb-2">24hrs</div>
                                <div className="text-blue-100">Average Response Time</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="container mx-auto px-4 py-16 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Ready to Transform Railway Complaint Management?
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                        Experience the power of AI-driven complaint resolution
                    </p>
                    <Link
                        to="/admin/dashboard"
                        className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Footer */}
                <div className="bg-gray-100 dark:bg-gray-900 py-8">
                    <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
                        <p>© 2025 Rail Madad AI. Enhancing railway passenger experience through intelligent automation.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
