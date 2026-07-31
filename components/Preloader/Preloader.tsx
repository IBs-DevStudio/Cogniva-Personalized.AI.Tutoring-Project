"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Brain } from "lucide-react";

export default function Preloader() {
  const [isMounted, setIsMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [statusText, setStatusText] = useState("Initializing Cogniva Neural Core...");

  // Manage progress simulation
  useEffect(() => {
    setIsMounted(true);

    // Scroll lock during loading
    document.body.style.overflow = "hidden";

    const duration = 2400; // Total duration in ms
    const intervalTime = 40;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(100, Math.round((currentStep / steps) * 100));
      setProgress(currentProgress);

      // Rotate status messages based on progress
      if (currentProgress < 20) {
        setStatusText("Initializing Cogniva Neural Core...");
      } else if (currentProgress < 45) {
        setStatusText("Calibrating voice tutor parameters...");
      } else if (currentProgress < 70) {
        setStatusText("Configuring interactive workspaces...");
      } else if (currentProgress < 90) {
        setStatusText("Establishing encrypted AI handshake...");
      } else {
        setStatusText("Welcome to the learning revolution.");
      }

      if (currentStep >= steps) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoaded(true);
          document.body.style.overflow = "";
          // Dispatch event to notify layout/pages that preloader is complete
          window.dispatchEvent(new CustomEvent("cogniva-preloader-complete"));
        }, 500); // Wait for a moment at 100% for readability
      }
    }, intervalTime);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  if (!isMounted || isLoaded) return null;

  const brandLetters = "COGNIVA".split("");

  // Framer Motion variants with explicit typing for strict Next.js compilation
  const containerVariants: Variants = {
    exit: {
      opacity: 0,
      y: -100,
      scale: 1.02,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number], // Cubic Bezier
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.7 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        delay: i * 0.08,
      },
    }),
  };

  const nodeVariants: Variants = {
    animate: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 12,
        ease: "linear" as const,
      },
    },
  };

  const reverseNodeVariants: Variants = {
    animate: {
      rotate: -360,
      transition: {
        repeat: Infinity,
        duration: 8,
        ease: "linear" as const,
      },
    },
  };

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          variants={containerVariants}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#fafbfc] select-none overflow-hidden"
        >
          {/* Ambient Glowing Backgrounds */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-radial from-[#fe5933]/8 to-transparent blur-[60px] md:blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-1/3 left-1/4 w-[250px] h-[250px] bg-radial from-amber-500/3 to-transparent blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-radial from-blue-500/3 to-transparent blur-[100px] rounded-full pointer-events-none" />

          {/* Loader Content Container */}
          <div className="relative flex flex-col items-center max-w-md px-6 text-center z-10">
            {/* Animated SVG Neural Network */}
            <div className="relative w-36 h-36 mb-8 flex items-center justify-center">
              {/* Outer Orbit ring 1 */}
              <motion.svg
                variants={nodeVariants}
                animate="animate"
                className="absolute w-32 h-32 text-gray-200"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4, 10"
                />
                {/* Orbit Nodes */}
                <circle cx="50" cy="5" r="4" fill="#fe5933" className="shadow-lg shadow-[#fe5933]/50" />
                <circle cx="50" cy="95" r="3" fill="#fe5933" opacity="0.6" />
              </motion.svg>

              {/* Inner Orbit ring 2 (Counter-rotating) */}
              <motion.svg
                variants={reverseNodeVariants}
                animate="animate"
                className="absolute w-24 h-24 text-gray-200"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="8, 6"
                />
                <circle cx="12" cy="50" r="3" fill="#fccc41" className="shadow-lg shadow-[#fccc41]/50" />
                <circle cx="88" cy="50" r="3.5" fill="#fccc41" />
              </motion.svg>

              {/* Central Glowing Pulsing Core */}
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  boxShadow: [
                    "0 0 20px 2px rgba(254, 89, 51, 0.15)",
                    "0 0 35px 8px rgba(254, 89, 51, 0.3)",
                    "0 0 20px 2px rgba(254, 89, 51, 0.15)"
                  ]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut",
                }}
                className="w-16 h-16 rounded-full bg-[#fe5933] flex items-center justify-center text-white border border-[#ff7a5c]/20 z-20"
              >
                <Brain className="w-8 h-8 fill-white/10" />
              </motion.div>
            </div>

            {/* Staggered Brand Text Reveal */}
            <div className="flex space-x-1.5 md:space-x-2.5 mb-2 overflow-hidden">
              {brandLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-gray-900 text-3xl md:text-4xl font-extrabold tracking-widest font-bricolage select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Sub-tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-xs uppercase tracking-[0.4em] text-gray-400 font-medium mb-12"
            >
              Learning Personalized
            </motion.p>

            {/* Custom Sleek Progress Bar */}
            <div className="w-64 flex flex-col items-center gap-3">
              <div className="w-full h-[3px] bg-gray-100 rounded-full overflow-hidden relative border border-gray-200/40">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#fe5933] to-[#fccc41] rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>

              {/* Progress and status text */}
              <div className="w-full flex items-center justify-between mt-1 text-[10px] md:text-xs text-gray-400 font-mono tracking-wider">
                <motion.span
                  key={statusText}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-left font-semibold max-w-[80%] truncate text-[#fe5933]"
                >
                  {statusText}
                </motion.span>
                <span className="font-bold text-gray-500">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
