"use client";

import { useEffect, useRef, useState } from "react";
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/constants/soundwaves.json";
import { addToSessionHistory } from "@/lib/actions/companions.action";
import { Mic, MicOff, RotateCcw, PhoneOff, Phone, Loader2 } from "lucide-react";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const CompanionComponent = ({
  companionId,
  subject,
  topic,
  name,
  userName,
  userImage,
  style,
  voice,
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking, lottieRef]);

  // Auto-scroll transcript to top (newest message)
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = 0;
    }
  }, [messages]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      addToSessionHistory(companionId);
    };
    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [newMessage, ...prev]);
      }
    };
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: Error) => console.log("Error", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, [companionId]);

  const toggleMicrophone = () => {
    const muted = vapi.isMuted();
    vapi.setMuted(!muted);
    setIsMuted(!muted);
  };

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    const assistantOverrides = {
      variableValues: { userName, name, subject, topic, style },
      clientMessages: ["transcript"],
      serverMessages: [],
    };
    // @ts-expect-error
    vapi.start(configureAssistant(voice || "female", style || "casual"), assistantOverrides);
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  const handleRepeat = () => {
    if (callStatus === CallStatus.ACTIVE || callStatus === CallStatus.CONNECTING) {
      vapi.stop();
    }
    setMessages([]);
    setIsMuted(false);
    setIsSpeaking(false);
    setCallStatus(CallStatus.INACTIVE);
    setTimeout(() => handleCall(), 300);
  };

  const subjectColor = getSubjectColor(subject);
  const isActive = callStatus === CallStatus.ACTIVE;
  const isConnecting = callStatus === CallStatus.CONNECTING;
  const isFinished = callStatus === CallStatus.FINISHED;
  const isInactive = callStatus === CallStatus.INACTIVE;

  return (
    <section className="session-root">

      {/* ── TOP ARENA ── */}
      <div className="arena-wrapper">

        {/* Ambient glow behind companion */}
        <div
          className="arena-glow"
          style={{ background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${subjectColor}33 0%, transparent 70%)` }}
        />

        {/* ── COMPANION CARD ── */}
        <div className={cn("companion-card", isActive && "companion-card--active", isConnecting && "companion-card--connecting")}>

          {/* Ripple rings when active & speaking */}
          {isActive && isSpeaking && (
            <>
              <span className="ripple ripple-1" style={{ borderColor: subjectColor }} />
              <span className="ripple ripple-2" style={{ borderColor: subjectColor }} />
              <span className="ripple ripple-3" style={{ borderColor: subjectColor }} />
            </>
          )}

          {/* Avatar box */}
          <div className="companion-avatar-box" style={{ backgroundColor: subjectColor }}>

            {/* Static icon */}
            <div className={cn(
              "avatar-icon-wrap",
              (isInactive || isFinished) ? "opacity-100" : "opacity-0",
              isConnecting && "opacity-100 animate-pulse"
            )}>
              <Image src={`/icons/${subject}.svg`} alt={subject} width={80} height={80} />
            </div>

            {/* Soundwave lottie */}
            <div className={cn("avatar-icon-wrap", isActive ? "opacity-100" : "opacity-0")}>
              <Lottie
                lottieRef={lottieRef}
                animationData={soundwaves}
                autoplay={false}
                className="w-28 h-28"
              />
            </div>

            {/* "LIVE" pill */}
            {isActive && (
              <span className="live-badge">
                <span className="live-dot" />
                LIVE
              </span>
            )}
          </div>

          <p className="companion-name">{name}</p>

          {/* Status line */}
          <p className={cn("companion-status", isActive && "status-active", isConnecting && "status-connecting", isFinished && "status-finished")}>
            {isActive
              ? isSpeaking ? "Speaking..." : "Listening..."
              : isConnecting
              ? "Connecting..."
              : isFinished
              ? "Session ended"
              : "Ready to start"}
          </p>
        </div>

        {/* ── USER CARD ── */}
        <div className="user-card">
          <div className="user-avatar-ring">
            <Image src={userImage} alt={userName} width={72} height={72} className="user-photo" />
            {/* Online dot */}
            <span className="online-dot" />
          </div>
          <p className="user-name">{userName}</p>
          <p className="user-label">Student</p>
        </div>

      </div>

      {/* ── CONTROLS BAR ── */}
      <div className="controls-bar">

        {/* Mic */}
        <button
          onClick={toggleMicrophone}
          disabled={!isActive}
          className={cn("ctrl-btn", !isMuted && isActive ? "ctrl-btn--mic-on" : "ctrl-btn--muted", !isActive && "ctrl-btn--disabled")}
          title={isMuted ? "Unmute" : "Mute"}
        >
          <div className="relative">
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            {!isMuted && isActive && (
              <span className="mic-live-dot" />
            )}
          </div>
          <span className="ctrl-label">{isMuted ? "Unmute" : "Mute"}</span>
        </button>

        {/* Main CTA — Start / Connecting / End */}
        <button
          onClick={isActive ? handleDisconnect : handleCall}
          disabled={isConnecting}
          className={cn(
            "ctrl-btn-main",
            isActive ? "ctrl-btn-main--end" : "ctrl-btn-main--start",
            isConnecting && "ctrl-btn-main--connecting"
          )}
        >
          {isConnecting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : isActive ? (
            <PhoneOff className="w-5 h-5" />
          ) : (
            <Phone className="w-5 h-5" />
          )}
          <span>
            {isActive ? "End Session" : isConnecting ? "Connecting..." : isFinished ? "Session Ended" : "Start Session"}
          </span>
        </button>

        {/* Repeat */}
        <button
          onClick={handleRepeat}
          disabled={isConnecting}
          className={cn("ctrl-btn ctrl-btn--repeat", isConnecting && "ctrl-btn--disabled")}
          title="Restart"
        >
          <RotateCcw className={cn("w-5 h-5", isConnecting && "animate-spin")} />
          <span className="ctrl-label">Restart</span>
        </button>

      </div>

      {/* ── TRANSCRIPT ── */}
      <div className="transcript-panel">
        <div className="transcript-header">
          <span className="transcript-title">Session Transcript</span>
          {messages.length > 0 && (
            <span className="transcript-count">{messages.length} messages</span>
          )}
        </div>

        <div ref={transcriptRef} className="transcript-body no-scrollbar">
          {messages.length === 0 ? (
            <div className="transcript-empty">
              <p>Your conversation will appear here once the session starts.</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "transcript-msg",
                  message.role === "assistant" ? "transcript-msg--ai" : "transcript-msg--user"
                )}
              >
                <span className="msg-sender">
                  {message.role === "assistant"
                    ? name.split(" ")[0]
                    : userName}
                </span>
                <p className="msg-content">{message.content}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── STYLES ── */}
      <style jsx>{`

        /* Root */
        .session-root {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 1.5rem 1rem;
          min-height: 100vh;
          background: hsl(var(--background));
        }

        /* ── Arena ── */
        .arena-wrapper {
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 1.5rem;
          padding: 2rem 1rem 1rem;
        }
        .arena-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: 2rem;
        }

        /* ── Companion Card ── */
        .companion-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          background: hsl(var(--card));
          border: 1.5px solid hsl(var(--border));
          border-radius: 1.5rem;
          padding: 2rem 2.5rem;
          flex: 1;
          max-width: 520px;
          transition: border-color 0.4s, box-shadow 0.4s;
          overflow: hidden;
        }
        .companion-card--active {
          border-color: hsl(var(--primary) / 0.6);
          box-shadow: 0 0 0 4px hsl(var(--primary) / 0.08), 0 8px 32px hsl(var(--primary) / 0.12);
        }
        .companion-card--connecting {
          border-color: hsl(var(--primary) / 0.4);
        }

        /* Ripple rings */
        .ripple {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 1.5px solid;
          animation: rippleOut 2s ease-out infinite;
          pointer-events: none;
        }
        .ripple-1 { width: 180px; height: 180px; animation-delay: 0s; }
        .ripple-2 { width: 260px; height: 260px; animation-delay: 0.5s; }
        .ripple-3 { width: 340px; height: 340px; animation-delay: 1s; }

        @keyframes rippleOut {
          0%   { opacity: 0.5; transform: translate(-50%, -50%) scale(0.8); }
          100% { opacity: 0;   transform: translate(-50%, -50%) scale(1.2); }
        }

        /* Avatar box */
        .companion-avatar-box {
          position: relative;
          width: 148px;
          height: 148px;
          border-radius: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 24px rgba(0,0,0,0.15);
          flex-shrink: 0;
        }
        .avatar-icon-wrap {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.8s;
        }

        /* LIVE badge */
        .live-badge {
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          background: #ef4444;
          color: white;
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          padding: 2px 8px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          gap: 4px;
          box-shadow: 0 2px 8px rgba(239,68,68,0.5);
        }
        .live-dot {
          width: 5px;
          height: 5px;
          background: white;
          border-radius: 50%;
          animation: blink 1s step-start infinite;
        }
        @keyframes blink { 50% { opacity: 0; } }

        /* Companion text */
        .companion-name {
          font-size: 1.35rem;
          font-weight: 700;
          color: hsl(var(--foreground));
          margin-top: 0.5rem;
        }
        .companion-status {
          font-size: 0.78rem;
          color: hsl(var(--muted-foreground));
          font-weight: 500;
          letter-spacing: 0.02em;
          transition: color 0.3s;
        }
        .status-active  { color: #22c55e; }
        .status-connecting { color: hsl(var(--primary)); }
        .status-finished { color: hsl(var(--muted-foreground)); }

        /* ── User Card ── */
        .user-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          background: hsl(var(--card));
          border: 1.5px solid hsl(var(--border));
          border-radius: 1.25rem;
          padding: 1.5rem 1.75rem;
          min-width: 140px;
        }
        .user-avatar-ring {
          position: relative;
          width: 76px;
          height: 76px;
        }
        .user-photo {
          width: 76px;
          height: 76px;
          border-radius: 0.75rem;
          object-fit: cover;
        }
        .online-dot {
          position: absolute;
          bottom: -3px;
          right: -3px;
          width: 14px;
          height: 14px;
          background: #22c55e;
          border-radius: 50%;
          border: 2.5px solid hsl(var(--card));
        }
        .user-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: hsl(var(--foreground));
          margin-top: 0.25rem;
        }
        .user-label {
          font-size: 0.72rem;
          color: hsl(var(--muted-foreground));
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        /* ── Controls bar ── */
        .controls-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.875rem;
          padding: 1rem;
          background: hsl(var(--card));
          border: 1.5px solid hsl(var(--border));
          border-radius: 1.25rem;
        }

        /* Secondary control buttons */
        .ctrl-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
          padding: 0.75rem 1.25rem;
          border-radius: 0.875rem;
          border: 1.5px solid hsl(var(--border));
          background: hsl(var(--background));
          color: hsl(var(--foreground));
          cursor: pointer;
          transition: all 0.2s;
          min-width: 72px;
        }
        .ctrl-btn:hover:not(.ctrl-btn--disabled) {
          background: hsl(var(--accent));
          border-color: hsl(var(--primary) / 0.4);
          transform: translateY(-1px);
        }
        .ctrl-btn--mic-on {
          border-color: #ef4444;
          background: #fef2f2;
          color: #ef4444;
        }
        .ctrl-btn--mic-on:hover {
          background: #fee2e2 !important;
        }
        .ctrl-btn--muted {
          border-color: hsl(var(--border));
        }
        .ctrl-btn--disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .ctrl-btn--repeat:hover:not(.ctrl-btn--disabled) svg {
          transform: rotate(-180deg);
          transition: transform 0.4s;
        }

        .ctrl-label {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        /* Mic live dot */
        .mic-live-dot {
          position: absolute;
          top: -3px;
          right: -3px;
          width: 8px;
          height: 8px;
          background: #ef4444;
          border-radius: 50%;
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.7; }
        }

        /* Main CTA button */
        .ctrl-btn-main {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 2rem;
          border-radius: 0.875rem;
          border: none;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          flex: 1;
          justify-content: center;
          max-width: 220px;
          letter-spacing: 0.01em;
        }
        .ctrl-btn-main--start {
          background: hsl(var(--primary));
          color: white;
          box-shadow: 0 4px 16px hsl(var(--primary) / 0.35);
        }
        .ctrl-btn-main--start:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px hsl(var(--primary) / 0.45);
        }
        .ctrl-btn-main--end {
          background: #ef4444;
          color: white;
          box-shadow: 0 4px 16px rgba(239,68,68,0.3);
        }
        .ctrl-btn-main--end:hover {
          background: #dc2626;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(239,68,68,0.4);
        }
        .ctrl-btn-main--connecting {
          background: hsl(var(--primary) / 0.7);
          color: white;
          cursor: not-allowed;
          animation: connectingPulse 1.5s ease-in-out infinite;
        }
        @keyframes connectingPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        /* ── Transcript ── */
        .transcript-panel {
          background: hsl(var(--card));
          border: 1.5px solid hsl(var(--border));
          border-radius: 1.25rem;
          overflow: hidden;
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 220px;
        }
        .transcript-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem 0.75rem;
          border-bottom: 1px solid hsl(var(--border));
        }
        .transcript-title {
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: hsl(var(--muted-foreground));
        }
        .transcript-count {
          font-size: 0.72rem;
          font-weight: 600;
          color: hsl(var(--muted-foreground));
          background: hsl(var(--accent));
          padding: 2px 8px;
          border-radius: 999px;
        }
        .transcript-body {
          padding: 1rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          overflow-y: auto;
          max-height: 260px;
        }
        .transcript-empty {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100px;
          color: hsl(var(--muted-foreground));
          font-size: 0.83rem;
          text-align: center;
        }

        /* Message bubbles */
        .transcript-msg {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          padding: 0.6rem 0.875rem;
          border-radius: 0.75rem;
          max-width: 88%;
        }
        .transcript-msg--ai {
          background: hsl(var(--accent));
          align-self: flex-start;
          border-bottom-left-radius: 0.2rem;
        }
        .transcript-msg--user {
          background: hsl(var(--primary) / 0.08);
          align-self: flex-end;
          border-bottom-right-radius: 0.2rem;
          border: 1px solid hsl(var(--primary) / 0.15);
        }
        .msg-sender {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: hsl(var(--muted-foreground));
        }
        .transcript-msg--user .msg-sender {
          color: hsl(var(--primary));
          text-align: right;
        }
        .msg-content {
          font-size: 0.875rem;
          line-height: 1.55;
          color: hsl(var(--foreground));
        }
        .transcript-msg--user .msg-content {
          text-align: right;
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .arena-wrapper {
            flex-direction: column;
            align-items: center;
          }
          .companion-card {
            width: 100%;
            padding: 1.5rem 1rem;
          }
          .user-card {
            flex-direction: row;
            width: 100%;
            justify-content: center;
            gap: 1rem;
            padding: 0.875rem 1rem;
          }
          .ctrl-btn-main {
            max-width: none;
          }
          .controls-bar {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </section>
  );
};

export default CompanionComponent;