"use client";

import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";

import { SignedIn, SignedOut, UserButton, SignOutButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="navbar flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
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

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-8">
        {/* NAV LINKS */}
        <NavItems />

        {/* SIGNED OUT STATE */}
        <SignedOut>
          <Link href="/sign-in">
            <button className="relative bg-[#1F2937] cursor-pointer text-white px-4 py-2 rounded-md overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-lg group">
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75" />
              <span className="relative z-10">Sign In</span>
            </button>
          </Link>
        </SignedOut>

        {/* SIGNED IN STATE */}
        <SignedIn>
          {/* USER + LOGOUT GROUP */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-300">
            {/* USER AVATAR */}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9",
                },
              }}
            />

            {/* LOGOUT BUTTON */}
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
    </nav>
  );
};

export default Navbar;
