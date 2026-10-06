"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import LoadingButton from "@/components/LoadingButton";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal = ({ isOpen, onClose }: DemoModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full border border-gray-200 shadow-2xl relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow hover:scale-105 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black">
              <video
                className="w-full h-full object-contain"
                controls
                autoPlay
                playsInline
                preload="auto"
              >
                <source
                  src="https://res.cloudinary.com/dchmterf0/video/upload/v1791293181/ikram_bhai_real_project_w4yws3.mp4"
                  type="video/mp4"
                />
              </video>
            </div>

            {/* Video Title */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-[#111827] text-base">Cogniva App Demonstration</h4>
                <p className="text-xs text-[#6B7280] font-medium mt-0.5">
                  Explore how the voice tutoring interface, user dashboard, and companions work.
                </p>
              </div>
              <LoadingButton
                href="/dashboard"
                variant="primary"
                className="!text-xs bg-[#FF5A36] text-white hover:bg-[#FF5A36]/90 px-6 py-2.5 rounded-xl font-bold shrink-0"
                showArrow={false}
              >
                Get Started Immediately
              </LoadingButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DemoModal;
