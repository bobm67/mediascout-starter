import { Shield, Database, Bot, Palette } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  items: string[];
}

const features: Feature[] = [
  {
    icon: Shield,
    title: "Authentication",
    description: "BetterAuth with Google OAuth, email/password, and session management.",
    items: ["Email & password login", "Google OAuth integration", "Session management", "Password recovery"],
  },
  {
    icon: Database,
    title: "Database",
    description: "PostgreSQL with Drizzle ORM for type-safe database operations.",
    items: ["Drizzle ORM setup", "Migration system", "Type-safe queries", "Database studio GUI"],
  },
  {
    icon: Bot,
    title: "AI Ready",
    description: "Vercel AI SDK with OpenRouter for multi-model AI integration.",
    items: ["Streaming chat interface", "OpenRouter multi-model", "Message persistence", "Error handling"],
  },
  {
    icon: Palette,
    title: "UI Components",
    description: "shadcn/ui with Tailwind CSS and full dark mode support.",
    items: ["shadcn/ui components", "Dark mode support", "Responsive design", "Mediascout design system"],
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-32">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need to <span className="text-[#F25802]">Build Fast</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Production-ready components and integrations so you can focus on building your app.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group relative transition-all duration-300 hover:shadow-lg hover:shadow-[#F25802]/20"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#F25802]/10 transition-colors group-hover:bg-[#F25802]/20">
                    <feature.icon className="h-6 w-6 text-[#F25802]" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 text-base">
                  {feature.description}
                </CardDescription>
                <ul className="space-y-2">
                  {feature.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center text-sm text-muted-foreground"
                    >
                      <div className="mr-3 h-1.5 w-1.5 rounded-full bg-[#F25802]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
