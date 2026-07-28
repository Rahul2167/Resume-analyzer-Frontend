import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { FaUserEdit, FaKey, FaCheck, FaSave, FaTimes, FaCrown, FaHistory, FaCalendarAlt } from "react-icons/fa";
import { checkUserPremium, getPremiumDaysLeft, getPaymentHistory } from "../utils/premiumUtils";

export default function Profile() {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") === "password" ? "password" : "profile";

  const [tab, setTab] = useState(activeTab);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [saved, setSaved] = useState(false);

  const [isPremium, setIsPremium] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);
  const [payments, setPayments] = useState([]);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwSaved, setPwSaved] = useState(false);
  const [activeInvoice, setActiveInvoice] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setName(localStorage.getItem("userName") || localStorage.getItem("tempName") || "");
    setEmail(localStorage.getItem("userEmail") || localStorage.getItem("tempEmail") || "");
    setPhone(localStorage.getItem("userPhone") || "");

    // Check premium scoped to this user
    const premium = checkUserPremium();
    const days = getPremiumDaysLeft();
    setIsPremium(premium);
    setDaysLeft(days > 0 ? days : 0);

    // Load this user's payment history only
    const history = getPaymentHistory();
    setPayments(history);
  }, []);

  useEffect(() => {
    setTab(activeTab);
  }, [activeTab]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", name);
    localStorage.setItem("tempName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("tempEmail", email);
    localStorage.setItem("userPhone", phone);
    setSaved(true);
    // Dispatch storage event so other components (like Navbar) update immediately
    window.dispatchEvent(new Event("storage"));
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwError("");

    if (newPassword.length < 6) {
      setPwError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError("Passwords do not match.");
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL || "https://resume-analyzer-jwtj.onrender.com/api";
      const userEmail = localStorage.getItem("userEmail") || localStorage.getItem("tempEmail");
      if (userEmail) {
        await fetch(`${API_URL}/auth/change-password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userEmail, newPassword }),
        });
      }
    } catch (err) {
      console.warn("Failed to sync password to server:", err);
    }

    localStorage.setItem("tempPassword", newPassword);
    setPwSaved(true);
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPwSaved(false), 3000);
  };

  const getInitials = () => {
    if (name) return name.charAt(0).toUpperCase();
    if (email) return email.charAt(0).toUpperCase();
    return "U";
  };

  const formatDate = (iso) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content" style={{ padding: "32px 36px" }}>
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>

            {/* Avatar Header */}
            <div className="profile-page-header" style={{ position: "relative" }}>
              <div className="profile-page-avatar">{getInitials()}</div>
              <div>
                <h2 className="profile-page-name" style={{ display: "flex", alignItems: "center", gap: "8px", margin: 0 }}>
                  {name || "Your Name"}
                  {isPremium && (
                    <span style={{
                      background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                      color: "#1e1b4b",
                      fontSize: "11px",
                      fontWeight: 800,
                      padding: "2px 8px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px"
                    }}>
                      👑 PRO
                    </span>
                  )}
                </h2>
                <p className="profile-page-email" style={{ margin: "4px 0 0 0" }}>{email || "your@email.com"}</p>
                {isPremium && (
                  <p style={{ margin: "6px 0 0 0", fontSize: "12px", color: "#fbbf24", fontWeight: 700 }}>
                    Premium subscription active — {daysLeft} days remaining
                  </p>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="profile-tabs">
              <button
                className={`profile-tab-btn ${tab === "profile" ? "active" : ""}`}
                onClick={() => setTab("profile")}
              >
                <FaUserEdit /> Edit Profile
              </button>
              <button
                className={`profile-tab-btn ${tab === "password" ? "active" : ""}`}
                onClick={() => setTab("password")}
              >
                <FaKey /> Change Password
              </button>
              <button
                className={`profile-tab-btn ${tab === "history" ? "active" : ""}`}
                onClick={() => setTab("history")}
              >
                <FaHistory /> Payment History
              </button>
            </div>

            {/* Profile Tab */}
            {tab === "profile" && (
              <form className="profile-form" onSubmit={handleSaveProfile}>
                <div className="profile-form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="profile-input"
                  />
                </div>
                <div className="profile-form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="profile-input"
                  />
                </div>
                <div className="profile-form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="profile-input"
                  />
                </div>

                {saved && (
                  <div className="profile-success-msg">
                    <FaCheck /> Profile saved successfully!
                  </div>
                )}

                <button type="submit" className="profile-save-btn">
                  <FaSave /> Save Changes
                </button>
              </form>
            )}

            {/* Password Tab */}
            {tab === "password" && (
              <form className="profile-form" onSubmit={handleChangePassword}>
                <div className="profile-form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Enter new password (min. 6 chars)"
                    className="profile-input"
                    required
                  />
                </div>
                <div className="profile-form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="profile-input"
                    required
                  />
                </div>

                {pwError && (
                  <div className="profile-error-msg">
                    <FaTimes /> {pwError}
                  </div>
                )}

                {pwSaved && (
                  <div className="profile-success-msg">
                    <FaCheck /> Password changed successfully!
                  </div>
                )}

                <button type="submit" className="profile-save-btn">
                  <FaKey /> Update Password
                </button>
              </form>
            )}

            {/* Payment & Subscription Tab */}
            {tab === "history" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                
                {/* Active Benefits Section */}
                <div style={{
                  background: isPremium 
                    ? "linear-gradient(135deg, rgba(251, 191, 36, 0.05), rgba(245, 158, 11, 0.03))" 
                    : "rgba(255, 255, 255, 0.02)",
                  border: isPremium ? "1px solid rgba(251, 191, 36, 0.25)" : "1px solid rgba(255, 255, 255, 0.06)",
                  borderRadius: "20px",
                  padding: "24px 28px",
                  marginBottom: "12px"
                }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                    <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: isPremium ? "#fbbf24" : "white", display: "flex", alignItems: "center", gap: "8px" }}>
                      <FaCrown /> Active Premium Benefits
                    </h4>
                    {isPremium && (
                      <span style={{ fontSize: "12px", color: "#fbbf24", fontWeight: 700 }}>
                        Pro Account
                      </span>
                    )}
                  </div>
                  
                  {isPremium ? (
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      {[
                        "Unlimited Resume scans",
                        "Unlimited Mock interviews",
                        "Premium detailed roadmaps",
                        "Full Skill Gap Assessment",
                        "Unlimited AI Career Chat",
                        "Priority server access"
                      ].map((benefit, bidx) => (
                        <li key={bidx} style={{ display: "flex", alignItems: "center", gap: "8px", color: "#cbd5e1", fontSize: "13.5px" }}>
                          <FaCheck style={{ color: "#10b981", fontSize: "12px", flexShrink: 0 }} />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>
                      <p style={{ margin: "0 0 16px 0", color: "#94a3b8", fontSize: "13.5px", lineHeight: 1.5 }}>
                        You are currently on the Free Starter plan. Upgrade to Pro to unlock unlimited resume reviews, mock interviews, detailed career roadmaps, and priority access.
                      </p>
                      <button 
                        onClick={() => navigate("/pricing")}
                        style={{
                          background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                          border: "none",
                          borderRadius: "10px",
                          padding: "10px 20px",
                          color: "white",
                          fontWeight: 700,
                          fontSize: "13px",
                          cursor: "pointer",
                          transition: "opacity 0.2s"
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
                        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                      >
                        Upgrade to Premium Pro
                      </button>
                    </div>
                  )}
                </div>

                {/* Transactions Section */}
                <h3 style={{ fontSize: "16px", fontWeight: 700, margin: "12px 0 4px 0", color: "white" }}>
                  Purchase History
                </h3>
                {payments.length === 0 ? (
                  <div style={{
                    padding: "32px",
                    textAlign: "center",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    borderRadius: "14px",
                    color: "#64748b",
                    fontSize: "14px"
                  }}>
                    No transactions found. Upgrade to Pro to get started!
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {payments.map((pay, pidx) => (
                      <div key={pidx} style={{
                        padding: "16px 20px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: "14px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }} className="payment-history-card">
                        <div>
                          <div style={{ fontWeight: 700, fontSize: "14px", color: "white", display: "flex", alignItems: "center", gap: "6px" }}>
                            <FaCrown style={{ color: "#fbbf24", fontSize: "13px" }} />
                            {pay.planName} Subscription
                          </div>
                          <div style={{ fontSize: "11px", opacity: 0.5, marginTop: "4px" }}>
                            Order: {pay.orderId} • Pay: {pay.paymentId}
                          </div>
                          <div style={{ fontSize: "12px", opacity: 0.7, marginTop: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
                            <FaCalendarAlt style={{ fontSize: "11px" }} />
                            {formatDate(pay.date)}
                          </div>
                        </div>
                        <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                          <div style={{ fontSize: "16px", fontWeight: 800, color: "#10b981" }}>{pay.amount}</div>
                          <span style={{
                            display: "inline-block",
                            background: "rgba(16,185,129,0.12)",
                            color: "#10b981",
                            borderRadius: "6px",
                            fontSize: "10px",
                            padding: "2px 7px",
                            fontWeight: 700,
                            marginTop: "6px"
                          }}>
                            {pay.status}
                          </span>
                          <button
                            onClick={() => setActiveInvoice(pay)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#818cf8",
                              fontSize: "11px",
                              fontWeight: 750,
                              cursor: "pointer",
                              textDecoration: "underline",
                              marginTop: "8px",
                              padding: 0,
                              display: "block",
                              fontFamily: "inherit"
                            }}
                          >
                            View Receipt
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Invoice Modal */}
      {activeInvoice && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99999,
          padding: "20px"
        }}>
          <div style={{
            background: "#121324",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "20px",
            width: "100%",
            maxWidth: "460px",
            padding: "28px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            position: "relative",
            color: "white"
          }} className="invoice-modal-content">
            
            {/* Close Button */}
            <button 
              onClick={() => setActiveInvoice(null)}
              style={{
                position: "absolute",
                top: "18px",
                right: "18px",
                background: "none",
                border: "none",
                color: "#64748b",
                fontSize: "16px",
                cursor: "pointer"
              }}
            >
              <FaTimes />
            </button>

            {/* Receipt Header */}
            <div style={{ textAlign: "center", marginBottom: "20px" }} className="invoice-print-header">
              <div style={{ fontSize: "28px", color: "#fbbf24", marginBottom: "6px" }}>👑</div>
              <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 800, letterSpacing: "0.5px" }}>PAYMENT RECEIPT</h2>
              <p style={{ margin: "4px 0 0 0", fontSize: "11px", opacity: 0.5 }}>Career Ascent AI • Tax Invoice</p>
            </div>

            {/* Bill Details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", background: "rgba(255,255,255,0.02)", padding: "14px 18px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.04)", marginBottom: "18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ opacity: 0.5 }}>Receipt No:</span>
                <span style={{ fontWeight: 600 }}>{activeInvoice.orderId.replace("order_", "INV-")}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ opacity: 0.5 }}>Payment ID:</span>
                <span style={{ fontWeight: 600 }}>{activeInvoice.paymentId}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ opacity: 0.5 }}>Date:</span>
                <span style={{ fontWeight: 600 }}>{formatDate(activeInvoice.date)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ opacity: 0.5 }}>Billed To:</span>
                <span style={{ fontWeight: 600 }}>{name || "User"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ opacity: 0.5 }}>Email Address:</span>
                <span style={{ fontWeight: 600 }}>{email}</span>
              </div>
            </div>

            {/* Line Items */}
            <div style={{ fontSize: "12.5px", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, paddingBottom: "8px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <span>Plan Description</span>
                <span>Amount</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{activeInvoice.planName} Subscription</div>
                  <div style={{ fontSize: "11px", opacity: 0.5, marginTop: "2px" }}>30 Days Pro Plan Benefits Included</div>
                </div>
                <span style={{ fontWeight: 600 }}>₹1,499.00</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 2px 0", opacity: 0.6 }}>
                <span>Discount (100% OFF):</span>
                <span>-₹1,499.00</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: "14px", marginTop: "8px", paddingTop: "8px", borderTop: "1px dashed rgba(255,255,255,0.12)", color: "#10b981" }}>
                <span>Total Paid:</span>
                <span>₹0.00</span>
              </div>
            </div>

            {/* Print/Close Button */}
            <div style={{ display: "flex", gap: "10px" }} className="invoice-modal-buttons">
              <button 
                onClick={() => window.print()}
                className="profile-save-btn" 
                style={{ flex: 1, margin: 0, padding: "10px", fontSize: "12px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
              >
                Print Invoice
              </button>
              <button 
                onClick={() => setActiveInvoice(null)}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "12px",
                  cursor: "pointer"
                }}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
