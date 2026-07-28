import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { checkUserPremium } from "../utils/premiumUtils";
import "./Pages.css";
const API_URL = import.meta.env.VITE_API_URL || "https://resume-analyzer-w806.onrender.com";
import { 
  FaVolumeUp, 
  FaVolumeMute, 
  FaMicrophone, 
  FaMicrophoneSlash, 
  FaSpinner, 
  FaRegCheckCircle, 
  FaExclamationTriangle, 
  FaArrowLeft, 
  FaArrowRight, 
  FaRedoAlt,
  FaAward,
  FaBriefcase,
  FaSlidersH,
  FaReact,
  FaJs,
  FaNodeJs,
  FaJava,
  FaPython,
  FaDatabase,
  FaBrain,
  FaChartPie,
  FaHtml5
} from "react-icons/fa";

const RobotAvatar = ({ isSpeaking, checkingAnswer }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px" }}>
      <div className="robot-container" style={{ position: "relative", width: "120px", height: "120px" }}>
        {/* Pulse rings when speaking or thinking */}
        {(isSpeaking || checkingAnswer) && (
          <div style={{
            position: "absolute",
            top: "5px",
            left: "5px",
            width: "110px",
            height: "110px",
            borderRadius: "50%",
            border: `2px solid ${checkingAnswer ? "#3b82f6" : "#a78bfa"}`,
            animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
            opacity: 0.5
          }} />
        )}
        
        {/* SVG Robot */}
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Antenna */}
          <rect x="57" y="12" width="6" height="15" rx="3" fill={checkingAnswer ? "#3b82f6" : "#8b5cf6"} />
          <circle cx="60" cy="10" r="6" fill={checkingAnswer ? "#60a5fa" : "#a78bfa"} className={isSpeaking ? "pulse-antenna" : ""} />
          
          {/* Head Body */}
          <rect x="25" y="27" width="70" height="65" rx="18" fill="#1f2937" stroke="#374151" strokeWidth="4" />
          
          {/* Ears */}
          <rect x="17" y="47" width="8" height="25" rx="4" fill="#4b5563" />
          <rect x="95" y="47" width="8" height="25" rx="4" fill="#4b5563" />
          
          {/* Screen Face */}
          <rect x="35" y="37" width="50" height="45" rx="10" fill="#111827" stroke="#4b5563" strokeWidth="2" />
          
          {/* Eyes (LEDs) */}
          <circle cx="48" cy="52" r="5" fill={checkingAnswer ? "#3b82f6" : "#60a5fa"} />
          <circle cx="72" cy="52" r="5" fill={checkingAnswer ? "#3b82f6" : "#60a5fa"} />
          
          {/* Mouth */}
          {checkingAnswer ? (
            <circle cx="60" cy="67" r="4" fill="#3b82f6" />
          ) : isSpeaking ? (
            <ellipse cx="60" cy="67" rx="8" ry="5" fill="#ef4444" className="mouth-speaking" />
          ) : (
            <path d="M52 68 Q60 72 68 68" stroke="#10b981" strokeWidth="3" strokeLinecap="round" fill="none" />
          )}
          
          {/* Blush */}
          <circle cx="40" cy="64" r="2.5" fill="#3b82f6" opacity="0.4" />
          <circle cx="80" cy="64" r="2.5" fill="#3b82f6" opacity="0.4" />
        </svg>
      </div>

      {/* Real-time speech visualizer waves next to the robot */}
      {checkingAnswer ? (
        <div style={{ fontSize: "12px", color: "#60a5fa", marginTop: "12px", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "8px" }}>
          <FaSpinner className="spin" /> AI Analyzing Answer...
        </div>
      ) : isSpeaking ? (
        <div style={{ display: "flex", gap: "5px", marginTop: "12px", height: "18px", alignItems: "center" }}>
          <div className="wave-bar bar-1" />
          <div className="wave-bar bar-2" />
          <div className="wave-bar bar-3" />
          <div className="wave-bar bar-4" />
          <div className="wave-bar bar-5" />
        </div>
      ) : (
        <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "12px", fontWeight: "600", fontStyle: "italic" }}>
          AI Robot Idle
        </div>
      )}
    </div>
  );
};

