"use client";

import { motion } from "framer-motion";
import { staggerContainerVariants, scrollRevealVariants } from "./animations";

export const JourneySection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainerVariants}
      className="py-24 px-6 max-w-7xl mx-auto flex flex-col gap-16 border-b border-gray-100"
    >
      <motion.div variants={scrollRevealVariants} className="text-center max-w-xl mx-auto space-y-4">
        <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-500/10 px-3.5 py-1.5 rounded-full inline-block">
          Adaptive Path
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-[#111827] tracking-tight">
          How Your Learning Journey Evolves
        </h2>
        <p className="text-lg text-[#6B7280] font-medium">
          Three simple milestones to master any field with voice-powered tutoring.
        </p>
      </motion.div>

      {/* Step-by-step horizontal progress pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
        {/* Connector horizontal line for desktop */}
        <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-[#FF5A36] via-purple-500 to-[#FDBA3B] opacity-30 z-0 pointer-events-none" />

        {/* Step 1 */}
        <motion.div
          variants={scrollRevealVariants}
          className="flex flex-col items-center md:items-start text-center md:text-left gap-4 relative z-10 group"
        >
          <div className="w-16 h-16 bg-white border-2 border-[#FF5A36] rounded-full flex items-center justify-center font-black text-[#FF5A36] text-xl shadow-md group-hover:scale-110 transition-transform duration-300">
            01
          </div>
          <h4 className="text-xl font-extrabold text-[#111827] mt-2">Select Your AI Companion</h4>
          <p className="text-sm text-[#6B7280] font-medium leading-relaxed max-w-sm">
            Choose from our curated team of specialized AI Faculty members (Interview Coach, Coding Mentor, etc.) or construct your own.
          </p>
        </motion.div>

        {/* Step 2 */}
        <motion.div
          variants={scrollRevealVariants}
          className="flex flex-col items-center md:items-start text-center md:text-left gap-4 relative z-10 group"
        >
          <div className="w-16 h-16 bg-white border-2 border-purple-500 rounded-full flex items-center justify-center font-black text-purple-500 text-xl shadow-md group-hover:scale-110 transition-transform duration-300">
            02
          </div>
          <h4 className="text-xl font-extrabold text-[#111827] mt-2">Start Talking & Listening</h4>
          <p className="text-sm text-[#6B7280] font-medium leading-relaxed max-w-sm">
            Unmute your microphone and learn through back-and-forth speech. Hear reviews immediately and analyze topic concepts step-by-step.
          </p>
        </motion.div>

        {/* Step 3 */}
        <motion.div
          variants={scrollRevealVariants}
          className="flex flex-col items-center md:items-start text-center md:text-left gap-4 relative z-10 group"
        >
          <div className="w-16 h-16 bg-white border-2 border-[#FDBA3B] rounded-full flex items-center justify-center font-black text-[#FDBA3B] text-xl shadow-md group-hover:scale-110 transition-transform duration-300">
            03
          </div>
          <h4 className="text-xl font-extrabold text-[#111827] mt-2">View Metrics & Grow</h4>
          <p className="text-sm text-[#6B7280] font-medium leading-relaxed max-w-sm">
            Review your speech latency scores, daily progress, and mock grades on your analytics dashboard to systematically build competence.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default JourneySection;
