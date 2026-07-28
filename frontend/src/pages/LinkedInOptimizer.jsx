import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  FaLinkedin, FaUserCircle, FaImage, FaPen, FaBriefcase,
  FaGraduationCap, FaStar, FaUsers, FaComments, FaSearch,
  FaCheckCircle, FaLightbulb, FaArrowRight, FaChevronDown, FaChevronUp
} from "react-icons/fa";

const steps = [
  {
    number: "01",
    title: "Professional Profile Photo",
    icon: <FaUserCircle />,
    color: "#6366f1",
    gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.2)",
    tips: [
      "Use a high-resolution photo (400×400px minimum) with good lighting",
      "Face should take up 60–70% of the frame — clear, professional look",
      "Wear professional or business-casual attire matching your industry",
      "Use a clean, neutral or blurred background (no cluttered backgrounds)",
      "Smile naturally — approachable and confident expression works best",
      "Avoid group photos, sunglasses, or heavily filtered selfies",
    ],
    pro: "Profiles with professional photos get 21× more views and 9× more connection requests.",
  },
  {
    number: "02",
    title: "Eye-Catching Banner / Cover Image",
    icon: <FaImage />,
    color: "#0ea5e9",
    gradient: "linear-gradient(135deg, #0ea5e9, #38bdf8)",
    bg: "rgba(14,165,233,0.08)",
    border: "rgba(14,165,233,0.2)",
    tips: [
      "Use a banner size of 1584×396px for crisp display on all devices",
      "Showcase your skills, niche, or personal brand (e.g., coding tools, design work)",
      "Include your tagline, website, or a call-to-action (e.g., 'Open to Work')",
      "Use Canva or Adobe Express — choose a template that reflects your field",
      "Keep text minimal and readable at a glance",
      "Avoid stock photo clichés — make it unique and personal",
    ],
    pro: "A custom banner is seen by everyone who visits your profile — make the first impression count.",
  },
  {
    number: "03",
    title: "Compelling Headline",
    icon: <FaPen />,
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.2)",
    tips: [
      "Go beyond just your job title — add your value proposition",
      "Formula: [Role] | [Skill/Specialty] | [What You Help With]",
      "Example: 'Full Stack Developer | React & Node.js | Building Scalable Web Apps'",
      "Use keywords recruiters search for in your industry",
      "Include certifications or specializations if applicable",
      "You have 220 characters — use them wisely, not just 'Student at XYZ'",
    ],
    pro: "Your headline appears in search results. Keyword-rich headlines rank higher in LinkedIn's algorithm.",
  },
  {
    number: "04",
    title: "Powerful About / Summary Section",
    icon: <FaStar />,
    color: "#10b981",
    gradient: "linear-gradient(135deg, #10b981, #34d399)",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.2)",
    tips: [
      "Start with a strong hook — your biggest achievement or mission statement",
      "Write in first person ('I build...' not 'She builds...')",
      "Cover: who you are, what you do, your top skills, and your goals",
      "Include 3–5 keywords relevant to your target role or industry",
      "End with a clear CTA: 'Open to opportunities' or 'Let's connect'",
      "Keep it to 3–5 short paragraphs — use line breaks for readability",
      "Add emojis sparingly to draw attention to key points ✅",
    ],
    pro: "The About section is your elevator pitch. Most recruiters read it before anything else.",
  },
  {
    number: "05",
    title: "Work Experience — Make It Stand Out",
    icon: <FaBriefcase />,
    color: "#8b5cf6",
    gradient: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.2)",
    tips: [
      "Start each bullet with a strong action verb (Led, Built, Optimized, Delivered)",
      "Quantify achievements: 'Increased traffic by 40%' beats 'Improved website'",
      "Add media: screenshots, project links, presentations, GitHub repos",
      "List responsibilities AND results — not just what you did, but impact",
      "Use industry keywords in descriptions for ATS and LinkedIn search",
      "Keep descriptions concise: 3–5 bullet points per role",
      "Include volunteer work or freelance projects if relevant",
    ],
    pro: "Profiles with detailed experience sections receive 3.5× more InMail responses from recruiters.",
  },
  {
    number: "06",
    title: "Education & Certifications",
    icon: <FaGraduationCap />,
    color: "#f43f5e",
    gradient: "linear-gradient(135deg, #f43f5e, #fb7185)",
    bg: "rgba(244,63,94,0.08)",
    border: "rgba(244,63,94,0.2)",
    tips: [
      "List your degree, major, institution, and graduation year",
      "Add relevant coursework, thesis, or academic projects",
      "Include online certifications: Coursera, Udemy, Google, AWS, Microsoft",
      "Add certifications with issue dates and credential IDs for credibility",
      "LinkedIn Learning courses auto-populate your profile when completed",
      "Highlight any honors, scholarships, or academic awards",
    ],
    pro: "Certifications signal continuous learning — crucial in fast-moving fields like tech and data science.",
  },
  {
    number: "07",
    title: "Skills & Endorsements",
    icon: <FaStar />,
    color: "#06b6d4",
    gradient: "linear-gradient(135deg, #06b6d4, #22d3ee)",
    bg: "rgba(6,182,212,0.08)",
    border: "rgba(6,182,212,0.2)",
    tips: [
      "Add up to 50 skills — prioritize top 3 as they appear first and get pinned",
      "Focus on skills matching your target job descriptions",
      "Ask colleagues and managers for endorsements on key skills",
      "Take LinkedIn Skill Assessments to earn a verified badge (top 30% badge)",
      "Reorder skills: most important → most endorsed → most visible",
      "Remove outdated or irrelevant skills to keep profile clean and focused",
    ],
    pro: "Members with 5+ skills listed receive 17× more profile views than those without.",
  },
  {
    number: "08",
    title: "Build Your Network Strategically",
    icon: <FaUsers />,
    color: "#ec4899",
    gradient: "linear-gradient(135deg, #ec4899, #f472b6)",
    bg: "rgba(236,72,153,0.08)",
    border: "rgba(236,72,153,0.2)",
    tips: [
      "Connect with classmates, professors, colleagues, and industry professionals",
      "Personalize every connection request — add a short note explaining why",
      "Follow target companies, thought leaders, and influencers in your field",
      "Aim for 500+ connections to unlock the 'All-Star' profile status",
      "Join LinkedIn Groups in your niche — engage in discussions",
      "Use 'People You May Know' daily to expand your reach organically",
    ],
    pro: "500+ connections triggers LinkedIn's algorithm to boost your profile visibility in searches.",
  },
  {
    number: "09",
    title: "Recommendations & Social Proof",
    icon: <FaComments />,
    color: "#84cc16",
    gradient: "linear-gradient(135deg, #84cc16, #a3e635)",
    bg: "rgba(132,204,22,0.08)",
    border: "rgba(132,204,22,0.2)",
    tips: [
      "Request recommendations from managers, team leads, professors, or clients",
      "Send a personalized message mentioning the project or skill to highlight",
      "Aim for at least 3 strong recommendations on your profile",
      "Give recommendations first — most people will return the favor",
      "Recommendations on specific roles carry more weight than generic ones",
      "Update recommendations as you grow — outdated ones can hurt more than help",
    ],
    pro: "Profiles with 3+ recommendations are 4× more likely to receive job opportunities.",
  },
  {
    number: "10",
    title: "SEO — Make LinkedIn Find You",
    icon: <FaSearch />,
    color: "#ff6b00",
    gradient: "linear-gradient(135deg, #ff6b00, #ea580c)",
    bg: "rgba(255,107,0,0.08)",
    border: "rgba(255,107,0,0.2)",
    tips: [
      "Use your target job title as a keyword in headline, about, and experience",
      "Turn on 'Open to Work' for recruiters (visible only to recruiters if preferred)",
      "Set your location correctly — recruiters filter by geography",
      "Customize your LinkedIn URL: linkedin.com/in/yourname (Settings → Edit URL)",
      "Post content 3–5× per week — algorithm rewards active profiles",
      "Engage on others' posts: thoughtful comments boost your visibility",
      "Use Creator Mode to unlock newsletter and content analytics features",
    ],
    pro: "LinkedIn SEO is real — the right keywords can get you to appear in 10× more recruiter searches.",
  },
];

