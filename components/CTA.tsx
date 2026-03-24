'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Lock, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typingSpeed = 45;
  const deletingSpeed = 30;
  const pauseAfterType = 900;
  const pauseAfterDelete = 300;

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

  const handleBuildClick = () => {
    if (!canCreate || isLoading) return;
    setIsLoading(true);
    router.push("/companions/new");
  };

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
        <p className="text-sm mt-2">
          Pick a name, subject, voice & personality — start learning through short voice conversations.
        </p>
      </div>

      <div className="w-full flex justify-center mt-4">
        <Image src="images/cta.svg" alt="cta" width={240} height={154} />
      </div>

      {canCreate ? (
        <button
          onClick={handleBuildClick}
          disabled={isLoading}
          className={[
            "btn-primary relative overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2 w-full justify-center",
            isLoading ? "opacity-80 cursor-not-allowed" : "",
          ].filter(Boolean).join(" ")}
          style={{ animation: isLoading ? "none" : "ctaPulse 8s ease-in-out infinite" }}
        >
          {/* Shimmer */}
          {!isLoading && (
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
              style={{ animation: "shimmer 2.5s linear infinite" }}
            />
          )}

          {isLoading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" />
          ) : (
            <Image src="/icons/plus.svg" alt="plus" width={12} height={12} />
          )}

          {isLoading ? "Building..." : "Build a New Companion"}
        </button>
      ) : (
        <Link
          href="/subscription"
          className="btn-primary relative overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2 no-underline opacity-90 w-full justify-center"
          style={{ animation: "ctaPulse 8s ease-in-out infinite" }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{ animation: "shimmer 2.5s linear infinite" }}
          />
          <Lock className="h-3.5 w-3.5 shrink-0" />
          Upgrade for More Companions
        </Link>
      )}

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes ctaPulse {
          0%, 100% { transform: translateZ(0) scale(1); }
          50% { transform: translateZ(0) scale(1.02); }
        }
      `}</style>
    </section>
  );
};

export default Cta;