import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
const API_URL = import.meta.env.VITE_API_URL || "https://resume-analyzer-w806.onrender.com";

const SUGGESTIONS = [
  "How do I improve my resume for a software developer role?",
  "What skills should I learn to become a DevOps engineer?",
  "How do I prepare for a system design interview?",
  "What is the best way to negotiate salary?",
  "How can I switch from IT support to software development?",
  "What certifications are most valuable for cloud engineering?",
];

const BOT_AVATAR = "🤖";
const USER_AVATAR = "👤";

function TypingIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", padding: "4px 0" }}>
      <span style={{ fontSize: "22px", flexShrink: 0 }}>{BOT_AVATAR}</span>
      <div style={{
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "16px 16px 16px 4px",
        padding: "14px 18px",
        display: "flex",
        gap: "5px",
        alignItems: "center",
      }} className="aichat-msg-bubble bot">
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "#6366f1",
            animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
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
  
  // Matches **bold** or *italic*
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
    // Check for Headings
    const headerMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headerMatch) {
      const level = headerMatch[1].length;
      const title = headerMatch[2];
      const fontSize = level === 1 ? "22px" : level === 2 ? "18px" : "15px";
      return (
        <span key={idx} style={{ display: "block", fontWeight: "bold", margin: "16px 0 8px", fontSize, color: "#a5b4fc" }}>
          {parseBoldAndItalic(title)}
        </span>
      );
    }
    
    // Check for Bullet Lists
    const bulletMatch = line.match(/^[\*\-•]\s+(.*)$/);
    if (bulletMatch) {
      return (
        <span key={idx} style={{ display: "block", marginLeft: "16px", position: "relative", marginBottom: "6px" }}>
          <span style={{ position: "absolute", left: "-12px", color: "#818cf8" }}>•</span>
          {parseBoldAndItalic(bulletMatch[1])}
        </span>
      );
    }
    
    return (
      <span key={idx} style={{ display: "block", minHeight: "1.2em", marginBottom: "6px" }}>
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
      gap: "10px",
      padding: "4px 0",
    }}>
      <span style={{ fontSize: "22px", flexShrink: 0 }}>{isBot ? BOT_AVATAR : USER_AVATAR}</span>
      <div 
        className={`aichat-msg-bubble ${isBot ? 'bot' : 'user'}`}
        style={{
          maxWidth: "72%",
          borderRadius: isBot ? "16px 16px 16px 4px" : "16px 16px 4px 16px",
          padding: "12px 16px",
          fontSize: "14px",
          lineHeight: 1.65,
          wordBreak: "break-word",
        }}
      >
        {renderMessageContent(msg.content)}
        <div style={{ fontSize: "11px", color: isBot ? "#4b5563" : "rgba(255,255,255,0.4)", marginTop: "6px", textAlign: isBot ? "left" : "right" }}>
          {msg.time}
        </div>
      </div>
    </div>
  );
}

export default function AiChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hi! I'm your AI Career Advisor. I can help you with:\n\n• Resume tips & ATS optimization\n• Career path guidance & roadmaps\n• Interview preparation strategies\n• Skill gap analysis & learning resources\n• Salary negotiation advice\n• Job search strategies\n\nWhat career question can I help you with today?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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

      // Add empty bot message as placeholder for streamed chunks
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
      setTimeout(() => inputRef.current?.focus(), 100);
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
      content: "Chat cleared! How can I help you with your career today?",
      time: getTime(),
    }]);
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />

        <div className="aichat-container" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* ── HEADER ── */}
          <div className="aichat-header" style={{
            padding: "16px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "42px", height: "42px", borderRadius: "12px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "20px", color: "white"
              }}>🤖</div>
              <div>
                <div className="aichat-title" style={{ fontWeight: 700, fontSize: "15px" }}>AI Career Advisor</div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                  <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10b981" }} />
                  <span style={{ color: "#10b981", fontSize: "12px", fontWeight: 600 }}>Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={clearChat}
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#9ca3af", borderRadius: "8px", padding: "7px 14px", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}
            >
              🗑️ Clear Chat
            </button>
          </div>

          {/* ── MESSAGES ── */}
          <div className="aichat-messages-box" style={{ flex: 1, overflowY: "auto", padding: "20px 28px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {messages.map((msg, i) => <Message key={i} msg={msg} />)}
            {loading && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* ── INPUT BAR ── */}
          <div className="aichat-input-bar" style={{
            padding: "14px 28px 20px",
            flexShrink: 0,
          }}>
            <div className="aichat-input-wrapper" style={{
              display: "flex",
              gap: "10px",
              alignItems: "flex-end",
              borderRadius: "16px",
              padding: "10px 14px",
            }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about your career… (Enter to send, Shift+Enter for new line)"
                rows={1}
                className="aichat-textarea"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontSize: "14px",
                  lineHeight: 1.5,
                  resize: "none",
                  fontFamily: "inherit",
                  height: "24px",
                  maxHeight: "50px",
                  overflowY: "auto",
                }}
                onInput={e => {
                  e.target.style.height = "24px";
                  e.target.style.height = Math.min(e.target.scrollHeight, 50) + "px";
                }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className={`aichat-send-btn ${input.trim() && !loading ? 'active' : ''}`}
                style={{
                  border: "none",
                  borderRadius: "10px",
                  width: "38px",
                  height: "38px",
                  cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  flexShrink: 0,
                  transition: "all 0.2s ease",
                  color: "white"
                }}
              >
                {loading ? (
                  <div style={{ width: "14px", height: "14px", border: "2px solid white", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                ) : "➤"}
              </button>
            </div>
            <div style={{ color: "#374151", fontSize: "11px", textAlign: "center", marginTop: "8px" }} className="aichat-disclaimer">
              AI responses are for guidance only. Always verify career advice with industry professionals.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
