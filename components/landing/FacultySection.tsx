"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Target,
  Code,
  BookOpen,
  Award,
  Compass,
  Mic,
  Brain,
  Volume2,
} from "lucide-react";
import LoadingButton from "@/components/LoadingButton";
import { staggerContainerVariants, scrollRevealVariants } from "./animations";

export const tutors = [
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
    sample: "Hi there! Let's polish your behavioral answers. Try to frame your projects with clear scope and metrics.",
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
    sample: "Hey, recursion is simple once you isolate your base case. Let's draw the call stack together for this fibonacci solution!",
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
    sample: "Done compiling that biology chapter! I highlighted three core processes: cellular respiration, glycolysis, and the Krebs cycle. Let's quiz?",
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
    sample: "Welcome. Let's begin the mock exam. Remember: read the prompt carefully. What is your hypothesis for question one?",
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
    sample: "Hello. Let's mapping your skills gap. To break into Machine Learning roles, we should prioritize building strong ML Pipeline projects.",
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
    sample: "Hello! Try to project your voice and pause after key milestones. I noticed you used three filler words - let's try that slide again.",
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
    sample: "Hi. We are looking at derivatives. Derivative represents the instantaneous rate of change. Let's write down the limit formula.",
  },
];

export const FacultySection = () => {
  const [activeTutorIndex, setActiveTutorIndex] = useState(0);

  const selectedTutor = tutors[activeTutorIndex];
  const SelectedIcon = selectedTutor.icon;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainerVariants}
      id="faculty"
      className="py-24 px-6 bg-white border-y border-gray-100"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <motion.div
          variants={scrollRevealVariants}
          className="text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
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
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tutor List (Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {tutors.map((tutor, idx) => {
              const isSelected = idx === activeTutorIndex;
              const IconComp = tutor.icon;
              return (
                <motion.button
                  variants={scrollRevealVariants}
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
                </motion.button>
              );
            })}
          </div>

          {/* Selected Tutor Premium Preview Console (Col 7) */}
          <motion.div
            variants={scrollRevealVariants}
            className="lg:col-span-7 bg-gray-50 border border-gray-200 rounded-3xl p-8 flex flex-col justify-between min-h-[460px] relative overflow-hidden"
          >
            {/* Decorative Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />

            {/* Console Header */}
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-200/80 pb-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white"
                  style={{ backgroundColor: selectedTutor.badgeColor }}
                >
                  <SelectedIcon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-[#111827]">
                    {selectedTutor.name}
                  </h3>
                  <p className="text-xs font-bold text-[#FF5A36] uppercase tracking-widest mt-0.5">
                    {selectedTutor.role}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] px-3 py-1 bg-white border border-gray-200 rounded-full font-bold text-gray-500">
                  {selectedTutor.voice}
                </span>
                <span className="text-[10px] px-3 py-1 bg-white border border-gray-200 rounded-full font-bold text-gray-500">
                  {selectedTutor.accent}
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
                    &ldquo;{selectedTutor.sample}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Console Footer parameters */}
            <div className="relative z-10 border-t border-gray-200/80 pt-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <p className="text-xs font-medium text-[#6B7280] max-w-sm">
                {selectedTutor.desc}
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
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default FacultySection;
