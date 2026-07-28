import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaEnvelope, FaLock, FaUser, FaArrowLeft } from "react-icons/fa";
import "./Login.css";

const API_URL = import.meta.env.VITE_API_URL || "https://resume-analyzer-jwtj.onrender.com/api";

export default function Login() {
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState("");
  
  // Form states
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Redirect path
  const from = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "262664133823-nik36qj46dveti257r9o52m9itvupegu.apps.googleusercontent.com";
    
    // Load Google Identity Services Script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google?.accounts?.oauth2 && clientId) {
        // Use Token Client with popup — 100% FedCM free, no id.prompt() needed
        window._googleTokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: clientId,
          scope: "openid email profile",
          prompt: "select_account",   // always show account picker
          callback: async (tokenResponse) => {
            if (tokenResponse.error) {
              console.error("Google token error:", tokenResponse.error);
              return;
            }
            try {
              // Fetch user profile using the access token
              const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
              });
              const userInfo = await res.json();
              const googleName    = userInfo.name    || "Google User";
              const googleEmail   = userInfo.email   || "google@user.com";
              const googlePicture = userInfo.picture || "";

              // Save Google user to Supabase DB
              try {
                await fetch(`${API_URL}/auth/register`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ name: googleName, email: googleEmail, authMethod: "google" }),
                });
              } catch (dbErr) {
                console.warn("Failed to sync Google user to Supabase:", dbErr);
              }

              trackLoginEvent(googleName, googleEmail, "google");
              localStorage.setItem("isLoggedIn",  "true");
              localStorage.setItem("isVerified",  "true");
              localStorage.setItem("userEmail",   googleEmail);
              localStorage.setItem("userName",    googleName);
              localStorage.setItem("tempEmail",   googleEmail);
              localStorage.setItem("tempName",    googleName);
              if (googlePicture) localStorage.setItem("userPicture", googlePicture);
              window.dispatchEvent(new Event("storage"));
              navigate(from, { replace: true });
            } catch (err) {
              console.error("Failed to fetch Google user info:", err);
              alert("Google Sign-In failed. Please try again.");
            }
          },
        });
      }
    };
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  const trackLoginEvent = (name, email, authMethod) => {
    const existing = JSON.parse(localStorage.getItem("loggedInUsers") || "[]");
    const alreadyExists = existing.some(u => u.email === email);
    if (!alreadyExists) {
      existing.push({
        id: `user-${Date.now()}`,
        name, email, authMethod,
        lastLogin: new Date().toISOString(),
        isAdmin: email === "rahulpotdar2167@gmail.com",
      });
    } else {
      const idx = existing.findIndex(u => u.email === email);
      if (idx !== -1) existing[idx].lastLogin = new Date().toISOString();
    }
    localStorage.setItem("loggedInUsers", JSON.stringify(existing));
  };

  // Trigger Google popup login — no FedCM, no One Tap, pure OAuth2 popup
  const triggerGoogleLogin = () => {
    if (window._googleTokenClient) {
      window._googleTokenClient.requestAccessToken();
    } else {
      alert("Google Sign-In client is initializing. Please try again in a moment.");
    }
  };


  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!signUpName || !signUpEmail || !signUpPassword) return;

    const trimmedEmail = signUpEmail.trim().toLowerCase();

    // 1. Send user registration to Supabase database backend
    try {
      await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: signUpName,
          email: trimmedEmail,
          password: signUpPassword,
          authMethod: "manual"
        }),
      });
    } catch (dbErr) {
      console.warn("Backend Supabase registration warning:", dbErr);
    }

    // 2. Local storage persistence backup
    const registered = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const existingIdx = registered.findIndex(u => u.email === trimmedEmail);
    const newUser = { name: signUpName, email: trimmedEmail, password: signUpPassword, created: new Date().toISOString() };
    if (existingIdx !== -1) registered[existingIdx] = newUser;
    else registered.push(newUser);

    localStorage.setItem("registeredUsers", JSON.stringify(registered));
    localStorage.setItem("tempName", signUpName);
    localStorage.setItem("tempEmail", trimmedEmail);
    localStorage.setItem("tempPassword", signUpPassword);
    localStorage.setItem("userName", signUpName);
    localStorage.setItem("isVerified", "true");

    // Clear form
    setSignUpName("");
    setSignUpEmail("");
    setSignUpPassword("");

    setSignUpSuccess(`Account created! Sign in with your credentials.`);
    setIsPanelActive(false);
    setTimeout(() => setSignUpSuccess(""), 5000);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!signInEmail || !signInPassword) return;

    const trimmedEmail = signInEmail.trim().toLowerCase();

    // Admin superuser check
    if (trimmedEmail === "rahulpotdar2167@gmail.com" && signInPassword === "Admin") {
      trackLoginEvent("Rahul Potdar", "rahulpotdar2167@gmail.com", "manual");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("isVerified", "true");
      localStorage.setItem("userEmail", "rahulpotdar2167@gmail.com");
      localStorage.setItem("userName", "Rahul Potdar");
      localStorage.setItem("tempEmail", "rahulpotdar2167@gmail.com");
      localStorage.setItem("tempPassword", "Admin");
      navigate(from, { replace: true });
      return;
    }

    // 1. Try authenticating via Supabase backend
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, password: signInPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        const userName = data.user?.name || "User";
        trackLoginEvent(userName, trimmedEmail, "manual");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("isVerified", "true");
        localStorage.setItem("userEmail", trimmedEmail);
        localStorage.setItem("userName", userName);
        navigate(from, { replace: true });
        return;
      }
    } catch (dbErr) {
      console.warn("Backend auth failed, trying local fallback:", dbErr);
    }

    // 2. Fallback to local storage
    const registered = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const matchedUser = registered.find(
      u => u.email === trimmedEmail && u.password === signInPassword
    );

    const savedEmail = (localStorage.getItem("tempEmail") || "").trim().toLowerCase();
    const savedPassword = localStorage.getItem("tempPassword");
    const isTempMatch = (trimmedEmail === savedEmail && signInPassword === savedPassword);

    if (matchedUser || isTempMatch) {
      const name = matchedUser ? matchedUser.name : (localStorage.getItem("tempName") || localStorage.getItem("userName") || "User");
      trackLoginEvent(name, trimmedEmail, "manual");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("isVerified", "true");
      localStorage.setItem("userEmail", trimmedEmail);
      localStorage.setItem("userName", name);
      navigate(from, { replace: true });
    } else {
      alert("Invalid credentials. Please sign up first.");
    }
  };


  return (
    <div className="auth-body">
      <button 
        onClick={() => navigate("/dashboard")} 
        style={{ 
          position: "absolute", top: "25px", left: "25px", background: "rgba(255,255,255,0.15)",
          color: "white", padding: "10px 18px", borderRadius: "20px", display: "flex", alignItems: "center",
          gap: "8px", border: "none", fontSize: "13px", zIndex: 9999, cursor: "pointer"
        }}
      >
        <FaArrowLeft /> Back to Dashboard
      </button>

      <div className={`auth-wrapper ${isPanelActive ? "panel-active" : ""}`} id="authWrapper">
        {/* Register Panel */}
        <div className="auth-form-box register-form-box">
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            
            <button
              type="button"
              onClick={triggerGoogleLogin}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                width: "100%",
                padding: "11px 20px",
                background: "white",
                border: "1.5px solid #dadce0",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 600,
                color: "#3c4043",
                cursor: "pointer",
                margin: "12px 0 8px 0",
                transition: "box-shadow 0.2s ease",
                fontFamily: "inherit",
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.15)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Sign up with Google
            </button>
            <span>or use your email for registration</span>
            
            <div className="input-group-auth">
              <FaUser className="input-icon-auth" />
              <input 
                type="text" 
                placeholder="Full Name" 
                value={signUpName} 
                onChange={(e) => setSignUpName(e.target.value)} 
                required 
              />
            </div>
            
            <div className="input-group-auth">
              <FaEnvelope className="input-icon-auth" />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={signUpEmail} 
                onChange={(e) => setSignUpEmail(e.target.value)} 
                required 
              />
            </div>

            <div className="input-group-auth">
              <FaLock className="input-icon-auth" />
              <input 
                type="password" 
                placeholder="Password" 
                value={signUpPassword} 
                onChange={(e) => setSignUpPassword(e.target.value)} 
                required 
              />
            </div>
            
            <button type="submit" style={{ marginTop: "10px" }}>Sign Up</button>
            
            <div className="mobile-switch">
              <p>Already have an account?</p>
              <button type="button" id="mobileLoginBtn" onClick={() => setIsPanelActive(false)}>Sign In</button>
            </div>
          </form>
        </div>

        {/* Login Panel */}
        <div className="auth-form-box login-form-box">
          <form onSubmit={handleSignIn}>
            <h1>Sign In</h1>
            <br />
            

            {/* Success toast after sign-up */}
            {signUpSuccess && (
              <div style={{
                background: "rgba(16,185,129,0.12)",
                border: "1px solid rgba(16,185,129,0.35)",
                borderRadius: "10px",
                padding: "10px 14px",
                color: "#10b981",
                fontSize: "13px",
                fontWeight: 600,
                textAlign: "center",
                margin: "8px 0",
              }}>
                ✅ {signUpSuccess}
              </div>
            )}
            

            <div className="input-group-auth">
              <FaEnvelope className="input-icon-auth" />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={signInEmail} 
                onChange={(e) => setSignInEmail(e.target.value)} 
                required 
              />
            </div>

            <div className="input-group-auth">
              <FaLock className="input-icon-auth" />
              <input 
                type="password" 
                placeholder="Password" 
                value={signInPassword} 
                onChange={(e) => setSignInPassword(e.target.value)} 
                required 
              />
            </div>
            
            <a href="#" style={{ margin: "10px 0" }}>Forgot your password?</a>
            <button type="submit">Sign In</button>
            <br />
            <button
              type="button"
              onClick={triggerGoogleLogin}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                width: "100%",
                padding: "11px 20px",
                background: "white",
                border: "1.5px solid #dadce0",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 600,
                color: "#3c4043",
                cursor: "pointer",
                margin: "12px 0 8px 0",
                transition: "box-shadow 0.2s ease",
                fontFamily: "inherit",
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.15)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Sign in with Google
            </button>
            
            <div className="mobile-switch">
              <p>Don't have an account?</p>
              <button type="button" id="mobileRegisterBtn" onClick={() => setIsPanelActive(true)}>Sign Up</button>
            </div>
          </form>
        </div>

        {/* Slide Panels */}
        <div className="slide-panel-wrapper">
          <div className="slide-panel">
            <div className="panel-content panel-content-left">
              <h1>Welcome Back!</h1>
              <p>Stay connected by logging in with your credentials and continue your experience</p>
              <button type="button" className="transparent-btn" id="loginBtn" onClick={() => setIsPanelActive(false)}>Sign In</button>
            </div>
            <div className="panel-content panel-content-right">
              <h1>Hey There!</h1>
              <p>Begin your amazing journey by creating an account with us today</p>
              <button type="button" className="transparent-btn" id="registerBtn" onClick={() => setIsPanelActive(true)}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
