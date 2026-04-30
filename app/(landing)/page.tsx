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
        <section className="py-16 px-4 bg-gradient-to-r from-cta/5 to-primary/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                About Cogniva
              </h2>
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-primary/20 shadow-lg max-w-4xl mx-auto">
                <p className="text-lg text-foreground leading-relaxed">
                  <span className="font-semibold text-primary">Cogniva</span> is
                  an innovative AI learning app where students get instant voice
                  tutors for interviews, exams, and learning any subject
                  quickly. Our platform revolutionizes education by providing
                  personalized, voice-powered learning experiences tailored to
                  each student&apos;s unique needs.
                </p>
              </div>
            </div>

            {/* Creator & Company Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left - Ikram Banadar */}
              <div className="bg-white rounded-3xl p-8 border border-primary/20 shadow-lg">
                <div className="text-center mb-6">
                  <img
                    src="/images/ib-2.png"
                    alt="Ikram Banadar"
                    className="w-24 h-24 rounded-full mx-auto mb-4 shadow-lg object-cover border-4 border-primary/20"
                  />

                  <h3 className="text-3xl font-bold mb-2 text-primary">
                    Ikram Banadar
                  </h3>

                  <p className="text-base text-cta font-semibold mb-3">
                    Lead Developer &amp; Founder of IB&apos;s Dev World
                  </p>

                  <div className="flex justify-center gap-3 mb-4">
                    <a
                      href="https://www.linkedin.com/in/ikrambanadarwebdev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary/10 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-all"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="https://github.com/IBs-DevStudio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary/10 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-all"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href="https://www.notion.so/1eac89999f3080bd89b0cd5971f8768e?v=219c89999f308099aa8a000c124c0c8a"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary/10 hover:bg-primary rounded-full flex items-center justify-center transition-all group"
                      aria-label="View Notion database"
                    >
                      <svg
                        className="w-5 h-5"
                        preserveAspectRatio="xMidYMid"
                        viewBox="0 0 256 268"
                      >
                        <path
                          fill="#FFF"
                          d="M16.092 11.538 164.09.608c18.179-1.56 22.85-.508 34.28 7.801l47.243 33.282C253.406 47.414 256 48.975 256 55.207v182.527c0 11.439-4.155 18.205-18.696 19.24L65.44 267.378c-10.913.517-16.11-1.043-21.825-8.327L8.826 213.814C2.586 205.487 0 199.254 0 191.97V29.726c0-9.352 4.155-17.153 16.092-18.188Z"
                        />
                        <path d="M164.09.608 16.092 11.538C4.155 12.573 0 20.374 0 29.726v162.245c0 7.284 2.585 13.516 8.826 21.843l34.789 45.237c5.715 7.284 10.912 8.844 21.825 8.327l171.864-10.404c14.532-1.035 18.696-7.801 18.696-19.24V55.207c0-5.911-2.336-7.614-9.21-12.66l-1.185-.856L198.37 8.409C186.94.1 182.27-.952 164.09.608ZM69.327 52.22c-14.033.945-17.216 1.159-25.186-5.323L23.876 30.778c-2.06-2.086-1.026-4.69 4.163-5.207l142.274-10.395c11.947-1.043 18.17 3.12 22.842 6.758l24.401 17.68c1.043.525 3.638 3.637.517 3.637L71.146 52.095l-1.819.125Zm-16.36 183.954V81.222c0-6.767 2.077-9.887 8.3-10.413L230.02 60.93c5.724-.517 8.31 3.12 8.31 9.879v153.917c0 6.767-1.044 12.49-10.387 13.008l-161.487 9.361c-9.343.517-13.489-2.594-13.489-10.921ZM212.377 89.53c1.034 4.681 0 9.362-4.681 9.897l-7.783 1.542v114.404c-6.758 3.637-12.981 5.715-18.18 5.715-8.308 0-10.386-2.604-16.609-10.396l-50.898-80.079v77.476l16.1 3.646s0 9.362-12.989 9.362l-35.814 2.077c-1.043-2.086 0-7.284 3.63-8.318l9.351-2.595V109.823l-12.98-1.052c-1.044-4.68 1.55-11.439 8.826-11.965l38.426-2.585 52.958 81.113v-71.76l-13.498-1.552c-1.043-5.733 3.111-9.896 8.3-10.404l35.84-2.087Z" />
                      </svg>
                    </a>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    Ikram is a passionate developer and founder who specializes
                    in creating cutting-edge digital solutions. Through
                    IB&apos;s Dev World, he transforms complex ideas into
                    simple, user-friendly applications that solve real-world
                    problems.
                  </p>
                </div>

                <div className="flex gap-3 mt-6">
                  <div className="flex-1 bg-primary/5 rounded-2xl p-4 border border-primary/10">
                    <Code className="w-6 h-6 text-primary mb-2" />
                    <h4 className="font-semibold text-foreground text-sm mb-1">
                      User-Centric Design
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Every app designed with the user in mind
                    </p>
                  </div>
                  <div className="flex-1 bg-cta/5 rounded-2xl p-4 border border-cta/10">
                    <Sparkles className="w-6 h-6 text-cta mb-2" />
                    <h4 className="font-semibold text-foreground text-sm mb-1">
                      Cutting-Edge Tech
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Latest technologies for best performance
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: IB's Dev World */}
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-8 border border-primary/20 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-cta/20 rounded-2xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      IB&apos;s Dev World
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    At IB&apos;s Dev World, we believe that the most powerful
                    solutions are often the simplest ones. Our development
                    philosophy centers on creating intuitive, accessible
                    applications that anyone can use effectively.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-primary to-cta-gold rounded-3xl p-8 shadow-lg text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Brain className="w-10 h-10 text-white" />
                    <h4 className="text-2xl font-bold">Ikram&apos;s Mission</h4>
                  </div>
                  <p className="leading-relaxed opacity-95">
                    Through IB&apos;s Dev World, I aim to democratize access to
                    advanced technology by developing innovative applications
                    that bridge the gap between complex functionality and
                    intuitive user experiences. Our mission is to make
                    AI-powered education accessible and engaging for students
                    worldwide, empowering the next generation to learn, create,
                    and innovate with ease.
                  </p>
                </div>
              </div>
            </div>
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
       {/* ═══════════════════════════════════════
    FOOTER — replace the existing <footer> block
    in app/page.tsx with this entire block
═══════════════════════════════════════ */}

