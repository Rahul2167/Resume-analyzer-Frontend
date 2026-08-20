import React from "react";
import { FaSync, FaServer, FaCheckCircle, FaExclamationTriangle, FaTimes } from "react-icons/fa";
import { useBackendStatus } from "../context/BackendStatusContext";
import "./HeaderDisclaimer.css";

export default function HeaderDisclaimer() {
  const { isApiLoading, apiStatus, statusMessage, isBannerVisible, hideBanner } = useBackendStatus();

  if (!isBannerVisible) return null;

  return (
    <div className="header-disclaimer-wrapper">
      <div className="header-disclaimer-container">
        
        <div className="header-disclaimer-content">
          {/* Reloading / Spinning Logo */}
          <div className="reloading-logo-box">
            <FaSync className={`reloading-spin-icon ${apiStatus === "live" ? "live" : ""}`} />
          </div>

          {/* Status Pill */}
          <span className={`disclaimer-status-pill ${apiStatus}`}>
            <span className={`status-dot ${apiStatus}`} />
            {apiStatus === "loading" && "Connecting (~1 min)..."}
            {apiStatus === "live" && "Backend Live"}
            {apiStatus === "error" && "Backend Delayed"}
            {apiStatus === "idle" && "Backend Notice"}
          </span>

          {/* Text Message */}
          <div className="disclaimer-text-wrap">
            {apiStatus === "loading" ? (
              <>
                <span className="disclaimer-text-highlight">Backend is hosted on Render free tier.</span> Initial request takes ~1 minute to wake up. Please wait, backend is live...
              </>
            ) : apiStatus === "live" ? (
              <>
                <span className="disclaimer-live-highlight">Backend is live!</span> Connection established with Render server.
              </>
            ) : (
              statusMessage || "Backend is hosted on Render (takes ~1 minute initial wake-up time). Backend is live, please wait..."
            )}
          </div>
        </div>

        {/* Close Button */}
        <button className="disclaimer-close-btn" onClick={hideBanner} title="Dismiss notice">
          <FaTimes />
        </button>

      </div>
    </div>
  );
}
