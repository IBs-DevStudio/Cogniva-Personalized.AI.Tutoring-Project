"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Users,
  Zap,
  Brain,
  MessageCircle,
  TrendingUp,
  Mic,
  Target,
  Award,
  Clock,
  Code,
  Sparkles,
  Play,
  X,
  Flame,
  Compass,
  Activity,
  ChevronDown,
  Volume2,
  Check,
  Star,
  PlayCircle
} from "lucide-react";
import LandingNavbar from "@/components/LandingNavbar";
import LoadingButton from "@/components/LoadingButton";
import MobileWarningModal from "@/components/MobileWarningModal";
import TypewriterText from "@/components/TypewriterText";

// ---------------------------------------------------------
// Sub-component: Soundwave Waveform Animation
// ---------------------------------------------------------
const AudioWaveform = ({ active = true, color = "#FF5A36", barCount = 15 }) => {
  const bars = Array.from({ length: barCount });
  return (
    <div className="flex items-center gap-1.0 h-5">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 rounded-full"
          style={{ backgroundColor: color }}
          animate={
            active
              ? {
                  height: [
                    "20%",
                    i % 2 === 0 ? "80%" : "60%",
                    i % 3 === 0 ? "100%" : "40%",
                    "20%",
                  ],
                }
              : { height: "20%" }
          }
          transition={{
            duration: 1 + (i % 3) * 0.25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.05,
          }}
        />
      ))}
    </div>
  );
};

