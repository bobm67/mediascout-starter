import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppTopLoader } from "@/components/AppTopLoader";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mediascout Starter Kit",
    template: "%s | Mediascout Starter Kit",
  },
  description:
    "Complete starter kit with authentication, database, AI integration, and modern tooling for building AI-powered applications",
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "AI",
    "OpenRouter",
    "Mediascout",
    "Authentication",
    "PostgreSQL",
  ],
  authors: [{ name: "Mediascout" }],
  creator: "Mediascout",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Mediascout Starter Kit",
    title: "Mediascout Starter Kit",
    description:
      "Complete starter kit with authentication, database, AI integration, and modern tooling",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mediascout Starter Kit",
    description:
      "Complete starter kit with authentication, database, AI integration, and modern tooling",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Mediascout Starter Kit",
  description:
    "Complete starter kit with authentication, database, AI integration, and modern tooling",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: "Mediascout",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppTopLoader />
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1" suppressHydrationWarning>
              {children}
            </div>
            <SiteFooter />
          </div>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
