import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaHome,
  FaFileAlt,
  FaMicrophone,
  FaFileSignature,
  FaLinkedin,
  FaRoad,
  FaChartLine,
  FaRobot,
  FaUserEdit,
  FaThLarge,
  FaStar,
  FaTag,
  FaUser,
} from "react-icons/fa";

const menuItems = [
  {
    title: "Dashboard",
    icon: <FaHome />,
    path: "/dashboard",
  },
  {
    title: "Resume Analyzer",
    icon: <FaFileAlt />,
    path: "/resume",
  },
  {
    title: "Mock Interview",
    icon: <FaMicrophone />,
    path: "/mock-interview",
  },
  {
    title: "Resume Builder",
    icon: <FaFileSignature />,
    path: "/resume-builder",
  },
  {
    title: "LinkedIn Optimizer",
    icon: <FaLinkedin />,
    path: "/linkedin",
  },
  {
    title: "Career Roadmap",
    icon: <FaRoad />,
    path: "/roadmap",
  },
  {
    title: "Skill Gap",
    icon: <FaChartLine />,
    path: "/skill-gap",
  },
  {
    title: "AI Career Chat",
    icon: <FaRobot />,
    path: "/chat",
  },
  {
    title: "Profile Settings",
    icon: <FaUserEdit />,
    path: "/profile",
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth <= 768 : false);

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    const handleClose = () => setIsOpen(false);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);

    window.addEventListener("toggle-sidebar", handleToggle);
    window.addEventListener("close-sidebar", handleClose);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("toggle-sidebar", handleToggle);
      window.removeEventListener("close-sidebar", handleClose);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (location.pathname === "/" && !isMobile) {
    return null;
  }

  const navbarItems = [
    { title: "Dashboard", path: "/dashboard", icon: <FaThLarge /> },
    { title: "Features", path: "/features", icon: <FaStar /> },
    { title: "Pricing", path: "/pricing", icon: <FaTag /> },
    { title: "About", path: "/about", icon: <FaUser /> }
  ];

  return (
    <>
      {/* Backdrop overlay for mobile drawer */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 99999,
          }}
        />
      )}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Mobile Navigation Links */}
        <div className="mobile-only-nav-links" style={{
          display: "none",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "20px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          paddingBottom: "15px"
        }}>
          <h2 style={{
            color: "#94a3b8",
            textTransform: "uppercase",
            letterSpacing: "2px",
            margin: "0 0 12px 0",
            fontSize: "14px"
          }}>Navigation</h2>
          {navbarItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive ? "sidebar-item active" : "sidebar-item"
              }
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.title}</span>
            </NavLink>
          ))}
        </div>

        <h2 className="sidebar-title">Workspace</h2>

        {menuItems.map((item) => {
          return (
            <NavLink
              key={item.title}
              to={item.path}
              onClick={() => setIsOpen(false)} // Close drawer when clicking a link
              className={({ isActive }) =>
                isActive ? "sidebar-item active" : "sidebar-item"
              }
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </aside>
    </>
  );
}