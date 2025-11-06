import { Link } from "react-router";
import PageMeta from "../components/common/PageMeta";

export default function LandingPage() {
    return (
        <>
            <PageMeta
                title="Rail Madad - AI-Powered Railway Complaint Management System"
                description="Transforming railway passenger complaint management with AI-powered automation, intelligent routing, and predictive maintenance"
            />

            <div className="min-h-screen bg-white dark:bg-gray-900">
                {/* Navigation Bar */}
                <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 dark:bg-gray-900/90 dark:border-gray-800">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img src="/logo.png" alt="Rail Madad Logo" className="h-10 w-10" />
                                <span className="text-xl font-bold text-gray-900 dark:text-white">Rail Madad AI</span>
                            </div>
                            <div className="hidden md:flex items-center gap-6">
                                <a href="#features" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">Features</a>
                                <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">How It Works</a>
                                <a href="#benefits" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">Benefits</a>
                                <Link to="/complaints" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                    File Complaint
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section with Background */}
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 dark:from-blue-900 dark:via-blue-950 dark:to-gray-900">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>

                    {/* Animated Train Background */}
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
                            <defs>
                                <linearGradient id="trainGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#fff" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="#fff" stopOpacity="0.1" />
                                </linearGradient>
                            </defs>
                            <path d="M 100 250 L 1100 250 L 1050 300 L 50 300 Z" fill="url(#trainGradient)" />
                            <circle cx="200" cy="320" r="25" fill="#fff" opacity="0.4" />
                            <circle cx="300" cy="320" r="25" fill="#fff" opacity="0.4" />
                            <circle cx="900" cy="320" r="25" fill="#fff" opacity="0.4" />
                            <circle cx="1000" cy="320" r="25" fill="#fff" opacity="0.4" />
                        </svg>
                    </div>

                    <div className="relative container mx-auto px-4 py-20 sm:py-32">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6 border border-white/20">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span>Powered by Advanced AI & Machine Learning</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                                Transform Railway Complaint Management
                            </h1>

                            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                                AI-powered platform that automatically categorizes, routes, and resolves railway passenger complaints with unprecedented speed and accuracy
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                                <Link
                                    to="/complaints"
                                    className="group px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
                                >
                                    <svg
                                        className="w-5 h-5 group-hover:scale-110 transition-transform"
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
                                    <span>File a Complaint Now</span>
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                                <Link
                                    to="/admin/dashboard"
                                    className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl font-semibold hover:bg-white/10 transition-all backdrop-blur-sm"
                                >
                                    Admin Dashboard
                                </Link>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                    <div className="text-3xl sm:text-4xl font-bold text-white mb-1">94%</div>
                                    <div className="text-blue-100 text-sm">Auto-Routing Accuracy</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                    <div className="text-3xl sm:text-4xl font-bold text-white mb-1">8,942</div>
                                    <div className="text-blue-100 text-sm">Complaints Resolved</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                    <div className="text-3xl sm:text-4xl font-bold text-white mb-1">24hrs</div>
                                    <div className="text-blue-100 text-sm">Avg Response Time</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Wave Separator */}
                    <div className="absolute bottom-0 left-0 right-0">
                        <svg className="w-full h-16 sm:h-24" preserveAspectRatio="none" viewBox="0 0 1200 120" fill="none">
                            <path d="M0 0L50 10C100 20 200 40 300 45C400 50 500 40 600 35C700 30 800 30 900 35C1000 40 1100 50 1150 55L1200 60V120H1150C1100 120 1000 120 900 120C800 120 700 120 600 120C500 120 400 120 300 120C200 120 100 120 50 120H0V0Z" fill="currentColor" className="text-white dark:text-gray-900" />
                        </svg>
                    </div>
                </div>

                {/* Features Section */}
                <div id="features" className="container mx-auto px-4 py-20">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">
                            Powerful Features
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            Everything You Need for
                            <br />
                            Efficient Complaint Management
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Leverage cutting-edge AI technology to streamline your railway complaint resolution process
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                AI-Powered Categorization
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Advanced machine learning algorithms analyze text, images, and videos to automatically classify complaints with 95%+ accuracy, eliminating manual sorting
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500">
                            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                Intelligent Smart Routing
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Automatically route complaints to the right department or official based on category, location, severity, and historical patterns for faster resolution
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500">
                            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                Real-time Analytics Dashboard
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Comprehensive analytics with complaint trends, resolution metrics, department performance, and actionable insights for continuous improvement
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-yellow-500 dark:hover:border-yellow-500">
                            <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                Priority & Sentiment Detection
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                NLP-powered sentiment analysis to detect urgent complaints and passenger frustration levels, ensuring critical issues get immediate attention
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-red-500 dark:hover:border-red-500">
                            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                Predictive Maintenance
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Analyze complaint patterns to predict equipment failures and recurring issues, enabling proactive maintenance and reducing future complaints
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500">
                            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                Multi-Channel Integration
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Accept complaints via WhatsApp, web portal, mobile app, SMS, and email - all managed from a single unified dashboard with automated workflows
                            </p>
                        </div>
                    </div>
                </div>

                {/* How It Works Section */}
                <div id="how-it-works" className="relative bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 py-20 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(59 130 246 / 0.3) 1px, transparent 0)`,
                            backgroundSize: '32px 32px'
                        }}></div>
                    </div>

                    <div className="relative container mx-auto px-4">
                        <div className="text-center mb-16">
                            <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">
                                Simple Process
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                                How It Works
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                From complaint submission to resolution - automated every step of the way
                            </p>
                        </div>

                        <div className="max-w-5xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {/* Step 1 */}
                                <div className="relative">
                                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center border-2 border-transparent hover:border-blue-500 transition-all">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">
                                            1
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                            Submit Complaint
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Passengers file complaints via chatbot, WhatsApp, or web portal
                                        </p>
                                    </div>
                                    {/* Connector */}
                                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></div>
                                </div>

                                {/* Step 2 */}
                                <div className="relative">
                                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center border-2 border-transparent hover:border-green-500 transition-all">
                                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">
                                            2
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                            AI Analysis
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            AI categorizes, prioritizes, and analyzes sentiment instantly
                                        </p>
                                    </div>
                                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-green-500 to-transparent"></div>
                                </div>

                                {/* Step 3 */}
                                <div className="relative">
                                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center border-2 border-transparent hover:border-purple-500 transition-all">
                                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">
                                            3
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                            Smart Routing
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Automatically assigned to the right department or official
                                        </p>
                                    </div>
                                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"></div>
                                </div>

                                {/* Step 4 */}
                                <div className="relative">
                                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center border-2 border-transparent hover:border-orange-500 transition-all">
                                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">
                                            4
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                            Track & Resolve
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Real-time tracking with automated updates until resolution
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Benefits Section */}
                <div id="benefits" className="container mx-auto px-4 py-20">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Left Content */}
                            <div>
                                <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">
                                    Why Choose Us
                                </div>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                    Transform Passenger Experience
                                </h2>
                                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                                    Rail Madad AI revolutionizes how railway authorities handle passenger complaints, delivering faster resolutions and improved satisfaction.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                                85% Faster Resolution Time
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                Automated routing and prioritization dramatically reduce complaint resolution time
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                                95%+ Classification Accuracy
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                AI ensures complaints reach the right department on the first attempt
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                                60% Operational Cost Reduction
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                Automation reduces manual workload and administrative overhead significantly
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                                Improved Passenger Satisfaction
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                Faster resolutions and transparent tracking lead to happier passengers
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Visual */}
                            <div className="relative">
                                <div className="relative bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-8 shadow-2xl">
                                    {/* Decorative Elements */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

                                    {/* Stats Cards */}
                                    <div className="relative space-y-4">
                                        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Complaints</span>
                                                <span className="text-xs text-green-600 dark:text-green-400 font-semibold">↑ 12%</span>
                                            </div>
                                            <div className="text-3xl font-bold text-gray-900 dark:text-white">8,942</div>
                                            <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{ width: '75%' }}></div>
                                            </div>
                                        </div>

                                        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Resolution Rate</span>
                                                <span className="text-xs text-green-600 dark:text-green-400 font-semibold">↑ 8%</span>
                                            </div>
                                            <div className="text-3xl font-bold text-gray-900 dark:text-white">75.5%</div>
                                            <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full" style={{ width: '75.5%' }}></div>
                                            </div>
                                        </div>

                                        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Response Time</span>
                                                <span className="text-xs text-green-600 dark:text-green-400 font-semibold">↓ 40%</span>
                                            </div>
                                            <div className="text-3xl font-bold text-gray-900 dark:text-white">24hrs</div>
                                            <div className="mt-2 flex gap-1">
                                                <div className="flex-1 h-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
                                                <div className="flex-1 h-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
                                                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-blue-900 dark:via-blue-950 dark:to-gray-900 py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                            <div className="transform hover:scale-105 transition-transform">
                                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">8,942</div>
                                <div className="text-blue-100 text-sm sm:text-base">Complaints Processed</div>
                            </div>
                            <div className="transform hover:scale-105 transition-transform">
                                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">75.5%</div>
                                <div className="text-blue-100 text-sm sm:text-base">Average Resolution Rate</div>
                            </div>
                            <div className="transform hover:scale-105 transition-transform">
                                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">24hrs</div>
                                <div className="text-blue-100 text-sm sm:text-base">Average Response Time</div>
                            </div>
                            <div className="transform hover:scale-105 transition-transform">
                                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">94%</div>
                                <div className="text-blue-100 text-sm sm:text-base">Auto-Routing Accuracy</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 dark:from-gray-950 dark:via-blue-950 dark:to-gray-950 py-20 overflow-hidden">
                    {/* Animated Background */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/30 animate-pulse"></div>
                    </div>

                    <div className="relative container mx-auto px-4 text-center">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Transform Your Railway
                            <br className="hidden sm:block" />
                            Complaint Management?
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                            Join thousands of railway authorities already using AI to deliver exceptional passenger experiences
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/complaints"
                                className="group px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
                            >
                                <span>Start Filing Complaints</span>
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            <Link
                                to="/admin/dashboard"
                                className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl font-semibold hover:bg-white/10 transition-all"
                            >
                                View Admin Demo
                            </Link>
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-70">
                            <div className="flex items-center gap-2 text-white">
                                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm">Secure & Encrypted</span>
                            </div>
                            <div className="flex items-center gap-2 text-white">
                                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-sm">AI-Powered</span>
                            </div>
                            <div className="flex items-center gap-2 text-white">
                                <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm">24/7 Available</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-900 dark:bg-black py-12 border-t border-gray-800">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                            {/* Company Info */}
                            <div className="col-span-1 md:col-span-2">
                                <div className="flex items-center gap-3 mb-4">
                                    <img src="/logo.png" alt="Rail Madad Logo" className="h-10 w-10" />
                                    <span className="text-xl font-bold text-white">Rail Madad AI</span>
                                </div>
                                <p className="text-gray-400 mb-4 max-w-md">
                                    Revolutionizing railway passenger complaint management through artificial intelligence and machine learning, delivering faster resolutions and improved satisfaction.
                                </p>
                                <div className="flex gap-4">
                                    <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                                        <svg className="w-5 h-5 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-lg flex items-center justify-center transition-colors">
                                        <svg className="w-5 h-5 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors">
                                        <svg className="w-5 h-5 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                                <ul className="space-y-2">
                                    <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                                    <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
                                    <li><a href="#benefits" className="text-gray-400 hover:text-white transition-colors">Benefits</a></li>
                                    <li><Link to="/complaints" className="text-gray-400 hover:text-white transition-colors">File Complaint</Link></li>
                                </ul>
                            </div>

                            {/* Resources */}
                            <div>
                                <h3 className="text-white font-semibold mb-4">Resources</h3>
                                <ul className="space-y-2">
                                    <li><Link to="/admin/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Reference</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-gray-400 text-sm text-center md:text-left">
                                © 2025 Rail Madad AI. All rights reserved. Enhancing railway passenger experience through intelligent automation.
                            </p>
                            <div className="flex gap-6 text-sm">
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
