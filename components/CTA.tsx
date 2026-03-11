'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

const Cta = () => {
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
      <h2 className="text-3xl font-bold">
        Build and Personalize Learning Companion
      </h2>
      <p>Pick a name, subject, voice, & personality — and start learning through voice conversations that feel natural and fun.</p>
      <Image src="images/cta.svg" alt="cta" width={362} height={232} />
      <button
        className="btn-primary relative overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0.1"
        style={{ animation: "ctaPulse 8s ease-in-out infinite" }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
          style={{ animation: "shimmer 2.5s linear infinite" }}
        />
        <Image src="/icons/plus.svg" alt="plus" width={12} height={12} />
        <Link href="/companions/new">
          <p>Build a New Companion</p>
        </Link>
      </button>
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
