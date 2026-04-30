"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home",         href: "/dashboard" },
  { label: "Companions",   href: "/companions" },
  { label: "Explore More", href: "/explore" },
  { label: "My Journey",   href: "/my-journey" },
  { label: "Subscription", href: "/subscription" },
];

interface NavItemsProps {
  mobile?: boolean;
  onClose?: () => void;
}

const NavItems = ({ mobile = false, onClose }: NavItemsProps) => {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map(({ label, href }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={label}
            href={href}
            onClick={onClose}
            className={`
              transition-colors duration-200 font-medium
              ${mobile
                ? "block py-3 px-2 text-base border-b border-gray-100 last:border-0"
                : "text-sm"
              }
              ${isActive
                ? "text-primary"
                : "text-gray-700 hover:text-primary"
              }
            `}
          >
            {label}
          </Link>
        );
      })}
    </>
  );
};

export default NavItems;