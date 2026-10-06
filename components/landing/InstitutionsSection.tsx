"use client";

import { motion } from "framer-motion";
import { staggerContainerVariants, scrollRevealVariants } from "./animations";

export const InstitutionsSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainerVariants}
      className="py-12 bg-white border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.p
          variants={scrollRevealVariants}
          className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-6"
        >
          Empowering students from leading educational institutions
        </motion.p>
        <motion.div
          variants={scrollRevealVariants}
          className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-300"
        >
          <span className="text-lg md:text-xl font-black tracking-wider text-gray-800">KIT, Kolhapur</span>
          <span className="text-lg md:text-xl font-black tracking-wider text-gray-800">D Y Patil University</span>
          <span className="text-lg md:text-xl font-black tracking-wider text-gray-800">JCE, Belagavi</span>
          <span className="text-lg md:text-xl font-black tracking-wider text-gray-800">VIT, Pune</span>
          <span className="text-lg md:text-xl font-black tracking-wider text-gray-800">IIIT Surat</span>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default InstitutionsSection;
