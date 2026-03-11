'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code2, Database, Server, Rocket, BookOpen, Users, Zap, Target, GitBranch, Layout, Shield, TrendingUp, ChevronRight, Building, Laptop, Brain } from "lucide-react";
import { useEffect, useState } from "react";
import LandingNavbar from "@/components/LandingNavbar";
import LoadingButton from "@/components/LoadingButton";

const AboutPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeExpertise, setActiveExpertise] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    
    // Rotate expertise areas
    const interval = setInterval(() => {
      setActiveExpertise((prev) => (prev + 1) % 5);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const expertiseAreas = [
    {
      icon: Layout,
      title: "Full-Stack Development",
      description: "Frontend and backend integration",
      color: "from-primary/20 to-primary/5"
    },
    {
      icon: Database,
      title: "Database Design",
      description: "Efficient data modeling and management",
      color: "from-cta-gold/20 to-cta-gold/5"
    },
    {
      icon: Server,
      title: "API Development",
      description: "RESTful services and microservices architecture",
      color: "from-cta/20 to-cta/5"
    },
    {
      icon: Code2,
      title: "Modern Frameworks",
      description: "React, Node.js, and emerging technologies",
      color: "from-primary/20 to-primary/5"
    },
    {
      icon: Rocket,
      title: "Deployment & DevOps",
      description: "Taking projects from code to production",
      color: "from-cta-gold/20 to-cta-gold/5"
    }
  ];

  const capstoneFeatures = [
    {
      icon: BookOpen,
      title: "Complete Codebase",
      description: "Every project includes fully documented, production-ready code"
    },
    {
      icon: GitBranch,
      title: "Architecture Explained",
      description: "Step-by-step breakdown of design decisions and patterns"
    },
    {
      icon: Shield,
      title: "Best Practices",
      description: "Security, scalability, and maintenance integrated throughout"
    },
    {
      icon: TrendingUp,
      title: "Progressive Learning",
      description: "Each project builds on previous skills with increasing complexity"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      {/* Navigation */}
      <LandingNavbar />
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-cta-gold/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cta/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="min-h-[60vh] flex items-center justify-center px-4 py-16">
          <div className="max-w-6xl mx-auto text-center space-y-8">
            <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
              {/* Profile Image Placeholder */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-cta-gold to-cta rounded-full blur-lg animate-pulse opacity-50"></div>
                  <div className="relative w-40 h-40 bg-gradient-to-br from-primary to-cta rounded-full flex items-center justify-center shadow-2xl">
                    <Brain className="w-20 h-20 text-white" />
                  </div>
                </div>
              </div>

              {/* Name and Title */}
              <div className="space-y-4">
                <h1 className="text-6xl font-bold text-foreground max-sm:text-4xl">
                  Ikram Banadar
                </h1>
                <p className="text-2xl text-primary font-semibold">
                  Founder & Lead Developer | IB's Dev World
                </p>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Building className="w-5 h-5" />
                  <span className="text-lg italic">Building solutions brick by brick</span>
                </div>
              </div>
            </div>

            {/* Core Message */}
            <div className={`transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-white/90 backdrop-blur-sm rounded-4xl p-8 border border-primary/20 shadow-lg max-w-4xl mx-auto">
                <p className="text-xl text-foreground leading-relaxed">
                  Welcome to <span className="font-bold text-primary">IB's Dev World</span>, where I transform complex development concepts into practical, 
                  buildable projects through my comprehensive <span className="font-bold text-cta">Capstone Project Series</span>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Background Section */}
        <section className="py-20 px-4 bg-white/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={`space-y-6 transform transition-all duration-1000 delay-500 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                <h2 className="text-4xl font-bold text-foreground">
                  My Background
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  With extensive experience in full-stack development, I've worked across multiple technologies 
                  and frameworks, always with one goal: <span className="font-semibold text-primary">building solutions that matter</span>.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  This experience has taught me that true development mastery comes from understanding systems, 
                  not just syntax. Every line of code should serve a purpose, every architecture decision should 
                  be intentional, and every project should solve real problems.
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-4xl">
                    <Laptop className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-primary">Full-Stack Expert</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-cta/10 rounded-4xl">
                    <Code2 className="w-5 h-5 text-cta" />
                    <span className="font-semibold text-cta">Solution Architect</span>
                  </div>
                </div>
              </div>

              <div className={`transform transition-all duration-1000 delay-700 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                <div className="bg-gradient-to-br from-primary/5 to-cta-gold/5 rounded-4xl p-8 border border-primary/10">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: "Projects Built", value: "50+", icon: Rocket },
                      { label: "Technologies", value: "20+", icon: Code2 },
                      { label: "Years Experience", value: "5+", icon: TrendingUp },
                      { label: "Happy Clients", value: "100+", icon: Users }
                    ].map((stat, index) => (
                      <div key={index} className="text-center space-y-2">
                        <stat.icon className="w-8 h-8 text-primary mx-auto" />
                        <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">
                The Vision Behind IB's Dev World
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Bridging the gap between learning and real-world development
              </p>
            </div>

            <div className="bg-white rounded-4xl p-12 shadow-xl border border-border">
              <div className="space-y-8">
                <div className="flex items-start gap-6 max-sm:flex-col">
                  <div className="w-16 h-16 bg-primary/10 rounded-4xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-foreground">The Problem I Saw</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      I created this platform because I saw a gap in how development is taught. Most resources 
                      focus on isolated concepts or basic tutorials that don't prepare developers for real-world challenges.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 max-sm:flex-col">
                  <div className="w-16 h-16 bg-cta-gold/10 rounded-4xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-8 h-8 text-cta-gold" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-foreground">My Solution</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      My Capstone Project Series takes a different approach – each project is a complete, 
                      real-world application that builds progressively more complex skills. You're not just 
                      learning to code; you're learning to <span className="font-semibold text-primary">think like a developer</span>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Expertise Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-cta-gold/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Technical Expertise
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Through IB's Dev World, I share practical knowledge in:
              </p>
            </div>

            {/* Rotating Expertise Display */}
            <div className="h-32 flex items-center justify-center mb-12">
              {expertiseAreas.map((area, index) => (
                <div
                  key={index}
                  className={`absolute flex items-center gap-4 px-8 py-6 rounded-4xl border-2 border-primary/20 bg-white backdrop-blur-sm shadow-lg transition-all duration-500 ${
                    activeExpertise === index
                      ? 'opacity-100 scale-100 translate-y-0'
                      : 'opacity-0 scale-95 translate-y-2'
                  }`}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${area.color} rounded-4xl flex items-center justify-center`}>
                    <area.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{area.title}</h3>
                    <p className="text-muted-foreground">{area.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Expertise Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expertiseAreas.map((area, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-4xl p-6 border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${area.color} rounded-4xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <area.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {area.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {area.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capstone Difference Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">
                The Capstone Difference
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                My projects aren't tutorials – they're comprehensive development experiences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {capstoneFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-6 bg-white rounded-4xl p-8 border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-4xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Special Highlight */}
            <div className="mt-12 bg-gradient-to-r from-cta via-cta to-primary text-white rounded-4xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-cta-gold/20 animate-pulse"></div>
              <div className="relative z-10 text-center space-y-4">
                <h3 className="text-3xl font-bold">Real-World Considerations</h3>
                <p className="text-xl opacity-90 max-w-3xl mx-auto">
                  Every project addresses critical aspects like security, scalability, performance optimization, 
                  and maintenance – the things that separate hobby projects from professional applications.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* My Promise Section */}
        <section className="py-20 px-4 bg-white/50">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-foreground">
                My Promise to You
              </h2>
              
              <div className="bg-white rounded-4xl p-10 border-2 border-primary/20 shadow-lg">
                <p className="text-xl text-foreground leading-relaxed mb-6">
                  When you work through IB's Dev World projects, you're not just following along – 
                  you're building <span className="font-bold text-primary">genuine development expertise</span> that 
                  translates directly to professional skills.
                </p>
                <p className="text-lg text-muted-foreground italic">
                  "Every project is a stepping stone to mastery, built brick by brick."
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-4xl p-6">
                  <h4 className="font-bold text-primary mb-2">Practical Skills</h4>
                  <p className="text-sm text-muted-foreground">Real projects that build portfolio-worthy applications</p>
                </div>
                <div className="bg-gradient-to-br from-cta-gold/10 to-cta-gold/5 rounded-4xl p-6">
                  <h4 className="font-bold text-cta-gold mb-2">Industry Ready</h4>
                  <p className="text-sm text-muted-foreground">Learn patterns and practices used in production</p>
                </div>
                <div className="bg-gradient-to-br from-cta/10 to-cta/5 rounded-4xl p-6">
                  <h4 className="font-bold text-cta mb-2">Continuous Growth</h4>
                  <p className="text-sm text-muted-foreground">Progressive complexity that matches your journey</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-primary via-cta to-cta-gold text-white rounded-4xl px-12 py-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 animate-pulse"></div>
              
              <div className="relative z-10 space-y-8">
                <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-4xl text-white text-lg font-semibold">
                  <Rocket className="w-5 h-5 mr-2" />
                  Ready to Elevate Your Development Journey?
                </div>
                
                <h2 className="text-5xl font-bold max-sm:text-3xl">
                  Let's Build It
                  <span className="block text-cta-gold">Brick by Brick</span>
                </h2>
                
                <p className="text-xl opacity-90 leading-relaxed max-w-2xl mx-auto">
                  Join the growing community of developers who are mastering real-world development 
                  through the Capstone Project Series.
                </p>
                
                <div className="flex items-center justify-center gap-6 max-sm:flex-col">
                  <LoadingButton 
                    href="/dashboard"
                    variant="secondary"
                    className="bg-white text-primary hover:bg-white/90 rounded-4xl px-10 py-5 text-xl font-bold"
                  >
                    Explore Cogniva Project
                  </LoadingButton>
                  <Link 
                    href="/"
                    className="group bg-transparent border-2 border-white text-white rounded-4xl px-10 py-5 text-xl font-semibold hover:bg-white hover:text-primary transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                  >
                    Back to Home
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-border/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-4">
                <Brain className="w-10 h-10 text-primary" />
                <div>
                  <h3 className="text-2xl font-bold text-foreground">IB's Dev World</h3>
                  <p className="text-sm text-muted-foreground">Building Solutions Brick by Brick</p>
                </div>
              </div>
              
              <p className="text-muted-foreground">
                © 2024 IB's Dev World by Ikram Banadar. All rights reserved.
              </p>
              
              <p className="text-sm text-muted-foreground italic">
                Transforming complex ideas into simple, user-friendly applications
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;
