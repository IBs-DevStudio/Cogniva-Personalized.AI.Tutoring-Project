"use client";

import Link from "next/link";
import Image from "next/image";

export const LandingFooter = () => {
  return (
    <footer className="border-t border-gray-200/60 bg-[#FAFAFA] text-[#111827]">
      {/* Newsletter banner strip */}
      <div className="bg-gradient-to-r from-[#FF5A36] via-[#FF5A36] to-[#FDBA3B] py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h3 className="text-xl md:text-2xl font-black">Stay ahead of the curve</h3>
            <p className="text-sm opacity-90 font-medium mt-1">
              Get custom prompts, tutorials, and new companion launches straight to your inbox.
            </p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex w-full max-w-md gap-3 shrink-0">
            <input
              type="email"
              placeholder="you@email.com"
              required
              className="flex-1 rounded-2xl px-5 py-3.5 text-sm bg-white/15 backdrop-blur border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
            />
            <button
              type="submit"
              className="rounded-2xl px-6 py-3.5 bg-white text-[#FF5A36] font-bold text-sm hover:bg-white/90 transition-all shrink-0 cursor-pointer shadow-md"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* 4-column links navigation */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Column 1: Brand details */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Cogniva Logo"
              width={44}
              height={44}
              className="rounded-xl shadow-sm"
            />
            <div>
              <p className="text-lg font-black text-[#111827]">Cogniva</p>
              <p className="text-xs text-[#6B7280] font-bold">by IB&apos;s Dev World</p>
            </div>
          </div>
          <p className="text-xs md:text-sm text-[#6B7280] font-semibold leading-relaxed">
            Your personal AI faculty—available 24/7. Voice-powered companions that adapt to how you actually study, practice, and summarize topics.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://www.linkedin.com/in/ikrambanadarwebdev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-[#FF5A36] hover:text-white text-gray-500 flex items-center justify-center transition-all shadow-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://github.com/IBs-DevStudio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-[#FF5A36] hover:text-white text-gray-500 flex items-center justify-center transition-all shadow-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="mailto:ikrambanadar04@gmail.com"
              aria-label="Email"
              className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-[#FF5A36] hover:text-white text-gray-500 flex items-center justify-center transition-all shadow-sm"
            >
              <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Platform Links */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-[#111827] uppercase tracking-widest">Platform Navigation</h4>
          <ul className="space-y-3">
            {[
              { label: "Dashboard Home", href: "/dashboard" },
              { label: "AI Companions Library", href: "/companions" },
              { label: "Explore More Tutors", href: "/explore-more" },
              { label: "My Learning Journey", href: "/my-journey" },
              { label: "Subscription Pricing", href: "/subscription" },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-xs md:text-sm text-[#6B7280] font-semibold hover:text-[#FF5A36] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Use Cases */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-[#111827] uppercase tracking-widest">Popular Subjects</h4>
          <ul className="space-y-3 text-xs md:text-sm text-[#6B7280] font-semibold">
            <li>Mock Tech Interviews</li>
            <li>Algorithm Coding Practice</li>
            <li>Calculus & Linear Algebra</li>
            <li>Chemistry & Biology Drills</li>
            <li>SAT / AP Mock Exams</li>
            <li>Vocal Pitch Delivery</li>
          </ul>
        </div>

        {/* Column 4: Builder Card */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-[#111827] uppercase tracking-widest">Built & Managed</h4>
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <Image
                src="/images/ib-2.png"
                alt="Ikram Banadar"
                width={38}
                height={38}
                className="rounded-full border border-gray-200 object-cover"
              />
              <div>
                <p className="text-xs font-extrabold text-[#111827]">Ikram Banadar</p>
                <p className="text-[10px] font-bold text-gray-400">Founder & Dev</p>
              </div>
            </div>
            <p className="text-[11px] text-[#6B7280] font-medium leading-relaxed">
              Founder of IB&apos;s Dev World—building accessible AI-powered tutoring platforms.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {["Next.js 15", "AI Voice", "Supabase", "Clerk"].map((tech) => (
                <span
                  key={tech}
                  className="text-[9px] font-extrabold px-2 py-0.5 bg-white border border-gray-200 rounded-md text-gray-500"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright details */}
      <div className="border-t border-gray-200/60 px-6 py-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] md:text-xs font-semibold text-[#6B7280] text-center sm:text-left">
            © {new Date().getFullYear()} Cogniva &amp; IB&apos;s Dev World. All rights reserved. Transforming education via AI.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Support Help"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[10px] md:text-xs font-semibold text-[#6B7280] hover:text-[#FF5A36] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
