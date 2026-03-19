'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Lock } from "lucide-react";

const CTA_PHRASES = [
  "Start learning your way.",
  "Start learning your pace.",
  "Start learning your style.",
  "AI Voice Powered..",
  "Interview Preps..",
   "CS Fundamentals..",
   "Coding..",
   "Science..",
   "Give it a try"
];

interface CtaProps {
  canCreate?: boolean;
}

const Cta = ({ canCreate = true }: CtaProps) => {
  // Typewriter effect for the yellow badge text (multiple phrases)
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typingSpeed = 45; // ms between letters when typing
  const deletingSpeed = 30; // ms between letters when deleting
  const pauseAfterType = 900; // pause when a phrase finishes typing
  const pauseAfterDelete = 300; // pause after deletion before next phrase

  useEffect(() => {
    const fullText = CTA_PHRASES[phraseIndex % CTA_PHRASES.length];

    let timer: number;
    if (!isDeleting) {
      if (displayText.length < fullText.length) {
        timer = window.setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        timer = window.setTimeout(() => setIsDeleting(true), pauseAfterType);
      }
    } else {
      if (displayText.length > 0) {
        timer = window.setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        timer = window.setTimeout(() => {
          setIsDeleting(false);
          setPhraseIndex((i) => (i + 1) % CTA_PHRASES.length);
        }, pauseAfterDelete);
      }
    }

    return () => window.clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <section className="cta-section">
      <div className="cta-badge">
        <span>{displayText}</span>
        <span className="ml-0.5 inline-block w-[1ch] animate-pulse">|</span>
      </div>
      <div className="max-w-[280px]">
        <h2 className="text-2xl font-semibold leading-tight">
          Build & Personalize your Companion
        </h2>
        <p className="text-sm mt-2">Pick a name, subject, voice & personality — start learning through short voice conversations.</p>
      </div>
      <div className="w-full flex justify-center mt-4">
        <Image src="images/cta.svg" alt="cta" width={240} height={154} />
      </div>
      <Link
        href={canCreate ? "/companions/new" : "/subscription"}
        className={[
          "btn-primary relative overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0.1 inline-flex items-center gap-2 no-underline",
          !canCreate && "opacity-90",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ animation: "ctaPulse 8s ease-in-out infinite" }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
          style={{ animation: "shimmer 2.5s linear infinite" }}
        />
        {canCreate ? (
          <Image src="/icons/plus.svg" alt="plus" width={12} height={12} />
        ) : (
          <Lock className="h-3.5 w-3.5 shrink-0" />
        )}
        {canCreate ? "Build a New Companion" : "Upgrade for More Companions"}
      </Link>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes ctaPulse {
          0%, 100% { transform: translateZ(0) scale(1); }
          50% { transform: translateZ(0) scale(1.02); }
        }
      `}</style>
    </section>
  );
}

export default Cta;
