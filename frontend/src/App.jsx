import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import MockInterview from "./pages/MockInterview";
import LinkedInOptimizer from "./pages/LinkedInOptimizer";
import CareerRoadmap from "./pages/CareerRoadmap";
import SkillGap from "./pages/SkillGap";
import CoverLetter from "./pages/CoverLetter";
import Settings from "./pages/Settings";
import ResumeBuilder from "./pages/ResumeBuilder";
import AiChat from "./pages/AiChat";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import FloatingChat from "./components/FloatingChat";

import HeaderDisclaimer from "./components/HeaderDisclaimer";
import { BackendStatusProvider } from "./context/BackendStatusContext";

// Redirects to /login only when not logged in
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  return (
    <BackendStatusProvider>
      <BrowserRouter>
        <HeaderDisclaimer />
        <Routes>

          {/* ── PUBLIC — no login needed ── */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/chat" element={<AiChat />} />
          <Route path="/linkedin" element={<LinkedInOptimizer />} />
          <Route path="/roadmap" element={<CareerRoadmap />} />
          <Route path="/skill-gap" element={<SkillGap />} />
          <Route path="/cover-letter" element={<CoverLetter />} />

          {/* ── PROTECTED — login required when clicking these ── */}
          <Route path="/resume"          element={<ProtectedRoute><ResumeAnalyzer /></ProtectedRoute>} />
          <Route path="/mock-interview"  element={<ProtectedRoute><MockInterview /></ProtectedRoute>} />
          <Route path="/resume-builder"  element={<ProtectedRoute><ResumeBuilder /></ProtectedRoute>} />
          <Route path="/profile"         element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/admin"           element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/settings"        element={<ProtectedRoute><Settings /></ProtectedRoute>} />

          {/* ── Catch-all → Dashboard ── */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />

        </Routes>
        <FloatingChat />
      </BrowserRouter>
    </BackendStatusProvider>
  );
}

export default App;