<footer className="border-t border-border/20 bg-gradient-to-b from-background to-primary/3">

  {/* Top strip — newsletter / tagline */}
  <div className="bg-gradient-to-r from-primary via-cta-gold to-primary py-10 px-4">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <h3 className="text-2xl font-bold text-white mb-1">
          Stay ahead of the curve
        </h3>
        <p className="text-white/80 text-sm">
          Get tips, updates, and new companion releases straight to your inbox.
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
            <p className="text-xl font-bold text-foreground">Cogniva</p>
            <p className="text-xs text-muted-foreground">by IB's Dev World</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Your personal AI faculty — available anytime, anywhere. Voice-powered
          tutors that adapt to how you actually learn.
        </p>
        {/* Social links */}
        <div className="flex items-center gap-3 pt-1">
          <a
            href="https://www.linkedin.com/in/ikrambanadarwebdev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-all"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <a
            href="https://github.com/IBs-DevStudio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-all"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </a>
          <a
            href="mailto:ikrambanadar04@gmail.com"
            aria-label="Email"
            className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Col 2 — Platform */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-foreground uppercase tracking-widest">
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
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Col 3 — Use Cases */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-foreground uppercase tracking-widest">
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
              <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-default">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Col 4 — Built By */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-foreground uppercase tracking-widest">
          Built By
        </h4>
        <div className="bg-primary/5 border border-primary/15 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-3">
            <img
              src="/images/ib-2.png"
              alt="Ikram Banadar"
              className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
            />
            <div>
              <p className="text-sm font-bold text-foreground">Ikram Banadar</p>
              <p className="text-xs text-muted-foreground">Lead Developer</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
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
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2 pt-1">
          {["Next.js 14", "Vapi", "OpenAI", "Supabase"].map((tech) => (
            <span
              key={tech}
              className="text-xs px-3 py-1 rounded-full bg-primary/8 border border-primary/15 text-primary font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>

  {/* Bottom bar */}
  <div className="border-t border-border/20 px-4 py-6">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className="text-xs text-muted-foreground text-center sm:text-left">
        © 2024 Cogniva &amp; IB's Dev World. All rights reserved. Empowering learning through AI.
      </p>
      <div className="flex items-center gap-5">
        {["Privacy Policy", "Terms of Service", "Contact"].map((item) => (
          <a
            key={item}
            href="#"
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  </div>

</footer>
      </div>
    </div>
  );
};

export default LandingPage;
