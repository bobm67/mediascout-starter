"use client";

import { FeaturesSection } from "@/components/features-section";
import { HeroSection } from "@/components/hero-section";
import { SetupSection } from "@/components/setup-section";
import { useDiagnostics } from "@/hooks/use-diagnostics";

export default function Home() {
  const { isAuthReady, isAiReady, loading } = useDiagnostics();

  return (
    <>
      <HeroSection loading={loading} isAuthReady={isAuthReady} isAiReady={isAiReady} />
      <FeaturesSection />
      <SetupSection />
    </>
  );
}
