"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import PillNav from "./ui/PillNav";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Cars", href: "/cars" },
  { label: "Membership", href: "/membership" },
  { label: "About", href: "/#about" },
  { label: "Features", href: "/#features" },
];

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  // Construct items for PillNav based on session
  const items = [...navLinks];
  if (session) {
    items.push({ label: "Dashboard", href: "/dashboard" });
  } else {
    items.push({ label: "Sign In", href: "/login" });
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
      <PillNav
        logo={
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border border-white/10 shadow-elevated overflow-hidden">
            <img src="/logo.png" alt="Unique Logo" className="w-full h-full object-cover scale-110" />
          </div>
        }
        items={items}
        activeHref={pathname}
        baseColor="transparent"
        pillColor="#000000"
        pillTextColor="#ffffff"
        hoveredPillTextColor="#000000"
        className="mt-6"
        initialLoadAnimation={true}
      />
    </div>
  );
}
