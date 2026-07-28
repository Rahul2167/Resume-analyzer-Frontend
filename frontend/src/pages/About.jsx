import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import rahulImg from "../assets/rahul.jpg";
import {
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaEnvelope,
  FaPhoneAlt,
  FaGraduationCap,
  FaBriefcase,
  FaCode,
  FaProjectDiagram,
  FaQuoteLeft
} from "react-icons/fa";

const projectsData = [
  {
    title: "FinTech: Digital Recurring Deposit System",
    type: "Major Project",
    description: "Full-stack RD banking platform with user/admin dashboards, login, RD account creation, payment tracking, passbook, penalty & interest calculation. Supports maturity withdrawal, early closure penalty, complaint handling, transaction history with role-based access.",
    link: "https://smart-rd-system-project1.vercel.app",
    tech: ["Java", "Spring Boot", "React", "PostgreSQL", "AWS", "Docker"]
  },
  {
    title: "Entertainment: Movie Ticket Booking System",
    type: "Major Project",
    description: "A React-based movie ticket booking platform with user and admin dashboards, theme switching, and complete booking flow (seat selection, food, payment). Enabled admins to manage movies, shows, bookings, and user complaints through a responsive dashboard.",
    link: "https://movie-booking-system-bookmyshow.vercel.app",
    tech: ["Java", "Spring Boot", "React", "PostgreSQL", "Microservices", "Render"]
  },
  {
    title: "EdTech: Institute Management System",
    type: "Major Project",
    description: "React-based student-centric institute portal with secure login, digital tracking of courses, inquiries, enrollments, and student records to eliminate manual data handling. Implemented customizable themes and CRUD operations to streamline administrative processes.",
    link: "https://coding-seekho-module.vercel.app",
    tech: ["Java", "Spring Boot", "React", "PostgreSQL", "Render"]
  },
  {
    title: "Swarajya Quality Atta",
    type: "Web Application",
    description: "A modern web application built for Swarajya Quality Atta to showcase their products and services online with a responsive interface.",
    link: "https://swarajya-quality-foods.vercel.app",
    tech: ["HTML5", "CSS3", "JavaScript", "React.js"]
  },
  {
    title: "LogicSphere Corporate Clone",
    type: "Web Application",
    description: "A fully responsive clone and inspired version of the LogicSphere Technologies corporate website, focusing on modern UI design, layout transitions, and interactivity.",
    link: "https://logicsphere1.vercel.app/",
    tech: ["HTML5", "CSS3", "JavaScript", "React.js"]
  },
  {
    title: "Wedding Invitation Website",
    type: "Web Application",
    description: "A beautiful and elegant digital wedding invitation website crafted with love, featuring smooth animations, multimedia assets, and responsive design.",
    link: "https://pradip123.vercel.app/",
    tech: ["HTML5", "CSS3", "JavaScript", "React.js"]
  },
  {
    title: "Students Marks System",
    type: "Mini Project",
    description: "Created a JSP-based Student Marks Records mini project with secure login, dynamic lists, and full CRUD operations using PostgreSQL database integration.",
    link: "https://www.linkedin.com/posts/rahul-potdar-rp2167_jsp-html-css-activity-7430205747533352960-Af3y?utm_source=share&utm_medium=member_desktop&rcm=ACoAACm376YBUUyCWf2Ey19vHmjnIFvROAvUVBE",
    tech: ["JSP", "Servlet", "HTML", "CSS", "PostgreSQL"]
  },
  {
    title: "Quiz Result System",
    type: "Mini Project",
    description: "A JSP-based quiz System with automated scoring calculation, pass/fail results, and dynamic leaderboard using JDBC and PostgreSQL.",
    link: "https://www.linkedin.com/posts/rahul-potdar-rp2167_jsp-html-css-activity-7429762541280604160-M6Jk?utm_source=share&utm_medium=member_desktop&rcm=ACoAACm376YBUUyCWf2Ey19vHmjnIFvROAvUVBE",
    tech: ["JSP", "Servlet", "HTML", "CSS", "JDBC", "PostgreSQL"]
  }
];

