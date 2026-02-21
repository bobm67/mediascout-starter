"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { UserProfile } from "@/components/auth/user-profile";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./ui/mode-toggle";

const publicLinks = [{ href: "/", label: "Home" }];

const protectedLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/chat", label: "Chat" },
];

export function SiteHeader() {
  const clientMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const navLinks = session ? [...publicLinks, ...protectedLinks] : publicLinks;

  // SSR-safe static render
  if (!clientMounted) {
    return (
      <>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:border focus:bg-white focus:px-4 focus:py-2 focus:text-[#020617]"
        >
          Skip to main content
        </a>
        <header className="sticky top-0 z-50 w-full border-b border-[#C0C0C0]/20 bg-[#020617]">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="Mediascout"
                width={32}
                height={32}
                className="h-8 w-auto max-h-[32px] object-contain"
                priority
              />
              <span className="text-xl font-bold text-[#F25802]">
                Mediascout
              </span>
            </Link>
            <div className="hidden items-center space-x-4 md:flex">
              <div className="h-10 w-10 opacity-0" />
            </div>
          </div>
        </header>
      </>
    );
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:border focus:bg-white focus:px-4 focus:py-2 focus:text-[#020617]"
      >
        Skip to main content
      </a>
      <header
        className="sticky top-0 z-50 w-full border-b border-[#C0C0C0]/20 bg-[#020617]"
        role="banner"
      >
        <nav
          className="container flex h-16 items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2"
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
              <span className="text-xl font-bold text-[#F25802]">
                Mediascout
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-[#F25802]"
                      : "text-white/80 hover:text-[#F25802]"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div
            className="hidden items-center space-x-4 md:flex"
            role="group"
            aria-label="User actions"
          >
            <ModeToggle />
            <UserProfile />
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center space-x-2 md:hidden">
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 hover:text-[#F25802]"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="mt-4 flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-lg font-medium transition-colors",
                        pathname === link.href
                          ? "text-[#F25802]"
                          : "text-foreground hover:text-[#F25802]"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="border-t border-border pt-4">
                    <UserProfile />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </>
  );
}
