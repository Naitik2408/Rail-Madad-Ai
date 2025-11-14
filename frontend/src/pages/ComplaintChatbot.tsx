import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import api from "../services/api";
import { getJourneyDetails } from "../services/mockTrainData";

type Message = {
    id: string;
    type: "bot" | "user";
    content: string;
    timestamp: Date;
    options?: string[];
};

type ComplaintData = {
    category?: string;
    subCategory?: string;
    trainNumber?: string;
    trainName?: string;
    pnr?: string;
    coach?: string;
    station?: string;
    journeyDate?: string;
    description?: string;
    name?: string;
    mobile?: string;
    email?: string;
};

// Map display categories to backend categories
const categoryMap: { [key: string]: string } = {
    "Coach Cleanliness": "cleanliness",
    "Punctuality": "other",
    "Water Availability": "facilities",
    "Staff Behavior": "staff_behavior",
    "Electrical Equipment": "maintenance",
    "Security": "security",
    "Catering & Vending": "food_quality",
    "Other": "other",
};

export default function ComplaintChatbot() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            type: "bot",
            content: "Welcome to Rail Madad! 🚂 I'm here to help you file a complaint. Let's get started.",
            timestamp: new Date(),
        },
        {
            id: "2",
            type: "bot",
            content: "What type of complaint would you like to file?",
            timestamp: new Date(),
            options: [
                "Coach Cleanliness",
                "Punctuality",
                "Water Availability",
                "Staff Behavior",
                "Electrical Equipment",
                "Security",
                "Catering & Vending",
                "Other",
            ],
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [complaintData, setComplaintData] = useState<ComplaintData>({});
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const addMessage = (content: string, type: "bot" | "user", options?: string[]) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            type,
            content,
            timestamp: new Date(),
            options,
        };
        setMessages((prev) => [...prev, newMessage]);
    };

    const handleComplaintSubmission = async () => {
        setIsTyping(true);
        addMessage("⏳ Submitting your complaint...", "bot");

        try {
            // Prepare complaint data for backend
            const backendCategory = categoryMap[complaintData.category || "Other"];

            const submissionData = {
                name: complaintData.name!,
                email: complaintData.email || complaintData.mobile + "@temp.railmadad.in", // Email is required by backend
                phoneNumber: complaintData.mobile,
                category: backendCategory,
                description: complaintData.description!,
                trainNumber: complaintData.trainNumber,
                trainName: complaintData.trainName,
                coach: complaintData.coach,
                station: complaintData.station,
                journeyDate: complaintData.journeyDate,
                pnr: complaintData.pnr,
            };

            // Submit to backend
            const response = await api.complaints.submit(submissionData);

            setIsTyping(false);

            if (response.success && response.data) {
                addMessage(
                    `✅ Your complaint has been successfully registered!\n\n` +
                    `**Complaint ID:** ${response.data.complaintId}\n` +
                    `**Status:** ${response.data.status}\n` +
                    `**Category:** ${complaintData.category}\n\n` +
                    `You can track your complaint using this ID. You will receive updates via SMS${complaintData.email ? ' and email' : ''}.\n\n` +
                    `Thank you for using Rail Madad! 🙏`,
                    "bot",
                    ["File Another Complaint", "Go to Home"]
                );
                setCurrentStep(9);
            }
        } catch (error: any) {
            setIsTyping(false);
            addMessage(
                `❌ Sorry, there was an error submitting your complaint: ${error.message}\n\n` +
                `Please try again or contact support.`,
                "bot",
                ["Try Again", "Go to Home"]
            );
            setCurrentStep(10);
        }
    };

    const handleBotResponse = (userResponse: string, step: number) => {
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);

            switch (step) {
                case 0: // Category selected
                    setComplaintData((prev) => ({ ...prev, category: userResponse }));
                    addMessage(
                        "Please provide more details about your complaint. What specific issue did you face?",
                        "bot"
                    );
                    setCurrentStep(1);
                    break;

                case 1: // Description provided
                    setComplaintData((prev) => ({ ...prev, description: userResponse }));
                    addMessage(
                        "Thank you for the details. Do you have a Train Number or PNR to help us locate your complaint better?",
                        "bot",
                        ["I have Train Number", "I have PNR", "Skip this step"]
                    );
                    setCurrentStep(2);
                    break;

                case 2: // Train/PNR choice
                    if (userResponse === "I have Train Number") {
                        addMessage("Please enter your Train Number (e.g., 12345)", "bot");
                        setCurrentStep(3);
                    } else if (userResponse === "I have PNR") {
                        addMessage("Please enter your PNR Number (e.g., 1234567890)", "bot");
                        setCurrentStep(4);
                    } else {
                        addMessage(
                            "No problem! Now, please provide your contact details. What is your full name?",
                            "bot"
                        );
                        setCurrentStep(5);
                    }
                    break;

                case 3: // Train number
                    {
                        const journeyDetails = getJourneyDetails(userResponse);
                        if (journeyDetails) {
                            setComplaintData((prev) => ({
                                ...prev,
                                trainNumber: journeyDetails.trainNumber,
                                trainName: journeyDetails.trainName,
                                coach: journeyDetails.coach,
                                station: journeyDetails.station,
                                journeyDate: journeyDetails.journeyDate
                            }));
                            addMessage(
                                `✅ Found train details!\n\n` +
                                `🚂 Train: ${journeyDetails.trainNumber} - ${journeyDetails.trainName}\n` +
                                `🎫 Coach: ${journeyDetails.coach}\n` +
                                `🚉 Station: ${journeyDetails.station}\n` +
                                `📅 Journey Date: ${new Date(journeyDetails.journeyDate).toLocaleDateString('en-IN')}\n\n` +
                                `Now, please provide your contact details. What is your full name?`,
                                "bot"
                            );
                        } else {
                            setComplaintData((prev) => ({ ...prev, trainNumber: userResponse }));
                            addMessage(
                                `Train number ${userResponse} noted. Now, please provide your contact details. What is your full name?`,
                                "bot"
                            );
                        }
                        setCurrentStep(5);
                    }
                    break;

                case 4: // PNR
                    {
                        const journeyDetails = getJourneyDetails(undefined, userResponse);
                        if (journeyDetails) {
                            setComplaintData((prev) => ({
                                ...prev,
                                pnr: userResponse,
                                trainNumber: journeyDetails.trainNumber,
                                trainName: journeyDetails.trainName,
                                coach: journeyDetails.coach,
                                station: journeyDetails.station,
                                journeyDate: journeyDetails.journeyDate
                            }));
                            addMessage(
                                `✅ PNR verified! Found journey details:\n\n` +
                                `🚂 Train: ${journeyDetails.trainNumber} - ${journeyDetails.trainName}\n` +
                                `🎫 Coach: ${journeyDetails.coach}\n` +
                                `🚉 Station: ${journeyDetails.station}\n` +
                                `📅 Journey Date: ${new Date(journeyDetails.journeyDate).toLocaleDateString('en-IN')}\n\n` +
                                `Perfect! Now, please provide your contact details. What is your full name?`,
                                "bot"
                            );
                        } else {
                            setComplaintData((prev) => ({ ...prev, pnr: userResponse }));
                            addMessage(
                                `PNR ${userResponse} noted. Now, please provide your contact details. What is your full name?`,
                                "bot"
                            );
                        }
                        setCurrentStep(5);
                    }
                    break;

                case 5: // Name
                    setComplaintData((prev) => ({ ...prev, name: userResponse }));
                    addMessage("Thank you! What is your mobile number?", "bot");
                    setCurrentStep(6);
                    break;

                case 6: // Mobile
                    setComplaintData((prev) => ({ ...prev, mobile: userResponse }));
                    addMessage("And your email address? (Optional - you can type 'skip')", "bot");
                    setCurrentStep(7);
                    break;

                case 7: // Email
                    const finalEmail = userResponse.toLowerCase() !== "skip" ? userResponse : undefined;
                    if (finalEmail) {
                        setComplaintData((prev) => ({ ...prev, email: finalEmail }));
                    }
                    addMessage(
                        "Perfect! Let me summarize your complaint:",
                        "bot"
                    );
                    setTimeout(() => {
                        const summary = `
📋 **Complaint Summary**

**Journey Details:**
${complaintData.trainNumber ? `🚂 Train: ${complaintData.trainNumber}${complaintData.trainName ? ' - ' + complaintData.trainName : ''}` : ""}
${complaintData.coach ? `🎫 Coach: ${complaintData.coach}` : ""}
${complaintData.station ? `🚉 Station: ${complaintData.station}` : ""}
${complaintData.journeyDate ? `📅 Date: ${new Date(complaintData.journeyDate).toLocaleDateString('en-IN')}` : ""}
${complaintData.pnr ? `🎟️ PNR: ${complaintData.pnr}` : ""}

**Complaint:**
• Category: ${complaintData.category}
• Description: ${complaintData.description}

**Contact:**
• Name: ${complaintData.name}
• Mobile: ${complaintData.mobile}
${finalEmail ? `• Email: ${finalEmail}` : ""}

Would you like to submit this complaint?
                        `.trim();
                        addMessage(summary, "bot", ["Yes, Submit", "Cancel"]);
                        setCurrentStep(8);
                    }, 1000);
                    break;

                case 8: // Confirm submission
                    if (userResponse === "Yes, Submit") {
                        // Submit complaint to backend
                        handleComplaintSubmission();
                    } else {
                        addMessage(
                            "Complaint cancelled. Would you like to start over?",
                            "bot",
                            ["Start Over", "Go to Home"]
                        );
                        setCurrentStep(10);
                    }
                    break;

                case 9: // After submission
                    if (userResponse === "File Another Complaint") {
                        setComplaintData({});
                        setCurrentStep(0);
                        setMessages([
                            {
                                id: Date.now().toString(),
                                type: "bot",
                                content: "Let's file a new complaint. What type of complaint would you like to file?",
                                timestamp: new Date(),
                                options: [
                                    "Coach Cleanliness",
                                    "Punctuality",
                                    "Water Availability",
                                    "Staff Behavior",
                                    "Electrical Equipment",
                                    "Security",
                                    "Catering & Vending",
                                    "Other",
                                ],
                            },
                        ]);
                    }
                    break;

                case 10: // Cancel flow or retry after error
                    if (userResponse === "Start Over" || userResponse === "Try Again") {
                        if (userResponse === "Try Again") {
                            // Retry submission with existing data
                            handleComplaintSubmission();
                        } else {
                            // Start fresh
                            setComplaintData({});
                            setCurrentStep(0);
                            setMessages([
                                {
                                    id: Date.now().toString(),
                                    type: "bot",
                                    content: "Let's start fresh. What type of complaint would you like to file?",
                                    timestamp: new Date(),
                                    options: [
                                        "Coach Cleanliness",
                                        "Punctuality",
                                        "Water Availability",
                                        "Staff Behavior",
                                        "Electrical Equipment",
                                        "Security",
                                        "Catering & Vending",
                                        "Other",
                                    ],
                                },
                            ]);
                        }
                    }
                    break;

                default:
                    break;
            }
        }, 800);
    };

    const handleSendMessage = (text?: string) => {
        const messageText = text || inputValue.trim();
        if (!messageText) return;

        addMessage(messageText, "user");
        setInputValue("");
        handleBotResponse(messageText, currentStep);
    };

    const handleOptionClick = (option: string) => {
        handleSendMessage(option);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl">
                                <svg
                                    className="w-6 h-6 text-white"
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
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                                    Rail Madad
                                </h1>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    AI-Powered Complaint Assistant
                                </p>
                            </div>
                        </Link>
                        <Link
                            to="/"
                            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </header>

            {/* Chat Container */}
            <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col h-[calc(100vh-140px)] sm:h-[600px]">
                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`max-w-[85%] sm:max-w-[75%] ${message.type === "user"
                                        ? "bg-blue-600 text-white rounded-2xl rounded-tr-md"
                                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl rounded-tl-md"
                                        } px-4 py-3 shadow-sm`}
                                >
                                    <p className="text-sm sm:text-base whitespace-pre-line break-words">
                                        {message.content}
                                    </p>
                                    {message.options && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                                            {message.options.map((option, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleOptionClick(option)}
                                                    className="px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-left"
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="border-t border-gray-200 dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-900/50">
                        <div className="flex gap-2 items-end">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message..."
                                className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base"
                            />
                            <button
                                onClick={() => handleSendMessage()}
                                disabled={!inputValue.trim()}
                                className="px-4 sm:px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors font-medium text-sm sm:text-base flex items-center gap-2"
                            >
                                <span className="hidden sm:inline">Send</span>
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
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                    />
                                </svg>
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                            Press Enter to send • Your data is secure and encrypted
                        </p>
                    </div>
                </div>

                {/* Help Section */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800 text-center">
                        <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto mb-2">
                            <svg
                                className="w-5 h-5 text-green-600 dark:text-green-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                            Quick & Easy Filing
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800 text-center">
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full mx-auto mb-2">
                            <svg
                                className="w-5 h-5 text-blue-600 dark:text-blue-400"
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
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                            AI-Powered Routing
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800 text-center">
                        <div className="flex items-center justify-center w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full mx-auto mb-2">
                            <svg
                                className="w-5 h-5 text-purple-600 dark:text-purple-400"
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
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                            24/7 Support
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
