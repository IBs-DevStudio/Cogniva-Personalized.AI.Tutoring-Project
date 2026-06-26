'use client';

import Link from "next/link";
import Image from "next/image";
import LoadingButton from "@/components/LoadingButton";

const LandingNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAFA]/80 backdrop-blur-md border-b border-gray-200/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Branding */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo.png"
              alt="Cogniva Logo"
              width={40}
              height={40}
              className="rounded-xl group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col">
              <div className="text-xl font-extrabold text-[#111827] flex items-center gap-1.5 leading-none">
                <span className="text-[#FF5A36]">Cogniva</span>
              </div>
              <span className="text-[10px] text-[#6B7280] font-semibold leading-none mt-1">
                by IB&apos;s Dev World
              </span>
            </div>
          </Link>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-semibold text-[#6B7280] hover:text-[#FF5A36] transition-colors duration-200">
              Features
            </a>
            <a href="#faculty" className="text-sm font-semibold text-[#6B7280] hover:text-[#FF5A36] transition-colors duration-200">
              AI Faculty
            </a>
            <a href="#voice-experience" className="text-sm font-semibold text-[#6B7280] hover:text-[#FF5A36] transition-colors duration-200">
              Voice AI
            </a>
            <a href="#outcomes" className="text-sm font-semibold text-[#6B7280] hover:text-[#FF5A36] transition-colors duration-200">
              Outcomes
            </a>
            <a href="#testimonials" className="text-sm font-semibold text-[#6B7280] hover:text-[#FF5A36] transition-colors duration-200">
              Testimonials
            </a>
            <a href="#faq" className="text-sm font-semibold text-[#6B7280] hover:text-[#FF5A36] transition-colors duration-200">
              FAQ
            </a>
          </div>
          
          {/* CTA Button */}
          <LoadingButton 
            href="/dashboard"
            variant="navbar"
            className="!text-sm hover:opacity-95 shadow-sm hover:shadow-md transition-all duration-300 bg-[#FF5A36] hover:bg-[#FF5A36]/90 text-white rounded-xl px-5 py-2"
          >
            Enter Cogniva
          </LoadingButton>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
