"use client";

import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import { useState } from "react";
import { SignedIn, SignedOut, UserButton, SignOutButton } from "@clerk/nextjs";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar relative flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 z-50">
      {/* LEFT: LOGO */}
      <Link href="/">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Image
            src="/images/logo.png"
            alt="Cogniva Logo"
            width={56}
            height={54}
            className="rounded-lg"
            priority
          />
        </div>
      </Link>

      {/* DESKTOP: NAV LINKS + AUTH (hidden on mobile) */}
      <div className="hidden md:flex items-center gap-8">
        <NavItems />

        <SignedOut>
          <Link href="/sign-in">
            <button className="relative bg-[#1F2937] cursor-pointer text-white px-4 py-2 rounded-md overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-lg group">
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75" />
              <span className="relative z-10">Sign In</span>
            </button>
          </Link>
        </SignedOut>

        <SignedIn>
          <div className="flex items-center gap-3 pl-4 border-l border-gray-300">
            <UserButton
              appearance={{
                elements: { avatarBox: "w-9 h-9" },
              }}
            />
            <SignOutButton>
              <button
                title="Logout"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors active:scale-95"
              >
                <Image
                  src="/icons/logout.svg"
                  alt="logout"
                  width={20}
                  height={20}
                />
              </button>
            </SignOutButton>
          </div>
        </SignedIn>
      </div>

      {/* MOBILE RIGHT: avatar + hamburger */}
      <div className="flex md:hidden items-center gap-3">
        <SignedIn>
          <UserButton
            appearance={{
              elements: { avatarBox: "w-9 h-9" },
            }}
          />
        </SignedIn>

        {/* Hamburger button */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          {menuOpen ? (
            /* X icon */
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            /* Hamburger icon */
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 md:hidden">
          {/* Nav links stacked */}
          <div className="flex flex-col px-6 py-4 gap-1">
            <NavItems mobile onClose={() => setMenuOpen(false)} />
          </div>

          {/* Auth section */}
          <div className="px-6 pb-5 pt-2 border-t border-gray-100">
            <SignedOut>
              <Link href="/sign-in" onClick={() => setMenuOpen(false)}>
                <button className="w-full relative bg-[#1F2937] cursor-pointer text-white px-4 py-2.5 rounded-md overflow-hidden transition-all duration-300 hover:shadow-lg group">
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75" />
                  <span className="relative z-10">Sign In</span>
                </button>
              </Link>
            </SignedOut>

            <SignedIn>
              <SignOutButton>
                <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md hover:bg-gray-100 transition-colors text-gray-700 font-medium">
                  <Image src="/icons/logout.svg" alt="logout" width={18} height={18} />
                  Sign Out
                </button>
              </SignOutButton>
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;