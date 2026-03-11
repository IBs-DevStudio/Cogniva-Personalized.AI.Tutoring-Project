"use client";

import { Bot, Sparkles } from "lucide-react";

interface CompanionLaunchOverlayProps {
  label?: string;
  subLabel?: string;
}

const CompanionLaunchOverlay = ({
  label = "Launching your tutor...",
  subLabel = "Getting everything ready for you.",
}: CompanionLaunchOverlayProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95">
      <div className="relative flex flex-col items-center gap-5">
        {/* Soft glowing background */}
        <div className="pointer-events-none absolute -inset-20 rounded-full bg-primary/10 blur-3xl" />

        {/* Orbital rings with mascot in the center */}
        <div className="relative flex h-32 w-32 items-center justify-center">
          <div className="absolute inset-2 rounded-full border border-primary/15" />
          <div className="absolute inset-6 rounded-full border border-cta-gold/25" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-b-cta-gold animate-spin" />

          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/5 shadow-2xl">
            <Bot className="h-9 w-9 text-primary animate-pulse" />
          </div>
        </div>

        <p className="text-sm text-muted-foreground">{label}</p>
        {subLabel && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span>{subLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanionLaunchOverlay;
