import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Pages.css";
import {
  FaPlus,
  FaTrash,
  FaFilePdf,
  FaUndo,
  FaBriefcase,
  FaCode,
  FaGraduationCap,
  FaUser,
  FaSlidersH,
  FaCog,
  FaList,
  FaCertificate,
  FaAward,
  FaQuoteLeft,
  FaArrowUp,
  FaArrowDown
} from "react-icons/fa";

// Default Sample Data (combines multiple formats)
const defaultResumeData = {
  headings: {
    summary: "Summary",
    education: "Education",
    experience: "Experience",
    projects: "Projects",
    skills: "Technical Skills",
    certifications: "Certificates / Extracurricular",
    responsibility: "Positions of Responsibility",
    miscellaneous: "Miscellaneous"
  },
  visibleSections: {
    summary: true,
    education: true,
    experience: true,
    projects: true,
    skills: true,
    certifications: true,
    responsibility: false,
    miscellaneous: false
  },
  sectionOrder: [
    "skills",
    "summary",
    "experience",
    "projects",
    "education",
    "certifications",
    "responsibility",
    "miscellaneous"
  ],
  personal: {
    name: "Jake Gutierrez",
    title: "Software Developer | Java | Spring Boot | React.js | AWS",
    phone: "+91-XXXXXXXXXX",
    email: "youremail@gmail.com",
    linkText: "your-linkedin",
    linkUrl: "https://linkedin.com/in/your-linkedin",
    location: "yourgithub",
    course: "Bachelor of Engineering in Electronic and Telecommunication (B.E)",
    institute: "Institute of Technology (Tier-1)"
  },
  summaryText: "Applying for a Software Development Engineer role to utilize expertise in programming, data structures, algorithms, and full-stack development, driving innovation and impactful solutions through effective communication.",
  education: [
    {
      year: "July 2022 -- Active",
      degree: "Bachelor of Engineering in Electronic and Telecommunication (B.E)",
      school: "Institute of Technology (Tier-1)",
      cgpa: "-- 8.98 CGPA",
      location: "",
      bullets: []
    },
    {
      year: "May 2020 -- June 2021",
      degree: "Senior Secondary School (12th)",
      school: "Central Board School, City A",
      cgpa: "-- 90.2%",
      location: "",
      bullets: []
    },
    {
      year: "Sep. 2018 -- June 2019",
      degree: "Secondary School (10th)",
      school: "Central Board School, City B",
      cgpa: "-- 89.8%",
      location: "",
      bullets: []
    }
  ],
  experience: [
    {
      company: "SDE Intern - Mastercard",
      title: "Chatbot Developer | LLMs, Databricks, NLU, Llama Maverick 4, Genie",
      linkText: "",
      linkUrl: "",
      location: "",
      dates: "May 2024 -- July 2024",
      bullets: [
        "Designed and integrated an AI-based **chatbot** into an existing internal dashboard to reduce manual effort and improve consumer interactions.",
        "Utilized the **Databricks platform** to deploy chatbot services, leveraging its **Genie feature**, and **LLM support** like **Llama Maverick 4** for enhanced natural language understanding (NLU).",
        "Streamlined user queries with intelligent responses, improving efficiency and user satisfaction in internal workflows."
      ]
    },
    {
      company: "MasterCard Hackathon | Code For Change",
      title: "UI Designer, FrontEnd, and AI/ML | HTML, CSS, JavaScript, TailwindCSS, ReactJS",
      linkText: "Code For Change",
      linkUrl: "https://drive.google.com/",
      location: "",
      dates: "Aug 2024",
      bullets: [
        "Contributed significantly to the *Code for Change* hackathon, earning a top-tier placement.",
        "Developed a user feedback survey platform with a visually appealing interface using **HTML**, **Tailwind CSS**, and **React**.",
        "Integrated **machine learning** models to analyze feedback data and extract actionable insights for NGOs and organizations."
      ]
    },
    {
      company: "Joint Secretary | Sports Club",
      title: "Designer, FrontEnd Developer and Management Head | Canva, Figma, FrontEnd",
      linkText: "",
      linkUrl: "",
      location: "",
      dates: "Sept 2022 -- July 2024",
      bullets: [
        "Collaborated with a team of 4 developers to maintain the club's official website post-launch, ensuring high uptime and issue resolution.",
        "Led management and design for major sports events, handling PR, website coordination, and social media promotions."
      ]
    }
  ],
  projects: [
    {
      name: "Expense Tracker",
      role: "Node.js, Express.js, MongoDB, RESTful API",
      dates: "Mar 2024",
      linkText: "",
      linkUrl: "",
      bullets: [
        "Implemented **categorization of expenses** into different categories (food, travel, utilities) for better tracking, resulting in a **30% improvement** in user budget management.",
        "Integrated budgeting functionalities to set monthly spending limits.",
        "Ensured **secure storage and encryption** of user financial data to maintain confidentiality and privacy."
      ]
    },
    {
      name: "Job Tracker Dashboard",
      role: "React.js, TailwindCSS, LocalStorage",
      dates: "Jun 2024",
      linkText: "",
      linkUrl: "",
      bullets: [
        "Developed a dashboard to track job applications with add/edit/delete/filter features.",
        "Used **React Hooks** and **Context API** for state management and **LocalStorage** for data persistence.",
        "Built a clean, responsive UI using TailwindCSS with modals and interactive tables."
      ]
    }
  ],
  skills: [
    {
      category: "Programming Languages",
      items: "C, C++, Java, Javascript"
    },
    {
      category: "Frontend and Backend",
      items: "Flutter, HTML, CSS, TailwindCSS, RESTful API"
    },
    {
      category: "Databases",
      items: "SQL, MongoDB, Firestore"
    },
    {
      category: "Technologies/Frameworks",
      items: "Linux, Git, GitHub, Canva, Figma"
    }
  ],
  certifications: [
    {
      name: "Data Structures and Algorithms",
      institution: "Solved 750+ problems on CodeForces, LeetCode, and CodingNinjas",
      dates: "Active",
      linkUrl: "https://codeforces.com/"
    },
    {
      name: "LinkedIn Course",
      institution: "Boosted profile visibility and networking skills",
      dates: "Certificate Link",
      linkUrl: "https://drive.google.com/"
    },
    {
      name: "Advanced Certification",
      institution: "IICPC Summer Camp and Harvard CS50 courses",
      dates: "Certificate Link",
      linkUrl: "https://drive.google.com/"
    }
  ],
  responsibility: [
    {
      role: "Secretary",
      club: "XYZ Club",
      dates: "2019",
      linkUrl: ""
    }
  ],
  miscellaneous: [
    {
      achievement: "Award 1",
      detail: "Details of achievement",
      dates: "2021",
      linkUrl: ""
    }
  ]
};

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState(defaultResumeData);
  const [template, setTemplate] = useState("classic-sans"); // "classic-sans", "academic-serif", "minimal-charter"
  const [activeTab, setActiveTab] = useState("personal");
  const [previewZoom, setPreviewZoom] = useState(0.8);
  const [resumeFontSize, setResumeFontSize] = useState(9.5);

  // Helper to ensure absolute links for target="_blank"
  const ensureAbsoluteUrl = (url) => {
    if (!url) return "";
    const trimmed = url.trim();
    if (!trimmed) return "";
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("mailto:")) {
      return trimmed;
    }
    return `https://${trimmed}`;
  };

  // Helper to format markdown **bold** text in bullets
  const formatText = (text) => {
    if (!text) return "";
    const parts = text.split(/\*\*([^*]+)\*\*/g);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} style={{ fontWeight: "700" }}>{part}</strong>;
      }
      return part;
    });
  };

  // State update helpers
  const handlePersonalChange = (field, val) => {
    setResumeData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: val }
    }));
  };

  const handleHeadingChange = (section, val) => {
    setResumeData((prev) => ({
      ...prev,
      headings: { ...prev.headings, [section]: val }
    }));
  };

  const handleVisibilityToggle = (section) => {
    setResumeData((prev) => ({
      ...prev,
      visibleSections: {
        ...prev.visibleSections,
        [section]: !prev.visibleSections[section]
      }
    }));
  };

  // Add Item Helpers
  const addItem = (section, emptyItem) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], emptyItem]
    }));
  };

  // Delete Item Helpers
  const deleteItem = (section, index) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  // Update List Item Field Helpers
  const handleItemChange = (section, index, field, val) => {
    setResumeData((prev) => {
      const list = [...prev[section]];
      list[index] = { ...list[index], [field]: val };
      return { ...prev, [section]: list };
    });
  };

  // Move Item Up/Down Helpers
  const moveItem = (section, index, direction) => {
    setResumeData((prev) => {
      const list = [...prev[section]];
      if (direction === "up" && index > 0) {
        [list[index], list[index - 1]] = [list[index - 1], list[index]];
      } else if (direction === "down" && index < list.length - 1) {
        [list[index], list[index + 1]] = [list[index + 1], list[index]];
      }
      return { ...prev, [section]: list };
    });
  };

  // Move Entire Sections Up/Down
  const moveSection = (index, direction) => {
    setResumeData((prev) => {
      const list = [...(prev.sectionOrder || defaultResumeData.sectionOrder)];
      if (direction === "up" && index > 0) {
        [list[index], list[index - 1]] = [list[index - 1], list[index]];
      } else if (direction === "down" && index < list.length - 1) {
        [list[index], list[index + 1]] = [list[index + 1], list[index]];
      }
      return { ...prev, sectionOrder: list };
    });
  };

  const resetToSample = () => {
    if (window.confirm("Load sample LaTeX template data? This will overwrite your edits.")) {
      setResumeData(defaultResumeData);
    }
  };

  const resetToBlank = () => {
    if (window.confirm("Start with a blank canvas?")) {
      setResumeData({
        headings: defaultResumeData.headings,
        visibleSections: {
          summary: false,
          education: true,
          experience: true,
          projects: true,
          skills: true,
          certifications: true,
          responsibility: true,
          miscellaneous: true
        },
        sectionOrder: defaultResumeData.sectionOrder,
        personal: { name: "", phone: "", email: "", linkText: "", linkUrl: "", location: "", course: "", institute: "" },
        summaryText: "",
        education: [],
        experience: [],
        projects: [],
        skills: [],
        certifications: [],
        responsibility: [],
        miscellaneous: []
      });
    }
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <div className="no-print">
          <Sidebar />
        </div>

        <div className="page-content" style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 80px)", overflow: "hidden" }}>
          
          <style>{`
            .builder-grid {
              display: flex;
              gap: 24px;
              flex: 1;
              overflow: hidden;
              margin-top: 15px;
            }
            .editor-panel {
              flex: 1;
              min-width: 380px;
              max-width: 480px;
              background: rgba(255, 255, 255, 0.03);
              border: 1px solid rgba(255, 255, 255, 0.08);
              border-radius: 20px;
              padding: 20px;
              display: flex;
              flex-direction: column;
              overflow-y: auto;
              backdrop-filter: blur(20px);
            }
            .preview-panel {
              flex: 1.5;
              background: #0b0f19;
              border: none;
              border-radius: 0;
              display: flex;
              flex-direction: column;
              overflow: hidden;
              position: relative;
            }
            .preview-header-bar {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 12px 20px;
              background: rgba(255, 255, 255, 0.02);
              border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            }
            .preview-body-container {
              flex: 1;
              overflow: auto;
              display: flex;
              justify-content: flex-start;
              align-items: flex-start;
              padding: 16px 0 16px 16px;
              background: #090d16;
            }

            /* Global editor input styling to fix the invisible text issue */
            .editor-panel input, .editor-panel textarea {
              background: #111827 !important;
              border: 1px solid #374151 !important;
              border-radius: 8px !important;
              padding: 8px 10px !important;
              color: white !important;
              font-size: 13px !important;
              outline: none !important;
              width: 100% !important;
              box-sizing: border-box !important;
            }
            .editor-panel input:focus, .editor-panel textarea:focus {
              border-color: #60a5fa !important;
            }
            
            /* LaTeX Sheet Link Colors */
            .latex-sheet-sans a, .latex-sheet-serif a, .latex-sheet-charter a, .latex-sheet-ats a {
              color: #2563eb !important;
              text-decoration: underline !important;
              cursor: pointer !important;
            }

            .latex-sheet-sans {
              background: white;
              color: #141414;
              width: 210mm;
              min-height: 297mm;
              position: relative;
              box-sizing: border-box;
              padding: 0.8cm 0.5cm 0.8cm 0.5cm;
              box-shadow: none;
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              line-height: 1.25;
              text-align: left;
              transform-origin: top left;
              transition: transform 0.2s ease-in-out;
            }
            .latex-sheet-sans .name-header {
              font-size: 2.2em;
              font-weight: 800;
              text-align: center;
              margin: 0 0 2px 0;
            }
            .latex-sheet-sans .contact-line {
              font-size: 0.9em;
              display: flex;
              justify-content: center;
              flex-wrap: wrap;
              gap: 8px;
              align-items: center;
              margin-bottom: 8px;
            }
            .latex-sheet-sans .contact-line a {
              color: #141414;
              text-decoration: underline;
            }
            .latex-sheet-sans .section-title {
              font-size: 1.15em;
              font-weight: bold;
              text-transform: uppercase;
              margin-top: 8px;
              margin-bottom: 3px;
              border-bottom: 2px solid #d4d4d8;
              padding-bottom: 1px;
              letter-spacing: 0.5px;
            }
            .latex-sheet-sans .entry-row {
              display: flex;
              justify-content: space-between;
              font-size: 1em;
              margin-top: 3px;
            }
            .latex-sheet-sans .entry-title {
              font-weight: bold;
            }
            .latex-sheet-sans .entry-subtitle {
              font-style: italic;
            }
            .latex-sheet-sans .entry-right {
              color: #4b5563;
            }
            .latex-sheet-sans .bullet-list {
              margin: 1px 0 4px 0;
              padding-left: 18px;
              list-style-type: disc;
            }
            .latex-sheet-sans .bullet-item {
              font-size: 0.95em;
              margin-bottom: 1px;
              line-height: 1.25;
            }

            .latex-sheet-serif {
              background: white;
              color: #111111;
              width: 210mm;
              min-height: 297mm;
              position: relative;
              box-sizing: border-box;
              padding: 0.8cm 0.5cm 0.8cm 0.5cm;
              box-shadow: none;
              font-family: 'Times New Roman', Times, Georgia, serif;
              line-height: 1.25;
              text-align: left;
              transform-origin: top left;
              transition: transform 0.2s ease-in-out;
            }
            .latex-sheet-serif .header-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 6px;
            }
            .latex-sheet-serif .header-name {
              font-size: 1.85em;
              font-weight: bold;
              margin: 0;
            }
            .latex-sheet-serif .header-text-left {
              font-size: 0.95em;
              line-height: 1.25;
            }
            .latex-sheet-serif .header-text-right {
              font-size: 0.95em;
              text-align: right;
              line-height: 1.25;
            }
            .latex-sheet-serif .header-text-right a {
              color: #111;
              text-decoration: underline;
            }
            .latex-sheet-serif .section-title-box {
              background: #e5e7eb; /* colback=gray!20 */
              padding: 3px 6px;
              font-size: 1.15em;
              font-weight: bold;
              text-transform: uppercase;
              margin-top: 6px;
              margin-bottom: 3px;
              border-radius: 1px;
            }
            .latex-sheet-serif .edu-table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 3px;
              margin-bottom: 4px;
            }
            .latex-sheet-serif .edu-table th, .latex-sheet-serif .edu-table td {
              border: 1px solid #27272a;
              padding: 2px 4px;
              font-size: 0.9em;
            }
            .latex-sheet-serif .edu-table th {
              background: #f4f4f5;
              font-weight: bold;
              text-align: center;
            }
            .latex-sheet-serif .entry-row {
              display: flex;
              justify-content: space-between;
              font-size: 1em;
              margin-top: 3px;
            }
            .latex-sheet-serif .entry-title {
              font-weight: bold;
            }
            .latex-sheet-serif .entry-subtitle {
              font-style: italic;
            }
            .latex-sheet-serif .bullet-list {
              margin: 1px 0 3px 0;
              padding-left: 20px;
              list-style-type: disc;
            }
            .latex-sheet-serif .bullet-item {
              font-size: 0.95em;
              margin-bottom: 1px;
            }
            .latex-sheet-serif .skills-container {
              font-size: 1em;
              margin-top: 3px;
              line-height: 1.3;
            }
            .latex-sheet-serif .skills-line {
              margin-bottom: 2px;
            }

            .latex-sheet-charter {
              background: white;
              color: #111111;
              width: 210mm;
              min-height: 297mm;
              position: relative;
              box-sizing: border-box;
              padding: 0.8cm 0.5cm 0.8cm 0.5cm;
              box-shadow: none;
              font-family: Georgia, 'Times New Roman', Times, serif;
              line-height: 1.25;
              text-align: left;
              transform-origin: top left;
              transition: transform 0.2s ease-in-out;
            }
            .latex-sheet-charter .header-center {
              text-align: center;
              margin-bottom: 8px;
            }
            .latex-sheet-charter .header-name {
              font-size: 1.85em;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin: 0 0 3px 0;
            }
            .latex-sheet-charter .header-contact {
              font-size: 0.9em;
              display: flex;
              justify-content: center;
              flex-wrap: wrap;
              gap: 10px;
              color: #374151;
            }
            .latex-sheet-charter .header-contact a {
              color: #2563eb;
              text-decoration: underline;
            }
            .latex-sheet-charter .section-title {
              font-size: 1.15em;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-top: 8px;
              margin-bottom: 3px;
              border-bottom: 1px solid #111111;
              padding-bottom: 1px;
            }
            .latex-sheet-charter .entry-row {
              display: flex;
              justify-content: space-between;
              align-items: baseline;
              font-size: 1em;
              margin-top: 3px;
            }
            .latex-sheet-charter .entry-title {
              font-weight: bold;
            }
            .latex-sheet-charter .entry-subtitle {
              font-style: italic;
              color: #374151;
            }
            .latex-sheet-charter .entry-dates {
              font-weight: bold;
              font-size: 1em;
              color: #111111;
            }
            .latex-sheet-charter .bullet-list {
              margin: 1px 0 4px 0;
              padding-left: 20px;
              list-style-type: disc;
            }
            .latex-sheet-charter .bullet-item {
              font-size: 0.95em;
              margin-bottom: 1px;
              color: #111111;
              line-height: 1.25;
            }
            .latex-sheet-charter .skills-line {
              font-size: 1em;
              margin-bottom: 3px;
            }

            /* LaTeX Template 4: ATS Friendly (Rahul Potdar Style) */
            .latex-sheet-ats {
              background: white;
              color: #111111;
              width: 210mm;
              min-height: 297mm;
              position: relative;
              box-sizing: border-box;
              padding: 0.8cm 0.5cm 0.8cm 0.5cm;
              box-shadow: none;
              font-family: Arial, Helvetica, sans-serif;
              line-height: 1.25;
              text-align: left;
              transform-origin: top left;
              transition: transform 0.2s ease-in-out;
            }
            .latex-sheet-ats .header-center {
              text-align: center;
              margin-bottom: 6px;
            }
            .latex-sheet-ats .header-name {
              font-size: 1.85em;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin: 0 0 2px 0;
            }
            .latex-sheet-ats .header-title {
              font-size: 1em;
              font-weight: bold;
              margin: 0 0 3px 0;
              color: #111111;
            }
            .latex-sheet-ats .header-contact {
              font-size: 0.9em;
              display: flex;
              justify-content: center;
              flex-wrap: wrap;
              gap: 8px;
              color: #374151;
            }
            .latex-sheet-ats .header-contact a {
              color: #111111;
              text-decoration: underline;
            }
            .latex-sheet-ats .section-title {
              font-size: 1.1em;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-top: 6px;
              margin-bottom: 2px;
              border-bottom: 1px solid #111111;
              padding-bottom: 1px;
            }
            .latex-sheet-ats .entry-row {
              display: flex;
              justify-content: space-between;
              align-items: baseline;
              font-size: 1em;
              margin-top: 2px;
            }
            .latex-sheet-ats .entry-title {
              font-weight: bold;
            }
            .latex-sheet-ats .entry-subtitle {
              font-style: italic;
              color: #374151;
            }
            .latex-sheet-ats .entry-dates {
              font-weight: bold;
              font-size: 1em;
              color: #111111;
            }
            .latex-sheet-ats .bullet-list {
              margin: 1px 0 3px 0;
              padding-left: 15px;
              list-style-type: disc;
            }
            .latex-sheet-ats .bullet-item {
              font-size: 0.95em;
              margin-bottom: 1px;
              color: #111111;
              line-height: 1.25;
            }
            .latex-sheet-ats .skills-line {
              font-size: 9.5pt;
              margin-bottom: 3px;
            }

            /* Custom UI Tab System */
            .tab-btn {
              padding: 8px 12px;
              border-radius: 8px;
              background: rgba(255,255,255,0.03);
              border: 1px solid rgba(255,255,255,0.06);
              color: #9ca3af;
              font-weight: 600;
              font-size: 12px;
              cursor: pointer;
              transition: all 0.2s;
              display: flex;
              align-items: center;
              gap: 6px;
            }
            .tab-btn:hover {
              background: rgba(255,255,255,0.08);
              color: white;
            }
            .tab-btn.active {
              background: linear-gradient(135deg, #3b82f6, #2563eb);
              color: white;
              border-color: #3b82f6;
            }
            .form-section {
              margin-top: 15px;
              display: flex;
              flex-direction: column;
              gap: 12px;
            }
            .form-section label {
              display: block;
              margin-top: 0px !important;
              margin-bottom: 4px !important;
              font-weight: 600;
              color: #9ca3af !important;
            }
            .toggle-row {
              display: flex;
              align-items: center;
              justify-content: space-between;
              background: rgba(255,255,255,0.02);
              padding: 8px 12px;
              border-radius: 8px;
              border: 1px solid rgba(255,255,255,0.04);
            }
            
            /* Mobile responsiveness */
            @media (max-width: 768px) {
              .page-content {
                height: auto !important;
                overflow: visible !important;
                padding: 16px 12px !important;
              }
              .builder-grid {
                flex-direction: column !important;
                overflow: visible !important;
                gap: 16px !important;
              }
              .editor-panel {
                min-width: 100% !important;
                max-width: 100% !important;
              }
              .preview-panel {
                width: 100% !important;
                overflow: visible !important;
              }
              .preview-body-container {
                padding: 8px !important;
                overflow-x: auto !important;
              }
            }

            /* Print style override */
            @media print {
              @page {
                size: A4 portrait;
                margin: 0 !important;
              }
              * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              .no-print, .navbar, .sidebar, nav, .editor-panel {
                display: none !important;
                visibility: hidden !important;
              }
              html, body {
                background: white !important;
                color: #111111 !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 210mm !important;
                height: auto !important;
                visibility: visible !important;
              }
              .dashboard-container, .page-content, .builder-grid, .preview-panel, .preview-body-container {
                display: block !important;
                background: white !important;
                padding: 0 !important;
                margin: 0 !important;
                border: none !important;
                width: 210mm !important;
                height: auto !important;
                overflow: visible !important;
                box-shadow: none !important;
                visibility: visible !important;
              }
              .dashboard-container *, .page-content *, .builder-grid *, .preview-panel *, .preview-body-container * {
                visibility: visible !important;
              }
              .latex-sheet-sans, .latex-sheet-serif, .latex-sheet-charter, .latex-sheet-ats {
                visibility: visible !important;
                display: block !important;
                transform: scale(1) !important;
                transform-origin: top left !important;
                box-shadow: none !important;
                border: none !important;
                outline: none !important;
                margin: 0 !important;
                padding: 1cm !important;
                width: 210mm !important;
                height: auto !important;
                min-height: 0 !important;
                background: white !important;
                position: relative !important;
              }
              .latex-sheet-sans *, .latex-sheet-serif *, .latex-sheet-charter *, .latex-sheet-ats * {
                visibility: visible !important;
              }
              .resume-entry-block {
                page-break-inside: avoid !important;
                break-inside: avoid !important;
              }
            }
          `}</style>

          {/* Action Header Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }} className="no-print">
            <div>
              <h1 style={{ fontSize: "26px", fontWeight: "800", color: "white", margin: 0 }}>
                📄 Overleaf Resume Builder
              </h1>
              <p style={{ color: "#9ca3af", margin: "2px 0 0 0", fontSize: "13px" }}>
                Select a LaTeX format, edit your information, customize section titles, and print to PDF.
              </p>
            </div>
            
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={resetToSample} className="tab-btn" title="Reload default template data">
                <FaUndo /> Load Latex Sample
              </button>
              <button onClick={resetToBlank} className="tab-btn" title="Clear all fields">
                <FaTrash /> Start Blank
              </button>
            </div>
          </div>

          {/* Template Chooser Bar */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center", background: "rgba(255,255,255,0.02)", padding: "10px 15px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.05)" }} className="no-print">
            <span style={{ fontSize: "13px", fontWeight: "700", color: "#9ca3af" }}>Choose Format:</span>
            <button className={`tab-btn ${template === "classic-sans" ? "active" : ""}`} onClick={() => setTemplate("classic-sans")}>
              💻 Format 1: Classic Sans (Harshibar)
            </button>
            <button className={`tab-btn ${template === "academic-serif" ? "active" : ""}`} onClick={() => setTemplate("academic-serif")}>
              🎓 Format 2: Academic Serif (Puneet)
            </button>
            <button className={`tab-btn ${template === "minimal-charter" ? "active" : ""}`} onClick={() => setTemplate("minimal-charter")}>
              ✒️ Format 3: Minimalist (Jake Gutierrez)
            </button>
            <button className={`tab-btn ${template === "ats-friendly" ? "active" : ""}`} onClick={() => setTemplate("ats-friendly")}>
              📋 Format 4: ATS Friendly (Rahul Potdar)
            </button>
          </div>

          <div className="builder-grid">
            {/* LEFT PANEL: INPUT FORM EDITOR */}
            <div className="editor-panel no-print">
              {/* Tab Selector */}
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "12px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "12px" }}>
                <button className={`tab-btn ${activeTab === "personal" ? "active" : ""}`} onClick={() => setActiveTab("personal")}>
                  <FaUser /> Personal
                </button>
                <button className={`tab-btn ${activeTab === "headings" ? "active" : ""}`} onClick={() => setActiveTab("headings")}>
                  <FaCog /> Headings
                </button>
                <button className={`tab-btn ${activeTab === "experience" ? "active" : ""}`} onClick={() => setActiveTab("experience")}>
                  <FaBriefcase /> Experience
                </button>
                <button className={`tab-btn ${activeTab === "projects" ? "active" : ""}`} onClick={() => setActiveTab("projects")}>
                  <FaSlidersH /> Projects
                </button>
                <button className={`tab-btn ${activeTab === "education" ? "active" : ""}`} onClick={() => setActiveTab("education")}>
                  <FaGraduationCap /> Education
                </button>
                <button className={`tab-btn ${activeTab === "skills" ? "active" : ""}`} onClick={() => setActiveTab("skills")}>
                  <FaCode /> Skills
                </button>
                <button className={`tab-btn ${activeTab === "extra" ? "active" : ""}`} onClick={() => setActiveTab("extra")}>
                  <FaList /> Extra
                </button>
              </div>

              {/* PERSONAL INFO TAB */}
              {activeTab === "personal" && (
                <div className="form-section">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" value={resumeData.personal.name} onChange={(e) => handlePersonalChange("name", e.target.value)} placeholder="Jake Gutierrez" />
                  </div>
                  <div className="form-group">
                    <label>Professional Title / Subtitle (Format 4 Only)</label>
                    <input type="text" value={resumeData.personal.title || ""} onChange={(e) => handlePersonalChange("title", e.target.value)} placeholder="Software Developer | Java | Spring Boot" />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="text" value={resumeData.personal.phone} onChange={(e) => handlePersonalChange("phone", e.target.value)} placeholder="+91-XXXXXXXXXX" />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" value={resumeData.personal.email} onChange={(e) => handlePersonalChange("email", e.target.value)} placeholder="youremail@gmail.com" />
                  </div>
                  <div className="form-group">
                    <label>Link Label / Text</label>
                    <input type="text" value={resumeData.personal.linkText} onChange={(e) => handlePersonalChange("linkText", e.target.value)} placeholder="your-linkedin" />
                  </div>
                  <div className="form-group">
                    <label>Link URL</label>
                    <input type="text" value={resumeData.personal.linkUrl} onChange={(e) => handlePersonalChange("linkUrl", e.target.value)} placeholder="https://linkedin.com/..." />
                  </div>
                  <div className="form-group">
                    <label>Location / GitHub Label</label>
                    <input type="text" value={resumeData.personal.location} onChange={(e) => handlePersonalChange("location", e.target.value)} placeholder="yourgithub" />
                  </div>
                  <div className="form-group">
                    <label>Course / Degree (Format 2 Only)</label>
                    <input type="text" value={resumeData.personal.course} onChange={(e) => handlePersonalChange("course", e.target.value)} placeholder="Bachelor of Engineering" />
                  </div>
                  <div className="form-group">
                    <label>University / Institute (Format 2 Only)</label>
                    <input type="text" value={resumeData.personal.institute} onChange={(e) => handlePersonalChange("institute", e.target.value)} placeholder="Institute of Technology" />
                  </div>
                </div>
              )}

              {/* HEADINGS & VISIBILITY TAB */}
              {activeTab === "headings" && (
                <div className="form-section">
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontWeight: "700", color: "white", fontSize: "14px" }}>Section Ordering & Visibility</span>
                    <span style={{ fontSize: "11px", color: "#9ca3af", marginBottom: "8px" }}>Use up/down arrows to reorder sections. Toggle checkbox to show/hide.</span>
                  </div>
                  
                  {(resumeData.sectionOrder || defaultResumeData.sectionOrder).map((section, idx) => (
                    <div key={section} style={{ display: "flex", flexDirection: "column", gap: "8px", background: "rgba(255,255,255,0.02)", padding: "12px", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px" }}>
                      <div className="toggle-row" style={{ background: "none", padding: 0, border: "none" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <button onClick={() => moveSection(idx, "up")} disabled={idx === 0} style={{ background: "none", border: "none", color: idx === 0 ? "#4b5563" : "#3b82f6", cursor: idx === 0 ? "default" : "pointer", padding: "2px" }} title="Move Section Up">
                            <FaArrowUp size={11} />
                          </button>
                          <button onClick={() => moveSection(idx, "down")} disabled={idx === (resumeData.sectionOrder || []).length - 1} style={{ background: "none", border: "none", color: idx === (resumeData.sectionOrder || []).length - 1 ? "#4b5563" : "#3b82f6", cursor: idx === (resumeData.sectionOrder || []).length - 1 ? "default" : "pointer", padding: "2px" }} title="Move Section Down">
                            <FaArrowDown size={11} />
                          </button>
                          <span style={{ textTransform: "capitalize", fontWeight: "600", fontSize: "13px", color: "white", marginLeft: "4px" }}>
                            {section === "responsibility" ? "Responsibility" : section}
                          </span>
                        </div>
                        <input
                          type="checkbox"
                          checked={resumeData.visibleSections[section]}
                          onChange={() => handleVisibilityToggle(section)}
                          style={{ width: "18px", height: "18px", cursor: "pointer", marginTop: 0 }}
                        />
                      </div>
                      
                      {resumeData.visibleSections[section] && (
                        <div className="form-group" style={{ marginTop: "4px" }}>
                          <label>Display Heading Title</label>
                          <input
                            type="text"
                            value={resumeData.headings[section]}
                            onChange={(e) => handleHeadingChange(section, e.target.value)}
                            placeholder={section.toUpperCase()}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* EXPERIENCE TAB */}
              {activeTab === "experience" && (
                <div className="form-section">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: "700", color: "white" }}>Work Experience</span>
                    <button className="tab-btn active" onClick={() => addItem("experience", { company: "Company Name", title: "Job Title", linkText: "", linkUrl: "", location: "", dates: "Start -- End", bullets: ["New bullet point"] })} style={{ padding: "6px 12px", fontSize: "12px" }}>
                      <FaPlus /> Add Job
                    </button>
                  </div>
                  
                  {resumeData.experience.map((exp, idx) => (
                    <div key={idx} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px", padding: "14px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "13px", fontWeight: "700", color: "#60a5fa" }}>Role #{idx + 1}</span>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                          <button onClick={() => moveItem("experience", idx, "up")} disabled={idx === 0} style={{ background: "none", border: "none", color: idx === 0 ? "#4b5563" : "#3b82f6", cursor: idx === 0 ? "default" : "pointer" }} title="Move Up">
                            <FaArrowUp size={12} />
                          </button>
                          <button onClick={() => moveItem("experience", idx, "down")} disabled={idx === resumeData.experience.length - 1} style={{ background: "none", border: "none", color: idx === resumeData.experience.length - 1 ? "#4b5563" : "#3b82f6", cursor: idx === resumeData.experience.length - 1 ? "default" : "pointer" }} title="Move Down">
                            <FaArrowDown size={12} />
                          </button>
                          <button onClick={() => deleteItem("experience", idx)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer" }} title="Delete Job">
                            <FaTrash size={13} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <input type="text" value={exp.company} onChange={(e) => handleItemChange("experience", idx, "company", e.target.value)} placeholder="Company Name" />
                      </div>
                      <div className="form-group">
                        <input type="text" value={exp.title} onChange={(e) => handleItemChange("experience", idx, "title", e.target.value)} placeholder="Job Title" />
                      </div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <div className="form-group" style={{ flex: 1 }}>
                          <input type="text" value={exp.location} onChange={(e) => handleItemChange("experience", idx, "location", e.target.value)} placeholder="Location (Optional)" />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                          <input type="text" value={exp.dates} onChange={(e) => handleItemChange("experience", idx, "dates", e.target.value)} placeholder="Dates" />
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <div className="form-group" style={{ flex: 1 }}>
                          <input type="text" value={exp.linkText || ""} onChange={(e) => handleItemChange("experience", idx, "linkText", e.target.value)} placeholder="Link Label" />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                          <input type="text" value={exp.linkUrl || ""} onChange={(e) => handleItemChange("experience", idx, "linkUrl", e.target.value)} placeholder="Link URL" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Achievements (One bullet per line)</label>
                        <textarea
                          rows={4}
                          value={exp.bullets.join("\n")}
                          onChange={(e) => handleItemChange("experience", idx, "bullets", e.target.value.split("\n"))}
                          placeholder="Bullet achievements..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* PROJECTS TAB */}
              {activeTab === "projects" && (
                <div className="form-section">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: "700", color: "white" }}>Projects</span>
                    <button className="tab-btn active" onClick={() => addItem("projects", { name: "Project Name", role: "Developer", dates: "Start -- End", linkText: "", linkUrl: "", bullets: ["New bullet point"] })} style={{ padding: "6px 12px", fontSize: "12px" }}>
                      <FaPlus /> Add Project
                    </button>
                  </div>
                  
                  {resumeData.projects.map((proj, idx) => (
                    <div key={idx} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px", padding: "14px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "13px", fontWeight: "700", color: "#60a5fa" }}>Project #{idx + 1}</span>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                          <button onClick={() => moveItem("projects", idx, "up")} disabled={idx === 0} style={{ background: "none", border: "none", color: idx === 0 ? "#4b5563" : "#3b82f6", cursor: idx === 0 ? "default" : "pointer" }} title="Move Up">
                            <FaArrowUp size={12} />
                          </button>
                          <button onClick={() => moveItem("projects", idx, "down")} disabled={idx === resumeData.projects.length - 1} style={{ background: "none", border: "none", color: idx === resumeData.projects.length - 1 ? "#4b5563" : "#3b82f6", cursor: idx === resumeData.projects.length - 1 ? "default" : "pointer" }} title="Move Down">
                            <FaArrowDown size={12} />
                          </button>
                          <button onClick={() => deleteItem("projects", idx)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer" }} title="Delete Project">
                            <FaTrash size={13} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <input type="text" value={proj.name} onChange={(e) => handleItemChange("projects", idx, "name", e.target.value)} placeholder="Project Name" />
                      </div>
                      <div className="form-group">
                        <input type="text" value={proj.role || ""} onChange={(e) => handleItemChange("projects", idx, "role", e.target.value)} placeholder="Role or Sub-title (Format 2/3)" />
                      </div>
                      <div className="form-group">
                        <input type="text" value={proj.dates} onChange={(e) => handleItemChange("projects", idx, "dates", e.target.value)} placeholder="Dates" />
                      </div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <div className="form-group" style={{ flex: 1 }}>
                          <input type="text" value={proj.linkText || ""} onChange={(e) => handleItemChange("projects", idx, "linkText", e.target.value)} placeholder="Link Label" />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                          <input type="text" value={proj.linkUrl || ""} onChange={(e) => handleItemChange("projects", idx, "linkUrl", e.target.value)} placeholder="Link URL" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Achievements (One bullet per line)</label>
                        <textarea
                          rows={4}
                          value={proj.bullets.join("\n")}
                          onChange={(e) => handleItemChange("projects", idx, "bullets", e.target.value.split("\n"))}
                          placeholder="Project details..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* EDUCATION TAB */}
              {activeTab === "education" && (
                <div className="form-section">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: "700", color: "white" }}>Education</span>
                    <button className="tab-btn active" onClick={() => addItem("education", { school: "School Name", degree: "Degree / Diploma", location: "", dates: "Year Range", cgpa: "CGPA / %", bullets: [] })} style={{ padding: "6px 12px", fontSize: "12px" }}>
                      <FaPlus /> Add School
                    </button>
                  </div>
                  
                  {resumeData.education.map((edu, idx) => (
                    <div key={idx} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px", padding: "14px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "13px", fontWeight: "700", color: "#60a5fa" }}>School #{idx + 1}</span>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                          <button onClick={() => moveItem("education", idx, "up")} disabled={idx === 0} style={{ background: "none", border: "none", color: idx === 0 ? "#4b5563" : "#3b82f6", cursor: idx === 0 ? "default" : "pointer" }} title="Move Up">
                            <FaArrowUp size={12} />
                          </button>
                          <button onClick={() => moveItem("education", idx, "down")} disabled={idx === resumeData.education.length - 1} style={{ background: "none", border: "none", color: idx === resumeData.education.length - 1 ? "#4b5563" : "#3b82f6", cursor: idx === resumeData.education.length - 1 ? "default" : "pointer" }} title="Move Down">
                            <FaArrowDown size={12} />
                          </button>
                          <button onClick={() => deleteItem("education", idx)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer" }} title="Delete School">
                            <FaTrash size={13} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <input type="text" value={edu.school} onChange={(e) => handleItemChange("education", idx, "school", e.target.value)} placeholder="School Name" />
                      </div>
                      <div className="form-group">
                        <input type="text" value={edu.degree} onChange={(e) => handleItemChange("education", idx, "degree", e.target.value)} placeholder="Degree / Certificate" />
                      </div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <div className="form-group" style={{ flex: 1 }}>
                          <input type="text" value={edu.location} onChange={(e) => handleItemChange("education", idx, "location", e.target.value)} placeholder="Location (Format 1 Only)" />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                          <input type="text" value={edu.year || edu.dates} onChange={(e) => handleItemChange("education", idx, "year", e.target.value)} placeholder="Year (e.g. 2019-2023)" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>CGPA / Percentage</label>
                        <input type="text" value={edu.cgpa} onChange={(e) => handleItemChange("education", idx, "cgpa", e.target.value)} placeholder="e.g. 8.98 CGPA / 90.2%" />
                      </div>
                      <div className="form-group">
                        <label>Details / Bullets (Format 1 Only)</label>
                        <textarea
                          rows={3}
                          value={edu.bullets ? edu.bullets.join("\n") : ""}
                          onChange={(e) => handleItemChange("education", idx, "bullets", e.target.value.split("\n"))}
                          placeholder="Research, coursework..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TECHNICAL SKILLS TAB */}
              {activeTab === "skills" && (
                <div className="form-section">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: "700", color: "white" }}>Skills Categories</span>
                    <button className="tab-btn active" onClick={() => addItem("skills", { category: "Category Name", items: "Skill A, Skill B" })} style={{ padding: "6px 12px", fontSize: "12px" }}>
                      <FaPlus /> Add Category
                    </button>
                  </div>
                  
                  {resumeData.skills.map((sk, idx) => (
                    <div key={idx} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px", padding: "14px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "13px", fontWeight: "700", color: "#60a5fa" }}>Category #{idx + 1}</span>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                          <button onClick={() => moveItem("skills", idx, "up")} disabled={idx === 0} style={{ background: "none", border: "none", color: idx === 0 ? "#4b5563" : "#3b82f6", cursor: idx === 0 ? "default" : "pointer" }} title="Move Up">
                            <FaArrowUp size={12} />
                          </button>
                          <button onClick={() => moveItem("skills", idx, "down")} disabled={idx === resumeData.skills.length - 1} style={{ background: "none", border: "none", color: idx === resumeData.skills.length - 1 ? "#4b5563" : "#3b82f6", cursor: idx === resumeData.skills.length - 1 ? "default" : "pointer" }} title="Move Down">
                            <FaArrowDown size={12} />
                          </button>
                          <button onClick={() => deleteItem("skills", idx)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer" }} title="Delete Category">
                            <FaTrash size={13} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <input type="text" value={sk.category} onChange={(e) => handleItemChange("skills", idx, "category", e.target.value)} placeholder="e.g. Programming Languages" />
                      </div>
                      <div className="form-group">
                        <textarea
                          rows={3}
                          value={sk.items}
                          onChange={(e) => handleItemChange("skills", idx, "items", e.target.value)}
                          placeholder="Java, Python, C++..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* EXTRA RESUME FIELDS TAB */}
              {activeTab === "extra" && (
                <div className="form-section">
                  {/* Summary field */}
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px", padding: "14px" }} className="form-group">
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "700", color: "white" }}><FaQuoteLeft /> Professional Summary</label>
                    <textarea
                      rows={4}
                      value={resumeData.summaryText}
                      onChange={(e) => setResumeData(prev => ({ ...prev, summaryText: e.target.value }))}
                      placeholder="Brief overview profile description..."
                    />
                  </div>

                  {/* Certifications field */}
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px", padding: "14px", display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <label style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "700", color: "white", margin: 0 }}><FaCertificate /> Certifications</label>
                      <button className="tab-btn active" onClick={() => addItem("certifications", { name: "Certification Name", institution: "Institution", dates: "Year", linkUrl: "" })} style={{ padding: "4px 8px", fontSize: "11px" }}>
                        <FaPlus /> Add
                      </button>
                    </div>
                    
                    {resumeData.certifications && resumeData.certifications.map((cert, idx) => (
                      <div key={idx} style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "8px", padding: "10px", display: "flex", flexDirection: "column", gap: "6px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "11px", fontWeight: "bold", color: "#60a5fa" }}>Cert #{idx + 1}</span>
                          <div style={{ display: "flex", gap: "6px" }}>
                            <button onClick={() => moveItem("certifications", idx, "up")} disabled={idx === 0} style={{ background: "none", border: "none", color: idx === 0 ? "#4b5563" : "#3b82f6", cursor: idx === 0 ? "default" : "pointer" }}>
                              <FaArrowUp size={11} />
                            </button>
                            <button onClick={() => moveItem("certifications", idx, "down")} disabled={idx === resumeData.certifications.length - 1} style={{ background: "none", border: "none", color: idx === resumeData.certifications.length - 1 ? "#4b5563" : "#3b82f6", cursor: idx === resumeData.certifications.length - 1 ? "default" : "pointer" }}>
                              <FaArrowDown size={11} />
                            </button>
                            <button onClick={() => deleteItem("certifications", idx)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer" }}>
                              <FaTrash size={12} />
                            </button>
                          </div>
                        </div>
                        
                        <input type="text" value={cert.name} onChange={(e) => handleItemChange("certifications", idx, "name", e.target.value)} placeholder="Certification Title (e.g. Harvard CS50)" />
                        <input type="text" value={cert.institution} onChange={(e) => handleItemChange("certifications", idx, "institution", e.target.value)} placeholder="Institution / Authority" />
                        <div style={{ display: "flex", gap: "6px" }}>
                          <input type="text" value={cert.dates || cert.year || ""} onChange={(e) => handleItemChange("certifications", idx, "dates", e.target.value)} placeholder="Year / Label" style={{ flex: 1 }} />
                          <input type="text" value={cert.linkUrl || ""} onChange={(e) => handleItemChange("certifications", idx, "linkUrl", e.target.value)} placeholder="Link URL (Clickable)" style={{ flex: 1.5 }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Positions of Responsibility field */}
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px", padding: "14px", display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <label style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "700", color: "white", margin: 0 }}><FaAward /> Responsibility</label>
                      <button className="tab-btn active" onClick={() => addItem("responsibility", { role: "Role Title", club: "XYZ Club", dates: "Year", linkUrl: "" })} style={{ padding: "4px 8px", fontSize: "11px" }}>
                        <FaPlus /> Add
                      </button>
                    </div>

                    {resumeData.responsibility && resumeData.responsibility.map((resp, idx) => (
                      <div key={idx} style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "8px", padding: "10px", display: "flex", flexDirection: "column", gap: "6px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "11px", fontWeight: "bold", color: "#60a5fa" }}>Role #{idx + 1}</span>
                          <div style={{ display: "flex", gap: "6px" }}>
                            <button onClick={() => moveItem("responsibility", idx, "up")} disabled={idx === 0} style={{ background: "none", border: "none", color: idx === 0 ? "#4b5563" : "#3b82f6", cursor: idx === 0 ? "default" : "pointer" }}>
                              <FaArrowUp size={11} />
                            </button>
                            <button onClick={() => moveItem("responsibility", idx, "down")} disabled={idx === resumeData.responsibility.length - 1} style={{ background: "none", border: "none", color: idx === resumeData.responsibility.length - 1 ? "#4b5563" : "#3b82f6", cursor: idx === resumeData.responsibility.length - 1 ? "default" : "pointer" }}>
                              <FaArrowDown size={11} />
                            </button>
                            <button onClick={() => deleteItem("responsibility", idx)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer" }}>
                              <FaTrash size={12} />
                            </button>
                          </div>
                        </div>
                        
                        <input type="text" value={resp.role} onChange={(e) => handleItemChange("responsibility", idx, "role", e.target.value)} placeholder="Position Title" />
                        <input type="text" value={resp.club} onChange={(e) => handleItemChange("responsibility", idx, "club", e.target.value)} placeholder="Organization / Club" />
                        <div style={{ display: "flex", gap: "6px" }}>
                          <input type="text" value={resp.dates} onChange={(e) => handleItemChange("responsibility", idx, "dates", e.target.value)} placeholder="Year Range" style={{ flex: 1 }} />
                          <input type="text" value={resp.linkUrl || ""} onChange={(e) => handleItemChange("responsibility", idx, "linkUrl", e.target.value)} placeholder="Link URL" style={{ flex: 1.5 }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Miscellaneous Achievements field */}
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px", padding: "14px", display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <label style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "700", color: "white", margin: 0 }}><FaAward /> Miscellaneous</label>
                      <button className="tab-btn active" onClick={() => addItem("miscellaneous", { achievement: "Achievement", detail: "About it", dates: "Year", linkUrl: "" })} style={{ padding: "4px 8px", fontSize: "11px" }}>
                        <FaPlus /> Add
                      </button>
                    </div>

                    {resumeData.miscellaneous && resumeData.miscellaneous.map((misc, idx) => (
                      <div key={idx} style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "8px", padding: "10px", display: "flex", flexDirection: "column", gap: "6px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "11px", fontWeight: "bold", color: "#60a5fa" }}>Misc #{idx + 1}</span>
                          <div style={{ display: "flex", gap: "6px" }}>
                            <button onClick={() => moveItem("miscellaneous", idx, "up")} disabled={idx === 0} style={{ background: "none", border: "none", color: idx === 0 ? "#4b5563" : "#3b82f6", cursor: idx === 0 ? "default" : "pointer" }}>
                              <FaArrowUp size={11} />
                            </button>
                            <button onClick={() => moveItem("miscellaneous", idx, "down")} disabled={idx === resumeData.miscellaneous.length - 1} style={{ background: "none", border: "none", color: idx === resumeData.miscellaneous.length - 1 ? "#4b5563" : "#3b82f6", cursor: idx === resumeData.miscellaneous.length - 1 ? "default" : "pointer" }}>
                              <FaArrowDown size={11} />
                            </button>
                            <button onClick={() => deleteItem("miscellaneous", idx)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer" }}>
                              <FaTrash size={12} />
                            </button>
                          </div>
                        </div>
                        
                        <input type="text" value={misc.achievement} onChange={(e) => handleItemChange("miscellaneous", idx, "achievement", e.target.value)} placeholder="Achievement / Award Name" />
                        <input type="text" value={misc.detail} onChange={(e) => handleItemChange("miscellaneous", idx, "detail", e.target.value)} placeholder="Description / Details" />
                        <div style={{ display: "flex", gap: "6px" }}>
                          <input type="text" value={misc.dates} onChange={(e) => handleItemChange("miscellaneous", idx, "dates", e.target.value)} placeholder="Year" style={{ flex: 1 }} />
                          <input type="text" value={misc.linkUrl || ""} onChange={(e) => handleItemChange("miscellaneous", idx, "linkUrl", e.target.value)} placeholder="Link URL" style={{ flex: 1.5 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT PANEL: LIVE SHEET PREVIEW */}
            <div className="preview-panel">
              <div className="preview-header-bar no-print" style={{ flexDirection: "column", alignItems: "stretch", gap: "8px", padding: "12px 20px" }}>
                {/* Row 1: Title and Export Button */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                  <span style={{ color: "#9ca3af", fontSize: "13px", fontWeight: "600" }}>
                    Live LaTeX Preview
                  </span>
                  
                  <button
                    onClick={() => window.print()}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      background: "linear-gradient(135deg, #10b981, #059669)",
                      color: "white",
                      fontSize: "13px",
                      fontWeight: "bold",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      cursor: "pointer"
                    }}
                  >
                    <FaFilePdf /> Export PDF
                  </button>
                </div>

                {/* Row 2: Sliders */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "8px" }}>
                  {/* Font Size Slider */}
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "11px", color: "#6b7280" }}>Font Size:</span>
                    <input
                      type="range"
                      min="7.5"
                      max="11"
                      step="0.1"
                      value={resumeFontSize}
                      onChange={(e) => setResumeFontSize(parseFloat(e.target.value))}
                      style={{ width: "85px", accentColor: "#3b82f6", cursor: "pointer" }}
                    />
                    <span style={{ fontSize: "11px", color: "#9ca3af", width: "35px", textAlign: "right" }}>{resumeFontSize.toFixed(1)}pt</span>
                  </div>

                  {/* Zoom Slider */}
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "11px", color: "#6b7280" }}>Zoom:</span>
                    <input
                      type="range"
                      min="0.5"
                      max="1.2"
                      step="0.05"
                      value={previewZoom}
                      onChange={(e) => setPreviewZoom(parseFloat(e.target.value))}
                      style={{ width: "80px", accentColor: "#3b82f6", cursor: "pointer" }}
                    />
                    <span style={{ fontSize: "11px", color: "#9ca3af", width: "28px", textAlign: "right" }}>{Math.round(previewZoom * 100)}%</span>
                  </div>
                </div>
              </div>

              <div className="preview-body-container">
                
                {/* FORMAT 1: CLASSIC SANS (Harshibar) */}
                {template === "classic-sans" && (
                  <div className="latex-sheet-sans" style={{ fontSize: `${resumeFontSize}pt`, transform: `scale(${previewZoom})` }}>
                    <div className="name-header">{resumeData.personal.name || "YOUR NAME"}</div>
                    
                    <div className="contact-line">
                      {resumeData.personal.phone && (
                        <>
                          <span>📞 {resumeData.personal.phone}</span>
                          <span>|</span>
                        </>
                      )}
                      {resumeData.personal.email && (
                        <>
                          <span>✉️ <a href={`mailto:${resumeData.personal.email}`}>{resumeData.personal.email}</a></span>
                          <span>|</span>
                        </>
                      )}
                      {resumeData.personal.linkText && (
                        <>
                          <span>🌐 <a href={ensureAbsoluteUrl(resumeData.personal.linkUrl)} target="_blank" rel="noreferrer">{resumeData.personal.linkText}</a></span>
                          <span>|</span>
                        </>
                      )}
                      {resumeData.personal.location && (
                        <span>📍 {resumeData.personal.location}</span>
                      )}
                    </div>

                    {/* Render sections in custom order */}
                    {(resumeData.sectionOrder || [
                      "summary",
                      "education",
                      "experience",
                      "projects",
                      "skills",
                      "certifications",
                      "responsibility",
                      "miscellaneous"
                    ]).map((sectionKey) => {
                      if (sectionKey === "summary" && resumeData.visibleSections.summary && resumeData.summaryText) {
                        return (
                          <div key="summary">
                            <div className="section-title">{resumeData.headings.summary}</div>
                            <div style={{ fontSize: "9.5pt", marginTop: "4px", lineHeight: "1.35" }}>
                              {resumeData.summaryText}
                            </div>
                          </div>
                        );
                      }
                      
                      if (sectionKey === "experience" && resumeData.visibleSections.experience && resumeData.experience.length > 0) {
                        return (
                          <div key="experience">
                            <div className="section-title">{resumeData.headings.experience}</div>
                            {resumeData.experience.map((exp, idx) => (
                              <div key={idx} className="resume-entry-block" style={{ marginBottom: "10px" }}>
                                <div className="entry-row">
                                  <span className="entry-title">
                                    {exp.linkUrl ? (
                                      <a href={ensureAbsoluteUrl(exp.linkUrl)} target="_blank" rel="noreferrer">{exp.company}</a>
                                    ) : (
                                      exp.company
                                    )}
                                  </span>
                                  <span className="entry-right">{exp.dates}</span>
                                </div>
                                <div className="entry-row" style={{ marginTop: "1px", marginBottom: "3px" }}>
                                  <span className="entry-subtitle">
                                    {exp.title}
                                    {exp.linkText && (
                                      <>
                                        {" "}
                                        (<a href={ensureAbsoluteUrl(exp.linkUrl || exp.linkText)} target="_blank" rel="noreferrer">{exp.linkText}</a>)
                                      </>
                                    )}
                                  </span>
                                  <span className="entry-right">{exp.location}</span>
                                </div>
                                {exp.bullets && exp.bullets.filter(b => b.trim() !== "").length > 0 && (
                                  <ul className="bullet-list">
                                    {exp.bullets.filter(b => b.trim() !== "").map((b, bIdx) => (
                                      <li key={bIdx} className="bullet-item">{formatText(b)}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        );
                      }
                      
                      if (sectionKey === "projects" && resumeData.visibleSections.projects && resumeData.projects.length > 0) {
                        return (
                          <div key="projects">
                            <div className="section-title">{resumeData.headings.projects}</div>
                            {resumeData.projects.map((proj, idx) => (
                              <div key={idx} className="resume-entry-block" style={{ marginBottom: "10px" }}>
                                <div className="entry-row" style={{ marginBottom: "3px" }}>
                                  <span className="entry-title">
                                    {proj.linkUrl ? (
                                      <a href={ensureAbsoluteUrl(proj.linkUrl)} target="_blank" rel="noreferrer">{proj.name}</a>
                                    ) : (
                                      proj.name
                                    )}
                                    {proj.linkText && (
                                      <>
                                        {" "}
                                        (<a href={ensureAbsoluteUrl(proj.linkUrl || proj.linkText)} target="_blank" rel="noreferrer">{proj.linkText}</a>)
                                      </>
                                    )}
                                  </span>
                                  <span className="entry-right">{proj.dates}</span>
                                </div>
                                {proj.bullets && proj.bullets.filter(b => b.trim() !== "").length > 0 && (
                                  <ul className="bullet-list">
                                    {proj.bullets.filter(b => b.trim() !== "").map((b, bIdx) => (
                                      <li key={bIdx} className="bullet-item">{formatText(b)}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        );
                      }
                      
                      if (sectionKey === "education" && resumeData.visibleSections.education && resumeData.education.length > 0) {
                        return (
                          <div key="education">
                            <div className="section-title">{resumeData.headings.education}</div>
                            {resumeData.education.map((edu, idx) => (
                              <div key={idx} className="resume-entry-block" style={{ marginBottom: "10px" }}>
                                <div className="entry-row">
                                  <span className="entry-title">{edu.school}</span>
                                  <span className="entry-right">{edu.year || edu.dates}</span>
                                </div>
                                <div className="entry-row" style={{ marginTop: "1px", marginBottom: "3px" }}>
                                  <span className="entry-subtitle">{edu.degree} ({edu.cgpa})</span>
                                  <span className="entry-right">{edu.location}</span>
                                </div>
                                {edu.bullets && edu.bullets.filter(b => b.trim() !== "").length > 0 && (
                                  <ul className="bullet-list">
                                    {edu.bullets.filter(b => b.trim() !== "").map((b, bIdx) => (
                                      <li key={bIdx} className="bullet-item">{formatText(b)}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        );
                      }
                      
                      if (sectionKey === "skills" && resumeData.visibleSections.skills && resumeData.skills.length > 0) {
                        return (
                          <div key="skills">
                            <div className="section-title">{resumeData.headings.skills}</div>
                            <div className="latex-skills-list" style={{ fontSize: "9.5pt", marginTop: "5px", lineHeight: "1.45" }}>
                              {resumeData.skills.map((sk, idx) => (
                                <div key={idx}>
                                  <strong>{sk.category}</strong>: {sk.items}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      
                      if (sectionKey === "certifications" && resumeData.visibleSections.certifications && resumeData.certifications.length > 0) {
                        return (
                          <div key="certifications">
                            <div className="section-title">{resumeData.headings.certifications}</div>
                            <ul className="bullet-list" style={{ listStyleType: "none", paddingLeft: 0 }}>
                              {resumeData.certifications.map((cert, idx) => (
                                <li key={idx} className="bullet-item" style={{ listStyleType: "none", paddingLeft: 0, marginLeft: 0 }}>
                                  {cert.linkUrl ? (
                                    <a href={ensureAbsoluteUrl(cert.linkUrl)} target="_blank" rel="noreferrer">
                                      <strong>{cert.name}</strong>
                                    </a>
                                  ) : (
                                    <strong>{cert.name}</strong>
                                  )}
                                  {" -- "}{cert.institution} ({cert.dates})
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      }
                      
                      if (sectionKey === "responsibility" && resumeData.visibleSections.responsibility && resumeData.responsibility.length > 0) {
                        return (
                          <div key="responsibility">
                            <div className="section-title">{resumeData.headings.responsibility}</div>
                            <ul className="bullet-list">
                              {resumeData.responsibility.map((resp, idx) => (
                                <li key={idx} className="bullet-item">
                                  {resp.linkUrl ? (
                                    <a href={ensureAbsoluteUrl(resp.linkUrl)} target="_blank" rel="noreferrer">
                                      <strong>{resp.role}</strong>
                                    </a>
                                  ) : (
                                    <strong>{resp.role}</strong>
                                  )}
                                  {", "}{resp.club} ({resp.dates})
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      }
                      
                      if (sectionKey === "miscellaneous" && resumeData.visibleSections.miscellaneous && resumeData.miscellaneous.length > 0) {
                        return (
                          <div key="miscellaneous">
                            <div className="section-title">{resumeData.headings.miscellaneous}</div>
                            <ul className="bullet-list">
                              {resumeData.miscellaneous.map((misc, idx) => (
                                <li key={idx} className="bullet-item">
                                  {misc.linkUrl ? (
                                    <a href={ensureAbsoluteUrl(misc.linkUrl)} target="_blank" rel="noreferrer">
                                      <strong>{misc.achievement}</strong>
                                    </a>
                                  ) : (
                                    <strong>{misc.achievement}</strong>
                                  )}
                                  {": "}{misc.detail} ({misc.dates})
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      }
                      
                      return null;
                    })}
                  </div>
                )}

                {/* FORMAT 2: ACADEMIC SERIF (Puneet Gautam) */}
                {template === "academic-serif" && (
                  <div className="latex-sheet-serif" style={{ fontSize: `${resumeFontSize}pt`, transform: `scale(${previewZoom})` }}>
                    {/* Split Layout Header — no logo column */}
                    <table className="header-table">
                      <tbody>
                        <tr>
                          {/* Details Text */}
                          <td style={{ verticalAlign: "middle" }}>
                            <div className="header-name">{resumeData.personal.name || "FIRST NAME LAST NAME"}</div>
                            <div className="header-text-left" style={{ fontWeight: "bold" }}>
                              {resumeData.personal.course || "Bachelor of Technology"}
                            </div>
                            <div className="header-text-left">
                              {resumeData.personal.institute || "Guru Gobind Singh Indraprastha University, New Delhi"}
                            </div>
                          </td>
                          {/* Contact Info Links */}
                          <td className="header-text-right" style={{ verticalAlign: "middle" }}>
                            {resumeData.personal.phone && <div>+91-{resumeData.personal.phone}</div>}
                            {resumeData.personal.email && (
                              <div>
                                <a href={`mailto:${resumeData.personal.email}`}>{resumeData.personal.email}</a>
                              </div>
                            )}
                            {resumeData.personal.linkText && (
                              <div>
                                <a href={ensureAbsoluteUrl(resumeData.personal.linkUrl)} target="_blank" rel="noreferrer">
                                  {resumeData.personal.linkText}
                                </a>
                              </div>
                            )}
                            {resumeData.personal.location && <div>{resumeData.personal.location}</div>}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    {/* Render sections in custom order */}
                    {(resumeData.sectionOrder || [
                      "summary",
                      "education",
                      "experience",
                      "projects",
                      "skills",
                      "certifications",
                      "responsibility",
                      "miscellaneous"
                    ]).map((sectionKey) => {
                      if (sectionKey === "summary" && resumeData.visibleSections.summary && resumeData.summaryText) {
                        return (
                          <div key="summary">
                            <div className="section-title-box">{resumeData.headings.summary}</div>
                            <div style={{ fontSize: "9.5pt", padding: "0 4px", lineHeight: "1.35" }}>
                              {resumeData.summaryText}
                            </div>
                          </div>
                        );
                      }
                      
                      if (sectionKey === "education" && resumeData.visibleSections.education && resumeData.education.length > 0) {
                        return (
                          <div key="education">
                            <div className="section-title-box">{resumeData.headings.education}</div>
                            <table className="edu-table">
                              <thead>
                                <tr>
                                  <th style={{ width: "15%" }}>Year</th>
                                  <th style={{ width: "40%" }}>Degree/Certificate</th>
                                  <th style={{ width: "33%" }}>Institute</th>
                                  <th style={{ width: "12%" }}>CGPA/%</th>
                                </tr>
                              </thead>
                              <tbody>
                                {resumeData.education.map((edu, idx) => (
                                  <tr key={idx}>
                                    <td style={{ textAlign: "center" }}>{edu.year || edu.dates}</td>
                                    <td><strong style={{ fontWeight: "bold" }}>{edu.degree}</strong></td>
                                    <td>{edu.school}</td>
                                    <td style={{ textAlign: "center" }}>{edu.cgpa}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        );
                      }
                      
                      if (sectionKey === "experience" && resumeData.visibleSections.experience && resumeData.experience.length > 0) {
                        return (
                          <div key="experience">
                            <div className="section-title-box">{resumeData.headings.experience}</div>
                            {resumeData.experience.map((exp, idx) => (
                              <div key={idx} className="resume-entry-block" style={{ marginBottom: "8px", padding: "0 4px" }}>
                                <div className="entry-row">
                                  <span className="entry-title">
                                    {exp.linkUrl ? (
                                      <a href={ensureAbsoluteUrl(exp.linkUrl)} target="_blank" rel="noreferrer">{exp.company}</a>
                                    ) : (
                                      exp.company
                                    )}
                                  </span>
                                  <span className="latex-entry-date">{exp.dates}</span>
                                </div>
                                <div className="entry-row" style={{ marginTop: "1px", marginBottom: "3px" }}>
                                  <span className="entry-subtitle">{exp.title}</span>
                                  <span className="latex-entry-loc">{exp.location}</span>
                                </div>
                                {exp.bullets && exp.bullets.filter(b => b.trim() !== "").length > 0 && (
                                  <ul className="bullet-list">
                                    {exp.bullets.filter(b => b.trim() !== "").map((b, bIdx) => (
                                      <li key={bIdx} className="bullet-item">{formatText(b)}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        );
                      }
                      
                      if (sectionKey === "projects" && resumeData.visibleSections.projects && resumeData.projects.length > 0) {
                        return (
                          <div key="projects">
                            <div className="section-title-box">{resumeData.headings.projects}</div>
                            {resumeData.projects.map((proj, idx) => (
                              <div key={idx} className="resume-entry-block" style={{ marginBottom: "8px", padding: "0 4px" }}>
                                <div className="entry-row">
                                  <span className="entry-title">
                                    {proj.linkUrl ? (
                                      <a href={ensureAbsoluteUrl(proj.linkUrl)} target="_blank" rel="noreferrer">{proj.name}</a>
                                    ) : (
                                      proj.name
                                    )}
                                  </span>
                                  <span className="latex-entry-date">{proj.dates}</span>
                                </div>
                                <div className="entry-row" style={{ marginTop: "1px", marginBottom: "3px" }}>
                                  <span className="entry-subtitle">{proj.role || "Developer"}</span>
                                  {proj.linkText && (
                                    <span className="latex-entry-loc">
                                      <a href={ensureAbsoluteUrl(proj.linkUrl || proj.linkText)} target="_blank" rel="noreferrer" style={{ textDecoration: "underline", color: "inherit", fontWeight: "bold" }}>
                                        {proj.linkText}
                                      </a>
                                    </span>
                                  )}
                                </div>
                                {proj.bullets && proj.bullets.filter(b => b.trim() !== "").length > 0 && (
                                  <ul className="bullet-list">
                                    {proj.bullets.filter(b => b.trim() !== "").map((b, bIdx) => (
                                      <li key={bIdx} className="bullet-item">{formatText(b)}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        );
                      }
                      
                      if (sectionKey === "skills" && resumeData.visibleSections.skills && resumeData.skills.length > 0) {
                        return (
                          <div key="skills">
                            <div className="section-title-box">{resumeData.headings.skills}</div>
                            <div className="skills-container" style={{ padding: "0 4px" }}>
                              {resumeData.skills.map((sk, idx) => (
                                <div key={idx} className="skills-line">
                                  <strong style={{ fontWeight: "700" }}>{sk.category}</strong>: {sk.items}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      
                      if (sectionKey === "certifications" && resumeData.visibleSections.certifications && resumeData.certifications.length > 0) {
                        return (
                          <div key="certifications">
                            <div className="section-title-box">{resumeData.headings.certifications}</div>
                            <ul className="bullet-list" style={{ padding: "0 4px 0 20px" }}>
                              {resumeData.certifications.map((cert, idx) => (
                                <li key={idx} className="bullet-item">
                                  {cert.linkUrl ? (
                                    <a href={ensureAbsoluteUrl(cert.linkUrl)} target="_blank" rel="noreferrer">
                                      <strong style={{ fontWeight: "bold" }}>{cert.name}</strong>
                                    </a>
                                  ) : (
                                    <strong style={{ fontWeight: "bold" }}>{cert.name}</strong>
                                  )}
                                  {" -- "}{cert.institution} ({cert.dates})
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      }
                      
                      if (sectionKey === "responsibility" && resumeData.visibleSections.responsibility && resumeData.responsibility.length > 0) {
                        return (
                          <div key="responsibility">
                            <div className="section-title-box">{resumeData.headings.responsibility}</div>
                            {resumeData.responsibility.map((resp, idx) => (
                              <div key={idx} className="entry-row" style={{ padding: "0 4px", fontSize: "9.5pt", marginBottom: "2px" }}>
                                <span>
                                  {resp.linkUrl ? (
                                    <a href={ensureAbsoluteUrl(resp.linkUrl)} target="_blank" rel="noreferrer">
                                      <strong>{resp.role}</strong>
                                    </a>
                                  ) : (
                                    <strong>{resp.role}</strong>
                                  )}
                                  {", "}{resp.club}
                                </span>
                                <span>{resp.dates}</span>
                              </div>
                            ))}
                          </div>
                        );
                      }
                      
                      if (sectionKey === "miscellaneous" && resumeData.visibleSections.miscellaneous && resumeData.miscellaneous.length > 0) {
                        return (
                          <div key="miscellaneous">
                            <div className="section-title-box">{resumeData.headings.miscellaneous}</div>
                            {resumeData.miscellaneous.map((misc, idx) => (
                              <div key={idx} className="entry-row" style={{ padding: "0 4px", fontSize: "9.5pt", marginBottom: "2px" }}>
                                <span>
                                  {misc.linkUrl ? (
                                    <a href={ensureAbsoluteUrl(misc.linkUrl)} target="_blank" rel="noreferrer">
                                      <strong>{misc.achievement}</strong>
                                    </a>
                                  ) : (
                                    <strong>{misc.achievement}</strong>
                                  )}
                                  {": "}{misc.detail}
                                </span>
                                <span>{misc.dates}</span>
                              </div>
                            ))}
                          </div>
                        );
                      }
                      
                      return null;
                    })}
                    
                  </div>
                )}

                {/* FORMAT 3: MINIMALIST CHARTER (Jake Gutierrez) */}
                {template === "minimal-charter" && (
                  <div className="latex-sheet-charter" style={{ fontSize: `${resumeFontSize}pt`, transform: `scale(${previewZoom})` }}>
                    <div className="header-center">
                      <div className="header-name">{resumeData.personal.name || "YOUR NAME"}</div>
                      <div className="header-contact">
                        {resumeData.personal.phone && (
                          <span>📞 {resumeData.personal.phone}</span>
                        )}
                        {resumeData.personal.email && (
                          <span>✉️ <a href={`mailto:${resumeData.personal.email}`}>{resumeData.personal.email}</a></span>
                        )}
                        {resumeData.personal.linkText && (
                          <span>🌐 <a href={ensureAbsoluteUrl(resumeData.personal.linkUrl)} target="_blank" rel="noreferrer">{resumeData.personal.linkText}</a></span>
                        )}
                        {resumeData.personal.location && (
                          <span>📂 <a href={ensureAbsoluteUrl(resumeData.personal.location.includes(".") ? resumeData.personal.location : `https://github.com/${resumeData.personal.location}`)} target="_blank" rel="noreferrer">{resumeData.personal.location}</a></span>
                        )}
                      </div>
                    </div>

                    {/* Render sections in custom order */}
                    {(resumeData.sectionOrder || [
                      "skills",
                      "summary",
                      "experience",
                      "projects",
                      "education",
                      "certifications",
                      "responsibility",
                      "miscellaneous"
                    ]).map((sectionKey) => {
                      if (sectionKey === "summary" && resumeData.visibleSections.summary && resumeData.summaryText) {
                        return (
                          <div key="summary" style={{ marginBottom: "12px" }}>
                            <div className="section-title">{resumeData.headings.summary}</div>
                            <div style={{ fontSize: "9.5pt", paddingLeft: "10px", lineHeight: "1.35" }}>
                              {resumeData.summaryText}
                            </div>
                          </div>
                        );
                      }

                      if (sectionKey === "skills" && resumeData.visibleSections.skills && resumeData.skills.length > 0) {
                        return (
                          <div key="skills" style={{ marginBottom: "12px" }}>
                            <div className="section-title">{resumeData.headings.skills}</div>
                            <div style={{ paddingLeft: "10px" }}>
                              {resumeData.skills.map((sk, idx) => (
                                <div key={idx} className="skills-line">
                                  <strong>{sk.category}</strong>: {sk.items}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }

                      if (sectionKey === "experience" && resumeData.visibleSections.experience && resumeData.experience.length > 0) {
                        return (
                          <div key="experience" style={{ marginBottom: "12px" }}>
                            <div className="section-title">{resumeData.headings.experience}</div>
                            {resumeData.experience.map((exp, idx) => (
                              <div key={idx} className="resume-entry-block" style={{ marginBottom: "8px", paddingLeft: "10px" }}>
                                <div className="entry-row">
                                  <span className="entry-title">
                                    {exp.linkUrl ? (
                                      <a href={ensureAbsoluteUrl(exp.linkUrl)} target="_blank" rel="noreferrer">{exp.company}</a>
                                    ) : (
                                      exp.company
                                    )}
                                    {exp.linkText && (
                                      <>
                                        {" | "}
                                        <a href={ensureAbsoluteUrl(exp.linkUrl || exp.linkText)} target="_blank" rel="noreferrer">
                                          {exp.linkText}
                                        </a>
                                      </>
                                    )}
                                  </span>
                                  <span className="entry-dates">{exp.dates}</span>
                                </div>
                                <div className="entry-row" style={{ marginTop: "1px" }}>
                                  <span className="entry-subtitle">{exp.title}</span>
                                  {exp.location && <span style={{ fontSize: "9pt" }}>{exp.location}</span>}
                                </div>
                                {exp.bullets && exp.bullets.filter(b => b.trim() !== "").length > 0 && (
                                  <ul className="bullet-list">
                                    {exp.bullets.filter(b => b.trim() !== "").map((b, bIdx) => (
                                      <li key={bIdx} className="bullet-item">{formatText(b)}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        );
                      }

                      if (sectionKey === "projects" && resumeData.visibleSections.projects && resumeData.projects.length > 0) {
                        return (
                          <div key="projects" style={{ marginBottom: "12px" }}>
                            <div className="section-title">{resumeData.headings.projects}</div>
                            {resumeData.projects.map((proj, idx) => (
                              <div key={idx} className="resume-entry-block" style={{ marginBottom: "8px", paddingLeft: "10px" }}>
                                <div className="entry-row">
                                  <span className="entry-title">
                                    {proj.linkUrl ? (
                                      <a href={ensureAbsoluteUrl(proj.linkUrl)} target="_blank" rel="noreferrer">{proj.name}</a>
                                    ) : (
                                      proj.name
                                    )}
                                    {proj.linkText && (
                                      <>
                                        {" | "}
                                        <a href={ensureAbsoluteUrl(proj.linkUrl || proj.linkText)} target="_blank" rel="noreferrer">
                                          {proj.linkText}
                                        </a>
                                      </>
                                    )}
                                  </span>
                                  <span className="entry-dates">{proj.dates}</span>
                                </div>
                                <div style={{ fontSize: "9pt", fontStyle: "italic", marginTop: "1px" }}>
                                  {proj.role}
                                </div>
                                {proj.bullets && proj.bullets.filter(b => b.trim() !== "").length > 0 && (
                                  <ul className="bullet-list">
                                    {proj.bullets.filter(b => b.trim() !== "").map((b, bIdx) => (
                                      <li key={bIdx} className="bullet-item">{formatText(b)}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        );
                      }

                      if (sectionKey === "education" && resumeData.visibleSections.education && resumeData.education.length > 0) {
                        return (
                          <div key="education" style={{ marginBottom: "12px" }}>
                            <div className="section-title">{resumeData.headings.education}</div>
                            {resumeData.education.map((edu, idx) => (
                              <div key={idx} className="resume-entry-block" style={{ marginBottom: "6px", paddingLeft: "10px" }}>
                                <div className="entry-row">
                                  <span className="entry-title">{edu.school}</span>
                                  <span className="entry-dates">{edu.year || edu.dates}</span>
                                </div>
                                <div className="entry-row" style={{ marginTop: "1px" }}>
                                  <span className="entry-subtitle">
                                    {edu.degree}
                                    {edu.cgpa && <span style={{ fontWeight: "bold" }}> {edu.cgpa}</span>}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      }

                      if (sectionKey === "certifications" && resumeData.visibleSections.certifications && resumeData.certifications.length > 0) {
                        return (
                          <div key="certifications" style={{ marginBottom: "12px" }}>
                            <div className="section-title">{resumeData.headings.certifications}</div>
                            <ul className="bullet-list" style={{ paddingLeft: "30px" }}>
                              {resumeData.certifications.map((cert, idx) => (
                                <li key={idx} className="bullet-item" style={{ marginBottom: "3px" }}>
                                  <strong>{cert.name}:</strong> {cert.institution} 
                                  {cert.linkUrl && (
                                    <span>
                                      {" -- "}
                                      <a href={ensureAbsoluteUrl(cert.linkUrl)} target="_blank" rel="noreferrer" style={{ fontWeight: "bold", textDecoration: "underline" }}>
                                        {cert.dates || "Link"}
                                      </a>
                                    </span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      }

                      if (sectionKey === "responsibility" && resumeData.visibleSections.responsibility && resumeData.responsibility.length > 0) {
                        return (
                          <div key="responsibility" style={{ marginBottom: "12px" }}>
                            <div className="section-title">{resumeData.headings.responsibility}</div>
                            {resumeData.responsibility.map((resp, idx) => (
                              <div key={idx} className="entry-row" style={{ paddingLeft: "10px", fontSize: "9.5pt", marginBottom: "2px" }}>
                                <span>
                                  {resp.linkUrl ? (
                                    <a href={ensureAbsoluteUrl(resp.linkUrl)} target="_blank" rel="noreferrer">
                                      <strong>{resp.role}</strong>
                                    </a>
                                  ) : (
                                    <strong>{resp.role}</strong>
                                  )}
                                  {", "}{resp.club}
                                </span>
                                <span className="entry-dates">{resp.dates}</span>
                              </div>
                            ))}
                          </div>
                        );
                      }

                      if (sectionKey === "miscellaneous" && resumeData.visibleSections.miscellaneous && resumeData.miscellaneous.length > 0) {
                        return (
                          <div key="miscellaneous" style={{ marginBottom: "12px" }}>
                            <div className="section-title">{resumeData.headings.miscellaneous}</div>
                            {resumeData.miscellaneous.map((misc, idx) => (
                              <div key={idx} className="entry-row" style={{ paddingLeft: "10px", fontSize: "9.5pt", marginBottom: "2px" }}>
                                <span>
                                  {misc.linkUrl ? (
                                    <a href={ensureAbsoluteUrl(misc.linkUrl)} target="_blank" rel="noreferrer">
                                      <strong>{misc.achievement}</strong>
                                    </a>
                                  ) : (
                                    <strong>{misc.achievement}</strong>
                                  )}
                                  {": "}{misc.detail}
                                </span>
                                <span className="entry-dates">{misc.dates}</span>
                              </div>
                            ))}
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>
                )}

                {/* FORMAT 4: ATS FRIENDLY (Rahul Potdar) */}
                {template === "ats-friendly" && (
                  <div className="latex-sheet-ats" style={{ fontSize: `${resumeFontSize}pt`, transform: `scale(${previewZoom})` }}>
                    <div className="header-center">
                      <div className="header-name">{resumeData.personal.name || "YOUR NAME"}</div>
                      {resumeData.personal.title && (
                        <div className="header-title">{resumeData.personal.title}</div>
                      )}
                      <div className="header-contact">
                        {resumeData.personal.phone && (
                          <span>📞 {resumeData.personal.phone}</span>
                        )}
                        {resumeData.personal.email && (
                          <span>✉️ <a href={`mailto:${resumeData.personal.email}`}>{resumeData.personal.email}</a></span>
                        )}
                        {resumeData.personal.linkText && (
                          <span>🌐 <a href={ensureAbsoluteUrl(resumeData.personal.linkUrl)} target="_blank" rel="noreferrer">{resumeData.personal.linkText}</a></span>
                        )}
                        {resumeData.personal.location && (
                          <span>📂 <a href={ensureAbsoluteUrl(resumeData.personal.location.includes(".") ? resumeData.personal.location : `https://github.com/${resumeData.personal.location}`)} target="_blank" rel="noreferrer">{resumeData.personal.location}</a></span>
                        )}
                      </div>
                    </div>

                    {/* Render sections in custom order */}
                    {(resumeData.sectionOrder || [
                      "summary",
                      "skills",
                      "experience",
                      "projects",
                      "education",
                      "certifications",
                      "responsibility",
                      "miscellaneous"
                    ]).map((sectionKey) => {
                      if (sectionKey === "summary" && resumeData.visibleSections.summary && resumeData.summaryText) {
                        return (
                          <div key="summary" style={{ marginBottom: "10px" }}>
                            <div className="section-title">{resumeData.headings.summary}</div>
                            <div style={{ fontSize: "9.5pt", lineHeight: "1.35" }}>
                              {resumeData.summaryText}
                            </div>
                          </div>
                        );
                      }

                      if (sectionKey === "skills" && resumeData.visibleSections.skills && resumeData.skills.length > 0) {
                        return (
                          <div key="skills" style={{ marginBottom: "10px" }}>
                            <div className="section-title">{resumeData.headings.skills}</div>
                            <div style={{ fontSize: "9.5pt", lineHeight: "1.4" }}>
                              {resumeData.skills.map((sk, idx) => (
                                <div key={idx} className="skills-line">
                                  <strong>{sk.category}:</strong> {sk.items}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }

                      if (sectionKey === "experience" && resumeData.visibleSections.experience && resumeData.experience.length > 0) {
                        return (
                          <div key="experience" style={{ marginBottom: "10px" }}>
                            <div className="section-title">{resumeData.headings.experience}</div>
                            {resumeData.experience.map((exp, idx) => (
                              <div key={idx} className="resume-entry-block" style={{ marginBottom: "8px" }}>
                                <div className="entry-row">
                                  <span className="entry-title">
                                    {exp.linkUrl ? (
                                      <a href={ensureAbsoluteUrl(exp.linkUrl)} target="_blank" rel="noreferrer">{exp.company}</a>
                                    ) : (
                                      exp.company
                                    )}
                                  </span>
                                  <span className="entry-dates">{exp.dates}</span>
                                </div>
                                <div className="entry-row" style={{ marginTop: "1px" }}>
                                  <span className="entry-subtitle">{exp.title}</span>
                                  {exp.location && <span style={{ fontSize: "9pt", fontStyle: "italic" }}>{exp.location}</span>}
                                </div>
                                {exp.bullets && exp.bullets.filter(b => b.trim() !== "").length > 0 && (
                                  <ul className="bullet-list">
                                    {exp.bullets.filter(b => b.trim() !== "").map((b, bIdx) => (
                                      <li key={bIdx} className="bullet-item">{formatText(b)}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        );
                      }

                      if (sectionKey === "projects" && resumeData.visibleSections.projects && resumeData.projects.length > 0) {
                        return (
                          <div key="projects" style={{ marginBottom: "10px" }}>
                            <div className="section-title">{resumeData.headings.projects}</div>
                            {resumeData.projects.map((proj, idx) => (
                              <div key={idx} className="resume-entry-block" style={{ marginBottom: "8px" }}>
                                <div className="entry-row">
                                  <span className="entry-title">
                                    {proj.linkUrl ? (
                                      <a href={ensureAbsoluteUrl(proj.linkUrl)} target="_blank" rel="noreferrer">{proj.name}</a>
                                    ) : (
                                      proj.name
                                    )}
                                    {proj.linkText && (
                                      <>
                                        {" | "}
                                        <a href={ensureAbsoluteUrl(proj.linkUrl || proj.linkText)} target="_blank" rel="noreferrer">
                                          {proj.linkText}
                                        </a>
                                      </>
                                    )}
                                  </span>
                                  <span className="entry-dates">{proj.dates}</span>
                                </div>
                                <div style={{ fontSize: "9pt", fontStyle: "italic", marginTop: "1px" }}>
                                  {proj.role}
                                </div>
                                {proj.bullets && proj.bullets.filter(b => b.trim() !== "").length > 0 && (
                                  <ul className="bullet-list">
                                    {proj.bullets.filter(b => b.trim() !== "").map((b, bIdx) => (
                                      <li key={bIdx} className="bullet-item">{formatText(b)}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        );
                      }

                      if (sectionKey === "education" && resumeData.visibleSections.education && resumeData.education.length > 0) {
                        return (
                          <div key="education" style={{ marginBottom: "10px" }}>
                            <div className="section-title">{resumeData.headings.education}</div>
                            {resumeData.education.map((edu, idx) => (
                              <div key={idx} className="resume-entry-block" style={{ marginBottom: "6px" }}>
                                <div className="entry-row">
                                  <span className="entry-title">{edu.school}</span>
                                  <span className="entry-dates">{edu.year || edu.dates}</span>
                                </div>
                                <div className="entry-row" style={{ marginTop: "1px" }}>
                                  <span className="entry-subtitle">
                                    {edu.degree}
                                    {edu.cgpa && <span style={{ fontWeight: "bold" }}> {edu.cgpa}</span>}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      }

                      if (sectionKey === "certifications" && resumeData.visibleSections.certifications && resumeData.certifications.length > 0) {
                        return (
                          <div key="certifications" style={{ marginBottom: "10px" }}>
                            <div className="section-title">{resumeData.headings.certifications}</div>
                            <ul className="bullet-list" style={{ paddingLeft: "15px" }}>
                              {resumeData.certifications.map((cert, idx) => (
                                <li key={idx} className="bullet-item" style={{ marginBottom: "3px" }}>
                                  <strong>{cert.name}:</strong> {cert.institution}
                                  {cert.linkUrl && (
                                    <span>
                                      {" -- "}
                                      <a href={ensureAbsoluteUrl(cert.linkUrl)} target="_blank" rel="noreferrer" style={{ fontWeight: "bold", textDecoration: "underline" }}>
                                        {cert.dates || "Link"}
                                      </a>
                                    </span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      }

                      if (sectionKey === "responsibility" && resumeData.visibleSections.responsibility && resumeData.responsibility.length > 0) {
                        return (
                          <div key="responsibility" style={{ marginBottom: "10px" }}>
                            <div className="section-title">{resumeData.headings.responsibility}</div>
                            {resumeData.responsibility.map((resp, idx) => (
                              <div key={idx} className="entry-row" style={{ fontSize: "9.5pt", marginBottom: "2px" }}>
                                <span>
                                  {resp.linkUrl ? (
                                    <a href={ensureAbsoluteUrl(resp.linkUrl)} target="_blank" rel="noreferrer">
                                      <strong>{resp.role}</strong>
                                    </a>
                                  ) : (
                                    <strong>{resp.role}</strong>
                                  )}
                                  {", "}{resp.club}
                                </span>
                                <span className="entry-dates">{resp.dates}</span>
                              </div>
                            ))}
                          </div>
                        );
                      }

                      if (sectionKey === "miscellaneous" && resumeData.visibleSections.miscellaneous && resumeData.miscellaneous.length > 0) {
                        return (
                          <div key="miscellaneous" style={{ marginBottom: "10px" }}>
                            <div className="section-title">{resumeData.headings.miscellaneous}</div>
                            {resumeData.miscellaneous.map((misc, idx) => (
                              <div key={idx} className="entry-row" style={{ fontSize: "9.5pt", marginBottom: "2px" }}>
                                <span>
                                  {misc.linkUrl ? (
                                    <a href={ensureAbsoluteUrl(misc.linkUrl)} target="_blank" rel="noreferrer">
                                      <strong>{misc.achievement}</strong>
                                    </a>
                                  ) : (
                                    <strong>{misc.achievement}</strong>
                                  )}
                                  {": "}{misc.detail}
                                </span>
                                <span className="entry-dates">{misc.dates}</span>
                              </div>
                            ))}
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>
                )}
                
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
