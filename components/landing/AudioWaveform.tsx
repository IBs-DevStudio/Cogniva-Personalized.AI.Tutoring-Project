"use client";

import { motion } from "framer-motion";

interface AudioWaveformProps {
  active?: boolean;
  color?: string;
  barCount?: number;
}

export const AudioWaveform = ({
  active = true,
  color = "#FF5A36",
  barCount = 15,
}: AudioWaveformProps) => {
  const bars = Array.from({ length: barCount });

  return (
    <div className="flex items-center gap-1.0 h-5">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 rounded-full"
          style={{ backgroundColor: color }}
          animate={
            active
              ? {
                  height: [
                    "20%",
                    i % 2 === 0 ? "80%" : "60%",
                    i % 3 === 0 ? "100%" : "40%",
                    "20%",
                  ],
                }
              : { height: "20%" }
          }
          transition={{
            duration: 1 + (i % 3) * 0.25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.05,
          }}
        />
      ))}
    </div>
  );
};

export default AudioWaveform;
