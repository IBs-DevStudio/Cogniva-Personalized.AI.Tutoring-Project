"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import LoadingButton from "@/components/LoadingButton";
import InteractiveDashboard from "./InteractiveDashboard";
import {
  heroContainerVariants,
  heroItemVariants,
  dashboardMockupVariants,
} from "./animations";

interface HeroSectionProps {
  onOpenDemo: () => void;
  isPreloaderComplete: boolean;
}

export const HeroSection = ({
  onOpenDemo,
  isPreloaderComplete,
}: HeroSectionProps) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-25 pb-20 px-4 max-w-7xl mx-auto border-b border-gray-100 text-center">
      {/* Main Content Wrapper */}
      <motion.div
        variants={heroContainerVariants}
        initial="hidden"
        animate={isPreloaderComplete ? "visible" : "hidden"}
        className="flex flex-col items-center gap-8 max-w-4xl mx-auto"
      >
        {/* Giant Premium Centered Headline */}
        <motion.h1
          variants={heroItemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#111827] leading-[1.1] tracking-tight max-w-4xl"
        >
          The Future of{" "}
          <span className="bg-gradient-to-r from-[#FF5A36] via-[#FF5A36] to-[#FDBA3B] bg-clip-text text-transparent">
            Personalized Learning
          </span>
        </motion.h1>

        {/* Centered Supporting Copy */}
        <motion.p
          variants={heroItemVariants}
          className="text-sm sm:text-base md:text-lg text-[#6B7280] font-medium leading-relaxed max-w-3xl"
        >
          Unlock your potential with specialized AI companions that adapt to your unique learning style. Converse naturally, get instant audio feedback, and master any subject.
        </motion.p>

        {/* Centered CTAs */}
        <motion.div
          variants={heroItemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto"
        >
          <LoadingButton
            href="/dashboard"
            variant="primary"
            className="w-full sm:w-auto bg-[#FF5A36] hover:bg-[#FF5A36]/90 text-white rounded-2xl px-8 py-4.5 text-base font-extrabold flex items-center justify-center gap-2.5 shadow-lg shadow-[#FF5A36]/25 hover:shadow-xl hover:shadow-[#FF5A36]/35 transition-all duration-300"
          >
            Enter Cogniva Now
          </LoadingButton>

          <button
            onClick={onOpenDemo}
            className="w-full sm:w-auto border border-gray-300/80 bg-white hover:bg-gray-50 text-[#111827] rounded-2xl px-8 py-4.5 text-base font-extrabold flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current text-[#FF5A36]" />
            <span>Watch Video Demo</span>
          </button>
        </motion.div>

        {/* Centered Trusted By / Student Avatar stack */}
        <motion.div
          variants={heroItemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          {/* Overlapping initial badges */}
          <div className="flex -space-x-3">
            {[
              { name: "S", bg: "bg-red-500" },
              { name: "K", bg: "bg-blue-500" },
              { name: "M", bg: "bg-green-500" },
              { name: "A", bg: "bg-amber-500" },
              { name: "L", bg: "bg-purple-500" },
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
        </motion.div>
      </motion.div>

      {/* Centered Interactive SaaS Dashboard Mockup below */}
      <motion.div
        variants={dashboardMockupVariants}
        initial="hidden"
        animate={isPreloaderComplete ? "visible" : "hidden"}
        className="w-full max-w-5xl mt-16 relative"
      >
        {/* Glow backing */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5A36]/5 to-[#FDBA3B]/5 rounded-3xl blur-3xl pointer-events-none" />
        <InteractiveDashboard />
      </motion.div>
    </section>
  );
};

export default HeroSection;
