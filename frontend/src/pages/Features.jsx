import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import {
  FaFileAlt,
  FaMicrophone,
  FaFileSignature,
  FaLinkedin,
  FaRoad,
  FaChartLine,
  FaRobot,
  FaArrowRight
} from "react-icons/fa";

const featuresData = [
  {
    title: "AI Resume Analyzer",
    description: "Upload your resume alongside any job description to calculate an instant ATS compatibility score. Get feedback on key strengths, critical weaknesses, missing technical skills, and tailored suggestions.",
    icon: <FaFileAlt />,
    path: "/resume",
    color: "#3b82f6",
  },
  {
    title: "AI Mock Interview Room",
    description: "Generate customized technical and behavioral interview questions based on your target role and difficulty. Answer them and receive professional feedback and score evaluations from Gemini.",
    icon: <FaMicrophone />,
    path: "/mock-interview",
    color: "#10b981",
  },
  {
    title: "Interactive Resume Builder",
    description: "Construct modern, high-converting, recruiter-ready resumes in a step-by-step builder designed to meet ATS compliance guidelines automatically.",
    icon: <FaFileSignature />,
    path: "/resume-builder",
    color: "#f59e0b",
  },
  {
    title: "LinkedIn Profile Optimizer",
    description: "Audit your LinkedIn presence and learn how to optimize your headlines, summaries, and experience sections to rank higher in recruiter search results.",
    icon: <FaLinkedin />,
    path: "/linkedin",
    color: "#0a66c2",
  },
  {
    title: "Dynamic Career Roadmap",
    description: "Map out your path to success. Generate structured, step-by-step career timelines complete with targeted skills, learning milestones, and recommended project ideas.",
    icon: <FaRoad />,
    path: "/roadmap",
    color: "#8b5cf6",
  },
  {
    title: "Skill Gap Analysis",
    description: "Analyze your current skill inventory against your desired job description. Pinpoint exactly what tools or frameworks you are missing and receive learning resources.",
    icon: <FaChartLine />,
    path: "/skill-gap",
    color: "#ec4899",
  },
  {
    title: "AI Career Chat (Real-time)",
    description: "Have a real-time, context-aware conversation with your AI Career Copilot. Ask for interview advice, resume critiques, or salary negotiation tips.",
    icon: <FaRobot />,
    path: "/chat",
    color: "#06b6d4",
  }
];

export default function Features() {
  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar />

        <div className="dashboard-content" style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          
          <div className="dashboard-header">
            <h1 style={{ fontSize: "32px", fontWeight: 800, color: "white", marginBottom: "8px" }}>Platform Features</h1>
            <p style={{ color: "#94a3b8", fontSize: "16px" }}>Explore the state-of-the-art AI modules built to elevate your career journey.</p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
            marginTop: "10px"
          }}>
            {featuresData.map((feature, idx) => (
              <div 
                key={idx}
                className="glass-card" 
                style={{
                  margin: 0,
                  width: "auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "28px",
                  borderRadius: "20px",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  background: `linear-gradient(135deg, rgba(255, 255, 255, 0.01) 0%, ${feature.color}05 100%)`,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                  cursor: "pointer"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = `0 12px 24px rgba(0, 0, 0, 0.35), 0 0 15px ${feature.color}25`;
                  e.currentTarget.style.borderColor = `${feature.color}40`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                }}
              >
                <div>
                  <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: `rgba(${parseInt(feature.color.slice(1,3), 16) || 99}, ${parseInt(feature.color.slice(3,5), 16) || 102}, ${parseInt(feature.color.slice(5,7), 16) || 241}, 0.15)`,
                    color: feature.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                    marginBottom: "20px"
                  }}>
                    {feature.icon}
                  </div>
                  <h3 style={{ color: "white", fontSize: "20px", fontWeight: 700, marginBottom: "12px" }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.6, marginBottom: "20px" }}>
                    {feature.description}
                  </p>
                </div>

                <Link 
                  to={feature.path}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    color: feature.color,
                    fontWeight: 600,
                    fontSize: "14px",
                    textDecoration: "none",
                    marginTop: "auto"
                  }}
                >
                  Launch Module <FaArrowRight style={{ fontSize: "12px" }} />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
