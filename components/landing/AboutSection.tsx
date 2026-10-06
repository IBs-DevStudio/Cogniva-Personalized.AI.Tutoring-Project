"use client";

import { motion } from "framer-motion";
import { Mic, Target, Zap } from "lucide-react";
import { PremiumCard } from "@/components/PremiumCard";
import { staggerContainerVariants, scrollRevealVariants } from "./animations";

export const AboutSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainerVariants}
      className="py-24 px-6 max-w-5xl mx-auto text-center space-y-12"
    >
      <motion.div variants={scrollRevealVariants} className="space-y-4">
        <span className="inline-block text-xs font-bold text-[#FF5A36] uppercase tracking-widest bg-[#FF5A36]/10 px-3.5 py-1.5 rounded-full">
          About the Project
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-[#111827] tracking-tight">
          What is <span className="text-[#FF5A36]">Cogniva</span>?
        </h2>
        <p className="text-lg md:text-xl text-[#6B7280] font-medium max-w-2xl mx-auto leading-relaxed">
          An AI-native learning platform built for students, job seekers, and lifelong learners. Instead of static videos, you get voice-powered AI tutors that adapt in real time.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left pt-6">
        <PremiumCard variants={scrollRevealVariants} glowColor="rgba(254, 89, 51, 0.12)">
          <div className="w-12 h-12 bg-[#FF5A36]/10 rounded-2xl flex items-center justify-center text-[#FF5A36]">
            <Mic className="w-6 h-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
          </div>
          <h4 className="text-lg font-bold text-[#111827]">Voice-First Learning</h4>
          <p className="text-sm text-[#6B7280] font-medium leading-relaxed">
            Speak naturally with your AI tutor. Ask questions, practice answers, and receive instant spoken reviews.
          </p>
        </PremiumCard>

        <PremiumCard variants={scrollRevealVariants} glowColor="rgba(252, 204, 65, 0.15)">
          <div className="w-12 h-12 bg-[#FDBA3B]/10 rounded-2xl flex items-center justify-center text-[#FDBA3B]">
            <Target className="w-6 h-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <h4 className="text-lg font-bold text-[#111827]">Goal-Driven Sessions</h4>
          <p className="text-sm text-[#6B7280] font-medium leading-relaxed">
            Whether cracking a tech interview, preparing for exam boards, or learning linear algebra — custom tutors lead you to success.
          </p>
        </PremiumCard>

        <PremiumCard variants={scrollRevealVariants} glowColor="rgba(168, 85, 247, 0.12)">
          <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500">
            <Zap className="w-6 h-6 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300" />
          </div>
          <h4 className="text-lg font-bold text-[#111827]">Always Available</h4>
          <p className="text-sm text-[#6B7280] font-medium leading-relaxed">
            24/7 access to your specialized faculty. No scheduling or waiting — start learning whenever you are ready.
          </p>
        </PremiumCard>
      </div>

      <motion.p variants={scrollRevealVariants} className="text-sm font-semibold text-[#6B7280] pt-4">
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
      </motion.p>
    </motion.section>
  );
};

export default AboutSection;
