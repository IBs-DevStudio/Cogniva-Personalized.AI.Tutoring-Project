"use client";

import { useEffect, useRef, useState } from "react";
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/constants/soundwaves.json";
import { addToSessionHistory } from "@/lib/actions/companions.action";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Loader2,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface ActiveCaption {
  role: string;
  content: string;
  id: number;
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
  const [activeCaption, setActiveCaption] = useState<ActiveCaption | null>(null);
  const [isCaptionVisible, setIsCaptionVisible] = useState(false);
  const [showFullTranscript, setShowFullTranscript] = useState(false);
  const [copied, setCopied] = useState(false);

  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const captionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const historyScrollRef = useRef<HTMLDivElement | null>(null);

  const cleanName = name ? name.split(" ")[0].replace(/[.,]/g, "") : "Tutor";

  useEffect(() => {
    if (lottieRef.current) {
      if (isSpeaking) {
        lottieRef.current.play();
      } else {
        lottieRef.current.stop();
      }
    }
  }, [isSpeaking]);

  // Auto-scroll full transcript drawer to bottom when new messages arrive or drawer opens
  useEffect(() => {
    if (showFullTranscript && historyScrollRef.current) {
      historyScrollRef.current.scrollTop = historyScrollRef.current.scrollHeight;
    }
  }, [messages, showFullTranscript]);

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
      setActiveCaption({
        role: "assistant",
        content: `Session started with ${cleanName}. Speak naturally anytime!`,
        id: Date.now(),
      });
      setIsCaptionVisible(true);
      if (captionTimeoutRef.current) clearTimeout(captionTimeoutRef.current);
      captionTimeoutRef.current = setTimeout(() => {
        setIsCaptionVisible(false);
      }, 5000);
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      addToSessionHistory(companionId);
      setIsCaptionVisible(false);
      setActiveCaption(null);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript") {
        const text = message.transcript?.trim();
        if (!text) return;

        // Save completed utterance into full history
        if (message.transcriptType === "final") {
          const newMessage: SavedMessage = {
            role: message.role as "user" | "assistant" | "system",
            content: text,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          setMessages((prev) => [newMessage, ...prev]);
        }

        // Display current active 2-line caption
        setActiveCaption({
          role: message.role,
          content: text,
          id: Date.now() + Math.random(),
        });
        setIsCaptionVisible(true);

        // Auto-vanish after 5.5 seconds of silence
        if (captionTimeoutRef.current) {
          clearTimeout(captionTimeoutRef.current);
        }
        captionTimeoutRef.current = setTimeout(() => {
          setIsCaptionVisible(false);
        }, 5500);
      }
    };

    const onSpeechStart = () => {
      setIsSpeaking(true);
      setIsCaptionVisible(true);
    };

    const onSpeechEnd = () => {
      setIsSpeaking(false);
    };

    const onError = (error: Error) => console.log("Error", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      if (captionTimeoutRef.current) clearTimeout(captionTimeoutRef.current);
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, [companionId, cleanName]);

  const toggleMicrophone = () => {
    const isMutedState = vapi.isMuted();
    vapi.setMuted(!isMutedState);
    setIsMuted(!isMutedState);
  };

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    const assistantOverrides = {
      variableValues: { userName, name, subject, topic, style },
      clientMessages: ["transcript"],
      serverMessages: [],
    };

    vapi.start(
      configureAssistant(voice || "female", style || "casual"),
      assistantOverrides as any,
    );
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  const handleRepeat = () => {
    if (
      callStatus === CallStatus.ACTIVE ||
      callStatus === CallStatus.CONNECTING
    ) {
      vapi.stop();
    }
    if (captionTimeoutRef.current) clearTimeout(captionTimeoutRef.current);
    setMessages([]);
    setActiveCaption(null);
    setIsCaptionVisible(false);
    setIsMuted(false);
    setIsSpeaking(false);
    setCallStatus(CallStatus.INACTIVE);

    setTimeout(() => {
      handleCall();
    }, 300);
  };

  const handleCopyTranscript = () => {
    if (messages.length === 0) return;
    const formatted = [...messages]
      .reverse()
      .map(
        (m) =>
          `[${m.role === "assistant" ? cleanName : userName || "You"}]: ${m.content}`,
      )
      .join("\n\n");

    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="flex flex-col min-h-[70vh] h-auto">
      {/* Top Section: Companion Avatar & User Mic Controls */}
      <section className="flex gap-8 flex-col lg:flex-row">
        {/* Companion Card */}
        <div className="companion-section w-full lg:w-1/2">
          <div
            className="companion-avatar"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.FINISHED ||
                  callStatus === CallStatus.INACTIVE
                  ? "opacity-100"
                  : "opacity-0",
                callStatus === CallStatus.CONNECTING &&
                  "opacity-100 animate-pulse",
              )}
            >
              <Image
                src={`/icons/${subject}.svg`}
                alt={subject}
                width={150}
                height={150}
                className="max-sm:w-fit"
              />
            </div>

            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0",
              )}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={soundwaves}
                autoplay={false}
                className="companion-lottie"
              />
            </div>
          </div>
          <p className="font-bold text-2xl">{name}</p>
        </div>

        {/* User Card */}
        <div className="user-section w-full lg:w-1/2">
          <div className="user-avatar">
            <Image
              src={userImage}
              alt={userName}
              width={130}
              height={130}
              className="rounded-lg"
            />
            <p className="font-bold text-2xl">{userName}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full">
            <button
              className="btn-mic"
              onClick={toggleMicrophone}
              disabled={callStatus !== CallStatus.ACTIVE}
            >
              <div className="relative">
                <Image
                  src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
                  alt="mic"
                  width={36}
                  height={36}
                />
                {/* Red dot indicator — only shows when mic is ON and call is active */}
                {!isMuted && callStatus === CallStatus.ACTIVE && (
                  <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
                )}
              </div>
              <p className="hidden sm:block text-sm">
                {isMuted ? "Turn on microphone" : "Turn off microphone"}
              </p>
            </button>
            <button
              onClick={handleRepeat}
              disabled={callStatus === CallStatus.CONNECTING}
              className={cn(
                "group border-2 border-black rounded-lg flex flex-col gap-2 items-center py-4 sm:py-8 cursor-pointer w-full",
                callStatus === CallStatus.CONNECTING
                  ? "opacity-70"
                  : "hover:bg-gray-50",
              )}
              title="Repeat"
            >
              <Image
                src="/icons/microphone-2.svg"
                alt="repeat"
                width={36}
                height={36}
                className={cn(
                  "transition-transform duration-300",
                  callStatus === CallStatus.CONNECTING
                    ? "animate-spin"
                    : "group-hover:rotate-180",
                )}
              />
              <p className="hidden sm:block text-sm">Repeat</p>
            </button>
          </div>
          <button
            className={cn(
              "rounded-lg py-3 sm:py-2 cursor-pointer transition-colors w-full text-white text-sm sm:text-base font-semibold",
              callStatus === CallStatus.ACTIVE ? "bg-red-700" : "bg-primary",
              callStatus === CallStatus.CONNECTING && "animate-pulse",
            )}
            onClick={
              callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
            }
          >
            {callStatus === CallStatus.ACTIVE
              ? "End Session"
              : callStatus === CallStatus.CONNECTING
                ? "Connecting"
                : "Start Session"}
          </button>
        </div>
      </section>

      {/* Modern Live Caption HUD & Controlled Transcript Box */}
      <section className="w-full mt-6 mb-8 flex flex-col items-center">
        <div className="w-full bg-card border-2 border-black/10 dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-sm transition-all duration-300">
          {/* HUD Header Bar */}
          <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3 mb-3">
            {/* Left: Live Status Pill */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5">
                {callStatus === CallStatus.ACTIVE ? (
                  isSpeaking ? (
                    <div className="flex items-center gap-1">
                      {/* Animated mini sound wave equalizer */}
                      <span className="flex items-center gap-0.5 h-3.5">
                        <span className="w-1 h-3 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="w-1 h-4 bg-emerald-500 rounded-full animate-pulse delay-75" />
                        <span className="w-1 h-2 bg-emerald-500 rounded-full animate-pulse delay-150" />
                      </span>
                      <span className="text-xs font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
                        {cleanName} Speaking
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
                      </span>
                      <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                        Listening
                      </span>
                    </div>
                  )
                ) : (
                  <div className="flex items-center gap-1.5">
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gray-300 dark:bg-gray-600" />
                    <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                      Live Subtitles
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Actions (Copy & Full Transcript Toggle) */}
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={handleCopyTranscript}
                  className="flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-border/80 hover:bg-muted transition-colors cursor-pointer text-muted-foreground hover:text-foreground"
                  title="Copy full transcript"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </button>
              )}

              <button
                type="button"
                onClick={() => setShowFullTranscript((prev) => !prev)}
                className={cn(
                  "flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer",
                  showFullTranscript
                    ? "bg-primary text-white shadow-sm"
                    : "bg-secondary text-secondary-foreground hover:bg-muted",
                )}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Transcript</span>
                {messages.length > 0 && (
                  <span
                    className={cn(
                      "px-1.5 py-0.5 rounded-full text-[10px] font-bold leading-none",
                      showFullTranscript
                        ? "bg-white/25 text-white"
                        : "bg-primary/10 text-primary",
                    )}
                  >
                    {messages.length}
                  </span>
                )}
                {showFullTranscript ? (
                  <ChevronUp className="w-3.5 h-3.5 ml-0.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
                )}
              </button>
            </div>
          </div>

          {/* 2-Lines Max Live Caption Stage */}
          <div className="min-h-[64px] sm:min-h-[72px] flex items-center justify-center px-2 py-1 text-center relative overflow-hidden bg-muted/20 dark:bg-zinc-800/20 rounded-xl border border-black/5 dark:border-white/5">
            <AnimatePresence mode="wait">
              {activeCaption && isCaptionVisible ? (
                <motion.div
                  key={activeCaption.id}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 w-full max-w-3xl"
                >
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 shadow-2xs",
                      activeCaption.role === "assistant"
                        ? "bg-primary/10 text-primary border border-primary/25"
                        : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/25",
                    )}
                  >
                    {activeCaption.role === "assistant"
                      ? cleanName
                      : userName || "You"}
                  </span>
                  <p className="text-base sm:text-lg font-medium text-foreground line-clamp-2 leading-snug break-words">
                    "{activeCaption.content}"
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center gap-2 text-muted-foreground text-sm font-medium"
                >
                  {callStatus === CallStatus.ACTIVE ? (
                    <>
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                      </span>
                      <span>Listening... live 2-line captions appear as you speak</span>
                    </>
                  ) : callStatus === CallStatus.CONNECTING ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      <span>Connecting to {name}...</span>
                    </>
                  ) : callStatus === CallStatus.FINISHED ? (
                    <span>
                      Session completed. Click "Transcript" above to review full history.
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                      Ready to start. Subtitles will appear here in real-time.
                    </span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Expandable Full Transcript Panel (Contained Scroll, Never Spills) */}
          <AnimatePresence>
            {showFullTranscript && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden border-t border-black/5 dark:border-white/5 mt-3 pt-3"
              >
                <div className="flex items-center justify-between mb-2.5 px-1">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Full Session Transcript ({messages.length} messages)
                  </h4>
                  <span className="text-[11px] text-muted-foreground">
                    Chronological order
                  </span>
                </div>

                <div
                  ref={historyScrollRef}
                  className="max-h-[300px] overflow-y-auto space-y-2.5 pr-1.5 custom-transcript-scroll"
                >
                  {messages.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8 italic">
                      No transcripts recorded yet in this session. Start speaking to see history.
                    </p>
                  ) : (
                    [...messages].reverse().map((message, index) => {
                      const isAssistant = message.role === "assistant";
                      return (
                        <div
                          key={index}
                          className={cn(
                            "p-3 rounded-xl text-sm leading-relaxed border transition-all",
                            isAssistant
                              ? "bg-muted/40 border-black/5 dark:border-white/5 mr-6 text-foreground"
                              : "bg-primary/5 border-primary/20 ml-6 text-foreground",
                          )}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span
                              className={cn(
                                "text-xs font-bold",
                                isAssistant
                                  ? "text-primary"
                                  : "text-blue-600 dark:text-blue-400",
                              )}
                            >
                              {isAssistant ? cleanName : userName || "You"}
                            </span>
                            {message.timestamp && (
                              <span className="text-[10px] text-muted-foreground">
                                {message.timestamp}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-foreground/90 leading-relaxed">
                            {message.content}
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </section>
  );
};

export default CompanionComponent;
