"use client";

import { motion } from "framer-motion";
import { staggerContainerVariants, scrollRevealVariants } from "./animations";

const outcomes = [
  {
    label: "Voice Latency",
    stat: "~120ms",
    desc: "End-to-end speech-to-speech response time, measured in live sessions.",
  },
  {
    label: "Sessions Run",
    stat: "100+",
    desc: "Real voice tutoring sessions with students across 5 college campuses.",
  },
  {
    label: "AI Faculty",
    stat: "4+",
    desc: "Specialized voice tutors — interview coach, coding mentor, study buddy, and custom builders.",
  },
  {
    label: "Built By",
    stat: "1 Dev",
    desc: "Designed, built, and deployed solo — from voice pipeline to analytics dashboard.",
  },
];

export const OutcomesSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainerVariants}
      id="outcomes"
      className="py-24 px-6 bg-white border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <motion.div variants={scrollRevealVariants} className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-bold text-[#FF5A36] uppercase tracking-widest bg-[#FF5A36]/10 px-3.5 py-1.5 rounded-full inline-block">
            Measurable Success
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#111827] tracking-tight">
            Empowering Student Outcomes
          </h2>
          <p className="text-lg text-[#6B7280] font-medium">
            Cogniva directly impacts speed-to-comprehension, mock ratings, and career transitions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {outcomes.map((item, index) => (
            <motion.div
              key={index}
              variants={scrollRevealVariants}
              className="bg-gray-50 border border-gray-200/80 rounded-2xl p-6 flex flex-col justify-between min-h-[160px] hover:border-gray-300 transition-colors"
            >
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {item.label}
                </span>
                <p className="text-3xl font-black text-[#111827] mt-2">{item.stat}</p>
              </div>
              <p className="text-xs text-[#6B7280] font-medium mt-4 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default OutcomesSection;
