import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  FaBell,
  FaUserCircle,
  FaRobot,
  FaSun,
  FaMoon,
  FaUserEdit,
  FaSignOutAlt,
  FaKey,
  FaShieldAlt,
  FaChevronDown,
  FaThLarge,
  FaStar,
  FaTag,
  FaUser,
  FaEllipsisV
} from "react-icons/fa";
import { checkUserPremium } from "../utils/premiumUtils";

export default function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [profileOpen, setProfileOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPicture, setUserPicture] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [isPremium, setIsPremium] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Read user info reactively
  useEffect(() => {
    const readUser = () => {
      setUserEmail(localStorage.getItem("userEmail") || localStorage.getItem("tempEmail") || "");
      setUserName(localStorage.getItem("userName") || localStorage.getItem("tempName") || "");
      setUserPicture(localStorage.getItem("userPicture") || "");
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
      setIsPremium(checkUserPremium());
    };
    readUser();
    window.addEventListener("storage", readUser);
    return () => window.removeEventListener("storage", readUser);
  }, []);

  const isAdmin = userEmail === "rahulpotdar2167@gmail.com";

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("isVerified");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPicture");
    localStorage.removeItem("isPremium");
    // Dispatch storage event to trigger reactivity in this window
    window.dispatchEvent(new Event("storage"));
    setProfileOpen(false);
    navigate("/login");
  };

  const getInitials = () => {
    if (userName) return userName.charAt(0).toUpperCase();
    if (userEmail) return userEmail.charAt(0).toUpperCase();
    return "U";
  };

  const getTabStyle = (tabName, isActive) => {
    const base = {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "9px 20px",
      borderRadius: "24px",
      fontSize: "14px",
      fontWeight: 700,
      textDecoration: "none",
      transition: "all 0.3s ease",
      fontFamily: "inherit",
      borderBottom: "none"
    };

    switch (tabName) {
      case "dashboard":
        return {
          ...base,
          border: isActive ? "1px solid #8b5cf6" : "1px solid rgba(168, 85, 247, 0.45)",
          color: isActive ? "#ffffff" : "rgba(216, 180, 254, 0.65)",
          background: isActive ? "rgba(168, 85, 247, 0.08)" : "transparent",
          boxShadow: isActive ? "0 0 10px rgba(168, 85, 247, 0.25)" : "none",
        };
      case "features":
        return {
          ...base,
          border: isActive ? "1px solid #2563eb" : "1px solid rgba(59, 130, 246, 0.45)",
          color: isActive ? "#ffffff" : "rgba(147, 197, 253, 0.65)",
          background: isActive ? "rgba(59, 130, 246, 0.08)" : "transparent",
          boxShadow: isActive ? "0 0 10px rgba(59, 130, 246, 0.25)" : "none",
        };
      case "pricing":
        return {
          ...base,
          border: isActive ? "1px solid #059669" : "1px solid rgba(16, 185, 129, 0.45)",
          color: isActive ? "#ffffff" : "rgba(110, 231, 183, 0.65)",
          background: isActive ? "rgba(16, 185, 129, 0.08)" : "transparent",
          boxShadow: isActive ? "0 0 10px rgba(16, 185, 129, 0.25)" : "none",
        };
      case "about":
        return {
          ...base,
          border: isActive ? "1px solid #d97706" : "1px solid rgba(245, 158, 11, 0.45)",
          color: isActive ? "#ffffff" : "rgba(253, 224, 71, 0.65)",
          background: isActive ? "rgba(245, 158, 11, 0.08)" : "transparent",
          boxShadow: isActive ? "0 0 10px rgba(245, 158, 11, 0.25)" : "none",
        };
      default:
        return base;
    }
  };

  const handleMouseEnter = (e, tabName) => {
    const colors = {
      dashboard: "rgba(168, 85, 247, 0.6)",
      features: "rgba(59, 130, 246, 0.6)",
      pricing: "rgba(16, 185, 129, 0.6)",
      about: "rgba(245, 158, 11, 0.6)"
    };
    e.currentTarget.style.boxShadow = `0 0 16px ${colors[tabName]}`;
    e.currentTarget.style.transform = "translateY(-1px)";
  };
  
  const handleMouseLeave = (e, tabName, isActive) => {
    const colors = {
      dashboard: "rgba(168, 85, 247, 0.45)",
      features: "rgba(59, 130, 246, 0.45)",
      pricing: "rgba(16, 185, 129, 0.45)",
      about: "rgba(245, 158, 11, 0.45)"
    };
    e.currentTarget.style.boxShadow = isActive ? `0 0 16px ${colors[tabName]}` : "none";
    e.currentTarget.style.transform = "none";
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="navbar"
    >

      <Link to="/dashboard" className="logo" style={{ textDecoration: "none", color: "inherit" }}>
        <FaRobot className="logo-icon" />
        <div>
          <h2>Career Ascent AI</h2>
          <span>Your AI Career Copilot</span>
        </div>
      </Link>

      <div className="nav-links" style={{ gap: "16px" }}>
        <NavLink
          to="/dashboard"
          style={({ isActive }) => getTabStyle("dashboard", isActive)}
          onMouseEnter={(e) => handleMouseEnter(e, "dashboard")}
          onMouseLeave={(e) => handleMouseLeave(e, "dashboard", window.location.pathname.startsWith("/dashboard"))}
        >
          {({ isActive }) => (
            <>
              <FaThLarge style={{ fontSize: "14px", color: isActive ? "#c084fc" : "rgba(168, 85, 247, 0.75)" }} />
              Dashboard
            </>
          )}
        </NavLink>

        <NavLink
          to="/features"
          style={({ isActive }) => getTabStyle("features", isActive)}
          onMouseEnter={(e) => handleMouseEnter(e, "features")}
          onMouseLeave={(e) => handleMouseLeave(e, "features", window.location.pathname.startsWith("/features"))}
        >
          {({ isActive }) => (
            <>
              <FaStar style={{ fontSize: "14px", color: isActive ? "#60a5fa" : "rgba(59, 130, 246, 0.75)" }} />
              Features
            </>
          )}
        </NavLink>

        <NavLink
          to="/pricing"
          style={({ isActive }) => getTabStyle("pricing", isActive)}
          onMouseEnter={(e) => handleMouseEnter(e, "pricing")}
          onMouseLeave={(e) => handleMouseLeave(e, "pricing", window.location.pathname.startsWith("/pricing"))}
        >
          {({ isActive }) => (
            <>
              <FaTag style={{ fontSize: "14px", color: isActive ? "#34d399" : "rgba(16, 185, 129, 0.75)" }} />
              Pricing
            </>
          )}
        </NavLink>

        <NavLink
          to="/about"
          style={({ isActive }) => getTabStyle("about", isActive)}
          onMouseEnter={(e) => handleMouseEnter(e, "about")}
          onMouseLeave={(e) => handleMouseLeave(e, "about", window.location.pathname.startsWith("/about"))}
        >
          {({ isActive }) => (
            <>
              <FaUser style={{ fontSize: "14px", color: isActive ? "#fbbf24" : "rgba(245, 158, 11, 0.75)" }} />
              About
            </>
          )}
        </NavLink>
      </div>

      <div className="nav-right" style={{ display: "flex", alignItems: "center", gap: "18px" }}>
        <button
          onClick={toggleTheme}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "9px 18px",
            borderRadius: "24px",
            fontSize: "13px",
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontFamily: "inherit",
            border: theme === "light" 
              ? "1px solid rgba(255, 107, 0, 0.45)" 
              : "1px solid rgba(251, 191, 36, 0.45)",
            color: theme === "light" ? "#ff6b00" : "#fbbf24",
            background: theme === "light" 
              ? "rgba(255, 107, 0, 0.08)" 
              : "rgba(251, 191, 36, 0.08)",
            boxShadow: theme === "light" 
              ? "0 0 10px rgba(255, 107, 0, 0.25)" 
              : "0 0 10px rgba(251, 191, 36, 0.25)",
            marginRight: "4px"
          }}
          title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          onMouseEnter={e => {
            const glowColor = theme === "light" ? "rgba(255, 107, 0, 0.6)" : "rgba(251, 191, 36, 0.6)";
            e.currentTarget.style.boxShadow = `0 0 14px ${glowColor}`;
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={e => {
            const glowColor = theme === "light" ? "rgba(255, 107, 0, 0.25)" : "rgba(251, 191, 36, 0.25)";
            e.currentTarget.style.boxShadow = `0 0 10px ${glowColor}`;
            e.currentTarget.style.transform = "none";
          }}
        >
          {theme === "light" ? (
            <>
              <FaSun style={{ fontSize: "14px", color: "#ff6b00" }} />
              Light
            </>
          ) : (
            <>
              <FaMoon style={{ fontSize: "14px", color: "#fbbf24" }} />
              Dark
            </>
          )}
        </button>



        {isLoggedIn ? (
          /* Profile Dropdown */
          <div ref={dropdownRef} style={{ position: "relative" }}>
            <button
              onClick={() => setProfileOpen(p => !p)}
              className={isPremium ? "premium-avatar-btn" : "normal-avatar-btn"}
              style={{
                background: isPremium 
                  ? "linear-gradient(135deg, #fbbf24, #f59e0b)" 
                  : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                border: isPremium ? "2px solid #fbbf24" : "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "14px",
                fontWeight: 700,
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              title={isPremium ? "Premium Member" : "Profile"}
            >
              {userPicture ? (
                <img
                  src={userPicture}
                  alt="profile"
                  style={{ 
                    width: isPremium ? "32px" : "36px", 
                    height: isPremium ? "32px" : "36px", 
                    borderRadius: "50%", 
                    objectFit: "cover" 
                  }}
                />
              ) : (
                getInitials()
              )}
            </button>

            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.15 }}
                className="profile-dropdown"
              >
                {/* Header */}
                <div className="profile-dropdown-header">
                  <div 
                    className="profile-dropdown-avatar"
                    style={{
                      background: isPremium 
                        ? "linear-gradient(135deg, #fbbf24, #f59e0b)" 
                        : "linear-gradient(135deg, #6366f1, #8b5cf6)"
                    }}
                  >
                    {getInitials()}
                  </div>
                  <div>
                    <div className="profile-dropdown-name">{userName || "User"}</div>
                    <div className="profile-dropdown-email">{userEmail || "Not logged in"}</div>
                    {isPremium && (
                      <span className="profile-dropdown-badge" style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)", color: "#1e1b4b", display: "inline-block", marginRight: "5px" }}>
                        👑 Premium
                      </span>
                    )}
                    {isAdmin && (
                      <span className="profile-dropdown-badge" style={{ marginTop: "3px" }}>Admin</span>
                    )}
                  </div>
                </div>

                <div className="profile-dropdown-divider" />

                <button
                  className="profile-dropdown-item"
                  onClick={() => { setProfileOpen(false); navigate("/profile"); }}
                >
                  <FaUserEdit />
                  <span>Edit Profile</span>
                </button>

                <button
                  className="profile-dropdown-item"
                  onClick={() => { setProfileOpen(false); navigate("/profile?tab=password"); }}
                >
                  <FaKey />
                  <span>Change Password</span>
                </button>

                {isAdmin && (
                  <button
                    className="profile-dropdown-item"
                    onClick={() => { setProfileOpen(false); navigate("/admin"); }}
                  >
                    <FaShieldAlt />
                    <span>Admin Panel</span>
                  </button>
                )}

                <div className="profile-dropdown-divider" />

                <button
                  className="profile-dropdown-item logout"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="nav-signin-btn"
          >
            Sign In
          </button>
        )}

        {/* Mobile menu trigger on the right side of the navbar */}
        <button
          onClick={() => {
            if (typeof window.__toggleSidebar === "function") {
              window.__toggleSidebar();
            } else {
              window.dispatchEvent(new Event("toggle-sidebar"));
            }
          }}
          className="mobile-menu-trigger"
          style={{
            background: "none",
            border: "none",
            color: "inherit",
            fontSize: "20px",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
            padding: "6px",
            marginLeft: "8px"
          }}
          title="Toggle Sidebar"
        >
          <FaEllipsisV />
        </button>
      </div>
    </motion.nav>
  );
}