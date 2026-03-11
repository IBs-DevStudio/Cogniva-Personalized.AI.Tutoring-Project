'use client';

import { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, Sparkles, MessageCircle, Brain, X, Play } from 'lucide-react';
import Image from 'next/image';

interface AILearningFlashCardProps {
  show: boolean;
  onClose: () => void;
}

const AILearningFlashCard = ({ show, onClose }: AILearningFlashCardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isListening, setIsListening] = useState(false);

  const flashCardSteps = [
    {
      icon: Sparkles,
      title: "Welcome to 2-Way AI Learning!",
      description: "Experience interactive learning like never before. Your AI companion doesn't just teach—it converses with you naturally.",
      highlight: "Interactive Voice Learning",
      example: ""
    },
    {
      icon: Mic,
      title: "Speak & Interact Naturally",
      description: "Use your voice to respond to questions, ask for clarification, or request explanations. It's like talking to a real tutor!",
      highlight: "Voice-Powered Conversations",
      example: "You: 'Can you explain that again?' \nAI: 'Of course! Let me break it down differently...'"
    },
    {
      icon: Brain,
      title: "AI Asks, You Respond",
      description: "Your companion will quiz you, ask follow-up questions, and adapt to your responses in real-time.",
      highlight: "Personalized Q&A Sessions",
      example: "AI: 'What do you think happens next in this algorithm?' \nYou: 'I think it sorts the array...' \nAI: 'Excellent! Now let's explore why...'"
    },
    {
      icon: MessageCircle,
      title: "Real Conversation Flow",
      description: "Enjoy natural back-and-forth conversations that feel like learning with a knowledgeable friend rather than a robotic teacher.",
      highlight: "Human-like Interactions",
      example: "AI: 'Great question! That's exactly what I was hoping you'd ask. Here's how we solve this problem step by step...'"
    }
  ];

  const handleNext = () => {
    if (currentStep < flashCardSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const simulateListening = () => {
    setIsListening(true);
    setTimeout(() => setIsListening(false), 2000);
  };

  if (!show) return null;

  const currentStepData = flashCardSteps[currentStep];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4">
      <div className="bg-white/98 backdrop-blur-xl rounded-3xl sm:rounded-4xl shadow-2xl max-w-2xl sm:max-w-3xl w-full mx-2 sm:mx-4 p-5 sm:p-8 relative animate-in fade-in-50 zoom-in-95 duration-500 border-2 border-primary/20 max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200 z-10"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Header with Logo */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image
              src="/images/logo.png"
              alt="Cogniva Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <div>
              <h1 className="text-xl font-bold text-primary">Cogniva AI Learning</h1>
              <p className="text-xs text-muted-foreground">Interactive Voice Experience</p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
          {flashCardSteps.map((_, index) => (
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
        <div className="space-y-6">
          {/* Icon & Title */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-cta-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <currentStepData.icon className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
              {currentStepData.title}
            </h2>
            <div className="bg-gradient-to-r from-cta-gold/10 to-primary/10 rounded-3xl p-3 border border-cta-gold/20 inline-block">
              <p className="text-sm font-semibold text-primary">
                {currentStepData.highlight}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-center">
            {currentStepData.description}
          </p>

          {/* Interactive Example */}
          {currentStepData.example && (
            <div className="bg-gray-50 rounded-3xl p-4 sm:p-6 border-2 border-gray-200">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                Example Conversation:
              </h4>
              <div className="bg-white rounded-2xl p-4 font-mono text-sm text-gray-700 whitespace-pre-line">
                {currentStepData.example}
              </div>
            </div>
          )}

          {/* Voice Demo (for step 2) */}
          {currentStep === 1 && (
            <div className="bg-gradient-to-r from-primary/5 to-cta-gold/5 rounded-3xl p-4 sm:p-6 text-center border border-primary/20">
              <p className="text-sm text-muted-foreground mb-3">Try saying something like:</p>
              <button
                onClick={simulateListening}
                className={`inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                {isListening ? 'Listening...' : 'Yes, please start the lesson!'}
              </button>
              <p className="text-xs text-muted-foreground mt-2">
                {isListening ? '🎤 Your AI companion is listening...' : 'Click to simulate voice input'}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-primary to-cta-gold text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              {currentStep === flashCardSteps.length - 1 ? 'Start Learning!' : 'Next'}
              {currentStep === flashCardSteps.length - 1 ? <Play className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
            </button>
          </div>

          {/* Skip Option */}
          {currentStep === 0 && (
            <div className="text-center">
              <button
                onClick={onClose}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Skip tutorial
              </button>
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="mt-4 flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground">
          <span>Scroll below to see more</span>
          <span className="animate-bounce text-lg">↓</span>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-primary/20 to-cta-gold/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-cta-gold/30 to-primary/30 rounded-full blur-lg"></div>
        
        {/* Floating Voice Indicators */}
        <div className="absolute top-20 right-20 animate-bounce" style={{animationDelay: '0.5s'}}>
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
            <Volume2 className="w-4 h-4 text-primary" />
          </div>
        </div>
        <div className="absolute bottom-20 left-20 animate-bounce" style={{animationDelay: '1s'}}>
          <div className="w-6 h-6 bg-cta-gold/20 rounded-full flex items-center justify-center">
            <Mic className="w-3 h-3 text-cta-gold" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AILearningFlashCard;