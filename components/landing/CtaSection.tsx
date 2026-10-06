"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import LoadingButton from "@/components/LoadingButton";
import { scrollRevealVariants } from "./animations";

export const CtaSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={scrollRevealVariants}
      className="py-16 px-6 max-w-5xl mx-auto"
    >
      <div className="relative bg-gradient-to-r from-[#FF5A36] via-[#FF5A36] to-[#FDBA3B] text-white rounded-[32px] px-8 py-16 text-center overflow-hidden shadow-2xl shadow-[#FF5A36]/25">
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
    </motion.section>
  );
};

export default CtaSection;
