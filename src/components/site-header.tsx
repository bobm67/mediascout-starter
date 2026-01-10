import Image from "next/image";
import Link from "next/link";
import { UserProfile } from "@/components/auth/user-profile";
import { ModeToggle } from "./ui/mode-toggle";

export function SiteHeader() {
  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:rounded-md"
      >
        Skip to main content
      </a>
      <header className="border-b" role="banner">
        <nav
          className="container mx-auto px-4 py-4 flex justify-between items-center"
          aria-label="Main navigation"
        >
          <h1 className="text-2xl font-bold">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              aria-label="Mediascout Starter Kit - Go to homepage"
            >
              <Image
                src="/logo.png"
                alt="Mediascout Starter Kit"
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Mediascout Starter Kit
              </span>
            </Link>
          </h1>
          <div className="flex items-center gap-4" role="group" aria-label="User actions">
            <UserProfile />
            <ModeToggle />
          </div>
        </nav>
      </header>
    </>
  );
}
