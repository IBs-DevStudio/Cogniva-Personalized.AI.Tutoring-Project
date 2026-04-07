'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { ChevronRight, X, Sparkles, Users, Zap, ArrowRight, Plus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getUserCompanions } from '@/lib/actions/companions.action';

const DashboardWelcomeCarousel = () => {
  const { user } = useUser();
  const [showCarousel, setShowCarousel] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasBuiltCompanions, setHasBuiltCompanions] = useState(false);

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
    // Use sessionStorage for temporary dismissal (only for current session)
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-4xl shadow-2xl max-w-2xl w-full mx-4 p-8 relative animate-in fade-in-50 zoom-in-95 duration-500">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Cogniva Logo & Branding */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image
              src="/images/logo.png"
              alt="Cogniva Logo"
              width={48}
              height={48}
              className="rounded-lg"
            />
            <div>
              <h1 className="text-2xl font-bold text-primary">Cogniva</h1>
              <p className="text-sm text-muted-foreground">AI Learning Revolution</p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {carouselSteps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? 'w-8 bg-gradient-to-r from-primary to-cta-gold'
                  : index < currentStep
                  ? 'w-6 bg-primary/50'
                  : 'w-4 bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="text-center space-y-6">
          {/* Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-cta-gold/20 rounded-full flex items-center justify-center mx-auto">
            <currentStepData.icon className="w-10 h-10 text-primary" />
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-foreground">
            {currentStepData.title}
          </h2>

          {/* Highlight */}
          <div className="bg-gradient-to-r from-cta-gold/10 to-primary/10 rounded-3xl p-4 border border-cta-gold/20">
            <p className="text-lg font-semibold text-primary">
              {currentStepData.highlight}
            </p>
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground leading-relaxed">
            {currentStepData.description}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 pt-4">
            {currentStepData.ctaLink ? (
              <>
                <Link
                  href={currentStepData.ctaLink}
                  onClick={handleClose}
                  className="bg-gradient-to-r from-cta-gold to-primary text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  {currentStepData.action}
                </Link>
                <button
                  onClick={handleNext}
                  className="bg-gray-100 text-gray-700 px-6 py-4 rounded-full font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
                >
                  Skip
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-primary to-cta-gold text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-200 flex items-center gap-2"
              >
                {currentStepData.action}
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Skip All */}
          {currentStep === 0 && (
            <div className="text-center space-y-2">
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
        <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-primary/20 to-cta-gold/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-cta-gold/30 to-primary/30 rounded-full blur-lg"></div>
      </div>
    </div>
  );
};

export default DashboardWelcomeCarousel;