const getTechBadgeStyle = (techName) => {
  const name = techName.toLowerCase();
  if (name.includes("react")) {
    return { color: "#00d8ff", bg: "rgba(0, 216, 255, 0.08)", border: "rgba(0, 216, 255, 0.2)" };
  }
  if (name.includes("java") || name.includes("spring") || name.includes("hibernate")) {
    return { color: "#f97316", bg: "rgba(249, 115, 22, 0.08)", border: "rgba(249, 115, 22, 0.2)" };
  }
  if (name.includes("sql") || name.includes("postgres")) {
    return { color: "#38bdf8", bg: "rgba(56, 189, 248, 0.08)", border: "rgba(56, 189, 248, 0.2)" };
  }
  if (name.includes("docker")) {
    return { color: "#3b82f6", bg: "rgba(59, 130, 246, 0.08)", border: "rgba(59, 130, 246, 0.2)" };
  }
  if (name.includes("aws") || name.includes("cloud")) {
    return { color: "#fbbf24", bg: "rgba(251, 191, 36, 0.08)", border: "rgba(251, 191, 36, 0.2)" };
  }
  if (name.includes("javascript") || name.includes("js")) {
    return { color: "#eab308", bg: "rgba(234, 179, 8, 0.08)", border: "rgba(234, 179, 8, 0.2)" };
  }
  if (name.includes("html") || name.includes("css") || name.includes("bootstrap")) {
    return { color: "#ec4899", bg: "rgba(236, 72, 153, 0.08)", border: "rgba(236, 72, 153, 0.2)" };
  }
  if (name.includes("micro") || name.includes("rest") || name.includes("api") || name.includes("render")) {
    return { color: "#10b981", bg: "rgba(16, 185, 129, 0.08)", border: "rgba(16, 185, 129, 0.2)" };
  }
  return { color: "#94a3b8", bg: "rgba(255, 255, 255, 0.06)", border: "rgba(255, 255, 255, 0.08)" };
};

