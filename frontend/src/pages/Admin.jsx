import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  FaShieldAlt, FaUsers, FaCalendarAlt,
  FaEnvelope, FaTrash, FaCrown, FaGooglePlusG
} from "react-icons/fa";

const ADMIN_EMAIL = "rahulpotdar2167@gmail.com";

export default function Admin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const currentEmail = localStorage.getItem("userEmail") || localStorage.getItem("tempEmail") || "";
  const isAdmin = currentEmail === ADMIN_EMAIL;

  useEffect(() => {
    if (!isAdmin) {
      navigate("/dashboard");
      return;
    }
    loadUsers();
  }, [isAdmin]);

  const loadUsers = () => {
    const loginList = JSON.parse(localStorage.getItem("loggedInUsers") || "[]");
    setUsers(loginList);
  };

  const handleDeleteUser = (email) => {
    if (email === ADMIN_EMAIL) return;
    if (!window.confirm("Remove this user from the login history?")) return;
    const updated = users.filter(u => u.email !== email);
    localStorage.setItem("loggedInUsers", JSON.stringify(updated));
    setUsers(updated);
  };

  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (iso) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  if (!isAdmin) return null;

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content" style={{ padding: "28px 32px" }}>

          {/* Title */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "28px" }}>
            <div style={{
              width: "46px", height: "46px", borderRadius: "12px",
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "20px", color: "white"
            }}>
              <FaShieldAlt />
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 700 }} className="admin-title">
                Admin Panel
              </h1>
              <p style={{ margin: 0, fontSize: "13px", opacity: 0.6 }} className="admin-subtitle">
                Users who have logged in
              </p>
            </div>

            {/* Total count badge */}
            <div style={{
              marginLeft: "auto",
              background: "rgba(99,102,241,0.12)",
              border: "1px solid rgba(99,102,241,0.25)",
              borderRadius: "10px",
              padding: "8px 18px",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              <FaUsers style={{ color: "#818cf8" }} />
              <span style={{ color: "#818cf8", fontWeight: 700, fontSize: "14px" }}>
                {users.length} Total Login{users.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Search */}
          <div style={{ marginBottom: "16px" }}>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="🔍  Search by name or email..."
              className="admin-search-input"
            />
          </div>

          {/* Table */}
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Auth Method</th>
                  <th>Last Login</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center", padding: "48px", opacity: 0.45 }}>
                      No login records found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user, idx) => (
                    <tr key={user.id || idx} className="admin-table-row">
                      <td style={{ color: "#6b7280", fontWeight: 600 }}>{idx + 1}</td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{
                            width: "34px", height: "34px", borderRadius: "50%",
                            background: user.isAdmin
                              ? "linear-gradient(135deg, #f59e0b, #d97706)"
                              : user.authMethod === "google"
                              ? "linear-gradient(135deg, #3b82f6, #1d4ed8)"
                              : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "white", fontSize: user.isAdmin ? "14px" : "13px",
                            fontWeight: 800, flexShrink: 0,
                          }}>
                            {user.isAdmin
                              ? <FaCrown />
                              : user.authMethod === "google"
                              ? "G"
                              : (user.name?.charAt(0) || user.email?.charAt(0) || "U").toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: "14px" }}>
                              {user.name || "—"}
                              {user.isAdmin && (
                                <span style={{
                                  marginLeft: "8px",
                                  background: "#f59e0b",
                                  color: "white",
                                  borderRadius: "6px",
                                  fontSize: "10px",
                                  padding: "2px 7px",
                                  fontWeight: 700
                                }}>Admin</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontSize: "13px", opacity: 0.8 }}>{user.email}</td>
                      <td>
                        <span className={`admin-badge ${user.authMethod === "google" ? "badge-google" : "badge-manual"}`}>
                          {user.authMethod === "google" ? "Google" : "Manual"}
                        </span>
                      </td>
                      <td style={{ fontSize: "12px", opacity: 0.65 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                          <FaCalendarAlt style={{ opacity: 0.5, flexShrink: 0 }} />
                          {formatDate(user.lastLogin)}
                        </span>
                      </td>
                      <td>
                        {!user.isAdmin ? (
                          <button
                            onClick={() => handleDeleteUser(user.email)}
                            className="admin-delete-btn"
                            title="Remove from log"
                          >
                            <FaTrash />
                          </button>
                        ) : (
                          <span style={{ opacity: 0.3, fontSize: "12px" }}>—</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
