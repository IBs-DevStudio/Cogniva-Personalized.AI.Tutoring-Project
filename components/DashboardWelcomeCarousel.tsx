'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  X,
  Sparkles,
  Users,
  Zap,
  ArrowRight,
  Plus,
  Volume2,
  VolumeX,
  Bot,
  Brain,
  CheckCircle2,
  BookOpen,
  Compass,
  Mic,
  GraduationCap,
  Layers,
  Wand2,
  Activity,
  Sliders,
  Calculator,
  FlaskConical,
  Languages
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// Synthesize a crisp, luxury mechanical micro-click using the Web Audio API
const playHapticFeedback = (enabled = true) => {
  if (!enabled || typeof window === 'undefined') return;
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

const DashboardWelcomeCarousel = () => {
  const [showCarousel, setShowCarousel] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    try {
      const isDismissed =
        localStorage.getItem('dashboard-welcome-carousel-dismissed') === 'true' ||
        sessionStorage.getItem('dashboard-welcome-carousel-dismissed') === 'true';
      if (!isDismissed) {
        const timer = setTimeout(() => setShowCarousel(true), 400);
        return () => clearTimeout(timer);
      }
    } catch {
      const timer = setTimeout(() => setShowCarousel(true), 400);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = useCallback(() => {
    try {
      localStorage.setItem('dashboard-welcome-carousel-dismissed', 'true');
      sessionStorage.setItem('dashboard-welcome-carousel-dismissed', 'true');
    } catch {}
    setShowCarousel(false);
  }, []);

  const handleDontShowAgain = useCallback(() => {
    try {
      localStorage.setItem('dashboard-welcome-carousel-dismissed', 'true');
      sessionStorage.setItem('dashboard-welcome-carousel-dismissed', 'true');
    } catch {}
    setShowCarousel(false);
  }, []);

  const handleStepChange = (newStep: number) => {
    if (newStep === currentStep) return;
    setDirection(newStep > currentStep ? 1 : -1);
    setCurrentStep(newStep);
  };

  const handleNext = () => {
    if (currentStep < carouselSteps.length - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const carouselSteps = [
    {
      id: 'welcome',
      icon: Sparkles,
      kicker: 'AI Learning Revolution',
      title: 'Welcome to Cogniva!',
      highlight: 'Your Personalized AI Learning Journey',
      description:
        "We're excited to have you here! To get the most out of your learning experience, let's explore how our voice-powered tutors transform how you learn.",
      action: 'Continue Tour',
      features: [
        { icon: Mic, title: 'Voice-First AI', desc: 'Live spoken learning' },
        { icon: Brain, title: 'Adaptive Pace', desc: 'Matches your rhythm' },
        { icon: Zap, title: 'Instant Clarity', desc: 'Step-by-step logic' },
      ],
    },
    {
      id: 'builder',
      icon: Plus,
      kicker: 'Companion Studio',
      title: 'Build Your Own AI Companion',
      highlight: 'Companion Builder • Recommended for You',
      description:
        'While our featured companions are great, crafting your own personalized AI tutor gives you the ultimate experience. Customize the subject, voice, and teaching personality to match your style perfectly.',
      action: 'Try Building One',
      ctaLink: '/companions/new',
      previewType: 'builder',
    },
    {
      id: 'explore',
      icon: Users,
      kicker: 'Ready-to-Learn Library',
      title: 'Or Use Pre-made Companions',
      highlight: 'Featured & Explore Library',
      description:
        'Not ready to build your own? No problem! Explore dozens of pre-trained AI companions ready to help you excel in STEM, Languages, Literature, and History.',
      action: 'Explore Companions',
      ctaLink: '/companions',
      previewType: 'companions',
    },
    {
      id: 'launch',
      icon: Zap,
      kicker: 'Instant Sessions',
      title: 'Start Learning Instantly',
      highlight: 'AI-Powered Education Awaits',
      description:
        "Whether you build your own custom companion or pick one from our featured library, you're just one click away from live, voice-powered learning sessions.",
      action: 'Get Started Now',
      previewType: 'launch',
    },
  ];

  if (!showCarousel) return null;

  const currentStepData = carouselSteps[currentStep];
  const StepIcon = currentStepData.icon;

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 36 : -36,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 380, damping: 30 },
        opacity: { duration: 0.22 },
        scale: { duration: 0.22 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -36 : 36,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring' as const, stiffness: 380, damping: 30 },
        opacity: { duration: 0.18 },
        scale: { duration: 0.18 },
      },
    }),
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md p-3 sm:p-4 select-none">
      {/* Ambient background glows for rich depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] h-[340px] sm:h-[520px] bg-gradient-to-tr from-primary/20 via-cta-gold/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Main Modal Card */}
      <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl rounded-3xl sm:rounded-[32px] border border-white/80 dark:border-white/10 shadow-[0_25px_70px_-15px_rgba(254,89,51,0.22),0_10px_30px_-10px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.04)] max-w-xl w-full mx-auto p-5 sm:p-7 relative max-h-[92vh] overflow-y-auto no-scrollbar flex flex-col justify-between">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          {/* Brand Info */}
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <Image
                src="/images/logo.png"
                alt="Cogniva Logo"
                width={36}
                height={36}
                className="rounded-xl shadow-xs w-9 h-9 object-contain"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-neutral-900" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-neutral-900 dark:text-white font-bricolage tracking-tight leading-none">
                  Cogniva
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 leading-none">
                  Tour
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500 font-medium mt-0.5">
                AI Learning Revolution
              </p>
            </div>
          </div>

          {/* Controls: Step indicator + Sound toggle + Close */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Step Counter Pill */}
            <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-full border border-neutral-200/60 dark:border-neutral-700/60 shadow-2xs">
              {currentStep + 1} / {carouselSteps.length}
            </span>

            {/* Sound Feedback Toggle */}
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.88 }}
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                if (!soundEnabled) playHapticFeedback(true);
              }}
              className={`w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                soundEnabled
                  ? 'bg-primary/10 text-primary border border-primary/25 hover:bg-primary/20'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-transparent'
              }`}
              title={soundEnabled ? 'Click sound enabled (tap to mute)' : 'Click sound muted (tap to enable)'}
              aria-label={soundEnabled ? 'Mute click audio' : 'Unmute click audio'}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </motion.button>

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.88 }}
              onClick={() => {
                playHapticFeedback(soundEnabled);
                handleClose();
              }}
              className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 active:bg-neutral-300 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer group border border-neutral-200/60 dark:border-neutral-700/60 shadow-2xs"
              aria-label="Close welcome modal"
            >
              <X className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90" />
            </motion.button>
          </div>
        </div>

        {/* Interactive Stepper Navigation (Clickable Tabs) */}
        <div className="flex items-center justify-center gap-2 py-3.5">
          {carouselSteps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <motion.button
                key={step.id}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.88 }}
                onClick={() => {
                  playHapticFeedback(soundEnabled);
                  handleStepChange(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'w-9 bg-gradient-to-r from-primary to-cta-gold shadow-xs shadow-primary/40 ring-2 ring-primary/20'
                    : isCompleted
                    ? 'w-4 bg-primary/60 hover:bg-primary/80'
                    : 'w-3 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600'
                }`}
                title={`Go to slide ${index + 1}: ${step.title}`}
                aria-label={`Slide ${index + 1}`}
              />
            );
          })}
        </div>

        {/* Animated Slide Content */}
        <div className="relative overflow-hidden min-h-[310px] sm:min-h-[330px] flex flex-col justify-center my-1">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="text-center flex flex-col items-center justify-center space-y-3 sm:space-y-4"
            >
              {/* Hero Icon with Layered Glow Disc */}
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/30 to-cta-gold/30 blur-lg scale-110" />
                <motion.div
                  initial={{ scale: 0.85, rotate: -6 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                  className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary via-[#ff6842] to-cta-gold shadow-lg shadow-primary/35 flex items-center justify-center text-white ring-4 ring-white dark:ring-neutral-900"
                >
                  <StepIcon className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-sm" />
                </motion.div>
              </div>

              {/* Kicker / Highlight Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 via-cta-gold/15 to-primary/10 border border-primary/20 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
                <span className="text-xs font-semibold text-primary tracking-tight">
                  {currentStepData.highlight}
                </span>
              </div>

              {/* Step Title */}
              <h2 className="text-xl sm:text-2xl md:text-[26px] font-extrabold text-neutral-900 dark:text-white font-bricolage tracking-tight leading-snug px-2">
                {currentStepData.title}
              </h2>

              {/* Step Description */}
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-md mx-auto px-1">
                {currentStepData.description}
              </p>

              {/* Dynamic Feature Previews for Rich Look */}
              {currentStepData.features && (
                <div className="grid grid-cols-3 gap-2 w-full pt-1 max-w-md">
                  {currentStepData.features.map((feat, i) => {
                    const FeatIcon = feat.icon;
                    return (
                      <div
                        key={i}
                        className="bg-neutral-50 dark:bg-neutral-800/60 rounded-xl p-2.5 border border-neutral-100 dark:border-neutral-700/60 flex flex-col items-center text-center shadow-2xs transition-transform hover:-translate-y-0.5"
                      >
                        <div className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-1">
                          <FeatIcon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[11px] font-bold text-neutral-800 dark:text-neutral-100 leading-tight">
                          {feat.title}
                        </span>
                        <span className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-1 leading-tight">
                          {feat.desc}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Step 2 Preview: Custom Companion Builder */}
              {currentStepData.previewType === 'builder' && (
                <div className="w-full max-w-md bg-gradient-to-b from-neutral-50 to-orange-50/40 dark:from-neutral-800/80 dark:to-neutral-800/40 border border-primary/20 rounded-2xl p-3 shadow-2xs text-left">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-cta-gold flex items-center justify-center text-white text-xs font-bold shadow-xs">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-neutral-900 dark:text-white block leading-tight">
                          Custom Tutor Studio
                        </span>
                        <span className="text-[10px] text-primary font-semibold">
                          100% Configurable
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
                      New
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                    <div className="bg-white dark:bg-neutral-900/80 px-2 py-1.5 rounded-lg border border-neutral-200/60 dark:border-neutral-700">
                      <span className="text-[10px] text-neutral-400 block font-medium">Subject</span>
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200 truncate block">Physics & Math</span>
                    </div>
                    <div className="bg-white dark:bg-neutral-900/80 px-2 py-1.5 rounded-lg border border-neutral-200/60 dark:border-neutral-700">
                      <span className="text-[10px] text-neutral-400 block font-medium">Voice</span>
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200 truncate block">Alloy • Energetic</span>
                    </div>
                    <div className="bg-white dark:bg-neutral-900/80 px-2 py-1.5 rounded-lg border border-neutral-200/60 dark:border-neutral-700">
                      <span className="text-[10px] text-neutral-400 block font-medium">Style</span>
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200 truncate block">Socratic Tutor</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 Preview: Pre-made Companions */}
              {currentStepData.previewType === 'companions' && (
                <div className="grid grid-cols-3 gap-2 w-full max-w-md pt-1">
                  <div className="bg-blue-50/90 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-2.5 text-center flex flex-col items-center shadow-2xs hover:-translate-y-0.5 transition-transform">
                    <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-1">
                      <Calculator className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] font-bold text-blue-900 dark:text-blue-100 leading-tight">Calculus</span>
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium mt-0.5">Instant tutor</span>
                  </div>
                  <div className="bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60 rounded-xl p-2.5 text-center flex flex-col items-center shadow-2xs hover:-translate-y-0.5 transition-transform">
                    <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-1">
                      <FlaskConical className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-100 leading-tight">Chemistry</span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">Pre-trained</span>
                  </div>
                  <div className="bg-purple-50/90 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-900/60 rounded-xl p-2.5 text-center flex flex-col items-center shadow-2xs hover:-translate-y-0.5 transition-transform">
                    <div className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 flex items-center justify-center mb-1">
                      <Languages className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] font-bold text-purple-900 dark:text-purple-100 leading-tight">Languages</span>
                    <span className="text-[10px] text-purple-600 dark:text-purple-400 font-medium mt-0.5">Conversational</span>
                  </div>
                </div>
              )}

              {/* Step 4 Preview: Ready for Live Voice */}
              {currentStepData.previewType === 'launch' && (
                <div className="w-full max-w-md bg-neutral-900 text-white rounded-2xl p-3.5 shadow-md flex items-center justify-between border border-neutral-700">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/20 text-primary border border-primary/40 flex items-center justify-center">
                      <Mic className="w-4 h-4 animate-pulse" />
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-bold block leading-tight">Voice Session Ready</span>
                      <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Microphone connected & live
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1 h-5 bg-cta-gold rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1 h-4 bg-primary rounded-full animate-bounce" />
                    <span className="w-1 h-6 bg-cta-gold rounded-full animate-bounce [animation-delay:-0.2s]" />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Controls with Tactile "Feels Like Clicked" Physics */}
        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-3">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3">
            {/* Back Button (Shown when not on step 0) */}
            {currentStep > 0 && (
              <motion.button
                whileHover={{ scale: 1.02, x: -1 }}
                whileTap={{ scale: 0.94, y: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                onClick={() => {
                  playHapticFeedback(soundEnabled);
                  handlePrev();
                }}
                className="px-4 py-2.5 sm:py-3 rounded-full font-semibold text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-200/80 dark:border-neutral-700 active:bg-neutral-300 active:shadow-inner transition-all flex items-center justify-center gap-1 text-xs sm:text-sm cursor-pointer shadow-2xs select-none"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </motion.button>
            )}

            {/* If step has a direct CTA Link (Builder or Explore) */}
            {currentStepData.ctaLink ? (
              <>
                <motion.div
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.95, y: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className="flex-1 max-w-[240px]"
                >
                  <Link
                    href={currentStepData.ctaLink}
                    onClick={() => {
                      playHapticFeedback(soundEnabled);
                      handleClose();
                    }}
                    className="relative group overflow-hidden w-full bg-gradient-to-r from-primary via-[#ff6842] to-cta-gold text-white font-semibold py-2.5 sm:py-3 px-5 rounded-full shadow-[0_10px_22px_-5px_rgba(254,89,51,0.38),0_3px_8px_-2px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_28px_-4px_rgba(254,89,51,0.48)] active:shadow-[0_2px_5px_rgba(254,89,51,0.3)] active:brightness-95 border-t border-white/30 flex items-center justify-center gap-2 cursor-pointer transition-all text-xs sm:text-sm select-none"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                    <Plus className="w-4 h-4" />
                    <span>{currentStepData.action}</span>
                  </Link>
                </motion.div>

                {/* Secondary Skip button to proceed in carousel */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.94, y: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  onClick={() => {
                    playHapticFeedback(soundEnabled);
                    handleNext();
                  }}
                  className="px-4 py-2.5 sm:py-3 rounded-full font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-200/80 dark:border-neutral-700 active:bg-neutral-300 transition-all flex items-center justify-center gap-1 text-xs sm:text-sm cursor-pointer shadow-2xs select-none"
                >
                  <span>Skip</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </>
            ) : (
              /* Primary Continue / Complete button */
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.95, y: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                onClick={() => {
                  playHapticFeedback(soundEnabled);
                  handleNext();
                }}
                className="relative group overflow-hidden bg-gradient-to-r from-primary via-[#ff6842] to-cta-gold text-white font-semibold py-2.5 sm:py-3 px-8 rounded-full shadow-[0_10px_22px_-5px_rgba(254,89,51,0.38),0_3px_8px_-2px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_28px_-4px_rgba(254,89,51,0.48)] active:shadow-[0_2px_5px_rgba(254,89,51,0.3)] active:brightness-95 border-t border-white/30 flex items-center justify-center gap-2 cursor-pointer transition-all text-xs sm:text-sm select-none"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                <span>{currentStepData.action}</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </motion.button>
            )}
          </div>

          {/* Bottom Utility Actions: Skip for now & Don't show again */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-0.5 text-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                playHapticFeedback(soundEnabled);
                handleClose();
              }}
              className="text-[11px] sm:text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 px-2.5 py-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer"
            >
              Skip tour for now
            </motion.button>

            <span className="inline-flex items-center text-neutral-300 dark:text-neutral-700 text-xs select-none">
              •
            </span>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                playHapticFeedback(soundEnabled);
                handleDontShowAgain();
              }}
              className="text-[11px] sm:text-xs font-medium text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 px-2.5 py-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" />
              <span>Don't show again this session</span>
            </motion.button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardWelcomeCarousel;