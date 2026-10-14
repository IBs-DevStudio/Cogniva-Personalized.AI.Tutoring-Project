'use client';

import { useState, useEffect, useCallback } from 'react';
import { Monitor, Smartphone, X, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Synthesize a crisp, luxury mechanical micro-click using the Web Audio API
const playHapticFeedback = () => {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // High crisp pitch that rapidly ramps down (18ms tactile click)
    osc.type = 'sine';
    osc.frequency.setValueAtTime(840, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.02);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.02);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.022);
  } catch {
    // Ignore if audio context not permitted by autoplay
  }
};

const MobileWarningModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isPermanentlyDismissed = useCallback(() => {
    if (typeof window === 'undefined') return false;
    try {
      return (
        localStorage.getItem('mobileWarningDismissed') === 'true' ||
        sessionStorage.getItem('mobileWarningDismissed') === 'true'
      );
    } catch {
      return false;
    }
  }, []);

  const handleContinue = useCallback(() => {
    playHapticFeedback();
    try {
      // Permanently remember that the user clicked continue so it never shows again
      localStorage.setItem('mobileWarningDismissed', 'true');
      sessionStorage.setItem('mobileWarningDismissed', 'true');
    } catch {
      // Safely ignore storage quotas
    }
    setShowModal(false);
  }, []);

  useEffect(() => {
    // If user already clicked continue previously, never show again
    if (isPermanentlyDismissed()) {
      setShowModal(false);
      return;
    }

    const checkDevice = () => {
      if (isPermanentlyDismissed()) {
        setShowModal(false);
        return;
      }

      // Check screen size
      const isSmallScreen = window.innerWidth < 768;

      // Check user agent for mobile devices
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileDevice = mobileRegex.test(navigator.userAgent);

      // Check if touch device
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      const shouldShowWarning = isSmallScreen || (isMobileDevice && isTouchDevice);

      setIsMobile(shouldShowWarning);
      setShowModal(shouldShowWarning);
    };

    checkDevice();

    // Listen for window resize
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, [isPermanentlyDismissed]);

  if (!showModal || !isMobile) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 select-none">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] bg-gradient-to-tr from-primary/20 via-cta-gold/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Main Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ type: 'spring', stiffness: 450, damping: 30 }}
        className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl rounded-3xl sm:rounded-[32px] border border-white/80 dark:border-white/10 shadow-[0_25px_70px_-15px_rgba(254,89,51,0.25),0_10px_30px_-10px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.04)] max-w-md w-full mx-auto p-6 sm:p-7 relative overflow-hidden text-center"
      >
        {/* Close Button on top right */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.88 }}
          onClick={handleContinue}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 active:bg-neutral-300 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer group border border-neutral-200/60 dark:border-neutral-700/60 shadow-2xs"
          aria-label="Dismiss and continue"
        >
          <X className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90" />
        </motion.button>

        {/* 3D Icon Pedestal with Glow */}
        <div className="relative flex items-center justify-center mb-4 mt-1">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/30 to-cta-gold/30 blur-lg scale-110" />
          <motion.div
            initial={{ scale: 0.85, rotate: -6 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 450, damping: 25 }}
            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary via-[#ff6842] to-cta-gold shadow-lg shadow-primary/35 flex items-center justify-center text-white ring-4 ring-white dark:ring-neutral-900"
          >
            <Monitor className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-sm" />
          </motion.div>
        </div>

        {/* Header Kicker Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-2 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Desktop Optimized</span>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white font-bricolage tracking-tight leading-snug mb-1.5">
          Better Experience Awaits
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-5 max-w-xs mx-auto">
          Cogniva is crafted for rich desktop and tablet sessions with real-time voice & visual tools.
        </p>

        {/* Experience Cards */}
        <div className="space-y-2.5 mb-4 text-left">
          <div className="bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl p-3 border border-neutral-100 dark:border-neutral-700/60 flex items-start gap-3 shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Monitor className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-neutral-900 dark:text-white leading-tight">
                Optimal on Desktop & Tablets
              </h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug">
                Voice interaction, interactive canvas, and split-view mentors work best on larger screens.
              </p>
            </div>
          </div>

          <div className="bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl p-3 border border-neutral-100 dark:border-neutral-700/60 flex items-start gap-3 shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-neutral-900 dark:text-white leading-tight">
                Mobile Users
              </h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug">
                Switching to "Desktop Site" in your browser menu unlocks the full tutoring layout.
              </p>
            </div>
          </div>
        </div>

        {/* Action Button with Tactile "Feels Like Clicked" Feedback */}
        <div className="space-y-2 pt-1">
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.94, y: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            onClick={handleContinue}
            className="relative group overflow-hidden w-full bg-gradient-to-r from-primary via-[#ff6842] to-cta-gold text-white font-semibold py-3 px-6 rounded-full shadow-[0_10px_22px_-5px_rgba(254,89,51,0.38),0_3px_8px_-2px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_28px_-4px_rgba(254,89,51,0.48)] active:shadow-[0_2px_5px_rgba(254,89,51,0.3)] active:brightness-95 border-t border-white/30 flex items-center justify-center gap-2 cursor-pointer transition-all text-sm select-none"
          >
            {/* Shimmer sweep */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
            <span>Continue to Cogniva</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </motion.button>

          <p className="text-[11px] text-neutral-400 dark:text-neutral-500 flex items-center justify-center gap-1.5 pt-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" />
            <span>Will not be shown again once you continue</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default MobileWarningModal;