const RoleLogos = ({ roleName, size = 24 }) => {
  switch (roleName) {
    case "Frontend Developer":
      return (
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <FaReact style={{ color: "#00d8ff" }} size={size} title="React" />
          <FaJs style={{ color: "#f7df1e" }} size={size} title="JavaScript" />
          <FaHtml5 style={{ color: "#e34f26" }} size={size} title="HTML5" />
        </div>
      );
    case "Backend Developer":
      return (
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <FaNodeJs style={{ color: "#339933" }} size={size} title="Node.js" />
          <FaDatabase style={{ color: "#00758f" }} size={size} title="Database" />
        </div>
      );
    case "Full Stack Developer":
      return (
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <FaReact style={{ color: "#00d8ff" }} size={size} title="React" />
          <FaNodeJs style={{ color: "#339933" }} size={size} title="Node.js" />
          <FaDatabase style={{ color: "#00758f" }} size={size} title="Database" />
        </div>
      );
    case "Java Developer":
      return (
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <FaJava style={{ color: "#ea2d2e" }} size={size} title="Java" />
        </div>
      );
    case "Python Developer":
      return (
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <FaPython style={{ color: "#3776ab" }} size={size} title="Python" />
        </div>
      );
    case "Data Analyst":
      return (
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <FaChartPie style={{ color: "#10b981" }} size={size} title="Data Analytics" />
          <FaDatabase style={{ color: "#00758f" }} size={size} title="Database" />
        </div>
      );
    case "Data Scientist":
      return (
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <FaBrain style={{ color: "#a78bfa" }} size={size} title="AI / ML" />
          <FaPython style={{ color: "#3776ab" }} size={size} title="Python" />
        </div>
      );
    default:
      return null;
  }
};

