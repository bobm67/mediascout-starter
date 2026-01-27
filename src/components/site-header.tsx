"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserProfile } from "@/components/auth/user-profile";
import { useSession } from "@/lib/auth-client";
import { ModeToggle } from "./ui/mode-toggle";

const publicLinks = [
  { href: "/", label: "Home" },
];

const protectedLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/chat", label: "Chat" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const navLinks = session ? [...publicLinks, ...protectedLinks] : publicLinks;

  const getNavLinkClassName = (path: string) =>
    `inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors ${
      pathname === path
        ? "text-mediascout-orange border-b-2 border-mediascout-orange"
        : "text-white hover:text-mediascout-orange"
    }`;

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-[#020617] focus:border focus:rounded-md"
      >
        Skip to main content
      </a>
      <header
        className="sticky top-0 z-50 border-b border-mediascout-silver/20 bg-[#020617]"
        role="banner"
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center"
          aria-label="Main navigation"
        >
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-3"
              aria-label="Mediascout - Go to homepage"
            >
              <Image
                src="/logo.png"
                alt="Mediascout"
                width={32}
                height={32}
                className="h-8 w-auto max-h-[32px] object-contain"
                priority
              />
              <span className="text-xl font-bold text-mediascout-orange">
                Mediascout
              </span>
            </Link>

            {/* Navigation Links - hidden on mobile */}
            <div className="hidden sm:flex sm:ml-8 sm:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={getNavLinkClassName(link.href)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div
            className="flex items-center space-x-2 sm:space-x-4"
            role="group"
            aria-label="User actions"
          >
            <ModeToggle />
            <UserProfile />
          </div>
        </nav>
      </header>
    </>
  );
}
