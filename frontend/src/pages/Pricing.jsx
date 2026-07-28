import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { FaCheck, FaTimes, FaWhatsapp, FaCrown } from "react-icons/fa";
import { checkUserPremium, getPremiumDaysLeft, grantPremium, addPaymentRecord } from "../utils/premiumUtils";
const API_URL = import.meta.env.VITE_API_URL || "https://resume-analyzer-w806.onrender.com";

export default function Pricing() {
  const navigate = useNavigate();
  const [isPremium, setIsPremium] = useState(false);
  const [premiumExpiry, setPremiumExpiry] = useState("");
  const [daysLeft, setDaysLeft] = useState(0);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Load Razorpay script and check premium status
  useEffect(() => {
    // 1. Load Razorpay
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    // 2. Check Premium (user-scoped)
    const checkPremium = () => {
      const premium = checkUserPremium();
      const days = getPremiumDaysLeft();
      setIsPremium(premium);
      setDaysLeft(days);
      if (premium) {
        setPremiumExpiry(localStorage.getItem(`premiumExpiry_${localStorage.getItem("userEmail") || localStorage.getItem("tempEmail") || ""}`) || "");
      }
    };

    checkPremium();
    window.addEventListener("storage", checkPremium);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      window.removeEventListener("storage", checkPremium);
    };
  }, []);

  const handlePayment = async () => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: { pathname: "/pricing" } } });
      return;
    }

    if (isPremium) {
      alert("You already have an active Premium Subscription!");
      return;
    }

    try {
      // Create Order via Backend (test charge of ₹1 since Razorpay requires a minimum amount of 100 paise)
      const response = await fetch(`${API_URL}/payment/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 1, currency: "INR" })
      });

      if (!response.ok) {
        throw new Error("Backend server order generation failed");
      }

      const order = await response.json();

      const options = {
        key: "rzp_test_SqodXyFq6vo5LH",
        amount: order.amount,
        currency: order.currency,
        name: "Career Ascent AI",
        description: "Career Pro Plan - 30 Days (Discounted)",
        order_id: order.id,
        handler: async function (res) {
          try {
            // Verify payment
            const verifyRes = await fetch(`${API_URL}/payment/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: res.razorpay_order_id,
                razorpay_payment_id: res.razorpay_payment_id,
                razorpay_signature: res.razorpay_signature
              })
            });

            const verifyData = await verifyRes.json();
            if (verifyData.status === "success") {
              const now = new Date();
              const expiry = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

              // Grant premium to THIS user only (user-scoped)
              grantPremium(30);

              // Save payment details to this user's history only
              addPaymentRecord({
                orderId: res.razorpay_order_id,
                paymentId: res.razorpay_payment_id,
                amount: "₹0 (Discounted)",
                date: now.toISOString(),
                planName: "Career Pro",
                status: "Success"
              });

              // Dispatch storage event to trigger reactivity (e.g. glowing navbar ring)
              window.dispatchEvent(new Event("storage"));
              
              alert("🎉 Payment successful! Premium Activated for 30 days.");
              setIsPremium(true);
              setPremiumExpiry(expiry.toISOString());
              setDaysLeft(30);
            } else {
              alert("Signature verification failed. Payment was not activated.");
            }
          } catch (err) {
            console.error("Verification failed:", err);
            alert("Verification failed. Please try again.");
          }
        },
        prefill: {
          name: localStorage.getItem("userName") || "",
          email: localStorage.getItem("userEmail") || ""
        },
        theme: { color: "#6366f1" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error("Razorpay Checkout failed:", err);
      alert("Checkout failed. Please make sure the backend server is running and accessible.");
    }
  };

  const getWhatsAppLink = () => {
    return "https://wa.me/918668231422?text=Hi%20Rahul,%20I'm%20interested%20in%20the%20Career%20Ascent%20AI%20Enterprise%20Plan%20and%20premium%20features.";
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar />

        <div className="dashboard-content" style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          
          <div className="dashboard-header" style={{ textAlign: "center", margin: "20px 0" }}>
            <h1 style={{ fontSize: "36px", fontWeight: 800, color: "white", marginBottom: "8px" }}>Simple, Transparent Pricing</h1>
            <p style={{ color: "#94a3b8", fontSize: "16px", maxWidth: "600px", margin: "0 auto" }}>
              Unlock the full potential of Career Ascent AI. Choose a plan that matches your current professional goals.
            </p>
          </div>

          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "28px",
            justifyContent: "center",
            alignItems: "stretch",
            marginTop: "10px"
          }}>
            
            {/* Plan 1: Free Starter */}
            <div
              className="glass-card"
              style={{
                margin: 0,
                width: "100%",
                maxWidth: "340px",
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "24px",
                padding: "35px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "none"}
            >
              <div>
                <h3 style={{ color: "#94a3b8", fontSize: "16px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "15px" }}>
                  Free Starter
                </h3>
                <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "10px" }}>
                  <span style={{ fontSize: "42px", fontWeight: 800, color: "white" }}>$0</span>
                  <span style={{ color: "#64748b", fontSize: "15px" }}>/forever</span>
                </div>
                <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: 1.5, marginBottom: "25px", minHeight: "42px" }}>
                  Get a taste of AI-powered career growth tools.
                </p>

                <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "25px" }} />

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
                  {[
                    { text: "5 Resume scans per month", active: true },
                    { text: "1 Mock interview session", active: true },
                    { text: "Standard career roadmaps", active: true },
                    { text: "AI Skill Gap Analysis", active: false },
                    { text: "Unlimited AI Career Chat", active: false },
                    { text: "Priority server access", active: false }
                  ].map((feat, fidx) => (
                    <li key={fidx} style={{ display: "flex", alignItems: "center", gap: "10px", color: feat.active ? "#cbd5e1" : "#475569", fontSize: "14px" }}>
                      {feat.active ? (
                        <FaCheck style={{ color: "#10b981", fontSize: "12px", flexShrink: 0 }} />
                      ) : (
                        <FaTimes style={{ color: "#ef4444", fontSize: "12px", flexShrink: 0 }} />
                      )}
                      <span>{feat.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                disabled
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "14px",
                  fontWeight: 700,
                  fontSize: "15px",
                  marginTop: "35px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#64748b",
                  cursor: "default"
                }}
              >
                Basic Access
              </button>
            </div>

            {/* Plan 2: Career Pro (discounted to 0rs) */}
            <div
              className="glass-card"
              style={{
                margin: 0,
                width: "100%",
                maxWidth: "340px",
                background: isPremium ? "rgba(16, 185, 129, 0.03)" : "rgba(139, 92, 246, 0.05)",
                border: isPremium ? "1.5px solid #10b981" : "1.5px solid #8b5cf6",
                borderRadius: "24px",
                padding: "35px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "none"}
            >
              <span style={{
                position: "absolute",
                top: "-13px",
                left: "50%",
                transform: "translateX(-50%)",
                background: isPremium ? "linear-gradient(135deg, #10b981, #059669)" : "linear-gradient(135deg, #8b5cf6, #6366f1)",
                color: "white",
                padding: "4px 14px",
                borderRadius: "20px",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                boxShadow: isPremium ? "0 4px 10px rgba(16, 185, 129, 0.3)" : "0 4px 10px rgba(99, 102, 241, 0.3)"
              }}>
                {isPremium ? "Active Premium" : "Most Popular"}
              </span>

              <div>
                <h3 style={{ color: "#94a3b8", fontSize: "16px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "15px" }}>
                  Career Pro
                </h3>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "10px" }}>
                  <span style={{ textDecoration: "line-through", color: "#64748b", fontSize: "20px", fontWeight: 600 }}>₹1,499</span>
                  <span style={{ fontSize: "42px", fontWeight: 800, color: "#10b981" }}>₹0</span>
                  <span style={{ color: "#64748b", fontSize: "15px" }}>/month</span>
                </div>
                <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: 1.5, marginBottom: "25px", minHeight: "42px" }}>
                  Complete access for active candidates and career switchers.
                </p>

                <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "25px" }} />

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
                  {[
                    { text: "Unlimited Resume scans", active: true },
                    { text: "Unlimited Mock interviews", active: true },
                    { text: "Premium detailed roadmaps", active: true },
                    { text: "Full Skill Gap Assessment", active: true },
                    { text: "Unlimited AI Career Chat", active: true },
                    { text: "Priority server access", active: true }
                  ].map((feat, fidx) => (
                    <li key={fidx} style={{ display: "flex", alignItems: "center", gap: "10px", color: "#cbd5e1", fontSize: "14px" }}>
                      <FaCheck style={{ color: "#10b981", fontSize: "12px", flexShrink: 0 }} />
                      <span>{feat.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {isPremium ? (
                <div style={{
                  background: "rgba(16, 185, 129, 0.08)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  borderRadius: "14px",
                  padding: "12px 14px",
                  color: "#10b981",
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: 700,
                  marginTop: "35px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px"
                }}>
                  <FaCrown style={{ color: "#fbbf24" }} />
                  <span>Premium Active ({daysLeft} days left)</span>
                </div>
              ) : (
                <button
                  onClick={handlePayment}
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "14px",
                    fontWeight: 700,
                    fontSize: "15px",
                    cursor: "pointer",
                    marginTop: "35px",
                    transition: "all 0.2s ease",
                    background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                    border: "none",
                    color: "white",
                    boxShadow: "0 10px 20px rgba(99, 102, 241, 0.25)"
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  Upgrade to Pro
                </button>
              )}
            </div>

            {/* Plan 3: Enterprise Team (direct WhatsApp message link) */}
            <div
              className="glass-card"
              style={{
                margin: 0,
                width: "100%",
                maxWidth: "340px",
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "24px",
                padding: "35px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "none"}
            >
              <div>
                <h3 style={{ color: "#94a3b8", fontSize: "16px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "15px" }}>
                  Enterprise Team
                </h3>
                <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "10px" }}>
                  <span style={{ fontSize: "42px", fontWeight: 800, color: "white" }}>Custom</span>
                  <span style={{ color: "#64748b", fontSize: "15px" }}>/org</span>
                </div>
                <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: 1.5, marginBottom: "25px", minHeight: "42px" }}>
                  For universities, coding bootcamps, and recruiters.
                </p>

                <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "25px" }} />

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
                  {[
                    { text: "Everything in Career Pro", active: true },
                    { text: "Bulk resume parsing & scoring", active: true },
                    { text: "Recruiter tracking dashboard", active: true },
                    { text: "Custom system instructions", active: true },
                    { text: "Dedicated API endpoints", active: true },
                    { text: "24/7 dedicated email support", active: true }
                  ].map((feat, fidx) => (
                    <li key={fidx} style={{ display: "flex", alignItems: "center", gap: "10px", color: "#cbd5e1", fontSize: "14px" }}>
                      <FaCheck style={{ color: "#10b981", fontSize: "12px", flexShrink: 0 }} />
                      <span>{feat.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "14px",
                  fontWeight: 700,
                  fontSize: "14px",
                  textAlign: "center",
                  cursor: "pointer",
                  marginTop: "35px",
                  transition: "all 0.2s ease",
                  background: "linear-gradient(135deg, #128c7e, #25d366)",
                  border: "none",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  textDecoration: "none",
                  boxShadow: "0 8px 16px rgba(37, 211, 102, 0.2)",
                  boxSizing: "border-box"
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                <FaWhatsapp style={{ fontSize: "18px" }} />
                <span>Contact on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
