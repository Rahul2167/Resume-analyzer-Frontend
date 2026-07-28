import { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes, FaCommentDots, FaTrash } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "https://resume-analyzer-w806.onrender.com";

const SUGGESTIONS = [
  "How do I improve my resume for a software developer role?",
  "What skills should I learn to become a DevOps engineer?",
  "How do I prepare for a system design interview?",
  "What is the best way to negotiate salary?",
  "How can I switch from IT support to software development?",
];

const BOT_AVATAR = "🤖";
const USER_AVATAR = "👤";

function TypingIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", padding: "4px 0" }}>
      <span style={{ fontSize: "18px", flexShrink: 0 }}>{BOT_AVATAR}</span>
      <div style={{
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "16px 16px 16px 4px",
        padding: "10px 14px",
        display: "flex",
        gap: "4px",
        alignItems: "center",
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: "6px", height: "6px",
            borderRadius: "50%",
            background: "#6366f1",
            animation: `bounce-chat 1.2s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>
    </div>
  );
}

const parseBoldAndItalic = (text) => {
  if (!text) return "";
  const parts = [];
  let currentIndex = 0;
  const regex = /(\*\*|__)(.*?)\1|(\*|_)(.*?)\3/g;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    const matchIndex = match.index;
    
    if (matchIndex > currentIndex) {
      parts.push(text.substring(currentIndex, matchIndex));
    }
    
    if (match[2]) {
      parts.push(<strong key={matchIndex} style={{ color: "#e2e8f0", fontWeight: "bold" }}>{match[2]}</strong>);
    } else if (match[4]) {
      parts.push(<em key={matchIndex} style={{ fontStyle: "italic" }}>{match[4]}</em>);
    }
    
    currentIndex = regex.lastIndex;
  }
  
  if (currentIndex < text.length) {
    parts.push(text.substring(currentIndex));
  }
  
  return parts.length > 0 ? parts : text;
};

const renderMessageContent = (text) => {
  if (!text) return "";
  const lines = text.split("\n");
  
  return lines.map((line, idx) => {
    const headerMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headerMatch) {
      const level = headerMatch[1].length;
      const title = headerMatch[2];
      const fontSize = level === 1 ? "18px" : level === 2 ? "16px" : "14px";
      return (
        <span key={idx} style={{ display: "block", fontWeight: "bold", margin: "10px 0 4px", fontSize, color: "#a5b4fc" }}>
          {parseBoldAndItalic(title)}
        </span>
      );
    }
    
    const bulletMatch = line.match(/^[\*\-•]\s+(.*)$/);
    if (bulletMatch) {
      return (
        <span key={idx} style={{ display: "block", marginLeft: "12px", position: "relative", marginBottom: "4px" }}>
          <span style={{ position: "absolute", left: "-10px", color: "#818cf8" }}>•</span>
          {parseBoldAndItalic(bulletMatch[1])}
        </span>
      );
    }
    
    return (
      <span key={idx} style={{ display: "block", minHeight: "1.2em", marginBottom: "4px" }}>
        {parseBoldAndItalic(line)}
      </span>
    );
  });
};

function Message({ msg }) {
  const isBot = msg.role === "assistant";
  return (
    <div style={{
      display: "flex",
      flexDirection: isBot ? "row" : "row-reverse",
      alignItems: "flex-end",
      gap: "8px",
      padding: "4px 0",
    }}>
      <span style={{ fontSize: "18px", flexShrink: 0 }}>{isBot ? BOT_AVATAR : USER_AVATAR}</span>
      <div style={{
        maxWidth: "80%",
        background: isBot
          ? "rgba(255,255,255,0.06)"
          : "linear-gradient(135deg, #6366f1, #8b5cf6)",
        border: isBot ? "1px solid rgba(255,255,255,0.1)" : "none",
        borderRadius: isBot ? "14px 14px 14px 4px" : "14px 14px 4px 14px",
        padding: "10px 14px",
        color: "white",
        fontSize: "13px",
        lineHeight: 1.55,
        wordBreak: "break-word",
      }} className="chat-bubble-content">
        {renderMessageContent(msg.content)}
        <div style={{ fontSize: "9px", color: isBot ? "#6b7280" : "rgba(255,255,255,0.4)", marginTop: "4px", textAlign: isBot ? "left" : "right" }}>
          {msg.time}
        </div>
      </div>
    </div>
  );
}

export default function FloatingChat() {
  const location = useLocation();
  const allowedPaths = ["/", "/dashboard"];

  if (!allowedPaths.includes(location.pathname)) {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hi! I'm your AI Career Advisor. Ask me anything about resume building, ATS scores, skills gaps, or interviews!",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, loading, isOpen]);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener("open-ai-chat", handleOpenChat);
    return () => {
      window.removeEventListener("open-ai-chat", handleOpenChat);
    };
  }, []);

  const getTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    const userMsg = { role: "user", content: userText, time: getTime() };
    const updatedHistory = [...messages, userMsg];

    setMessages(updatedHistory);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: updatedHistory.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.reply || errorData.message || "AI service is temporarily busy. Please try again in a minute.");
      }

      setMessages(prev => [...prev, { role: "assistant", content: "", time: getTime() }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulatedReply = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
          accumulatedReply += chunk;
          
          setMessages(prev => {
            const next = [...prev];
            if (next.length > 0) {
              next[next.length - 1] = {
                ...next[next.length - 1],
                content: accumulatedReply,
              };
            }
            return next;
          });
        }
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: err.message || "AI service is temporarily busy. Please try again in a minute.",
        time: getTime(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      role: "assistant",
      content: "Chat cleared! How can I help you today?",
      time: getTime(),
    }]);
  };

  return (
    <div style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 999999 }}>
      {!isOpen && (
        <div style={{ position: "relative" }}>
          {/* Welcome Speech Bubble */}
          <div 
            className="chat-welcome-bubble"
            style={{
              position: "absolute",
              right: "80px",
              top: "12px",
              whiteSpace: "nowrap",
              padding: "8px 14px",
              borderRadius: "14px",
              fontSize: "12px",
              fontWeight: 600,
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
              animation: "bubble-bounce 3s ease-in-out infinite",
            }}
          >
            Hii, may I help you?
            <div 
              className="chat-bubble-arrow"
              style={{
                position: "absolute",
                right: "-5px",
                top: "50%",
                transform: "translateY(-50%) rotate(45deg)",
                width: "10px",
                height: "10px",
              }}
            />
          </div>

          <button
            onClick={() => setIsOpen(true)}
            style={{
              width: "88px",
              height: "88px",
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "none",
              boxShadow: "none",
              transition: "transform 0.3s ease",
            }}
            className="floating-chat-trigger"
            title="AI Career Chat"
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1.0)"}
          >
            <FaRobot 
              className="floating-robot-icon" 
              style={{
                fontSize: "80px",
                color: "white",
                filter: "drop-shadow(0 0 12px rgba(99, 102, 241, 0.95)) drop-shadow(0 0 4px rgba(139, 92, 246, 0.95))"
              }}
            />
          </button>
        </div>
      )}

      {/* ── CHAT POPUP WINDOW ── */}
      {isOpen && (
        <div 
          style={{
            width: "380px",
            height: "520px",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.5)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
          className="floating-chat-window"
        >
          {/* Header */}
          <div style={{
            padding: "14px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(255,255,255,0.02)",
            flexShrink: 0,
          }} className="chat-window-header">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "32px", height: "32px", borderRadius: "8px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "16px", color: "white"
              }}>🤖</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "14px", color: "white" }} className="chat-header-title">Career Ascent AI</div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "1px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }} />
                  <span style={{ color: "#10b981", fontSize: "10px", fontWeight: 600 }}>Active Advisor</span>
                </div>
              </div>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button 
                onClick={clearChat}
                style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", fontSize: "14px" }}
                title="Clear Chat"
              >
                <FaTrash />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", fontSize: "16px" }}
                title="Close Chat"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }} className="chat-messages-container">
            {messages.map((msg, i) => <Message key={i} msg={msg} />)}
            {loading && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>


          {/* Input Bar */}
          <div style={{
            padding: "10px 16px 14px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.01)",
            flexShrink: 0,
          }} className="chat-window-input-bar">
            <div style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              background: "rgba(255,255,255,0.04)",
              border: "1.5px solid rgba(99,102,241,0.3)",
              borderRadius: "12px",
              padding: "8px 12px",
            }} className="chat-input-wrapper">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask your career advisor…"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "white",
                  fontSize: "13px",
                  fontFamily: "inherit",
                }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                style={{
                  background: input.trim() && !loading ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "rgba(255,255,255,0.06)",
                  border: "none",
                  borderRadius: "8px",
                  width: "28px",
                  height: "28px",
                  cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  color: "white",
                  flexShrink: 0,
                }}
              >
                {loading ? (
                  <div style={{ width: "10px", height: "10px", border: "1.5px solid white", borderTopColor: "transparent", borderRadius: "50%", animation: "spin-chat 0.7s linear infinite" }} />
                ) : "➤"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style>{`
        @keyframes bounce-chat {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
        @keyframes spin-chat { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