function MockInterview() {
  const navigate = useNavigate();

  const [role, setRole] = useState("Frontend Developer");
  const [difficulty, setDifficulty] = useState("Medium");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState(null);

  const [interviewsLeft, setInterviewsLeft] = useState(() => {
    const isPrem = checkUserPremium();
    if (isPrem) return 999;
    const left = localStorage.getItem("mockInterviewsLeft");
    if (left === null) {
      localStorage.setItem("mockInterviewsLeft", "1");
      return 1;
    }
    return parseInt(left, 10);
  });

  // Voice Settings
  const [speakAutomatically, setSpeakAutomatically] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [checkingAnswer, setCheckingAnswer] = useState(false);

  // Reference for the speech recognition instance to handle continuous state
  const recognitionRef = useRef(null);

  // Speak function (Text-to-Speech)
  const speakText = (text) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel(); // Stop any ongoing speech
    setIsSpeaking(false);
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Load available voices and find an English voice
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(
      (v) => v.lang.includes("en-US") || v.lang.includes("en-GB") || v.lang.startsWith("en")
    );
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      startListening();
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };
    
    window.speechSynthesis.speak(utterance);
  };

  // Trigger speech on question change
  useEffect(() => {
    if (questions.length > 0 && speakAutomatically) {
      speakText(questions[currentQuestion].question);
    }
    // Stop recording when transitioning to another question
    stopListening();
  }, [currentQuestion, questions, speakAutomatically]);

  // Clean up synthesis/recognition on unmount
  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startInterview = async () => {
    const isPrem = checkUserPremium();
    if (!isPrem) {
      const left = parseInt(localStorage.getItem("mockInterviewsLeft") || "1", 10);
      if (left <= 0) {
        alert("🔒 You have used all your free mock interview sessions! Upgrade to Premium Pro at a 100% discounted price (₹0) to unlock unlimited mock interviews.");
        navigate("/pricing");
        return;
      }
    }

    try {
      setLoading(true);
      setEvaluation(null);
      setUserAnswers([]);

      const response = await fetch(`${API_URL}/interview/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          difficulty,
        }),
      });

      const data = await response.json();
      setQuestions(data);
      setUserAnswers(new Array(data.length).fill(""));
      setCurrentQuestion(0);

      // Decrement remaining sessions
      if (!isPrem) {
        const newLeft = interviewsLeft - 1;
        localStorage.setItem("mockInterviewsLeft", newLeft.toString());
        setInterviewsLeft(newLeft);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to generate interview questions.");
    } finally {
      setLoading(false);
    }
  };

  // Speech Recognition (Speech-to-Text)
  function startListening() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = false;
    rec.lang = "en-US";

    rec.onstart = () => {
      setIsListening(true);
    };

    rec.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      if (result.isFinal) {
        const transcript = result[0].transcript;
        setUserAnswers((prev) => {
          const updated = [...prev];
          const currentAnswer = updated[currentQuestion] || "";
          updated[currentQuestion] = currentAnswer 
            ? `${currentAnswer.trim()} ${transcript.trim()}`
            : transcript.trim();
          return updated;
        });
      }
    };

    rec.onerror = (e) => {
      console.error("Speech recognition error:", e);
      setIsListening(false);
    };

    rec.onend = () => {
      setIsListening(false);
    };

    rec.start();
    recognitionRef.current = rec;
    setRecognition(rec);
  }

  function stopListening() {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setRecognition(null);
    setIsListening(false);
  }

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const nextQuestion = async () => {
    const currentQ = questions[currentQuestion];
    const currentAns = userAnswers[currentQuestion] || "";

    // 1. If it's already a follow-up question, or the answer is very short, we don't request a check.
    if (currentQ.isFollowUp || currentAns.trim().length < 10) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
      return;
    }

    try {
      setCheckingAnswer(true);
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      stopListening();

      const response = await fetch(`${API_URL}/interview/check-answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          difficulty,
          question: currentQ.question,
          answer: currentAns,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to check answer");
      }

      const data = await response.json();

      if (data.followUpNeeded && data.followUpQuestion) {
        // Splice follow-up question right after the current question
        setQuestions((prev) => {
          const updated = [...prev];
          updated.splice(currentQuestion + 1, 0, {
            id: `follow-up-${Date.now()}`,
            question: data.followUpQuestion,
            isFollowUp: true,
          });
          return updated;
        });
        
        // Expand the userAnswers array to accommodate the new spliced question
        setUserAnswers((prev) => {
          const updated = [...prev];
          updated.splice(currentQuestion + 1, 0, "");
          return updated;
        });
      }

      // Transition to next question (which is the follow-up if spliced, or next standard question)
      if (currentQuestion < questions.length - 1 || data.followUpNeeded) {
        setCurrentQuestion(currentQuestion + 1);
      }

    } catch (error) {
      console.error("Error checking answer:", error);
      // Fallback: just proceed
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    } finally {
      setCheckingAnswer(false);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const skipQuestion = () => {
    setUserAnswers((prev) => {
      const updated = [...prev];
      updated[currentQuestion] = "Skipped / No Answer Provided";
      return updated;
    });
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    stopListening();
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const submitInterview = async () => {
    try {
      setEvaluating(true);
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      stopListening();

      const responses = questions.map((q, idx) => ({
        questionId: q.id,
        question: q.question,
        answer: userAnswers[idx] || "No response provided."
      }));

      const res = await fetch(`${API_URL}/interview/evaluate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          difficulty,
          responses,
        }),
      });

      if (!res.ok) {
        throw new Error("Evaluation request failed");
      }

      const evalData = await res.json();
      setEvaluation(evalData);
    } catch (error) {
      console.error(error);
      alert("Failed to evaluate the interview responses. Please try again.");
    } finally {
      setEvaluating(false);
    }
  };

  const resetInterview = () => {
    setQuestions([]);
    setUserAnswers([]);
    setEvaluation(null);
    setCurrentQuestion(0);
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar />

        <div className="page-content">
          <style>{`
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.6); }
          70% { transform: scale(1.08); box-shadow: 0 0 0 15px rgba(239, 68, 68, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        @keyframes speak {
          0% { rx: 8px; ry: 2px; }
          25% { rx: 7px; ry: 6px; }
          50% { rx: 8px; ry: 2px; }
          75% { rx: 7px; ry: 8px; }
          100% { rx: 8px; ry: 2px; }
        }
        @keyframes robot-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes wave-pulse {
          0%, 100% { height: 4px; opacity: 0.5; }
          50% { height: 18px; opacity: 1; }
        }
        .mouth-speaking {
          animation: speak 0.25s infinite;
        }
        .robot-container {
          animation: robot-bob 4s ease-in-out infinite;
        }
        .wave-bar {
          width: 4px;
          background: #a78bfa;
          border-radius: 4px;
          animation: wave-pulse 1s ease-in-out infinite;
          box-shadow: 0 0 8px rgba(167, 139, 250, 0.5);
        }
        .bar-1 { animation-delay: 0.1s; }
        .bar-2 { animation-delay: 0.25s; }
        .bar-3 { animation-delay: 0.4s; }
        .bar-4 { animation-delay: 0.2s; }
        .bar-5 { animation-delay: 0.35s; }
        .mic-active-btn {
          animation: pulse 1.5s infinite;
          background: #ef4444 !important;
          color: white !important;
          border-color: #ef4444 !important;
        }
        .feedback-badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 13px;
          margin-right: 8px;
          margin-bottom: 8px;
        }
        .strength-badge {
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .weakness-badge {
          background: rgba(239, 68, 68, 0.15);
          color: #f87171;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }
        .evaluation-item {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          padding: 20px;
          margin-top: 15px;
        }
        .hover-close-btn:hover {
          background: rgba(239, 68, 68, 0.2) !important;
          color: #f87171 !important;
          border-color: rgba(239, 68, 68, 0.3) !important;
          transform: scale(1.05);
        }
      `}</style>

      <div style={{ marginBottom: "25px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "800", color: "white", margin: 0 }}>
          🎤 AI Voice Mock Interview
        </h1>
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
            marginTop: "12px",
            marginBottom: "4px"
          }}>
            📊 <strong>{interviewsLeft} Free Mock Interview Session Remaining</strong> (Upgrade to Pro for Unlimited)
          </div>
        )}
        <p style={{ color: "#9ca3af", marginTop: "8px", margin: 0 }}>
          Experience real-time speech-powered interview sessions with AI evaluation.
        </p>
      </div>

      <div className="glass-card" style={{ width: "100%", maxWidth: "800px", position: "relative" }}>
        
        {/* CLOSE/EXIT BUTTON */}
        {(questions.length > 0 || evaluation || evaluating) && (
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to exit the interview? Your progress will be lost.")) {
                resetInterview();
              }
            }}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#9ca3af",
              transition: "all 0.2s",
              fontSize: "20px",
              margin: 0,
              padding: 0,
              zIndex: 10
            }}
            title="Exit Interview"
            className="hover-close-btn"
          >
            &times;
          </button>
        )}

        {/* SETUP SCREEN */}
        {questions.length === 0 && !evaluation && (
          <div style={{ marginTop: "20px" }}>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: "250px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", fontWeight: "600" }}>
                  <FaBriefcase style={{ color: "#60a5fa" }} /> Select Job Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "1px solid #374151", background: "#1f2937", color: "white" }}
                >
                  <option value="Frontend Developer">💻 Frontend Developer</option>
                  <option value="Backend Developer">⚙️ Backend Developer</option>
                  <option value="Full Stack Developer">🌐 Full Stack Developer</option>
                  <option value="Java Developer">☕ Java Developer</option>
                  <option value="Python Developer">🐍 Python Developer</option>
                  <option value="Data Analyst">📊 Data Analyst</option>
                  <option value="Data Scientist">🔬 Data Scientist</option>
                </select>
                <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "12px", color: "#9ca3af", fontWeight: "600" }}>Tech Covered:</span>
                  <RoleLogos roleName={role} size={18} />
                </div>
              </div>

              <div style={{ flex: 1, minWidth: "250px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", fontWeight: "600" }}>
                  <FaSlidersH style={{ color: "#60a5fa" }} /> Difficulty Level
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "1px solid #374151", background: "#1f2937", color: "white" }}
                >
                  <option value="Easy">🟢 Easy</option>
                  <option value="Medium">🟡 Medium</option>
                  <option value="Hard">🔴 Hard</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="checkbox"
                id="autoSpeak"
                checked={speakAutomatically}
                onChange={(e) => setSpeakAutomatically(e.target.checked)}
                style={{ width: "20px", height: "20px", cursor: "pointer", marginTop: 0 }}
              />
              <label htmlFor="autoSpeak" style={{ cursor: "pointer", fontWeight: "500", marginTop: 0 }}>
                Speak questions automatically using AI voice
              </label>
            </div>

            <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
              <button
                onClick={startInterview}
                disabled={loading}
                className="primary-btn"
                style={{
                  flex: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  marginTop: 0
                }}
              >
                {loading ? (
                  <>
                    <FaSpinner className="spin" /> Generating AI Interview...
                  </>
                ) : (
                  "Start Voice Interview"
                )}
              </button>
              
              <Link
                to="/dashboard"
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "12px",
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "15px",
                  transition: "all 0.2s",
                  cursor: "pointer",
                  marginTop: 0
                }}
                className="hover-close-btn"
              >
                Exit to Menu
              </Link>
            </div>
          </div>
        )}

        {/* ACTIVE INTERVIEW SCREEN */}
        {questions.length > 0 && !evaluation && !evaluating && (
          <div>
            {/* Header info */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "15px", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#60a5fa", background: "rgba(96,165,250,0.1)", padding: "4px 10px", borderRadius: "8px" }}>
                  {role} ({difficulty === "Easy" ? "🟢 Easy" : difficulty === "Medium" ? "🟡 Medium" : "🔴 Hard"})
                </span>
                <RoleLogos roleName={role} size={18} />
              </div>
              <span style={{ color: "#9ca3af", fontSize: "14px", fontWeight: "600" }}>
                Question {currentQuestion + 1}
              </span>
            </div>

            {/* ROBOT AVATAR */}
            <RobotAvatar isSpeaking={isSpeaking} checkingAnswer={checkingAnswer} />

            {/* Question Text */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px", position: "relative", marginBottom: "25px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "15px" }}>
                <h3 style={{ fontSize: "18px", lineHeight: "1.6", fontWeight: "600", margin: 0 }}>
                  {questions[currentQuestion].question}
                </h3>
                <button
                  onClick={() => speakText(questions[currentQuestion].question)}
                  disabled={checkingAnswer || evaluating}
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "50%",
                    width: "42px",
                    height: "42px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: (checkingAnswer || evaluating) ? "not-allowed" : "pointer",
                    color: (checkingAnswer || evaluating) ? "#4b5563" : "#a78bfa",
                    transition: "all 0.2s",
                    marginTop: 0
                  }}
                  title="Replay Audio"
                >
                  <FaVolumeUp size={16} />
                </button>
              </div>
            </div>

            {/* User Response Text Area */}
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Your Answer</label>
              <textarea
                value={userAnswers[currentQuestion] || ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setUserAnswers(prev => {
                    const updated = [...prev];
                    updated[currentQuestion] = val;
                    return updated;
                  });
                }}
                disabled={checkingAnswer || evaluating}
                placeholder={checkingAnswer ? "AI is analyzing your response..." : "Type your response here or use the voice recording button below..."}
                rows={6}
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: "14px",
                  border: "1px solid #374151",
                  background: "#111827",
                  color: "white",
                  fontSize: "15px",
                  lineHeight: "1.6",
                  opacity: (checkingAnswer || evaluating) ? 0.6 : 1
                }}
              />
            </div>

            {/* Speech-to-Text Button Panel */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "25px 0" }}>
              <button
                onClick={toggleListening}
                disabled={checkingAnswer || evaluating}
                className={isListening ? "mic-active-btn" : ""}
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: (checkingAnswer || evaluating) ? "not-allowed" : "pointer",
                  color: (checkingAnswer || evaluating) ? "#4b5563" : isListening ? "white" : "#ef4444",
                  transition: "all 0.2s",
                  marginTop: 0
                }}
                title={isListening ? "Stop Recording" : "Start Voice Recording"}
              >
                {isListening ? <FaMicrophoneSlash size={26} /> : <FaMicrophone size={26} />}
              </button>
              <span style={{ fontSize: "14px", color: (checkingAnswer || evaluating) ? "#4b5563" : isListening ? "#ef4444" : "#9ca3af", fontWeight: "600", marginTop: "10px" }}>
                {checkingAnswer ? "Analyzing..." : isListening ? "Listening... Click to pause" : "Click to speak your answer"}
              </span>
            </div>

            {/* Navigations */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "20px" }}>
              <button
                onClick={previousQuestion}
                disabled={currentQuestion === 0 || checkingAnswer || evaluating}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: (currentQuestion === 0 || checkingAnswer || evaluating) ? "#6b7280" : "white",
                  cursor: (currentQuestion === 0 || checkingAnswer || evaluating) ? "not-allowed" : "pointer",
                  marginTop: 0
                }}
              >
                <FaArrowLeft size={14} /> Previous
              </button>

              {currentQuestion < questions.length - 1 && (
                <button
                  onClick={skipQuestion}
                  disabled={checkingAnswer || evaluating}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "rgba(239, 68, 68, 0.12)",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    color: "#f87171",
                    cursor: (checkingAnswer || evaluating) ? "not-allowed" : "pointer",
                    borderRadius: "10px",
                    padding: "8px 16px",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginTop: 0
                  }}
                  title="Skip this question if you don't know the answer"
                >
                  ⏩ Skip Question
                </button>
              )}

              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={submitInterview}
                  disabled={checkingAnswer || evaluating}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: (checkingAnswer || evaluating) ? "#1f2937" : "linear-gradient(135deg, #10b981, #059669)",
                    color: (checkingAnswer || evaluating) ? "#6b7280" : "white",
                    cursor: (checkingAnswer || evaluating) ? "not-allowed" : "pointer",
                    fontWeight: "bold",
                    marginTop: 0
                  }}
                >
                  <FaRegCheckCircle size={14} /> Finish & Evaluate
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  disabled={checkingAnswer || evaluating}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: (checkingAnswer || evaluating) ? "#1f2937" : "linear-gradient(135deg, #3b82f6, #2563eb)",
                    color: (checkingAnswer || evaluating) ? "#6b7280" : "white",
                    cursor: (checkingAnswer || evaluating) ? "not-allowed" : "pointer",
                    fontWeight: "bold",
                    marginTop: 0
                  }}
                >
                  {checkingAnswer && <FaSpinner className="spin" size={14} />}
                  {checkingAnswer ? "Checking..." : "Next"} <FaArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* EVALUATING LOADING STATE */}
        {evaluating && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "50px 0" }}>
            <FaSpinner className="spin" size={40} style={{ color: "#a78bfa", marginBottom: "20px" }} />
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "white" }}>Evaluating Your Responses</h2>
            <p style={{ color: "#9ca3af", marginTop: "8px", textAlign: "center" }}>
              Our AI is analyzing your transcripts, calculating scores, and assessing strengths and weak areas.
            </p>
          </div>
        )}

        {/* EVALUATION REPORT CARD */}
        {evaluation && !evaluating && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifySelf: "center", flexDirection: "column", background: "linear-gradient(135deg, rgba(96,165,250,0.1), rgba(167,139,250,0.1))", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "30px", textAlign: "center", marginBottom: "30px", width: "100%" }}>
              <FaAward size={50} style={{ color: "#f59e0b", marginBottom: "15px" }} />
              <h2 style={{ fontSize: "24px", fontWeight: "700", color: "white", margin: 0 }}>Interview Complete!</h2>
              
              <div style={{ marginTop: "20px" }}>
                <span style={{ fontSize: "50px", fontWeight: "800", color: "#60a5fa" }}>
                  {evaluation.overallRating}
                </span>
                <span style={{ fontSize: "20px", color: "#9ca3af", fontWeight: "600" }}>/10</span>
              </div>
              <p style={{ fontWeight: "600", color: "#e5e7eb", fontSize: "16px", marginTop: "10px" }}>Overall Rating</p>
            </div>

            {/* STRENGTHS AND WEAK AREAS */}
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "30px" }}>
              <div style={{ flex: 1, minWidth: "250px", background: "rgba(16, 185, 129, 0.05)", border: "1px solid rgba(16, 185, 129, 0.1)", borderRadius: "16px", padding: "20px" }}>
                <h3 style={{ color: "#10b981", fontSize: "18px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px", marginTop: 0, marginBottom: "15px" }}>
                  <FaRegCheckCircle /> Key Strengths
                </h3>
                <div>
                  {evaluation.strengths && evaluation.strengths.map((str, i) => (
                    <span key={i} className="feedback-badge strength-badge">
                      {str}
                    </span>
                  ))}
                  {(!evaluation.strengths || evaluation.strengths.length === 0) && (
                    <p style={{ color: "#9ca3af", fontSize: "14px", margin: 0 }}>No major strengths identified.</p>
                  )}
                </div>
              </div>

              <div style={{ flex: 1, minWidth: "250px", background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.1)", borderRadius: "16px", padding: "20px" }}>
                <h3 style={{ color: "#f87171", fontSize: "18px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px", marginTop: 0, marginBottom: "15px" }}>
                  <FaExclamationTriangle /> Weak Areas / Topics
                </h3>
                <div>
                  {evaluation.weakAreas && evaluation.weakAreas.map((weak, i) => (
                    <span key={i} className="feedback-badge weakness-badge">
                      {weak}
                    </span>
                  ))}
                  {(!evaluation.weakAreas || evaluation.weakAreas.length === 0) && (
                    <p style={{ color: "#9ca3af", fontSize: "14px", margin: 0 }}>No major weaknesses identified!</p>
                  )}
                </div>
              </div>
            </div>

            {/* QUESTION BY QUESTION DETAILED FEEDBACK */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "25px" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "20px", color: "#a78bfa" }}>
                Detailed Question Review
              </h3>
              
              {evaluation.detailedFeedback && evaluation.detailedFeedback.map((item, idx) => (
                <div key={idx} className="evaluation-item">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "15px" }}>
                    <h4 style={{ fontSize: "16px", fontWeight: "600", margin: 0, color: "#60a5fa" }}>
                      Question {idx + 1}
                    </h4>
                    <span style={{ background: "rgba(96,165,250,0.1)", color: "#60a5fa", border: "1px solid rgba(96,165,250,0.2)", borderRadius: "8px", padding: "2px 8px", fontSize: "13px", fontWeight: "700" }}>
                      Score: {item.score}/10
                    </span>
                  </div>
                  
                  <p style={{ fontWeight: "600", color: "#f3f4f6", fontSize: "15px", marginBottom: "10px" }}>
                    {item.question}
                  </p>

                  <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: "10px", padding: "12px", fontSize: "14px", marginBottom: "12px", borderLeft: "3px solid #374151" }}>
                    <strong style={{ color: "#9ca3af", display: "block", marginBottom: "4px", fontSize: "12px", textTransform: "uppercase" }}>Your Response:</strong>
                    <span style={{ color: "#d1d5db", fontStyle: item.answer === "No response provided." ? "italic" : "normal" }}>
                      {item.answer}
                    </span>
                  </div>

                  <div style={{ fontSize: "14px", color: "#e5e7eb", lineHeight: "1.6" }}>
                    <strong style={{ color: "#a78bfa", display: "block", marginBottom: "4px", fontSize: "12px", textTransform: "uppercase" }}>AI Feedback:</strong>
                    {item.feedback}
                  </div>

                  {item.correctAnswer && (
                    <div style={{ fontSize: "14px", color: "#e5e7eb", lineHeight: "1.6", marginTop: "12px", borderTop: "1px dashed rgba(255,255,255,0.08)", paddingTop: "12px" }}>
                      <strong style={{ color: "#10b981", display: "block", marginBottom: "4px", fontSize: "12px", textTransform: "uppercase" }}>Proper / Ideal Answer:</strong>
                      {item.correctAnswer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={resetInterview}
              className="primary-btn"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                marginTop: "30px"
              }}
            >
              <FaRedoAlt /> Start Another Interview
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
</>
  );
}

export default MockInterview;