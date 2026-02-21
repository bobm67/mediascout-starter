"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  loading: boolean;
  isAuthReady: boolean;
  isAiReady: boolean;
}

export function HeroSection({ loading, isAuthReady, isAiReady }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-fade-in mb-8 inline-flex items-center rounded-full border border-[#F25802]/20 bg-[#F25802]/10 px-4 py-1.5 text-sm font-medium text-[#F25802]">
            <Bot className="mr-2 h-4 w-4" />
            AI-Powered Starter Kit
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>

          <div className="animate-fade-in mb-4 flex items-center justify-center gap-3">
            <Image
              src="/logo.png"
              alt="Mediascout Starter Kit"
              width={200}
              height={67}
              className="h-16 w-auto"
              priority
            />
          </div>

          <h1 className="animate-fade-in mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Mediascout <span className="text-[#F25802]">Starter Kit</span>
          </h1>

          <p className="animate-fade-in mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            A complete boilerplate with authentication, database, AI integration, and
            modern tooling for building AI-powered applications.
          </p>

          <div className="animate-fade-in mb-16 flex flex-col justify-center gap-4 sm:flex-row">
            {loading || !isAuthReady ? (
              <Button
                size="lg"
                className="bg-[#F25802] px-8 py-6 text-lg text-[#FFFFFF] hover:bg-[#F25802]/90 hover:shadow-[0_0_20px_rgba(242,88,2,0.5)]"
                disabled
              >
                View Dashboard
              </Button>
            ) : (
              <Button
                size="lg"
                className="bg-[#F25802] px-8 py-6 text-lg text-[#FFFFFF] hover:bg-[#F25802]/90 hover:shadow-[0_0_20px_rgba(242,88,2,0.5)]"
                asChild
              >
                <Link href="/dashboard">
                  View Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            )}
            {loading || !isAiReady ? (
              <Button
                size="lg"
                variant="outline"
                className="border-[#020617] px-8 py-6 text-lg text-[#020617] hover:bg-[#020617] hover:text-white dark:border-white dark:text-white dark:hover:bg-white/10"
                disabled
              >
                Try AI Chat
              </Button>
            ) : (
              <Button
                size="lg"
                variant="outline"
                className="border-[#020617] px-8 py-6 text-lg text-[#020617] hover:bg-[#020617] hover:text-white dark:border-white dark:text-white dark:hover:bg-white/10"
                asChild
              >
                <Link href="/chat">Try AI Chat</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
