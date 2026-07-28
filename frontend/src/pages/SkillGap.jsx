import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
const API_URL = import.meta.env.VITE_API_URL || "https://resume-analyzer-w806.onrender.com";

const PRIORITY_COLOR = { High: "#f87171", Medium: "#fb923c", Low: "#facc15" };
const PRIORITY_BG    = { High: "#f8717122", Medium: "#fb923c22", Low: "#facc1522" };

export default function SkillGap() {
  const [resumeFile, setResumeFile]     = useState(null);
  const [jobDesc, setJobDesc]           = useState("");
  const [loading, setLoading]           = useState(false);
  const [result, setResult]             = useState(null);
  const [error, setError]               = useState("");
  const [expandedSkill, setExpandedSkill] = useState(null);
  const fileRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
      setError("");
    } else {
      setError("Please upload a PDF file.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
      setError("");
    } else {
      setError("Please drop a PDF file.");
    }
  };

  const handleAnalyse = async () => {
    if (!resumeFile) { setError("Please upload your resume PDF."); return; }
    if (!jobDesc.trim()) { setError("Please paste the job description."); return; }

    setLoading(true);
    setError("");
    setResult(null);
    setExpandedSkill(null);

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("jobDescription", jobDesc);

      const res = await fetch(`${API_URL}/skill-gap`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Analysis failed.");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setResumeFile(null);
    setJobDesc("");
    setError("");
    setExpandedSkill(null);
  };

  const scoreColor = (s) => s >= 75 ? "#10b981" : s >= 50 ? "#f59e0b" : "#f87171";

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />

        <div className="dashboard-content" style={{ flex: 1, overflowY: "auto", padding: "28px 32px", minHeight: "calc(100vh - 64px)" }}>

          {/* ── HEADER ── */}
          <div style={{ marginBottom: "28px" }}>
            <h1 style={{ color: "inherit", fontSize: "26px", fontWeight: 800, margin: 0 }}>📈 Skill Gap Analysis</h1>
            <p style={{ color: "#6b7280", marginTop: "6px", fontSize: "14px" }}>
              Upload your resume &amp; paste a job description — AI will tell you exactly which skills you need to learn.
            </p>
          </div>

          {/* ── INPUT FORM ── */}
          {!result && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", maxWidth: "960px" }}>

              {/* Resume Upload */}
              <div>
                <label style={{ color: "inherit", opacity: 0.8, fontSize: "13px", fontWeight: 600, display: "block", marginBottom: "8px" }}>
                  📄 Upload Resume (PDF)
                </label>
                <div
                  onClick={() => fileRef.current.click()}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="upload-box-container"
                  style={{
                    border: `2px dashed ${resumeFile ? "#10b981" : "rgba(255,255,255,0.15)"}`,
                    borderRadius: "14px",
                    padding: "36px 20px",
                    textAlign: "center",
                    cursor: "pointer",
                    background: resumeFile ? "rgba(16,185,129,0.07)" : undefined,
                    transition: "all 0.2s ease",
                    minHeight: "160px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <input ref={fileRef} type="file" accept=".pdf" onChange={handleFileChange} style={{ display: "none" }} />
                  {resumeFile ? (
                    <>
                      <span style={{ fontSize: "36px" }}>✅</span>
                      <span style={{ color: "#10b981", fontWeight: 700, fontSize: "14px" }}>{resumeFile.name}</span>
                      <span style={{ color: "#6b7280", fontSize: "12px" }}>Click to change file</span>
                    </>
                  ) : (
                    <>
                      <span style={{ fontSize: "36px" }}>📄</span>
                      <span style={{ color: "inherit", fontWeight: 600, fontSize: "14px" }}>Drop your resume PDF here</span>
                      <span style={{ color: "#6b7280", fontSize: "12px" }}>or click to browse</span>
                    </>
                  )}
                </div>
              </div>

              {/* Job Description */}
              <div>
                <label style={{ color: "inherit", opacity: 0.8, fontSize: "13px", fontWeight: 600, display: "block", marginBottom: "8px" }}>
                  💼 Paste Job Description
                </label>
                <textarea
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  placeholder="Paste the full job description here — include role, responsibilities, and required skills..."
                  className="skillgap-textarea"
                  style={{
                    width: "100%",
                    height: "192px",
                    border: `1.5px solid ${jobDesc ? "rgba(99,102,241,0.6)" : "rgba(255,255,255,0.1)"}`,
                    borderRadius: "14px",
                    padding: "16px",
                    fontSize: "13px",
                    lineHeight: 1.6,
                    resize: "none",
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                    transition: "border-color 0.2s",
                  }}
                />
              </div>

              {/* Error */}
              {error && (
                <div style={{ gridColumn: "1 / -1", background: "#f8717122", border: "1px solid #f87171", borderRadius: "10px", padding: "12px 16px", color: "#f87171", fontSize: "13px" }}>
                  ⚠️ {error}
                </div>
              )}

              {/* Analyse Button */}
              <div style={{ gridColumn: "1 / -1" }}>
                <button
                  onClick={handleAnalyse}
                  disabled={loading}
                  style={{
                    background: loading ? "rgba(99,102,241,0.4)" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    padding: "14px 36px",
                    fontWeight: 700,
                    fontSize: "15px",
                    cursor: loading ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    transition: "all 0.2s ease",
                  }}
                >
                  {loading ? (
                    <>
                      <span style={{ display: "inline-block", width: "16px", height: "16px", border: "2px solid white", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                      Analysing with AI…
                    </>
                  ) : (
                    <> 🔍 Analyse My Skill Gap </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ── RESULTS ── */}
          {result && (
            <div style={{ maxWidth: "960px" }}>

              {/* Top bar */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <h2 style={{ color: "white", margin: 0, fontSize: "20px", fontWeight: 800 }}>
                    Results: <span style={{ color: "#6366f1" }}>{result.jobTitle}</span>
                  </h2>
                  <p style={{ color: "#6b7280", margin: "4px 0 0", fontSize: "13px" }}>{result.summary}</p>
                </div>
                <button onClick={reset} style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "white", borderRadius: "8px", padding: "8px 16px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
                  ← New Analysis
                </button>
              </div>

              {/* Score card + Top Recommendation */}
              <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "16px", marginBottom: "24px" }}>
                {/* Score circle */}
                <div style={{ background: "rgba(255,255,255,0.04)", border: `2px solid ${scoreColor(result.matchScore)}44`, borderRadius: "16px", padding: "24px 16px", textAlign: "center" }}>
                  <div style={{ fontSize: "42px", fontWeight: 900, color: scoreColor(result.matchScore), lineHeight: 1 }}>{result.matchScore}%</div>
                  <div style={{ color: "#9ca3af", fontSize: "12px", marginTop: "6px", fontWeight: 600 }}>Match Score</div>
                  {/* Bar */}
                  <div style={{ marginTop: "12px", background: "rgba(255,255,255,0.1)", borderRadius: "99px", height: "6px", overflow: "hidden" }}>
                    <div style={{ width: `${result.matchScore}%`, height: "100%", background: scoreColor(result.matchScore), borderRadius: "99px", transition: "width 1s ease" }} />
                  </div>
                </div>

                {/* Top recommendation */}
                <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))", border: "1px solid rgba(99,102,241,0.4)", borderRadius: "16px", padding: "20px 24px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ color: "#a5b4fc", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>🎯 Top Recommendation — Learn This First</div>
                  <div style={{ color: "white", fontSize: "18px", fontWeight: 800 }}>{result.topRecommendation}</div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

                {/* SKILLS YOU HAVE */}
                <div>
                  <h3 style={{ color: "#10b981", margin: "0 0 14px", fontSize: "15px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
                    ✅ Skills You Have
                    <span style={{ background: "#10b98122", color: "#10b981", fontSize: "11px", padding: "2px 8px", borderRadius: "99px", fontWeight: 700 }}>{result.presentSkills?.length}</span>
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {result.presentSkills?.map((s, i) => (
                      <div key={i} style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "10px", padding: "12px 14px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                          <span style={{ color: "white", fontWeight: 700, fontSize: "13px" }}>{s.skill}</span>
                          <span style={{ background: "#10b98133", color: "#10b981", fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "99px" }}>{s.level}</span>
                        </div>
                        <div style={{ color: "#6b7280", fontSize: "12px", lineHeight: 1.4 }}>{s.evidence}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SKILLS TO LEARN */}
                <div>
                  <h3 style={{ color: "#f87171", margin: "0 0 14px", fontSize: "15px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
                    📚 Skills to Learn
                    <span style={{ background: "#f8717122", color: "#f87171", fontSize: "11px", padding: "2px 8px", borderRadius: "99px", fontWeight: 700 }}>{result.missingSkills?.length}</span>
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {result.missingSkills?.map((s, i) => {
                      const isOpen = expandedSkill === i;
                      return (
                        <div
                          key={i}
                          style={{
                            background: isOpen ? PRIORITY_BG[s.priority] : "rgba(255,255,255,0.04)",
                            border: `1px solid ${isOpen ? PRIORITY_COLOR[s.priority] + "66" : "rgba(255,255,255,0.1)"}`,
                            borderRadius: "10px",
                            overflow: "hidden",
                            transition: "all 0.2s ease",
                          }}
                        >
                          {/* Header row */}
                          <button
                            onClick={() => setExpandedSkill(isOpen ? null : i)}
                            style={{ width: "100%", background: "transparent", border: "none", padding: "12px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", textAlign: "left" }}
                          >
                            <span style={{ background: PRIORITY_BG[s.priority], color: PRIORITY_COLOR[s.priority], fontSize: "10px", fontWeight: 800, padding: "2px 8px", borderRadius: "99px", flexShrink: 0, textTransform: "uppercase" }}>
                              {s.priority}
                            </span>
                            <span style={{ color: "white", fontWeight: 700, fontSize: "13px", flex: 1 }}>{s.skill}</span>
                            <span style={{ color: "#6b7280", fontSize: "16px", fontWeight: 700 }}>{isOpen ? "−" : "+"}</span>
                          </button>

                          {/* Expanded content */}
                          {isOpen && (
                            <div style={{ padding: "0 14px 14px", borderTop: `1px solid ${PRIORITY_COLOR[s.priority]}33` }}>
                              <p style={{ color: "#9ca3af", fontSize: "12px", margin: "10px 0 12px", lineHeight: 1.5 }}>
                                <strong style={{ color: "#d1d5db" }}>Why needed:</strong> {s.why}
                              </p>
                              <div style={{ color: "#a5b4fc", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", marginBottom: "8px", letterSpacing: "0.05em" }}>
                                📖 How to Learn:
                              </div>
                              {s.howToLearn?.map((tip, j) => (
                                <div key={j} style={{ display: "flex", gap: "8px", marginBottom: "6px" }}>
                                  <span style={{ background: "#6366f1", color: "white", borderRadius: "50%", width: "18px", height: "18px", fontSize: "10px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>{j + 1}</span>
                                  <span style={{ color: "#d1d5db", fontSize: "12px", lineHeight: 1.5 }}>{tip}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* CTA */}
              <div style={{ marginTop: "28px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "14px", padding: "18px 24px", display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "28px" }}>🗺️</span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "white", fontWeight: 700, fontSize: "14px" }}>Want the full learning roadmap?</div>
                  <div style={{ color: "#6b7280", fontSize: "13px", marginTop: "3px" }}>Visit the Career Roadmap section to see a step-by-step guide for your target role.</div>
                </div>
                <button
                  onClick={() => window.location.href = "/roadmap"}
                  style={{ background: "#6366f1", color: "white", border: "none", borderRadius: "8px", padding: "10px 18px", fontWeight: 700, fontSize: "13px", cursor: "pointer", whiteSpace: "nowrap" }}
                >
                  Go to Career Roadmap →
                </button>
              </div>

            </div>
          )}

        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}