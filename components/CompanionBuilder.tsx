"use client";

import { useEffect, useState } from "react";
import { Brain, Sparkles, Clock } from "lucide-react";
import CompanionForm from "@/components/CompanionForm";

const CompanionBuilder = () => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Keep the user on a fun loading experience for ~3-4 seconds
    const timer = setTimeout(() => setShowForm(true), 3200);
    return () => clearTimeout(timer);
  }, []);

  if (!showForm) {
    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-6">
          {/* Mascot bubble */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/5 shadow-lg">
            <Brain className="h-8 w-8 text-primary animate-pulse" />
          </div>

          {/* Clean circular loader */}
          <div className="relative h-14 w-14">
            <div className="absolute inset-0 rounded-full border-2 border-primary/10" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cta-gold animate-spin" />
          </div>

          <p className="text-sm text-muted-foreground">
            Preparing your companion...
          </p>
        </div>
      </div>
    );
  }

  return (
    <article className="flex w-full flex-col gap-4">
      <h1>Companion Builder</h1>
      <CompanionForm />
    </article>
  );
};

export default CompanionBuilder;
