"use client";

import { useEffect, useState } from "react";
import LandingNavbar from "@/components/LandingNavbar";
import MobileWarningModal from "@/components/MobileWarningModal";
import Preloader from "@/components/Preloader";
import {
  HeroSection,
  InstitutionsSection,
  AboutSection,
  FacultySection,
  BentoSection,
  VoiceExperienceSection,
  JourneySection,
  OutcomesSection,
  TestimonialsSection,
  FaqSection,
  CtaSection,
  LandingFooter,
  DemoModal,
} from "@/components/landing";

const LandingPage = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

  useEffect(() => {
    const handlePreloaderComplete = () => {
      setIsPreloaderComplete(true);
    };

    window.addEventListener("cogniva-preloader-complete", handlePreloaderComplete);
    return () => {
      window.removeEventListener("cogniva-preloader-complete", handlePreloaderComplete);
    };
  }, []);

  return (
    <>
      <Preloader />
      <div className="min-h-screen bg-[#FAFAFA] text-[#111827] overflow-x-hidden relative font-sans selection:bg-[#FF5A36] selection:text-white">
        {/* Mobile Warning Modal */}
        <MobileWarningModal />

        {/* Sticky Premium Navigation */}
        <LandingNavbar />

        {/* Ambient background glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-[#FF5A36]/5 rounded-full blur-[100px]" />
          <div className="absolute top-[40%] left-[-10%] w-[600px] h-[600px] bg-[#FDBA3B]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[20%] right-[-5%] w-[450px] h-[450px] bg-purple-500/5 rounded-full blur-[90px]" />
        </div>

        {/* 1. Hero Section with Interactive Dashboard */}
        <HeroSection
          onOpenDemo={() => setIsDemoModalOpen(true)}
          isPreloaderComplete={isPreloaderComplete}
        />

        {/* 2. Educational Institutions Strip */}
        <InstitutionsSection />

        {/* 3. About Cogniva */}
        <AboutSection />

        {/* 4. Meet Your AI Faculty Showcase & Audio Console */}
        <FacultySection />

        {/* 5. Bento Grid Capabilities */}
        <BentoSection />

        {/* 6. Live Voice AI Experience & Sandbox */}
        <VoiceExperienceSection />

        {/* 7. Learning Journey Pipeline */}
        <JourneySection />

        {/* 8. Empowering Student Outcomes */}
        <OutcomesSection />

        {/* 9. Student Testimonials */}
        <TestimonialsSection />

        {/* 10. Frequently Asked Questions */}
        <FaqSection />

        {/* 11. Final Call To Action */}
        <CtaSection />

        {/* 12. Premium Footer & Newsletter */}
        <LandingFooter />

        {/* Demo Video Modal */}
        <DemoModal
          isOpen={isDemoModalOpen}
          onClose={() => setIsDemoModalOpen(false)}
        />
      </div>
    </>
  );
};

export default LandingPage;
