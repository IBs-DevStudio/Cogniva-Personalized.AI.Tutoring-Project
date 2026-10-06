"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  AudioLines,
  Users,
  TrendingUp,
  BookOpen,
  Layers,
  Mic,
  Volume2,
} from "lucide-react";
import AudioWaveform from "./AudioWaveform";

export const InteractiveDashboard = () => {
  const [currentGoal, setCurrentGoal] = useState(72);
  const [activeStep, setActiveStep] = useState(0);

  // Simulated live conversations loop
  const simulatedTranscript = [
    { speaker: "AI Coach", text: "Welcome back! Ready to practice behavioral questions?" },
    { speaker: "Ikram (You)", text: "Yes! Can we mock a standard tech product manager opener?" },
    { speaker: "AI Coach", text: "Great. 'Tell me about a time you handled a difficult launch.'" },
    { speaker: "Ikram (You)", text: "Well, we had a dependency slip on our payment API..." },
    { speaker: "AI Coach", text: "Good start. Remember to structure using the STAR method." },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % simulatedTranscript.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [simulatedTranscript.length]);

  return (
    <div className="w-full bg-white rounded-3xl border border-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden text-left flex flex-col h-[520px]">
      {/* OS Titlebar */}
      <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <span className="text-xs text-gray-400 font-semibold ml-2">Cogniva Workspace v1.4</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Flame Streak Widget */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#FDBA3B]/10 rounded-full text-[#FDBA3B] text-xs font-bold border border-[#FDBA3B]/20 animate-pulse">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>7-DAY STREAK</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#FF5A36]/10 flex items-center justify-center text-xs font-bold text-[#FF5A36] border border-[#FF5A36]/20">
            IB
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Mock Sidebar Navigation */}
        <div className="w-16 bg-gray-50 border-r border-gray-100 flex flex-col items-center py-6 gap-6 justify-between">
          <div className="flex flex-col gap-5 items-center">
            {/* Brand / Home icon */}
            <div className="p-2.5 bg-[#FF5A36]/10 rounded-xl text-[#FF5A36] cursor-pointer">
              <AudioLines className="w-5 h-5" />
            </div>
            <div className="p-2.5 text-gray-400 hover:text-gray-600 rounded-xl cursor-pointer transition-colors">
              <Users className="w-5 h-5" />
            </div>
            <div className="p-2.5 text-gray-400 hover:text-gray-600 rounded-xl cursor-pointer transition-colors">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="p-2.5 text-gray-400 hover:text-gray-600 rounded-xl cursor-pointer transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          {/* Quick Practice icon */}
          <div className="p-2.5 text-gray-400 hover:text-gray-600 rounded-xl cursor-pointer">
            <Layers className="w-5 h-5 animate-bounce" />
          </div>
        </div>

        {/* Dashboard Panels */}
        <div className="flex-1 p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-5 no-scrollbar bg-[#FAFAFA]">
          {/* Left panel: Daily Goal Widget & Analytics Mini-Chart */}
          <div className="flex flex-col gap-5">
            {/* Daily Goal Card */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Today&apos;s Focus Goal</span>
                <h4 className="text-xl font-extrabold text-[#111827] mt-1">45 min Practice</h4>
                <p className="text-xs text-[#FF5A36] font-semibold mt-1">12 mins remaining today</p>
              </div>
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="32" cy="32" r="26" stroke="#f3f4f6" strokeWidth="6" fill="transparent" />
                  <motion.circle
                    cx="32"
                    cy="32"
                    r="26"
                    stroke="#FF5A36"
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray="163"
                    animate={{ strokeDashoffset: 163 - (163 * currentGoal) / 100 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                </svg>
                <span className="absolute text-xs font-bold text-[#111827]">{currentGoal}%</span>
              </div>
            </div>

            {/* Simulated mini analytics graph */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-48">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Performance Analytics</span>
                  <h4 className="text-lg font-bold text-[#111827] mt-0.5">Mock Interview Score</h4>
                </div>
                <div className="px-2 py-0.5 bg-green-50 rounded-md text-green-600 text-xs font-bold flex items-center gap-1 border border-green-100">
                  <span>+18%</span>
                </div>
              </div>
              <div className="h-20 w-full flex items-end justify-between px-1 mt-3">
                {[
                  { day: "Mon", score: 45, active: false },
                  { day: "Tue", score: 62, active: false },
                  { day: "Wed", score: 55, active: false },
                  { day: "Thu", score: 72, active: false },
                  { day: "Fri", score: 80, active: false },
                  { day: "Sat", score: 92, active: true },
                  { day: "Sun", score: 78, active: false },
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                    {/* Tooltip on Hover */}
                    <div className="absolute bottom-full mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 flex flex-col items-center">
                      <div className="bg-[#111827] text-white text-[9px] font-bold py-0.5 px-1.5 rounded shadow-sm">
                        {item.score}%
                      </div>
                      <div className="w-1 h-1 bg-[#111827] rotate-45 -mt-0.5"></div>
                    </div>

                    {/* Bar */}
                    <motion.div
                      className={`w-3.5 rounded-t-full cursor-pointer transition-colors duration-200 ${
                        item.active
                          ? "bg-gradient-to-t from-[#FF5A36] to-[#FF8A65] shadow-[0_0_8px_rgba(255,90,54,0.3)]"
                          : "bg-[#FF5A36]/15 group-hover:bg-[#FF5A36]/40"
                      }`}
                      style={{ transformOrigin: "bottom", height: `${item.score}%` }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.05 }}
                      whileHover={{ scaleY: 1.05 }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 font-semibold px-2 mt-1">
                <span className="w-6 text-center">Mon</span>
                <span className="w-6 text-center">Tue</span>
                <span className="w-6 text-center">Wed</span>
                <span className="w-6 text-center">Thu</span>
                <span className="w-6 text-center">Fri</span>
                <span className="w-6 text-center">Sat</span>
                <span className="w-6 text-center">Sun</span>
              </div>
            </div>
          </div>

          {/* Right Panel: Voice Session Simulation */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-[395px]">
            {/* Header Area */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FF5A36]/10 flex items-center justify-center text-[#FF5A36] border border-[#FF5A36]/20">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-[#111827]">Interview Coach</h5>
                  <p className="text-[10px] text-green-500 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping inline-block" /> Live Voice Session
                  </p>
                </div>
              </div>
              <AudioWaveform active={true} color="#FF5A36" barCount={10} />
            </div>

            {/* Transcript scroll simulated */}
            <div className="flex-1 py-4 flex flex-col gap-3.5 overflow-hidden justify-center relative">
              <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
              <AnimatePresence mode="popLayout">
                {simulatedTranscript.map((chat, idx) => {
                  const isActive = idx === activeStep;
                  if (!isActive) return null;
                  const isCoach = chat.speaker.includes("AI");

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className={`flex flex-col gap-1 ${isCoach ? "items-start" : "items-end"}`}
                    >
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider px-1">
                        {chat.speaker}
                      </span>
                      <div
                        className={`rounded-2xl px-4 py-2.5 max-w-[85%] text-xs font-medium leading-relaxed ${
                          isCoach
                            ? "bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200/50"
                            : "bg-[#FF5A36] text-white rounded-tr-none shadow-md shadow-[#FF5A36]/15"
                        }`}
                      >
                        {chat.text}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
            </div>

            {/* Input simulator */}
            <div className="border-t border-gray-100 pt-3 flex items-center justify-between gap-3">
              <div className="flex-1 bg-gray-50 rounded-full px-4 py-2 border border-gray-200/50 flex items-center justify-between">
                <span className="text-xs text-gray-400 font-semibold">Listening to speech...</span>
                <Volume2 className="w-3.5 h-3.5 text-[#FF5A36] animate-pulse" />
              </div>
              <button className="w-9 h-9 rounded-full bg-[#FF5A36] text-white flex items-center justify-center shadow-lg shadow-[#FF5A36]/20 cursor-pointer">
                <Mic className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDashboard;
