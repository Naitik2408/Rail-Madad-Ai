import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import LandingPage from "./pages/LandingPage";
import AllComplaints from "./pages/AllComplaints";
import AIInsights from "./pages/AIInsights";
import DepartmentRouting from "./pages/DepartmentRouting";
import Analytics from "./pages/Analytics";
import PredictiveMaintenance from "./pages/PredictiveMaintenance";
import Settings from "./pages/Settings";
import ComplaintChatbot from "./pages/ComplaintChatbot";
import featureFlags from "./config/features";
import { useAuth } from "./context/AuthContext";

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Public Complaint Chatbot */}
          <Route path="/complaints" element={<ComplaintChatbot />} />

          {/* Admin Login */}
          <Route path="/login" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />

          {/* Admin Dashboard Layout - Protected */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            {/* Redirect /admin to /admin/dashboard */}
            <Route index element={<Navigate to="/admin/dashboard" replace />} />

            {/* ✅ Core MVP Features */}
            <Route path="dashboard" element={<Home />} />
            <Route path="complaints" element={<AllComplaints />} />
            <Route path="settings" element={<Settings />} />

            {/* 🔒 Advanced Features (v2.0+) - Controlled by feature flags */}
            {featureFlags.aiInsights && (
              <Route path="ai-insights" element={<AIInsights />} />
            )}
            {featureFlags.departmentRouting && (
              <Route path="department-routing" element={<DepartmentRouting />} />
            )}
            {featureFlags.analytics && (
              <Route path="analytics" element={<Analytics />} />
            )}

            {/* 🚀 Future Features (v3.0+) - Controlled by feature flags */}
            {featureFlags.predictiveMaintenance && (
              <Route path="predictive-maintenance" element={<PredictiveMaintenance />} />
            )}

            {/* Others Page */}
            <Route path="profile" element={<UserProfiles />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="blank" element={<Blank />} />

            {/* Forms */}
            <Route path="form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="alerts" element={<Alerts />} />
            <Route path="avatars" element={<Avatars />} />
            <Route path="badge" element={<Badges />} />
            <Route path="buttons" element={<Buttons />} />
            <Route path="images" element={<Images />} />
            <Route path="videos" element={<Videos />} />

            {/* Charts */}
            <Route path="line-chart" element={<LineChart />} />
            <Route path="bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
