"use client";

import Link from "next/link";
import Image from "next/image";
import { Code, Sparkles, Linkedin, Github, FileText } from "lucide-react";
import {
  ArrowRight,
  BookOpen,
  Users,
  Zap,
  Brain,
  MessageCircle,
  TrendingUp,
  Mic,
  Target,
  Award,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";
import LandingNavbar from "@/components/LandingNavbar";
import LoadingButton from "@/components/LoadingButton";
import MobileWarningModal from "@/components/MobileWarningModal";
import TypewriterText from "@/components/TypewriterText";

const LandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    { icon: Mic, text: "Voice-Powered Tutoring" },
    { icon: Target, text: "Interview Preparation" },
    { icon: Award, text: "Exam Excellence" },
    { icon: Clock, text: "Learn Quickly" },
  ];

  // Initialize page loaded state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Cycle through features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      {/* Mobile Warning Modal */}
      <MobileWarningModal />

      {/* Landing Navbar */}
      <LandingNavbar />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-cta-gold/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 pt-20 mb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left space-y-8">
                <div
                  className={`space-y-6 transform transition-all duration-1000 delay-300 ${
                    isLoaded
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                >
                  {/* Added Tagline */}
                  <div className="inline-block">
                    <div className="bg-gradient-to-r from-primary/10 via-cta-gold/10 to-primary/10 border-2 border-primary/30 rounded-full px-6 py-3 mb-4">
                      <p className="text-lg font-bold bg-gradient-to-r from-primary via-cta-gold to-primary bg-clip-text text-transparent">
                        <TypewriterText
                          initialText="Your Personal AI Faculty, "
                          rotatingTexts={[
                            "Anytime, Anywhere",
                            "Just Say a Word..!",
                            " Coding",
                            " Maths",
                            " Interview",
                            " Operating Systems",
                          ]}
                          speed={80}
                          deleteSpeed={50}
                          pauseTime={500}
                        />
                      </p>
                    </div>
                  </div>

                  <h1 className="text-6xl font-extrabold text-foreground mb-6 leading-tight">
                    The Future of{" "}
                    <span className="bg-gradient-to-r from-primary via-cta-gold to-primary bg-clip-text text-transparent animate-pulse">
                      Personalized Learning
                    </span>{" "}
                    is Here
                  </h1>

                  {/* Rotating Feature Display */}
                  <div className="relative h-20 flex items-center justify-center lg:justify-start">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className={`absolute left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0
                          flex items-center gap-3 px-6 py-3 rounded-4xl
                          border-2 border-primary/20 bg-white/80 backdrop-blur-sm
                          transition-all duration-300 ease-in-out
                          ${
                            currentFeature === index
                              ? "opacity-100 scale-100 translate-y-0 z-10"
                              : "opacity-0 scale-95 translate-y-3 z-0"
                          }`}
                      >
                        <feature.icon className="w-6 h-6 text-primary" />
                        <span className="text-lg font-semibold text-foreground">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Unlock your potential with AI-powered companions that adapt
                    to your unique learning style. Experience education like
                    never before.
                  </p>
                </div>
              </div>

              {/* Right Side Image */}
              <div
                className={`transform transition-all duration-1000 delay-700 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0"
                }`}
              >
                <div className="bg-white rounded-4xl shadow-2xl p-6 border border-primary/10">
                  <div
                    className="relative overflow-hidden rounded-3xl"
                    style={{ aspectRatio: "16 / 9" }}
                  >
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster="/dashboard-preview.png"
                      preload="auto"
                    >
                      <source
                        src="https://res.cloudinary.com/dchmterf0/video/upload/q_auto,f_auto/Cogniva_Demo_main_tikqmf.mp4"
                        type="video/mp4"
                      />
                    </video>
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Your AI Learning Dashboard
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Personalized companions, progress tracking, and seamless
                      learning
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Feature Cards */}
            <div className="relative mt-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {[
                  {
                    icon: Brain,
                    title: "AI-Powered",
                    desc: "Smart tutors that adapt",
                  },
                  {
                    icon: Mic,
                    title: "Voice-First",
                    desc: "Natural conversations",
                  },
                  {
                    icon: Zap,
                    title: "Instant Help",
                    desc: "24/7 availability",
                  },
                ].map((card, index) => (
                  <div
                    key={index}
                    className={`
              group cursor-pointer
              transition-opacity duration-700 ease-out
              ${isLoaded ? "opacity-100" : "opacity-0"}
            `}
                    style={{ transitionDelay: `${index * 120}ms` }}
                  >
                    <div
                      className="
                relative rounded-4xl p-6 text-center
                bg-white/70 backdrop-blur-md
                border border-primary/15
                shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                transition-all duration-500 ease-out
                group-hover:bg-white/85
                group-hover:border-primary/30
              "
                    >
                      {/* Inner glow layer */}
                      <div
                        className="
                  pointer-events-none absolute inset-0 rounded-4xl
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-500
                  bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.6),transparent)]
                "
                      />

                      {/* Icon */}
                      <div
                        className="
                  w-16 h-16 mx-auto mb-4
                  flex items-center justify-center
                  rounded-4xl bg-primary/10
                  transition-all duration-500
                  group-hover:bg-primary/15
                "
                      >
                        <card.icon
                          className="
                    w-8 h-8 text-primary
                    transition-all duration-500
                    group-hover:brightness-110
                  "
                        />
                      </div>

                      <h3 className="text-xl font-bold text-foreground mb-2 tracking-tight">
                        {card.title}
                      </h3>

                      <p className="text-muted-foreground/90">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Cogniva & IB's Dev World Section */}
        {/* About Cogniva Section */}
<section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
  <div className="max-w-5xl mx-auto text-center space-y-10">

    {/* Heading */}
    <div className="space-y-4">
      <span className="inline-block text-sm font-semibold text-primary uppercase tracking-widest">
        About Us
      </span>
      <h2 className="text-4xl md:text-5xl font-bold text-foreground">
        What is <span className="text-primary">Cogniva</span>?
      </h2>
    </div>

    {/* Cogniva Description — concise but informative */}
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-lg border border-border text-left space-y-6">
      <p className="text-lg md:text-xl text-foreground leading-relaxed">
        <span className="font-bold text-primary">Cogniva</span> is an AI-native learning platform built for students, job seekers, and lifelong learners. Instead of static videos or textbooks, you get 
        <span className="font-semibold text-foreground"> voice-powered AI tutors</span> that talk, listen, and adapt to you in real time.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="space-y-2">
          <Mic className="w-6 h-6 text-primary" />
          <h4 className="font-bold text-foreground">Voice-First Learning</h4>
          <p className="text-sm text-muted-foreground">
            Speak naturally with your AI tutor. Ask questions, practice answers, and get instant spoken feedback.
          </p>
        </div>
        <div className="space-y-2">
          <Target className="w-6 h-6 text-primary" />
          <h4 className="font-bold text-foreground">Goal-Driven Sessions</h4>
          <p className="text-sm text-muted-foreground">
            Whether it&apos;s cracking an interview, acing an exam, or learning a new skill — Cogniva tailors every session to your goal.
          </p>
        </div>
        <div className="space-y-2">
          <Zap className="w-6 h-6 text-primary" />
          <h4 className="font-bold text-foreground">Always Available</h4>
          <p className="text-sm text-muted-foreground">
            24/7 access to expert-level tutoring. No scheduling, no waiting — just open the app and start learning.
          </p>
        </div>
      </div>
    </div>

    {/* Minimal attribution */}
    <p className="text-sm text-muted-foreground">
      Built with care by{" "}
      <a
        href="https://www.linkedin.com/in/ikrambanadarwebdev"
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-primary hover:underline"
      >
        Ikram Banadar
      </a>{" "}
      at IB&apos;s Dev World.
    </p>

  </div>
</section>

        {/* Why Students Choose Cogniva Section */}
        <section id="features" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-foreground mb-6">
                Why Students Choose Cogniva
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Transform your learning experience with AI tutors designed for
                modern education
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  title: "Interview Ready",
                  description:
                    "Practice with AI interviewers for job interviews, college admissions, and professional certifications",
                  gradient: "from-primary/20 to-primary/5",
                },
                {
                  icon: Award,
                  title: "Exam Excellence",
                  description:
                    "Master any subject with personalized study sessions and instant feedback on your progress",
                  gradient: "from-cta-gold/20 to-cta-gold/5",
                },
                {
                  icon: Clock,
                  title: "Learn Quickly",
                  description:
                    "Accelerate your learning with AI that adapts to your pace and learning style",
                  gradient: "from-cta/20 to-cta/5",
                },
                {
                  icon: MessageCircle,
                  title: "Voice Conversations",
                  description:
                    "Natural voice interactions make learning feel like talking with a knowledgeable friend",
                  gradient: "from-primary/20 to-primary/5",
                },
                {
                  icon: BookOpen,
                  title: "Any Subject",
                  description:
                    "From mathematics to literature, coding to history - we cover everything you need to learn",
                  gradient: "from-cta-gold/20 to-cta-gold/5",
                },
                {
                  icon: TrendingUp,
                  title: "Track Progress",
                  description:
                    "Visual analytics show your improvement over time and identify areas for growth",
                  gradient: "from-cta/20 to-cta/5",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-4xl p-8 border border-border hover:border-primary/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                >
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-4xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-cta via-cta to-primary text-white rounded-4xl px-12 py-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-cta-gold/20 animate-pulse"></div>
              <div className="relative z-10 space-y-8">
                <div className="inline-flex items-center px-6 py-3 bg-cta-gold rounded-4xl text-cta text-lg font-semibold animate-bounce">
                  <Zap className="w-5 h-5 mr-2" />
                  Ready to Transform Your Learning?
                </div>
                <h2 className="text-6xl font-bold max-sm:text-4xl">
                  Start Your Journey
                  <span className="block text-cta-gold">
                    With Cogniva Today
                  </span>
                </h2>
                <p className="text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto">
                  Join to accelerate your learning with AI-powered tutors
                </p>
                <div className="flex items-center justify-center gap-6 max-sm:flex-col">
                  <LoadingButton
                    href="/dashboard"
                    variant="secondary"
                    className="rounded-4xl px-12 py-6 text-2xl font-bold"
                  >
                    Enter Cogniva Now
                  </LoadingButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
            <footer className="border-t border-white/10 bg-slate-900 text-white">
          {/* Top strip — newsletter / tagline */}
          <div className="bg-gradient-to-r from-primary via-cta-gold to-primary py-10 px-4">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  Stay ahead of the curve
                </h3>
                <p className="text-white/80 text-sm">
                  Get tips, updates, and new companion releases straight to your
                  inbox.
                </p>
              </div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex w-full max-w-md gap-2"
              >
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="flex-1 rounded-full px-5 py-3 text-sm bg-white/15 backdrop-blur border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button
                  type="submit"
                  className="rounded-full px-6 py-3 bg-white text-primary font-semibold text-sm hover:bg-white/90 transition-all shrink-0"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Main footer grid */}
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* Col 1 — Brand */}
              <div className="space-y-5 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/logo.png"
                    alt="Cogniva Logo"
                    width={44}
                    height={44}
                    className="rounded-xl"
                  />
                  <div>
                    <p className="text-xl font-bold text-white">Cogniva</p>
                    <p className="text-xs text-slate-400">by IB's Dev World</p>
                  </div>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Your personal AI faculty — available anytime, anywhere.
                  Voice-powered tutors that adapt to how you actually learn.
                </p>
                {/* Social links */}
                <div className="flex items-center gap-3 pt-1">
                  <a
                    href="https://www.linkedin.com/in/ikrambanadarwebdev"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary hover:text-white text-white flex items-center justify-center transition-all"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/IBs-DevStudio"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary hover:text-white text-white flex items-center justify-center transition-all"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </a>
                  <a
                    href="mailto:ikrambanadar04@gmail.com"
                    aria-label="Email"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary hover:text-white text-white flex items-center justify-center transition-all"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Col 2 — Platform */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-widest">
                  Platform
                </h4>
                <ul className="space-y-3">
                  {[
                    { label: "Home", href: "/" },
                    { label: "Companions", href: "/companions" },
                    { label: "Explore More", href: "/explore" },
                    { label: "My Journey", href: "/my-journey" },
                    { label: "Subscription", href: "/subscription" },
                  ].map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-slate-300 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 3 — Use Cases */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-widest">
                  Use Cases
                </h4>
                <ul className="space-y-3">
                  {[
                    "Interview Preparation",
                    "Exam Excellence",
                    "Coding Practice",
                    "Math & Science",
                    "Communication Skills",
                    "Quick Learning",
                  ].map((item) => (
                    <li key={item}>
                      <span className="text-sm text-slate-300 hover:text-white transition-colors cursor-default">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 4 — Built By */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-widest">
                  Built By
                </h4>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/ib-2.png"
                      alt="Ikram Banadar"
                      className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                    />
                    <div>
                      <p className="text-sm font-bold text-white">
                        Ikram Banadar
                      </p>
                      <p className="text-xs text-slate-400">Lead Developer</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Founder of IB's Dev World — building AI-powered tools that
                    democratize education worldwide.
                  </p>
                  <a
                    href="https://github.com/IBs-DevStudio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
                  >
                    View Projects
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {["Next.js 14", "Vapi", "OpenAI", "Supabase"].map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 px-4 py-6">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-slate-400 text-center sm:text-left">
                © 2024 Cogniva &amp; IB's Dev World. All rights reserved.
                Empowering learning through AI.
              </p>
              <div className="flex items-center gap-5">
                {["Privacy Policy", "Terms of Service", "Contact"].map(
                  (item) => (
                    <a
                      key={item}
                      href="#"
                      className="text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