export default function LinkedInOptimizer() {
  const [expandedStep, setExpandedStep] = useState(null);

  const toggleStep = (idx) => {
    setExpandedStep(expandedStep === idx ? null : idx);
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />

        <div className="dashboard-content" style={{ padding: "28px 36px", overflowY: "auto" }}>

          {/* Hero Header */}
          <div className="li-hero">
            <div className="li-hero-icon">
              <FaLinkedin />
            </div>
            <div>
              <h1 className="li-hero-title">LinkedIn Profile Optimizer</h1>
              <p className="li-hero-sub">
                Follow this step-by-step guide to build a profile that attracts recruiters, clients, and opportunities.
              </p>
            </div>
          </div>

          {/* Progress bar badge */}
          <div className="li-progress-row">
            {steps.map((s, i) => (
              <div
                key={i}
                className="li-progress-dot"
                style={{ background: expandedStep === i ? s.color : "rgba(255,255,255,0.12)" }}
                title={`Step ${s.number}`}
              />
            ))}
            <span className="li-progress-label">10 Steps to All-Star Profile</span>
          </div>

          {/* Steps */}
          <div className="li-steps-list">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="li-step-card"
                style={{
                  background: expandedStep === idx ? step.bg : "rgba(255,255,255,0.02)",
                  borderColor: expandedStep === idx ? step.border : "rgba(255,255,255,0.07)",
                }}
              >
                {/* Step Header (always visible) */}
                <button
                  className="li-step-header"
                  onClick={() => toggleStep(idx)}
                  style={{ borderBottom: expandedStep === idx ? `1px solid ${step.border}` : "none" }}
                >
                  {/* Number badge */}
                  <div className="li-step-num" style={{ background: step.gradient }}>
                    {step.number}
                  </div>

                  {/* Icon + Title */}
                  <div className="li-step-icon" style={{ color: step.color }}>
                    {step.icon}
                  </div>
                  <span className="li-step-title">{step.title}</span>

                  {/* Expand arrow */}
                  <div className="li-step-arrow" style={{ color: step.color }}>
                    {expandedStep === idx ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </button>

                {/* Expanded Content */}
                {expandedStep === idx && (
                  <div className="li-step-body">
                    {/* Tips */}
                    <ul className="li-tips-list">
                      {step.tips.map((tip, ti) => (
                        <li key={ti} className="li-tip-item">
                          <span className="li-tip-check" style={{ color: step.color }}>
                            <FaCheckCircle />
                          </span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Pro Tip */}
                    <div className="li-pro-tip" style={{ borderLeft: `3px solid ${step.color}`, background: step.bg }}>
                      <FaLightbulb style={{ color: step.color, flexShrink: 0, marginTop: "2px" }} />
                      <span><strong style={{ color: step.color }}>Pro Tip:</strong> {step.pro}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="li-cta-card">
            <div className="li-cta-left">
              <FaLinkedin style={{ fontSize: "32px", color: "#0077b5" }} />
              <div>
                <h3 style={{ margin: 0, fontWeight: 700, fontSize: "16px" }}>Ready to level up your profile?</h3>
                <p style={{ margin: "4px 0 0", opacity: 0.6, fontSize: "13px" }}>
                  Apply all 10 steps and watch your profile views skyrocket.
                </p>
              </div>
            </div>
            <a
              href="https://www.linkedin.com/in/"
              target="_blank"
              rel="noopener noreferrer"
              className="li-cta-btn"
            >
              Open LinkedIn <FaArrowRight />
            </a>
          </div>

        </div>
      </div>
    </>
  );
}