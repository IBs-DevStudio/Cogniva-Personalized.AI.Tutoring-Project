"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { staggerContainerVariants, scrollRevealVariants } from "./animations";

export const faqs = [
  {
    q: "What is a Personal AI Faculty?",
    a: "Cogniva is not a simple chatbot. It is a suite of distinct, goal-specific AI companions with custom voices, personalities, and subject knowledge. You can talk to them via voice in real time, customize how they teach, and track your progress metrics over time.",
  },
  {
    q: "How does the voice-tutor interaction work?",
    a: "By leveraging state-of-the-art AI voice infrastructure, Cogniva tutors talk and listen with near-zero latency. You simply open a session, unmute your microphone, and converse naturally. The tutor hears you, responds immediately, and outputs a live transcript.",
  },
  {
    q: "Can I customize or build my own tutor companions?",
    a: "Yes! The platform includes a companion builder where you can customize their name, background system prompt, subject specialty, and pick whether they speak in formal or casual styles using various high-quality male and female voice models.",
  },
  {
    q: "Does Cogniva track my progress?",
    a: "Absolutely. Cogniva tracks your practice hours, topic mastery, performance analytics, and session streaks. Your personal progress dashboard shows you exactly which skills you excel in and where you need more practice.",
  },
  {
    q: "Is there a limit on how much I can talk to my companions?",
    a: "We offer both free trial allocations and subscription credits for high-fidelity voice models, providing extensive hours of active personalized instruction without steep overhead costs.",
  },
];

export const FaqSection = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainerVariants}
      id="faq"
      className="py-24 px-6 max-w-4xl mx-auto flex flex-col gap-12"
    >
      <motion.div variants={scrollRevealVariants} className="text-center space-y-4">
        <span className="text-xs font-bold text-[#FF5A36] uppercase tracking-widest bg-[#FF5A36]/10 px-3.5 py-1.5 rounded-full inline-block">
          Common Inquiries
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-[#111827] tracking-tight">
          Frequently Asked Questions
        </h2>
      </motion.div>

      <motion.div variants={scrollRevealVariants} className="space-y-4">
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
      </motion.div>
    </motion.section>
  );
};

export default FaqSection;
