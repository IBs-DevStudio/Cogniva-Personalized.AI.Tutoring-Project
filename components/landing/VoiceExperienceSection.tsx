"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import { staggerContainerVariants, scrollRevealVariants } from "./animations";

const speechSamples = {
  student: [
    "How do I balance a binary search tree?",
    "Can we practice behavioral questions for a frontend developer role?",
    "What is the difference between TCP and UDP?",
    "Explain calculus integration methods visually.",
  ],
  tutor: [
    "To balance it, we check the balance factor of each node and perform left or right rotations. Let's look at an AVL tree example...",
    "Awesome! Let's start with a classic: 'Tell me about a time you optimized loading performance on a web app.' I'll critique your structure.",
    "TCP is connection-oriented and guarantees packet delivery, making it reliable. UDP is connectionless and sends packets instantly, ideal for live gaming...",
    "Think of integration like summing up an infinite amount of infinitely thin slices under a curve. Let's slice a parabola together...",
  ],
};

export const VoiceExperienceSection = () => {
  const [micState, setMicState] = useState<"idle" | "listening" | "responding">("idle");
  const [transcriptLines, setTranscriptLines] = useState<string[]>([]);

  const startSpeechSim = () => {
    if (micState !== "idle") return;
    setMicState("listening");
    setTranscriptLines((prev) => ["[You] (Speaking...)", ...prev.slice(0, 5)]);

    setTimeout(() => {
      const idx = Math.floor(Math.random() * speechSamples.student.length);
      const studentText = speechSamples.student[idx];
      const tutorText = speechSamples.tutor[idx];

      setTranscriptLines((prev) => [`[You] "${studentText}"`, ...prev.slice(0, 5)]);
      setMicState("responding");

      setTimeout(() => {
        setTranscriptLines((prev) => [
          `[AI Faculty] "${tutorText}"`,
          `[You] "${studentText}"`,
          ...prev.slice(0, 5),
        ]);
        setMicState("idle");
      }, 3500);
    }, 2000);
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainerVariants}
      id="voice-experience"
      className="py-28 bg-[#0B0F19] text-white relative overflow-hidden"
    >
      {/* Glow rings in background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#FF5A36]/15 via-purple-500/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] bg-[#FF5A36]/10 rounded-full blur-[90px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[110px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left side text */}
          <motion.div
            variants={scrollRevealVariants}
            className="lg:col-span-6 flex flex-col gap-6 text-center lg:text-left"
          >
            <span className="self-center lg:self-start text-xs font-bold text-[#FF5A36] uppercase tracking-widest bg-[#FF5A36]/10 border border-[#FF5A36]/20 px-3.5 py-1.5 rounded-full">
              Interactive Voice Sandbox
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Say a Word. <br />
              Learn Anything.
            </h2>
            <p className="text-base md:text-lg text-gray-400 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              Test the low-latency conversational audio simulator. Click the large microphone button, speak a query in your mind, and watch the AI Faculty respond immediately.
            </p>

            {/* Metrics indicator */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="text-xs font-bold text-gray-300">Speech Latency: ~150ms</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-600" />
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                <span className="text-xs font-bold text-gray-300">Real-Time Transcripts</span>
              </div>
            </div>
          </motion.div>

          {/* Right side interactive console (Large glowing Mic) */}
          <motion.div
            variants={scrollRevealVariants}
            className="lg:col-span-6 bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center relative backdrop-blur-md"
          >
            <div className="w-full flex items-center justify-between border-b border-white/10 pb-4 mb-8">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Live Voice Console
              </span>
              <span className="text-xs font-bold text-[#FF5A36] uppercase tracking-widest bg-[#FF5A36]/10 border border-[#FF5A36]/20 px-2.5 py-1 rounded-md">
                AI VOICE ACTIVE
              </span>
            </div>

            {/* Animated pulsating microphone */}
            <div className="relative w-44 h-44 flex items-center justify-center mb-8">
              {/* Ping waves */}
              {micState !== "idle" && (
                <>
                  <div className="absolute inset-0 bg-[#FF5A36]/25 rounded-full animate-ping duration-1000" />
                  <div className="absolute -inset-4 bg-[#FF5A36]/15 rounded-full animate-ping duration-2000" />
                  <div className="absolute -inset-8 bg-purple-500/10 rounded-full animate-ping duration-3000" />
                </>
              )}

              <button
                onClick={startSpeechSim}
                disabled={micState !== "idle"}
                className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 relative cursor-pointer outline-none ${
                  micState === "idle"
                    ? "bg-[#FF5A36] hover:bg-[#FF5A36]/90 text-white shadow-xl shadow-[#FF5A36]/20 hover:scale-105"
                    : micState === "listening"
                    ? "bg-green-500 text-white shadow-xl shadow-green-500/25 scale-95"
                    : "bg-purple-600 text-white shadow-xl shadow-purple-600/25 animate-pulse"
                }`}
              >
                <Mic className="w-10 h-10" />
              </button>
            </div>

            {/* Status Message */}
            <p className="text-sm font-bold tracking-wide uppercase text-gray-300 mb-4 h-6">
              {micState === "idle" && "Click mic to test conversation"}
              {micState === "listening" && "Listening to microphone... Say something"}
              {micState === "responding" && "AI Faculty is formulating answer..."}
            </p>

            {/* Transcript list */}
            <div className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 text-left h-[180px] overflow-y-auto no-scrollbar font-mono text-xs space-y-3">
              {transcriptLines.length === 0 ? (
                <p className="text-gray-500 italic text-center pt-12">
                  Session inactive. Press microphone above to initiate transcript simulator.
                </p>
              ) : (
                transcriptLines.map((line, index) => {
                  const isAi = line.startsWith("[AI");
                  const isYou = line.startsWith("[You]");
                  return (
                    <div
                      key={index}
                      className={`leading-relaxed border-l-2 pl-3 ${
                        isAi
                          ? "text-[#FF5A36] border-[#FF5A36]"
                          : isYou && line.includes("Speaking")
                          ? "text-green-400 border-green-400 italic animate-pulse"
                          : "text-white border-gray-500"
                      }`}
                    >
                      {line}
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default VoiceExperienceSection;
