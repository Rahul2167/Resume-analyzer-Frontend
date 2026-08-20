import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const BackendStatusContext = createContext();

export const BackendStatusProvider = ({ children }) => {
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState("idle"); // 'idle' | 'loading' | 'live' | 'error'
  const [statusMessage, setStatusMessage] = useState("");
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  const triggerApiStart = useCallback((msg = "Connecting to Render backend (~1 min wake-up time if inactive). Please wait...") => {
    setIsApiLoading(true);
    setApiStatus("loading");
    setStatusMessage(msg);
    setIsBannerVisible(true);
  }, []);

  const triggerApiSuccess = useCallback((msg = "Backend is live & connected!") => {
    setIsApiLoading(false);
    setApiStatus("live");
    setStatusMessage(msg);
    setIsBannerVisible(true);
    
    // Auto hide 2.5s after Render is live so it doesn't show again
    const timer = setTimeout(() => {
      setIsBannerVisible(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const triggerApiError = useCallback((msg = "Backend connection issue. Render backend may still be spinning up.") => {
    setIsApiLoading(false);
    setApiStatus("error");
    setStatusMessage(msg);
    setIsBannerVisible(true);
  }, []);

  const hideBanner = useCallback(() => {
    setIsBannerVisible(false);
  }, []);

  // Intercept global fetch calls to automatically detect API hits to Render
  useEffect(() => {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const url = typeof args[0] === "string" ? args[0] : (args[0]?.url || "");
      const isBackendUrl = url.includes("onrender.com") || url.includes("/auth/") || url.includes("/api/");

      if (isBackendUrl) {
        triggerApiStart("Backend API hit! Render backend takes ~1 min to wake up if inactive. Please wait...");
      }

      try {
        const response = await originalFetch(...args);
        if (isBackendUrl) {
          if (response.ok) {
            triggerApiSuccess("Backend is live & responded successfully!");
          } else {
            triggerApiError(`Backend API returned status ${response.status}. Render server is live.`);
          }
        }
        return response;
      } catch (err) {
        if (isBackendUrl) {
          triggerApiError("Connection delayed. Render free backend is spinning up, please allow ~1 min...");
        }
        throw err;
      }
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [triggerApiStart, triggerApiSuccess, triggerApiError]);

  return (
    <BackendStatusContext.Provider
      value={{
        isApiLoading,
        apiStatus,
        statusMessage,
        isBannerVisible,
        triggerApiStart,
        triggerApiSuccess,
        triggerApiError,
        hideBanner,
        setIsBannerVisible
      }}
    >
      {children}
    </BackendStatusContext.Provider>
  );
};

export const useBackendStatus = () => {
  const context = useContext(BackendStatusContext);
  if (!context) {
    throw new Error("useBackendStatus must be used within a BackendStatusProvider");
  }
  return context;
};
