'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { ChevronRight, X, Sparkles, Users, Zap, ArrowRight, Plus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const DashboardWelcomeCarousel = () => {
  const { user } = useUser();
  const [showCarousel, setShowCarousel] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('dashboard-welcome-carousel-dismissed');
    if (isDismissed !== 'true') {
      setTimeout(() => setShowCarousel(true), 500);
    }
  }, []);

  const handleClose = () => {
    setShowCarousel(false);
  };
  
  const handleDontShowAgain = () => {
    sessionStorage.setItem('dashboard-welcome-carousel-dismissed', 'true');
    setShowCarousel(false);
  };

  const handleNext = () => {
    if (currentStep < carouselSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const carouselSteps = [
    {
      icon: Sparkles,
      title: "Welcome to Cogniva!",
      description: "We're excited to have you here! To get the most out of your learning experience, we'd love to show you our most powerful feature.",
      highlight: "Your Personalized AI Learning Journey",
      action: "Continue"
    },
    {
      icon: Plus,
      title: "Consider Building Your Own AI Companion",
      description: "While our featured companions are great, creating your own personalized AI tutor gives you the best learning experience. You can customize the name, subject, voice, and personality to match your learning style perfectly.",
      highlight: "Companion Builder - Recommended for You!",
      action: "Try Building One",
      ctaLink: "/companions/new"
    },
    {
      icon: Users,
      title: "Or Use Pre-made Companions",
      description: "Not ready to build your own? No problem! Explore our featured companions and discover pre-built AI tutors ready to help you excel.",
      highlight: "Featured & Explore More Sections",
      action: "Explore Now",
      ctaLink: "/companions"
    },
    {
      icon: Zap,
      title: "Start Learning Instantly",
      description: "Whether you build your own companion or use our pre-made ones, you're just one click away from personalized, voice-powered learning sessions.",
      highlight: "AI-Powered Education Awaits",
      action: "Get Started"
    }
  ];

  if (!showCarousel) return null;

  const currentStepData = carouselSteps[currentStep];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl md:rounded-[2rem] shadow-2xl max-w-2xl w-full mx-2 sm:mx-4 p-5 sm:p-6 md:p-8 relative animate-in fade-in-50 zoom-in-95 duration-500 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-6 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
        </button>

        {/* Cogniva Logo & Branding */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Image
              src="/images/logo.png"
              alt="Cogniva Logo"
              width={40}
              height={40}
              className="rounded-lg w-10 h-10 sm:w-12 sm:h-12"
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-primary">Cogniva</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">AI Learning Revolution</p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
          {carouselSteps.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? 'w-6 sm:w-8 bg-gradient-to-r from-primary to-cta-gold'
                  : index < currentStep
                  ? 'w-4 sm:w-6 bg-primary/50'
                  : 'w-3 sm:w-4 bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="text-center space-y-4 sm:space-y-6">
          {/* Icon */}
          <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-primary/20 to-cta-gold/20 rounded-full flex items-center justify-center mx-auto">
            <currentStepData.icon className="w-7 h-7 sm:w-10 sm:h-10 text-primary" />
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground px-2">
            {currentStepData.title}
          </h2>

          {/* Highlight */}
          <div className="bg-gradient-to-r from-cta-gold/10 to-primary/10 rounded-2xl sm:rounded-3xl p-3 sm:p-4 border border-cta-gold/20">
            <p className="text-base sm:text-lg font-semibold text-primary">
              {currentStepData.highlight}
            </p>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed px-1 sm:px-0">
            {currentStepData.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
            {currentStepData.ctaLink ? (
              <>
                <Link
                  href={currentStepData.ctaLink}
                  onClick={handleClose}
                  className="w-full sm:w-auto bg-gradient-to-r from-cta-gold to-primary text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  {currentStepData.action}
                </Link>
                <button
                  onClick={handleNext}
                  className="w-full sm:w-auto bg-gray-100 text-gray-700 px-4 py-3 sm:px-6 sm:py-4 rounded-full font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  Skip
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                onClick={handleNext}
                className="w-full sm:w-auto bg-gradient-to-r from-primary to-cta-gold text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {currentStepData.action}
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
          </div>

          {/* Skip All */}
          {currentStep === 0 && (
            <div className="text-center space-y-2 pt-2">
              <button
                onClick={handleClose}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 block mx-auto"
              >
                Skip for now
              </button>
              <button
                onClick={handleDontShowAgain}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors duration-200 underline"
              >
                Don't show again (this session)
              </button>
            </div>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/20 to-cta-gold/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -right-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cta-gold/30 to-primary/30 rounded-full blur-lg"></div>
      </div>
    </div>
  );
};

export default DashboardWelcomeCarousel;