"use client";

import { motion } from "framer-motion";
import { staggerContainerVariants, scrollRevealVariants } from "./animations";

const testimonials = [
  {
    quote:
      "Cogniva completely revamped how I practice for technical coding tests. Instead of copying answers, the Coding Mentor prompts me step-by-step to explain logic aloud. Highly recommend the AI voice speed.",
    initials: "DP",
    name: "Dheeraj Patil",
    program: "Computer Science(KIT)",
  },
  {
    quote:
      "The Interview Coach is incredibly smart. It corrected my speech pace, cut down on my filler words, and prompted me with customized follow-ups. Amazing IB!",
    initials: "SB",
    name: "Suhana Banadar",
    program: "AIML(JCE)",
  },
  {
    quote:
      "I summarize entire OOPs chapters using the Study Buddy my Personalized tutor in cogniva. It auto-generates smart audio summaries that I listen to during my commute. Lifesaver!",
    initials: "RS",
    name: "Rizwan Sheikh",
    program: "Computer Science(DYPatil)",
  },
];

export const TestimonialsSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainerVariants}
      id="testimonials"
      className="py-24 px-6 max-w-7xl mx-auto flex flex-col gap-16 border-b border-gray-100"
    >
      <motion.div variants={scrollRevealVariants} className="text-center max-w-xl mx-auto space-y-4">
        <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-500/10 px-3.5 py-1.5 rounded-full inline-block">
          Endorsements
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-[#111827] tracking-tight">
          Loved by Students
        </h2>
        <p className="text-lg text-[#6B7280] font-medium">
          Hear how other learners leverage their custom AI Faculty companions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((review, idx) => (
          <motion.div
            key={idx}
            variants={scrollRevealVariants}
            className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-6"
          >
            <p className="text-sm font-semibold text-gray-700 leading-relaxed">
              &ldquo;{review.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-700">
                {review.initials}
              </div>
              <div>
                <h5 className="text-sm font-extrabold text-[#111827]">{review.name}</h5>
                <p className="text-xs font-bold text-[#FF5A36]">{review.program}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