export default function About() {
  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar />

        <div className="dashboard-content" style={{ display: "flex", flexDirection: "column", gap: "30px", paddingBottom: "50px", width: "100%", textAlign: "left" }}>
          
          {/* Header */}
          <div className="dashboard-header">
            <h1 style={{ fontSize: "32px", fontWeight: 800, color: "white", marginBottom: "8px" }}>About the Creator</h1>
            <p style={{ color: "#94a3b8", fontSize: "16px" }}>Meet the developer behind Career Ascent AI.</p>
          </div>

          {/* Profile Card */}
          <div className="glass-card card-profile" style={{
            margin: 0,
            width: "100%",
            maxWidth: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: "30px",
            alignItems: "center",
            padding: "35px",
            borderRadius: "24px"
          }}>
            <div style={{ flexShrink: 0, position: "relative" }}>
              <div style={{
                position: "absolute",
                top: "-5px",
                left: "-5px",
                right: "-5px",
                bottom: "-5px",
                borderRadius: "20px",
                background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
                zIndex: -1
              }} />
              <img 
                src={rahulImg} 
                alt="Rahul Potdar" 
                style={{
                  width: "180px",
                  height: "240px",
                  objectFit: "cover",
                  borderRadius: "16px",
                  display: "block",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.5)"
                }}
              />
            </div>

            <div style={{ flex: 1, minWidth: "260px" }}>
              <h2 style={{ fontSize: "28px", fontWeight: 800, color: "white", marginBottom: "5px" }}>Rahul Potdar</h2>
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#8b5cf6", margin: "0 0 15px 0" }} className="about-subtitle">
                Java Full Stack Developer
              </h3>
              <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: 1.6, marginBottom: "20px" }} className="about-desc">
                Currently seeking opportunities. Recently completed B.Tech in Computer Science and Engineering and having 1 year internship experience as a Software Developer. Java Full Stack Developer with hands-on experience gained through internship and projects, building scalable applications using Java, Spring Boot, React, PostgreSQL, AWS and Docker. Experienced in software development, Spring Security (JWT), Microservices, AI-powered chatbots, JUnit 5, Mockito, OOP, DBMS, DSA, and System Design.
              </p>

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
                marginBottom: "25px",
                width: "100%",
                maxWidth: "480px"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#cbd5e1", fontSize: "14px" }}>
                  <FaEnvelope style={{ color: "#8b5cf6" }} className="contact-icon-col" />
                  <span className="contact-text-col">rahulpotdar2167@gmail.com</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#cbd5e1", fontSize: "14px" }}>
                  <FaPhoneAlt style={{ color: "#8b5cf6" }} className="contact-icon-col" />
                  <span className="contact-text-col">+91 8668231422</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <a href="https://linkedin.com/in/rahul-potdar-rp2167" target="_blank" rel="noreferrer" style={{
                  display: "flex", alignItems: "center", gap: "8px", background: "rgba(10, 102, 194, 0.15)",
                  color: "#0a66c2", border: "1px solid rgba(10, 102, 194, 0.3)", padding: "8px 16px", borderRadius: "10px",
                  fontWeight: 600, fontSize: "13px", cursor: "pointer", transition: "background 0.2s"
                }} className="social-btn-li">
                  <FaLinkedin /> LinkedIn
                </a>
                <a href="https://github.com/Rahul2167" target="_blank" rel="noreferrer" style={{
                  display: "flex", alignItems: "center", gap: "8px", background: "rgba(255, 255, 255, 0.08)",
                  color: "#f3f4f6", border: "1px solid rgba(255, 255, 255, 0.15)", padding: "8px 16px", borderRadius: "10px",
                  fontWeight: 600, fontSize: "13px", cursor: "pointer", transition: "background 0.2s"
                }} className="social-btn-git">
                  <FaGithub /> GitHub
                </a>
                <a href="https://myportfolio2167.vercel.app" target="_blank" rel="noreferrer" style={{
                  display: "flex", alignItems: "center", gap: "8px", background: "rgba(139, 92, 246, 0.15)",
                  color: "#c084fc", border: "1px solid rgba(139, 92, 246, 0.3)", padding: "8px 16px", borderRadius: "10px",
                  fontWeight: 600, fontSize: "13px", cursor: "pointer", transition: "background 0.2s"
                }} className="social-btn-port">
                  <FaGlobe /> Portfolio
                </a>
              </div>
            </div>
          </div>

          {/* Project Origin */}
          <div className="glass-card origin-card" style={{
            margin: 0,
            width: "100%",
            maxWidth: "100%",
            padding: "35px",
            border: "1px solid rgba(139, 92, 246, 0.2)",
            background: "linear-gradient(180deg, rgba(139, 92, 246, 0.02) 0%, rgba(255, 255, 255, 0.01) 100%)",
            borderRadius: "24px"
          }}>
            <h3 style={{ color: "white", fontSize: "22px", fontWeight: 700, marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }} className="origin-title">
              <FaQuoteLeft style={{ color: "#8b5cf6", fontSize: "18px" }} className="quote-icon" /> Why I Created Career Ascent AI
            </h3>
            <ul style={{ margin: 0, paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                "Experienced the challenges of job searching and interview preparation firsthand.",
                "Noticed many students and developers struggle with AI-based interviews.",
                "Saw that ATS resume checking, mock interviews, skill gap analysis, and learning roadmaps are spread across multiple platforms.",
                "Wanted to save time by bringing all these features into one platform.",
                "Built it first to solve my own career preparation challenges.",
                "Expanded it to help other students and professionals prepare more effectively.",
                "Goal: Make career preparation simpler, smarter, and more accessible using AI."
              ].map((point, pidx) => (
                <li key={pidx} style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: 1.6, listStyleType: "disc" }}>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Career Journey & Education */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "25px", width: "100%" }}>
            
            {/* Experience */}
            <div className="glass-card card-experience" style={{ margin: 0, width: "100%", maxWidth: "100%", padding: "30px", borderRadius: "20px" }}>
              <h3 style={{ color: "white", fontSize: "20px", fontWeight: 700, marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }} className="section-card-title">
                <FaBriefcase style={{ color: "#3b82f6" }} className="briefcase-icon" /> Professional Experience
              </h3>
              <div style={{ borderLeft: "2px solid rgba(59, 130, 246, 0.3)", paddingLeft: "20px", marginLeft: "5px" }} className="timeline-line">
                <div style={{ position: "relative", marginBottom: "15px" }}>
                  <div style={{
                    position: "absolute", left: "-27px", top: "4px", width: "12px", height: "12px",
                    borderRadius: "50%", background: "#3b82f6", boxShadow: "0 0 8px #3b82f6"
                  }} className="timeline-dot" />
                  <h4 style={{ color: "white", fontSize: "16px", fontWeight: 700, margin: 0 }} className="timeline-role">Software Developer Intern</h4>
                  <span style={{ color: "#94a3b8", fontSize: "13px", fontWeight: 500 }} className="timeline-company">Humming Byte Technologies • Apr 2025 – Mar 2026</span>
                  <ul style={{ margin: "10px 0 0 0", paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {[
                      "Designed and maintained 50+ reusable React.js components, boosting UI appeal and cutting dev time by 30%.",
                      "Built 40+ REST APIs in Java Spring Boot, reducing response latency by 25% via query optimization.",
                      "Integrated frontend and backend components using JSON-based REST APIs to enable seamless data exchange.",
                      "Engineered AI-powered customer support chatbots to automate query resolution and reduce manual support.",
                      "Tested and documented REST APIs using Postman and Swagger, ensuring reliable and well-documented endpoints."
                    ].map((bullet, bidx) => (
                      <li key={bidx} style={{ color: "#cbd5e1", fontSize: "13px", margin: 0, lineHeight: 1.5, listStyleType: "disc" }}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="glass-card card-education" style={{ margin: 0, width: "100%", maxWidth: "100%", padding: "30px", borderRadius: "20px" }}>
              <h3 style={{ color: "white", fontSize: "20px", fontWeight: 700, marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }} className="section-card-title">
                <FaGraduationCap style={{ color: "#10b981" }} className="grad-icon" /> Education & Credentials
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <h4 style={{ color: "white", fontSize: "16px", fontWeight: 700, margin: 0 }} className="timeline-role">B.Tech in Computer Science & Engineering</h4>
                  <span style={{ color: "#94a3b8", fontSize: "13px", fontWeight: 500 }} className="timeline-company">Dr. Babasaheb Ambedkar Technological University (DBATU)</span>
                  <div style={{ color: "#10b981", fontSize: "13px", fontWeight: 600, marginTop: "4px" }} className="timeline-date-ed">Sep 2023 – June 2026</div>
                </div>
                <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.06)" }} className="divider-line" />
                <div>
                  <h4 style={{ color: "white", fontSize: "15px", fontWeight: 700, marginBottom: "8px" }} className="timeline-role">Certifications</h4>
                  <ul style={{ margin: 0, paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "6px" }}>
                    <li style={{ color: "#cbd5e1", fontSize: "13px", margin: 0 }}>Java Full Stack Development - Coding Seekho</li>
                    <li style={{ color: "#cbd5e1", fontSize: "13px", margin: 0 }}>Hackathon VIT APEX 2.0 Winner / Participant</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

          {/* Technical Skills - Sourced step-by-step from resume */}
          <div className="glass-card card-skills" style={{
            margin: 0,
            width: "100%",
            maxWidth: "100%",
            padding: "30px",
            borderRadius: "20px"
          }}>
            <h3 style={{ color: "white", fontSize: "20px", fontWeight: 700, marginBottom: "25px", display: "flex", alignItems: "center", gap: "10px" }} className="section-card-title">
              <FaCode style={{ color: "#ec4899" }} className="code-icon" /> Technical Stack & Expertise
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <strong style={{ color: "white", fontSize: "14px", display: "block", marginBottom: "8px" }} className="skill-section-title">Programming Languages:</strong>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {["Java", "SQL", "JavaScript"].map((s, i) => (
                    <span key={i} style={{ background: "rgba(139, 92, 246, 0.08)", color: "#a78bfa", border: "1px solid rgba(139, 92, 246, 0.25)", padding: "4px 10px", borderRadius: "8px", fontSize: "12px", fontWeight: 600 }} className="skill-badge">{s}</span>
                  ))}
                </div>
              </div>
              
              <div>
                <strong style={{ color: "white", fontSize: "14px", display: "block", marginBottom: "8px" }} className="skill-section-title">Frontend Technologies:</strong>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {["HTML5", "CSS3", "Bootstrap", "React.js"].map((s, i) => (
                    <span key={i} style={{ background: "rgba(236, 72, 153, 0.08)", color: "#f472b6", border: "1px solid rgba(236, 72, 153, 0.25)", padding: "4px 10px", borderRadius: "8px", fontSize: "12px", fontWeight: 600 }} className="skill-badge">{s}</span>
                  ))}
                </div>
              </div>

              <div>
                <strong style={{ color: "white", fontSize: "14px", display: "block", marginBottom: "8px" }} className="skill-section-title">Backend Technologies:</strong>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {["Spring Boot", "Spring MVC", "Hibernate", "REST APIs", "Spring Security (JWT)", "Microservices"].map((s, i) => (
                    <span key={i} style={{ background: "rgba(59, 130, 246, 0.08)", color: "#60a5fa", border: "1px solid rgba(59, 130, 246, 0.25)", padding: "4px 10px", borderRadius: "8px", fontSize: "12px", fontWeight: 600 }} className="skill-badge">{s}</span>
                  ))}
                </div>
              </div>

              <div>
                <strong style={{ color: "white", fontSize: "14px", display: "block", marginBottom: "8px" }} className="skill-section-title">Database:</strong>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {["PostgreSQL", "MySQL"].map((s, i) => (
                    <span key={i} style={{ background: "rgba(16, 185, 129, 0.08)", color: "#34d399", border: "1px solid rgba(16, 185, 129, 0.25)", padding: "4px 10px", borderRadius: "8px", fontSize: "12px", fontWeight: 600 }} className="skill-badge">{s}</span>
                  ))}
                </div>
              </div>

              <div>
                <strong style={{ color: "white", fontSize: "14px", display: "block", marginBottom: "8px" }} className="skill-section-title">Cloud & Testing:</strong>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {["AWS EC2", "Docker", "CI/CD", "Render", "Vercel", "JUnit 5", "Mockito", "Postman"].map((s, i) => (
                    <span key={i} style={{ background: "rgba(6, 182, 212, 0.08)", color: "#22d3ee", border: "1px solid rgba(6, 182, 212, 0.25)", padding: "4px 10px", borderRadius: "8px", fontSize: "12px", fontWeight: 600 }} className="skill-badge">{s}</span>
                  ))}
                </div>
              </div>

              <div>
                <strong style={{ color: "white", fontSize: "14px", display: "block", marginBottom: "8px" }} className="skill-section-title">Core CS & Tools:</strong>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {["OOP", "DBMS", "DSA", "System Design", "Git", "GitHub", "Gradle"].map((s, i) => (
                    <span key={i} style={{ background: "rgba(245, 158, 11, 0.08)", color: "#fbbf24", border: "1px solid rgba(245, 158, 11, 0.25)", padding: "4px 10px", borderRadius: "8px", fontSize: "12px", fontWeight: 600 }} className="skill-badge">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Project Showcase */}
          <div className="glass-card card-projects-container" style={{
            margin: 0,
            width: "100%",
            maxWidth: "100%",
            padding: "30px",
            borderRadius: "20px"
          }}>
            <h3 style={{ color: "white", fontSize: "20px", fontWeight: 700, marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }} className="section-card-title">
              <FaProjectDiagram style={{ color: "#f59e0b" }} className="proj-icon" /> Featured Developer Projects
            </h3>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", 
              gap: "24px",
              width: "100%"
            }}>
              {projectsData.map((project, idx) => (
                <div key={idx} className="project-card-item">
                  <div>
                    <span className="project-type-badge">
                      {project.type}
                    </span>
                    <h4 style={{ color: "#d97706", fontSize: "17px", fontWeight: 700, marginBottom: "10px", lineHeight: 1.4 }} className="project-card-title">
                      {project.title}
                    </h4>
                    <p style={{ color: "#cbd5e1", fontSize: "13px", lineHeight: 1.6, marginBottom: "16px" }} className="project-card-desc">
                      {project.description}
                    </p>
                  </div>
                  
                  <div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                      {project.tech.map((t, idx2) => {
                        const styleObj = getTechBadgeStyle(t);
                        return (
                          <span 
                            key={idx2} 
                            style={{ 
                              background: styleObj.bg, 
                              color: styleObj.color, 
                              border: `1px solid ${styleObj.border}`,
                              padding: "2px 8px", 
                              borderRadius: "6px", 
                              fontSize: "11px", 
                              fontWeight: 600 
                            }} 
                            className="tech-badge"
                          >
                            {t}
                          </span>
                        );
                      })}
                    </div>

                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        fontWeight: 600,
                        fontSize: "13px",
                        textDecoration: "none",
                      }}
                      className="project-live-btn"
                    >
                      <FaGlobe style={{ fontSize: "12px" }} /> View Live Project
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
