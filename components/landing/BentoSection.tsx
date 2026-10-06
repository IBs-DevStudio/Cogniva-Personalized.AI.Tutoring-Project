"use client";

import { motion } from "framer-motion";
import {
  Mic,
  Target,
  ArrowRight,
  Award,
  TrendingUp,
  Activity,
  Check,
  Flame,
  Clock,
  BookOpen,
  Zap,
} from "lucide-react";
import { PremiumCard } from "@/components/PremiumCard";
import AudioWaveform from "./AudioWaveform";
import { staggerContainerVariants, scrollRevealVariants } from "./animations";

export const BentoSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainerVariants}
      id="features"
      className="py-24 px-6 max-w-7xl mx-auto flex flex-col gap-16"
    >
      <motion.div variants={scrollRevealVariants} className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs font-bold text-[#FF5A36] uppercase tracking-widest bg-[#FF5A36]/10 px-3.5 py-1.5 rounded-full inline-block">
          Comprehensive Capabilities
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-[#111827] tracking-tight">
          Why Students Choose Cogniva
        </h2>
        <p className="text-lg text-[#6B7280] font-medium leading-relaxed">
          Replace simple flat lists with a dynamic Bento layout. Varying card sizes highlight core value propositions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1: Tall / Wide (Col-span 2) - Voice */}
        <PremiumCard
          variants={scrollRevealVariants}
          className="md:col-span-2 min-h-[340px]"
          contentClassName="flex flex-col justify-between h-full w-full"
          glowColor="rgba(254, 89, 51, 0.12)"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 bg-[#FF5A36]/10 rounded-2xl flex items-center justify-center text-[#FF5A36]">
              <Mic className="w-6 h-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
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
        </PremiumCard>

        {/* Card 2: Medium (Col-span 1) - Interview Ready */}
        <PremiumCard
          variants={scrollRevealVariants}
          className="min-h-[340px]"
          contentClassName="flex flex-col justify-between h-full w-full"
          glowColor="rgba(244, 63, 94, 0.12)"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500">
              <Target className="w-6 h-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
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
        </PremiumCard>

        {/* Card 3: Medium (Col-span 1) - Exam Excellence */}
        <PremiumCard
          variants={scrollRevealVariants}
          className="min-h-[340px]"
          contentClassName="flex flex-col justify-between h-full w-full"
          glowColor="rgba(245, 158, 11, 0.12)"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
              <Award className="w-6 h-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
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
        </PremiumCard>

        {/* Card 4: Wide (Col-span 2) - Analytics Progress */}
        <PremiumCard
          variants={scrollRevealVariants}
          className="md:col-span-2 min-h-[340px]"
          contentClassName="flex flex-col justify-between h-full w-full"
          glowColor="rgba(20, 184, 166, 0.12)"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-500">
              <TrendingUp className="w-6 h-6 group-hover:scale-110 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
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
        </PremiumCard>

        {/* Card 5: Small (Col-span 1) - Learn Quickly */}
        <PremiumCard
          variants={scrollRevealVariants}
          className="min-h-[280px]"
          contentClassName="flex flex-col justify-between h-full w-full"
          glowColor="rgba(168, 85, 247, 0.12)"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500">
              <Clock className="w-6 h-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-extrabold text-[#111827]">Accelerate Learning</h3>
            <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
              Study in chunks. Speed up summarize notes, optimize integration steps, and capture answers quickly.
            </p>
          </div>
        </PremiumCard>

        {/* Card 6: Small (Col-span 1) - Any Subject */}
        <PremiumCard
          variants={scrollRevealVariants}
          className="min-h-[280px]"
          contentClassName="flex flex-col justify-between h-full w-full"
          glowColor="rgba(14, 165, 233, 0.12)"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-500">
              <BookOpen className="w-6 h-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-extrabold text-[#111827]">Master Any Subject</h3>
            <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
              From advanced computer science to organic chemistry, history, or literature—we cover everything you need.
            </p>
          </div>
        </PremiumCard>

        {/* Card 7: Small (Col-span 1) - Instant Help */}
        <PremiumCard
          variants={scrollRevealVariants}
          className="min-h-[280px]"
          contentClassName="flex flex-col justify-between h-full w-full"
          glowColor="rgba(16, 185, 129, 0.12)"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
              <Zap className="w-6 h-6 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-extrabold text-[#111827]">Instant Feedback</h3>
            <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
              Ask a voice query, talk back and forth, and receive customized constructive analysis immediately.
            </p>
          </div>
        </PremiumCard>
      </div>
    </motion.section>
  );
};

export default BentoSection;