// ---------------------------------------------------------
// Sub-component: Simulated Interactive Dashboard Mockup
// ---------------------------------------------------------
const InteractiveDashboard = () => {
  const [currentGoal, setCurrentGoal] = useState(72);
  const [activeStep, setActiveStep] = useState(0);

  // Simulated live conversations loop
  const simulatedTranscript = [
    { speaker: "AI Coach", text: "Welcome back! Ready to practice behavioral questions?" },
    { speaker: "Ikram (You)", text: "Yes! Can we mock a standard tech product manager opener?" },
    { speaker: "AI Coach", text: "Great. 'Tell me about a time you handled a difficult launch.'" },
    { speaker: "Ikram (You)", text: "Well, we had a dependency slip on our payment API..." },
    { speaker: "AI Coach", text: "Good start. Remember to structure using the STAR method." }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % simulatedTranscript.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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
            <div className="p-2.5 bg-[#FF5A36]/10 rounded-xl text-[#FF5A36] cursor-pointer">
              <Brain className="w-5 h-5" />
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
          <div className="p-2.5 text-gray-400 hover:text-gray-600 rounded-xl cursor-pointer">
            <Zap className="w-5 h-5 animate-bounce" />
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
              <div className="h-20 w-full relative mt-3 flex items-end">
                <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF5A36" stopOpacity="0.2"/>
                      <stop offset="100%" stopColor="#FF5A36" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M 0 35 Q 20 15 40 25 T 80 5 T 100 12 L 100 40 L 0 40 Z"
                    fill="url(#chartGradient)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  <motion.path
                    d="M 0 35 Q 20 15 40 25 T 80 5 T 100 12"
                    fill="none"
                    stroke="#FF5A36"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </svg>
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 font-semibold px-1 mt-1">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
                <span>Sun</span>
              </div>
            </div>
          </div>

          {/* Right Panel: Voice Session Simulation */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-[395px]">
            {/* Header Area */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FF5A36]/10 flex items-center justify-center text-[#FF5A36] border border-[#FF5A36]/20">
                  <Target className="w-5 h-5" />
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

// ---------------------------------------------------------
// Main Landing Page Component
// ---------------------------------------------------------
const LandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [activeTutorIndex, setActiveTutorIndex] = useState(0);
  const [micState, setMicState] = useState("idle"); // idle, listening, responding
  const [transcriptLines, setTranscriptLines] = useState<string[]>([]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Initialize page loaded state
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Voice Section Speech Sim
  const speechSamples = {
    student: [
      "How do I balance a binary search tree?",
      "Can we practice behavioral questions for a frontend developer role?",
      "What is the difference between TCP and UDP?",
      "Explain calculus integration methods visually."
    ],
    tutor: [
      "To balance it, we check the balance factor of each node and perform left or right rotations. Let's look at an AVL tree example...",
      "Awesome! Let's start with a classic: 'Tell me about a time you optimized loading performance on a web app.' I'll critique your structure.",
      "TCP is connection-oriented and guarantees packet delivery, making it reliable. UDP is connectionless and sends packets instantly, ideal for live gaming...",
      "Think of integration like summing up an infinite amount of infinitely thin slices under a curve. Let's slice a parabola together..."
    ]
  };

  const startSpeechSim = () => {
    if (micState !== "idle") return;
    setMicState("listening");
    setTranscriptLines(["[You] (Speaking...)"].concat(transcriptLines.slice(0, 5)));

    setTimeout(() => {
      const idx = Math.floor(Math.random() * speechSamples.student.length);
      const studentText = speechSamples.student[idx];
      const tutorText = speechSamples.tutor[idx];

      setTranscriptLines([
        `[You] "${studentText}"`,
      ].concat(transcriptLines.slice(0, 5)));

      setMicState("responding");

      setTimeout(() => {
        setTranscriptLines([
          `[AI Faculty] "${tutorText}"`,
          `[You] "${studentText}"`,
        ].concat(transcriptLines.slice(0, 5)));
        setMicState("idle");
      }, 3500);
    }, 2000);
  };

  // AI Faculty Companion profiles
  const tutors = [
    {
      name: "Interview Coach",
      role: "Ace Mock Prep",
      icon: Target,
      desc: "Simulate pressure behavioral rounds, tech design, and casing exercises. Receive real-time structure scores using the STAR framework.",
      voice: "AI Voice: Formal Female",
      accent: "Professional US Accent",
      badgeColor: "#FF6B8A",
      bgGradient: "from-pink-500/10 via-rose-500/5 to-transparent",
      borderColor: "hover:border-pink-500/30",
      sample: "Hi there! Let's polish your behavioral answers. Try to frame your projects with clear scope and metrics."
    },
    {
      name: "Coding Mentor",
      role: "Algorithms & Logic",
      icon: Code,
      desc: "Practice arrays, sliding windows, recursion, and trees. Ask for step-by-step guidance rather than just copy-pasting solutions.",
      voice: "AI Voice: Casual Male",
      accent: "Tech Nerd Vibe",
      badgeColor: "#4ECDC4",
      bgGradient: "from-teal-500/10 via-cyan-500/5 to-transparent",
      borderColor: "hover:border-teal-500/30",
      sample: "Hey, recursion is simple once you isolate your base case. Let's draw the call stack together for this fibonacci solution!"
    },
    {
      name: "Study Buddy",
      role: "Summations & Notes",
      icon: BookOpen,
      desc: "Upload text, papers, or lecture files. Summarize heavy material, trigger interactive flashcard reviews, and construct custom templates.",
      voice: "AI Voice: Casual Female",
      accent: "Supportive Peer Tone",
      badgeColor: "#FFA726",
      bgGradient: "from-amber-500/10 via-orange-500/5 to-transparent",
      borderColor: "hover:border-amber-500/30",
      sample: "Done compiling that biology chapter! I highlighted three core processes: cellular respiration, glycolysis, and the Krebs cycle. Let's quiz?"
    },
    {
      name: "Exam Expert",
      role: "Standardized Drills",
      icon: Award,
      desc: "Prepare for final exams, board certifications, or AP courses. Adaptive testing matches your weaknesses with target explanations.",
      voice: "AI Voice: Formal Male",
      accent: "Academic Professor Tone",
      badgeColor: "#9C27B0",
      bgGradient: "from-purple-500/10 via-indigo-500/5 to-transparent",
      borderColor: "hover:border-purple-500/30",
      sample: "Welcome. Let's begin the mock exam. Remember: read the prompt carefully. What is your hypothesis for question one?"
    },
    {
      name: "Career Advisor",
      role: "Industry Navigation",
      icon: Compass,
      desc: "Map your skillset, review resume formatting, align milestones for big tech roles, and optimize career growth strategies.",
      voice: "AI Voice: Warm Female",
      accent: "Consultant Style",
      badgeColor: "#45B7D1",
      bgGradient: "from-blue-500/10 via-sky-500/5 to-transparent",
      borderColor: "hover:border-blue-500/30",
      sample: "Hello. Let's mapping your skills gap. To break into Machine Learning roles, we should prioritize building strong ML Pipeline projects."
    },
    {
      name: "Communication Coach",
      role: "Speech & Pitch",
      icon: Mic,
      desc: "Perfect public speaking, pitches, and delivery. Get real-time metric analysis on speaking pace, filler words, and vocal modulation.",
      voice: "AI Voice: Formal Female",
      accent: "Vocal Trainer Vibe",
      badgeColor: "#66BB6A",
      bgGradient: "from-green-500/10 via-emerald-500/5 to-transparent",
      borderColor: "hover:border-green-500/30",
      sample: "Hello! Try to project your voice and pause after key milestones. I noticed you used three filler words - let's try that slide again."
    },
    {
      name: "Math Tutor",
      role: "Proof & Logic Helper",
      icon: Brain,
      desc: "Solve calculus, linear algebra, discrete math, and physics. Receive visual proofs and conceptual break-downs of mathematical proofs.",
      voice: "AI Voice: Direct Male",
      accent: "Analytical Guide Accent",
      badgeColor: "#FF7043",
      bgGradient: "from-deep-orange-500/10 via-red-500/5 to-transparent",
      borderColor: "hover:border-red-500/30",
      sample: "Hi. We are looking at derivatives. Derivative represents the instantaneous rate of change. Let's write down the limit formula."
    }
  ];

  // FAQ contents
  const faqs = [
    {
      q: "What is a Personal AI Faculty?",
      a: "Cogniva is not a simple chatbot. It is a suite of distinct, goal-specific AI companions with custom voices, personalities, and subject knowledge. You can talk to them via voice in real time, customize how they teach, and track your progress metrics over time."
    },
    {
      q: "How does the voice-tutor interaction work?",
      a: "By leveraging state-of-the-art AI voice infrastructure, Cogniva tutors talk and listen with near-zero latency. You simply open a session, unmute your microphone, and converse naturally. The tutor hears you, responds immediately, and outputs a live transcript."
    },
    {
      q: "Can I customize or build my own tutor companions?",
      a: "Yes! The platform includes a companion builder where you can customize their name, background system prompt, subject specialty, and pick whether they speak in formal or casual styles using various high-quality male and female voice models."
    },
    {
      q: "Does Cogniva track my progress?",
      a: "Absolutely. Cogniva tracks your practice hours, topic mastery, performance analytics, and session streaks. Your personal progress dashboard shows you exactly which skills you excel in and where you need more practice."
    },
    {
      q: "Is there a limit on how much I can talk to my companions?",
      a: "We offer both free trial allocations and subscription credits for high-fidelity voice models, providing extensive hours of active personalized instruction without steep overhead costs."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111827] overflow-x-hidden relative font-sans selection:bg-[#FF5A36] selection:text-white">
      {/* Mobile Warning Modal */}
      <MobileWarningModal />

      {/* Sticky Premium Navigation */}
      <LandingNavbar />

      {/* Ambient background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-[#FF5A36]/5 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] left-[-10%] w-[600px] h-[600px] bg-[#FDBA3B]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-5%] w-[450px] h-[450px] bg-purple-500/5 rounded-full blur-[90px]" />
      </div>

      {/* ---------------------------------------------------------
          HERO SECTION
         --------------------------------------------------------- */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-25 pb-20 px-4 max-w-7xl mx-auto border-b border-gray-100 text-center">
        
        {/* Main Content Wrapper */}
        <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto">
          {/* Premium Glow Badge */}
          {/* <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF5A36] via-[#FDBA3B] to-purple-500 rounded-full blur opacity-30 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-white border border-gray-200/80 rounded-full px-5 py-2 flex items-center gap-2 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#FF5A36]" />
              <p className="text-xs md:text-sm font-bold bg-gradient-to-r from-[#FF5A36] via-[#FDBA3B] to-purple-600 bg-clip-text text-transparent">
                <TypewriterText
                  initialText="Your Personal AI Faculty, "
                  rotatingTexts={[
                    "Anytime, Anywhere",
                    "Just Say a Word..!",
                    " Coding",
                    " Maths",
                    " Interview Prep",
                    " CS Fundamentals"
                  ]}
                  speed={70}
                  deleteSpeed={40}
                  pauseTime={800}
                />
              </p>
            </div>
          </div> */}

          {/* Giant Premium Centered Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#111827] leading-[1.1] tracking-tight max-w-4xl">
            The Future of{" "}
            <span className="bg-gradient-to-r from-[#FF5A36] via-[#FF5A36] to-[#FDBA3B] bg-clip-text text-transparent">
              Personalized Learning
            </span>
          </h1>

          {/* Centered Supporting Copy */}
          <p className="text-sm sm:text-base md:text-lg text-[#6B7280] font-medium leading-relaxed max-w-3xl">
            Unlock your potential with specialized AI companions that adapt to your unique learning style. Converse naturally, get instant audio feedback, and master any subject.
          </p>

          {/* Centered CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto">
            <LoadingButton
              href="/dashboard"
              variant="primary"
              className="w-full sm:w-auto bg-[#FF5A36] hover:bg-[#FF5A36]/90 text-white rounded-2xl px-8 py-4.5 text-base font-extrabold flex items-center justify-center gap-2.5 shadow-lg shadow-[#FF5A36]/25 hover:shadow-xl hover:shadow-[#FF5A36]/35 transition-all duration-300"
            >
              Enter Cogniva Now
            </LoadingButton>

            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="w-full sm:w-auto border border-gray-300/80 bg-white hover:bg-gray-50 text-[#111827] rounded-2xl px-8 py-4.5 text-base font-extrabold flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current text-[#FF5A36]" />
              <span>Watch Video Demo</span>
            </button>
          </div>

          {/* Centered Trusted By / Student Avatar stack */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {/* Overlapping initial badges */}
            <div className="flex -space-x-3">
              {[
                { name: "S", bg: "bg-red-500" },
                { name: "K", bg: "bg-blue-500" },
                { name: "M", bg: "bg-green-500" },
                { name: "A", bg: "bg-amber-500" },
                { name: "L", bg: "bg-purple-500" }
              ].map((student, idx) => (
                <div
                  key={idx}
                  className={`w-9 h-9 rounded-full ${student.bg} border-2 border-white flex items-center justify-center text-[10px] font-black text-white shadow-sm`}
                >
                  {student.name}
                </div>
              ))}
            </div>
            {/* Description Text */}
            <div className="text-xs font-semibold text-[#6B7280] text-center sm:text-left leading-relaxed">
              <span className="text-[#111827] font-extrabold">Trusted by 10+</span> active students &amp; lifelong learners. <br className="hidden sm:inline" />
              Accelerating academic and career excellence, every day.
            </div>
          </div>
        </div>

        {/* Centered Interactive SaaS Dashboard Mockup below */}
        <div className="w-full max-w-5xl mt-16 relative">
          {/* Glow backing */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5A36]/5 to-[#FDBA3B]/5 rounded-3xl blur-3xl pointer-events-none" />
          <InteractiveDashboard />
        </div>

      </section>

      {/* ---------------------------------------------------------
          TRUSTED BY SECTION
         --------------------------------------------------------- */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-6">
            Empowering students from leading educational institutions
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="text-lg md:text-xl font-black tracking-wider text-gray-800">KIT,Kolhapur</span>
            <span className="text-lg md:text-xl font-black tracking-wider text-gray-800">D Y Patil University</span>
            <span className="text-lg md:text-xl font-black tracking-wider text-gray-800">JCE,Belagavi</span>
            <span className="text-lg md:text-xl font-black tracking-wider text-gray-800">VIT,Pune</span>
            <span className="text-lg md:text-xl font-black tracking-wider text-gray-800">IIT BOMBAY</span>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------
          ABOUT COGNIVA
         --------------------------------------------------------- */}
      <section className="py-24 px-6 max-w-5xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <span className="inline-block text-xs font-bold text-[#FF5A36] uppercase tracking-widest bg-[#FF5A36]/10 px-3.5 py-1.5 rounded-full">
            About the Project
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#111827] tracking-tight">
            What is <span className="text-[#FF5A36]">Cogniva</span>?
          </h2>
          <p className="text-lg md:text-xl text-[#6B7280] font-medium max-w-2xl mx-auto leading-relaxed">
            An AI-native learning platform built for students, job seekers, and lifelong learners. Instead of static videos, you get voice-powered AI tutors that adapt in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left pt-6">
          <div className="bg-white rounded-3xl p-7 border border-gray-200/70 shadow-sm flex flex-col gap-4">
            <div className="w-12 h-12 bg-[#FF5A36]/10 rounded-2xl flex items-center justify-center text-[#FF5A36]">
              <Mic className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-[#111827]">Voice-First Learning</h4>
            <p className="text-sm text-[#6B7280] font-medium leading-relaxed">
              Speak naturally with your AI tutor. Ask questions, practice answers, and receive instant spoken reviews.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-gray-200/70 shadow-sm flex flex-col gap-4">
            <div className="w-12 h-12 bg-[#FDBA3B]/10 rounded-2xl flex items-center justify-center text-[#FDBA3B]">
              <Target className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-[#111827]">Goal-Driven Sessions</h4>
            <p className="text-sm text-[#6B7280] font-medium leading-relaxed">
              Whether cracking a tech interview, preparing for exam boards, or learning linear algebra — custom tutors lead you to success.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-gray-200/70 shadow-sm flex flex-col gap-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-[#111827]">Always Available</h4>
            <p className="text-sm text-[#6B7280] font-medium leading-relaxed">
              24/7 access to your specialized faculty. No scheduling or waiting — start learning whenever you are ready.
            </p>
          </div>
        </div>

        <p className="text-sm font-semibold text-[#6B7280] pt-4">
          Built with care by{" "}
          <a
            href="https://www.linkedin.com/in/ikrambanadarwebdev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF5A36] hover:underline"
          >
            Ikram Banadar
          </a>{" "}
          at IB&apos;s Dev World.
        </p>
      </section>

      {/* ---------------------------------------------------------
          MEET YOUR AI FACULTY
         --------------------------------------------------------- */}
      <section id="faculty" className="py-24 px-6 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          
          <div className="text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-500/10 px-3.5 py-1.5 rounded-full inline-block">
                Personal AI Faculty
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-[#111827] tracking-tight">
                Meet Your Specialized Instructors
              </h2>
              <p className="text-lg text-[#6B7280] font-medium max-w-xl">
                An expert companion for every study path. Click on any companion below to listen to their voice samples and view parameters.
              </p>
            </div>
            <div className="shrink-0 flex items-center justify-center">
              <div className="px-5 py-2.5 bg-gray-50 border border-gray-200/80 rounded-2xl flex items-center gap-2.5 shadow-sm text-xs font-bold text-gray-500">
                <Volume2 className="w-4 h-4 text-[#FF5A36] animate-pulse" />
                <span>Interact with Cards below</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Tutor List (Col 5) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {tutors.map((tutor, idx) => {
                const isSelected = idx === activeTutorIndex;
                const IconComp = tutor.icon;
                return (
                  <button
                    key={tutor.name}
                    onClick={() => setActiveTutorIndex(idx)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer relative group ${
                      isSelected
                        ? "bg-white border-[#FF5A36] shadow-md shadow-[#FF5A36]/5"
                        : "bg-gray-50/50 border-gray-200/80 hover:bg-white hover:border-gray-300"
                    }`}
                  >
                    {isSelected && (
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl"
                        style={{ backgroundColor: "#FF5A36" }}
                      />
                    )}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${tutor.badgeColor}20`, color: tutor.badgeColor }}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-[#111827] text-base group-hover:text-[#FF5A36] transition-colors">
                          {tutor.name}
                        </h4>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                          {tutor.role}
                        </span>
                      </div>
                      <p className="text-xs text-[#6B7280] font-medium mt-1 line-clamp-1">
                        {tutor.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Tutor Premium Preview Console (Col 7) */}
            <div className="lg:col-span-7 bg-gray-50 border border-gray-200 rounded-3xl p-8 flex flex-col justify-between min-h-[460px] relative overflow-hidden">
              {/* Decorative Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />

              {/* Console Header */}
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-200/80 pb-6">
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white"
                    style={{ backgroundColor: tutors[activeTutorIndex].badgeColor }}
                  >
                    {(() => {
                      const Icon = tutors[activeTutorIndex].icon;
                      return <Icon className="w-7 h-7" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#111827]">
                      {tutors[activeTutorIndex].name}
                    </h3>
                    <p className="text-xs font-bold text-[#FF5A36] uppercase tracking-widest mt-0.5">
                      {tutors[activeTutorIndex].role}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] px-3 py-1 bg-white border border-gray-200 rounded-full font-bold text-gray-500">
                    {tutors[activeTutorIndex].voice}
                  </span>
                  <span className="text-[10px] px-3 py-1 bg-white border border-gray-200 rounded-full font-bold text-gray-500">
                    {tutors[activeTutorIndex].accent}
                  </span>
                </div>
              </div>

              {/* Console Body Speech Simulated Bubble */}
              <div className="relative z-10 my-8">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Active Faculty Speech preview
                </span>
                <div className="mt-2.5 bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm relative">
                  {/* Speech Bubble triangle pointer */}
                  <div className="absolute -left-2.5 top-8 w-5 h-5 bg-white border-l border-b border-gray-200/80 transform rotate-45 pointer-events-none" />
                  
                  <div className="flex items-start gap-4">
                    <Volume2 className="w-5 h-5 text-[#FF5A36] shrink-0 mt-0.5 animate-pulse" />
                    <p className="text-sm font-semibold text-[#111827] leading-relaxed italic">
                      &ldquo;{tutors[activeTutorIndex].sample}&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Console Footer parameters */}
              <div className="relative z-10 border-t border-gray-200/80 pt-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <p className="text-xs font-medium text-[#6B7280] max-w-sm">
                  {tutors[activeTutorIndex].desc}
                </p>
                <LoadingButton
                  href="/dashboard"
                  variant="primary"
                  className="!text-xs bg-[#FF5A36] text-white hover:bg-[#FF5A36]/90 px-5 py-2.5 rounded-xl shrink-0 font-bold"
                  showArrow={false}
                >
                  Start Tutoring Session
                </LoadingButton>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------
          WHY STUDENTS CHOOSE COGNIVA (BENTO GRID)
         --------------------------------------------------------- */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto flex flex-col gap-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-bold text-[#FF5A36] uppercase tracking-widest bg-[#FF5A36]/10 px-3.5 py-1.5 rounded-full inline-block">
            Comprehensive Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#111827] tracking-tight">
            Why Students Choose Cogniva
          </h2>
          <p className="text-lg text-[#6B7280] font-medium leading-relaxed">
            Replace simple flat lists with a dynamic Bento layout. Varying card sizes highlight core value propositions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Tall / Wide (Col-span 2) - Voice */}
          <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 min-h-[340px] group">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-[#FF5A36]/10 rounded-2xl flex items-center justify-center text-[#FF5A36] group-hover:scale-105 transition-transform">
                <Mic className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#111827]">Natural Voice Conversations</h3>
              <p className="text-sm md:text-base text-[#6B7280] font-medium leading-relaxed max-w-xl">
                Conversations make learning feel natural—like talking with a knowledgeable classmate. Ask questions, clarify equations, and review topics without looking at screens.
              </p>
            </div>
            {/* Embedded Audio wave simulator visual */}
            <div className="mt-8 border-t border-gray-100 pt-6 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400">VOICE WAVEFORM SIGNAL</span>
              <AudioWaveform active={true} color="#FF5A36" barCount={20} />
            </div>
          </div>

          {/* Card 2: Medium (Col-span 1) - Interview Ready */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 min-h-[340px] group">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 group-hover:scale-105 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#111827]">Interview Ready</h3>
              <p className="text-sm text-[#6B7280] font-medium leading-relaxed">
                Practice mock case studies, systems architecture, and HR screening rounds with specialized tech recruiters.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#FF5A36]">
              <span>Try behavioral drills</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Medium (Col-span 1) - Exam Excellence */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 min-h-[340px] group">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 group-hover:scale-105 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#111827]">Exam Excellence</h3>
              <p className="text-sm text-[#6B7280] font-medium leading-relaxed">
                Acing midterms, board exams, or SAT mocks. Tutors isolate your weak areas and design targeted review cards.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#FF5A36]">
              <span>Take adaptive mocks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Wide (Col-span 2) - Analytics Progress */}
          <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 min-h-[340px] group">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-500 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#111827]">Visual Performance Progress</h3>
              <p className="text-sm md:text-base text-[#6B7280] font-medium leading-relaxed max-w-xl">
                Observe your mastery progress index over time. Our analytics algorithms map your performance trends, identify topic gaps, and flag critical milestones.
              </p>
            </div>
            {/* Visual elements */}
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="text-[10px] font-bold px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-gray-500 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-teal-500" />
                Speech Latency: 120ms
              </span>
              <span className="text-[10px] font-bold px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-gray-500 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-green-500" />
                STAR Framework Auditing
              </span>
              <span className="text-[10px] font-bold px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-gray-500 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#FDBA3B]" />
                Streak Multipliers Active
              </span>
            </div>
          </div>

          {/* Card 5: Small (Col-span 1) - Learn Quickly */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 min-h-[280px] group">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500 group-hover:scale-105 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-[#111827]">Accelerate Learning</h3>
              <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
                Study in chunks. Speed up summarize notes, optimize integration steps, and capture answers quickly.
              </p>
            </div>
          </div>

          {/* Card 6: Small (Col-span 1) - Any Subject */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 min-h-[280px] group">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-500 group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-[#111827]">Master Any Subject</h3>
              <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
                From advanced computer science to organic chemistry, history, or literature—we cover everything you need.
              </p>
            </div>
          </div>

          {/* Card 7: Small (Col-span 1) - Instant Help */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 min-h-[280px] group">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-105 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-[#111827]">Instant Feedback</h3>
              <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
                Ask a voice query, talk back and forth, and receive customized constructive analysis immediately.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------
          VOICE AI EXPERIENCE (PREMIUM DARK SHOWCASE SECTION)
         --------------------------------------------------------- */}
      <section id="voice-experience" className="py-28 bg-[#0B0F19] text-white relative overflow-hidden">
        {/* Glow rings in background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#FF5A36]/15 via-purple-500/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] bg-[#FF5A36]/10 rounded-full blur-[90px]" />
          <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[110px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left side text */}
            <div className="lg:col-span-6 flex flex-col gap-6 text-center lg:text-left">
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
            </div>

            {/* Right side interactive console (Large glowing Mic) */}
            <div className="lg:col-span-6 bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center relative backdrop-blur-md">
              
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
                  <p className="text-gray-500 italic text-center pt-12">Session inactive. Press microphone above to initiate transcript simulator.</p>
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

            </div>

          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------
          LEARNING JOURNEY SECTION
         --------------------------------------------------------- */}
      <section className="py-24 px-6 max-w-7xl mx-auto flex flex-col gap-16 border-b border-gray-100">
        <div className="text-center max-w-xl mx-auto space-y-4">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-500/10 px-3.5 py-1.5 rounded-full inline-block">
            Adaptive Path
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#111827] tracking-tight">
            How Your Learning Journey Evolves
          </h2>
          <p className="text-lg text-[#6B7280] font-medium">
            Three simple milestones to master any field with voice-powered tutoring.
          </p>
        </div>

        {/* Step-by-step horizontal progress pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {/* Connector horizontal line for desktop */}
          <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-[#FF5A36] via-purple-500 to-[#FDBA3B] opacity-30 z-0 pointer-events-none" />

          {/* Step 1 */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 relative z-10 group">
            <div className="w-16 h-16 bg-white border-2 border-[#FF5A36] rounded-full flex items-center justify-center font-black text-[#FF5A36] text-xl shadow-md group-hover:scale-110 transition-transform duration-300">
              01
            </div>
            <h4 className="text-xl font-extrabold text-[#111827] mt-2">Select Your AI Companion</h4>
            <p className="text-sm text-[#6B7280] font-medium leading-relaxed max-w-sm">
              Choose from our curated team of specialized AI Faculty members (Interview Coach, Coding Mentor, etc.) or construct your own.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 relative z-10 group">
            <div className="w-16 h-16 bg-white border-2 border-purple-500 rounded-full flex items-center justify-center font-black text-purple-500 text-xl shadow-md group-hover:scale-110 transition-transform duration-300">
              02
            </div>
            <h4 className="text-xl font-extrabold text-[#111827] mt-2">Start Talking & Listening</h4>
            <p className="text-sm text-[#6B7280] font-medium leading-relaxed max-w-sm">
              Unmute your microphone and learn through back-and-forth speech. Hear reviews immediately and analyze topic concepts step-by-step.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 relative z-10 group">
            <div className="w-16 h-16 bg-white border-2 border-[#FDBA3B] rounded-full flex items-center justify-center font-black text-[#FDBA3B] text-xl shadow-md group-hover:scale-110 transition-transform duration-300">
              03
            </div>
            <h4 className="text-xl font-extrabold text-[#111827] mt-2">View Metrics & Grow</h4>
            <p className="text-sm text-[#6B7280] font-medium leading-relaxed max-w-sm">
              Review your speech latency scores, daily progress, and mock grades on your analytics dashboard to systematically build competence.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------
          STUDENT OUTCOMES / METRICS SECTION
         --------------------------------------------------------- */}
      <section id="outcomes" className="py-24 px-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#FF5A36] uppercase tracking-widest bg-[#FF5A36]/10 px-3.5 py-1.5 rounded-full inline-block">
              Measurable Success
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#111827] tracking-tight">
              Empowering Student Outcomes
            </h2>
            <p className="text-lg text-[#6B7280] font-medium">
              Cogniva directly impacts speed-to-comprehension, mock ratings, and career transitions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Outcome Card 1 */}
            <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-6 flex flex-col justify-between min-h-[160px] hover:border-gray-300 transition-colors">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Confidence Index</span>
                <p className="text-3xl font-black text-[#111827] mt-2">+85%</p>
              </div>
              <p className="text-xs text-[#6B7280] font-medium mt-4">
                Increase in speech clarity and technical vocabulary confidence.
              </p>
            </div>

            {/* Outcome Card 2 */}
            <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-6 flex flex-col justify-between min-h-[160px] hover:border-gray-300 transition-colors">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Placement Rate</span>
                <p className="text-3xl font-black text-[#111827] mt-2">94%</p>
              </div>
              <p className="text-xs text-[#6B7280] font-medium mt-4">
                Pass rating within interview practice courses.
              </p>
            </div>

            {/* Outcome Card 3 */}
            <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-6 flex flex-col justify-between min-h-[160px] hover:border-gray-300 transition-colors">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Time Reclaimed</span>
                <p className="text-3xl font-black text-[#111827] mt-2">12 Hrs</p>
              </div>
              <p className="text-xs text-[#6B7280] font-medium mt-4">
                Saved weekly by summarizing lengthy textbook chapters.
              </p>
            </div>

            {/* Outcome Card 4 */}
            <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-6 flex flex-col justify-between min-h-[160px] hover:border-gray-300 transition-colors">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Global Reach</span>
                <p className="text-3xl font-black text-[#111827] mt-2">150+</p>
              </div>
              <p className="text-xs text-[#6B7280] font-medium mt-4">
                Countries represented in active user metrics.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------
          TESTIMONIALS SECTION
         --------------------------------------------------------- */}
      <section id="testimonials" className="py-24 px-6 max-w-7xl mx-auto flex flex-col gap-16 border-b border-gray-100">
        <div className="text-center max-w-xl mx-auto space-y-4">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-500/10 px-3.5 py-1.5 rounded-full inline-block">
            Endorsements
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#111827] tracking-tight">
            Loved by Students Globally
          </h2>
          <p className="text-lg text-[#6B7280] font-medium">
            Hear how other learners leverage their custom AI Faculty companions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Review 1 */}
          <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-6">
            <p className="text-sm font-semibold text-gray-700 leading-relaxed">
              &ldquo;Cogniva completely revamped how I practice for technical coding tests. Instead of copying answers, the Coding Mentor prompts me step-by-step to explain logic aloud. Highly recommend the AI voice speed.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs">
                JD
              </div>
              <div>
                <h5 className="text-sm font-extrabold text-[#111827]">Dheeraj Patil</h5>
                <p className="text-xs font-bold text-[#FF5A36]">Computer Science(KIT)</p>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-6">
            <p className="text-sm font-semibold text-gray-700 leading-relaxed">
              &ldquo;The Interview Coach is incredibly smart. It corrected my speech pace, cut down on my filler words, and prompted me with customized follow-ups. Amazing IB!&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs">
                SK
              </div>
              <div>
                <h5 className="text-sm font-extrabold text-[#111827]">Suhana Banadar</h5>
                <p className="text-xs font-bold text-[#FF5A36]">AIML(JCE)</p>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-6">
            <p className="text-sm font-semibold text-gray-700 leading-relaxed">
              &ldquo;I summarize entire OOPs chapters using the Study Buddy my Personalized tutor in cogniva. It auto-generates smart audio summaries that I listen to during my commute. Lifesaver!&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs">
                MR
              </div>
              <div>
                <h5 className="text-sm font-extrabold text-[#111827]">Rizwan Sheikh</h5>
                <p className="text-xs font-bold text-[#FF5A36]">Computer Science(DYPatil)</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------
          FAQ SECTION
         --------------------------------------------------------- */}
      <section id="faq" className="py-24 px-6 max-w-4xl mx-auto flex flex-col gap-12">
        <div className="text-center space-y-4">
          <span className="text-xs font-bold text-[#FF5A36] uppercase tracking-widest bg-[#FF5A36]/10 px-3.5 py-1.5 rounded-full inline-block">
            Common Inquiries
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#111827] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left p-6 font-bold text-sm md:text-base text-[#111827] flex items-center justify-between gap-4 cursor-pointer outline-none hover:text-[#FF5A36] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      isOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="p-6 pt-0 border-t border-gray-100 text-xs md:text-sm text-[#6B7280] font-medium leading-relaxed bg-gray-50/30">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------------------
          CTA BANNER SECTION
         --------------------------------------------------------- */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="relative bg-gradient-to-r from-[#FF5A36] via-[#FF5A36] to-[#FDBA3B] text-white rounded-[32px] px-8 py-16 text-center overflow-hidden shadow-2xl shadow-[#FF5A36]/20">
          {/* Animated pulsing elements inside CTA */}
          <div className="absolute inset-0 bg-white/5 animate-pulse pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col gap-6 items-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/20 backdrop-blur rounded-full text-xs font-bold tracking-wider animate-bounce uppercase">
              <Zap className="w-4 h-4 fill-current text-[#FDBA3B]" />
              <span>Ready to Transform Your Learning?</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              Start Your Journey <br />
              With Cogniva Today
            </h2>
            
            <p className="text-base md:text-lg opacity-90 font-medium">
              Join thousands of global students accelerating their academic and interview metrics using tailored AI Faculty companions.
            </p>

            <LoadingButton
              href="/dashboard"
              variant="secondary"
              className="mt-4 bg-white text-[#111827] hover:bg-gray-50 rounded-2xl px-10 py-5 text-lg font-extrabold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Enter Cogniva Now
            </LoadingButton>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------
          PREMIUM FOOTER
         --------------------------------------------------------- */}
      <footer className="border-t border-gray-200/60 bg-[#FAFAFA] text-[#111827]">
        
        {/* Newsletter banner strip */}
        <div className="bg-gradient-to-r from-[#FF5A36] via-[#FF5A36] to-[#FDBA3B] py-10 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white">
              <h3 className="text-xl md:text-2xl font-black">Stay ahead of the curve</h3>
              <p className="text-sm opacity-90 font-medium mt-1">Get custom prompts, tutorials, and new companion launches straight to your inbox.</p>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="flex w-full max-w-md gap-3 shrink-0">
              <input
                type="email"
                placeholder="you@email.com"
                required
                className="flex-1 rounded-2xl px-5 py-3.5 text-sm bg-white/15 backdrop-blur border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              <button
                type="submit"
                className="rounded-2xl px-6 py-3.5 bg-white text-[#FF5A36] font-bold text-sm hover:bg-white/90 transition-all shrink-0 cursor-pointer shadow-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* 4-column links navigation */}
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand details */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Cogniva Logo"
                width={44}
                height={44}
                className="rounded-xl shadow-sm"
              />
              <div>
                <p className="text-lg font-black text-[#111827]">Cogniva</p>
                <p className="text-xs text-[#6B7280] font-bold">by IB&apos;s Dev World</p>
              </div>
            </div>
            <p className="text-xs md:text-sm text-[#6B7280] font-semibold leading-relaxed">
              Your personal AI faculty—available 24/7. Voice-powered companions that adapt to how you actually study, practice, and summarize topics.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.linkedin.com/in/ikrambanadarwebdev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-[#FF5A36] hover:text-white text-gray-500 flex items-center justify-center transition-all shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://github.com/IBs-DevStudio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-[#FF5A36] hover:text-white text-gray-500 flex items-center justify-center transition-all shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="mailto:ikrambanadar04@gmail.com"
                aria-label="Email"
                className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-[#FF5A36] hover:text-white text-gray-500 flex items-center justify-center transition-all shadow-sm"
              >
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#111827] uppercase tracking-widest">Platform Navigation</h4>
            <ul className="space-y-3">
              {[
                { label: "Dashboard Home", href: "/dashboard" },
                { label: "AI Companions Library", href: "/companions" },
                { label: "Explore More Tutors", href: "/explore-more" },
                { label: "My Learning Journey", href: "/my-journey" },
                { label: "Subscription Pricing", href: "/subscription" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs md:text-sm text-[#6B7280] font-semibold hover:text-[#FF5A36] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Use Cases */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#111827] uppercase tracking-widest">Popular Subjects</h4>
            <ul className="space-y-3 text-xs md:text-sm text-[#6B7280] font-semibold">
              <li>Mock Tech Interviews</li>
              <li>Algorithm Coding Practice</li>
              <li>Calculus & Linear Algebra</li>
              <li>Chemistry & Biology Drills</li>
              <li>SAT / AP Mock Exams</li>
              <li>Vocal Pitch Delivery</li>
            </ul>
          </div>

          {/* Column 4: Builder Card */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#111827] uppercase tracking-widest">Built & Managed</h4>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/ib-2.png"
                  alt="Ikram Banadar"
                  width={38}
                  height={38}
                  className="rounded-full border border-gray-200 object-cover"
                />
                <div>
                  <p className="text-xs font-extrabold text-[#111827]">Ikram Banadar</p>
                  <p className="text-[10px] font-bold text-gray-400">Founder & Dev</p>
                </div>
              </div>
              <p className="text-[11px] text-[#6B7280] font-medium leading-relaxed">
                Founder of IB&apos;s Dev World—building accessible AI-powered tutoring platforms.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["Next.js 15", "AI Voice", "Supabase", "Clerk"].map((tech) => (
                  <span
                    key={tech}
                    className="text-[9px] font-extrabold px-2 py-0.5 bg-white border border-gray-200 rounded-md text-gray-500"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright details */}
        <div className="border-t border-gray-200/60 px-6 py-6 bg-white">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[10px] md:text-xs font-semibold text-[#6B7280] text-center sm:text-left">
              © {new Date().getFullYear()} Cogniva &amp; IB&apos;s Dev World. All rights reserved. Transforming education via AI.
            </p>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Service", "Support Help"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-[10px] md:text-xs font-semibold text-[#6B7280] hover:text-[#FF5A36] transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ---------------------------------------------------------
          Demo Video Overlay Modal
         --------------------------------------------------------- */}
      <AnimatePresence>
        {isDemoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full border border-gray-200 shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsDemoModalOpen(false)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow hover:scale-105 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Video Player */}
              <div className="relative aspect-video w-full bg-black">
                <video
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                >
                  <source
                    src="https://res.cloudinary.com/dchmterf0/video/upload/q_auto,f_auto/Cogniva_Demo_main_tikqmf.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>

              {/* Video Title */}
              <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-[#111827] text-base">Cogniva App Demonstration</h4>
                  <p className="text-xs text-[#6B7280] font-medium mt-0.5">Explore how the voice tutoring interface, user dashboard, and companions work.</p>
                </div>
                <LoadingButton
                  href="/dashboard"
                  variant="primary"
                  className="!text-xs bg-[#FF5A36] text-white hover:bg-[#FF5A36]/90 px-6 py-2.5 rounded-xl font-bold shrink-0"
                  showArrow={false}
                >
                  Get Started Immediately
                </LoadingButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default LandingPage;
