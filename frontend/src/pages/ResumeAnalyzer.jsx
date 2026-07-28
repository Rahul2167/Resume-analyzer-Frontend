import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Pages.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { checkUserPremium } from "../utils/premiumUtils";
const API_URL = import.meta.env.VITE_API_URL || "https://resume-analyzer-w806.onrender.com";

export default function ResumeAnalyzer() {
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
const [result, setResult] = useState(null);
const [strengths, setStrengths] = useState([]);
const [weaknesses, setWeaknesses] = useState([]);
const [suggestions, setSuggestions] = useState([]);
const [missingSkills, setMissingSkills] = useState([]);
const [jobMatchScore, setJobMatchScore] = useState(null);

  const [scansLeft, setScansLeft] = useState(() => {
    const isPrem = checkUserPremium();
    if (isPrem) return 999;
    const left = localStorage.getItem("resumeScansLeft");
    if (left === null) {
      localStorage.setItem("resumeScansLeft", "5");
      return 5;
    }
    return parseInt(left, 10);
  });

const handleAnalyze = async () => {
  if (!resume) {
    alert("Please upload a resume.");
    return;
  }

  const isPrem = checkUserPremium();
  if (!isPrem) {
    const left = parseInt(localStorage.getItem("resumeScansLeft") || "5", 10);
    if (left <= 0) {
      alert("🔒 You have used all your free resume scans! Upgrade to Premium Pro at a 100% discounted price (₹0) to unlock unlimited scans.");
      navigate("/pricing");
      return;
    }
  }

  try {
    setLoading(true);

    const formData = new FormData();

    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);

    const response = await fetch(
      `${API_URL}/analyze`,
      {
        method: "POST",
        body: formData,
      }
    );
    console.log("Status:", response.status);

const data = await response.json();

    console.log(data);

   setResult(data);

setJobMatchScore(data.jobMatchScore);
setStrengths(data.strengths || []);
setWeaknesses(data.weaknesses || []);
setSuggestions(data.suggestions || []);
setMissingSkills(data.missingSkills || []);

    // Decrement scans left
    if (!isPrem) {
      const newLeft = scansLeft - 1;
      localStorage.setItem("resumeScansLeft", newLeft.toString());
      setScansLeft(newLeft);
    }


  } catch (err) {
    console.error(err);
    alert("Analysis failed.");
  }

  setLoading(false);
};
  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar />

        <div className="page-content">

          <h1>📄 AI Resume Analyzer</h1>
          {!checkUserPremium() && (
            <div style={{
              background: "rgba(99, 102, 241, 0.1)",
              border: "1px solid rgba(99, 102, 241, 0.25)",
              borderRadius: "10px",
              padding: "8px 16px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: "#818cf8",
              marginTop: "8px",
              marginBottom: "12px"
            }}>
              📊 <strong>{scansLeft} Free Scans Remaining</strong> (Upgrade to Pro for Unlimited)
            </div>
          )}
          <p>
            Upload your resume and compare it with a job description using AI.
          </p>

          <div className="glass-card">

            <label>Upload Resume (PDF)</label>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setResume(e.target.files[0])}
            />

            <label>Job Description</label>

            <textarea
              rows="8"
              placeholder="Paste the complete job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />

            <button
  className="primary-btn"
  onClick={handleAnalyze}
>
  {loading ? "Analyzing..." : "Analyze Resume"}
</button>
{result && (
  <>
    <div className="glass-card" style={{ marginTop: "20px" }}>
      <h2>📊 Analysis Result</h2>

      <h3>🎯 ATS Score: {result.atsScore}</h3>

      <h3>💼 Job Match: {jobMatchScore}%</h3>
    </div>

    <div className="glass-card" style={{ marginTop: "20px" }}>
      <h2>💪 Strengths</h2>

      <ul>
        {strengths.map((item, index) => (
          <li key={index}>✅ {item}</li>
        ))}
      </ul>
    </div>

    <div className="glass-card" style={{ marginTop: "20px" }}>
      <h2>⚠️ Weaknesses</h2>

      <ul>
        {weaknesses.map((item, index) => (
          <li key={index}>❌ {item}</li>
        ))}
      </ul>
    </div>

    <div className="glass-card" style={{ marginTop: "20px" }}>
      <h2>🚀 Missing Skills</h2>

      <ul>
        {missingSkills.map((item, index) => (
          <li key={index}>📌 {item}</li>
        ))}
      </ul>
    </div>

    <div className="glass-card" style={{ marginTop: "20px" }}>
      <h2>💡 Suggestions</h2>

      <ul>
        {suggestions.map((item, index) => (
          <li key={index}>👉 {item}</li>
        ))}
      </ul>
    </div>
  </>
)}

          </div>

        </div>
      </div>
    </>
  );
}