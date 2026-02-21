import { SetupChecklist } from "@/components/setup-checklist";
import { StarterPromptModal } from "@/components/starter-prompt-modal";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SetupSection() {
  return (
    <section className="bg-muted/30 py-20 sm:py-32">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Get <span className="text-[#F25802]">Started</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Follow the setup checklist to configure your environment and start building.
            </p>
          </div>

          <SetupChecklist />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Environment Variables</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm text-muted-foreground">
                  Copy <code className="rounded bg-muted px-1.5 py-0.5 text-xs">.env.example</code> to{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs">.env.local</code> and configure:
                </p>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <div className="mr-3 h-1.5 w-1.5 rounded-full bg-[#F25802]" />
                    POSTGRES_URL
                  </li>
                  <li className="flex items-center">
                    <div className="mr-3 h-1.5 w-1.5 rounded-full bg-[#F25802]" />
                    GOOGLE_CLIENT_ID &amp; SECRET
                  </li>
                  <li className="flex items-center">
                    <div className="mr-3 h-1.5 w-1.5 rounded-full bg-[#F25802]" />
                    OPENROUTER_API_KEY
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Database Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm text-muted-foreground">
                  Run database migrations:
                </p>
                <div className="space-y-2">
                  <code className="block rounded bg-muted p-2 text-sm">
                    pnpm run db:generate
                  </code>
                  <code className="block rounded bg-muted p-2 text-sm">
                    pnpm run db:migrate
                  </code>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <StarterPromptModal />
          </div>
        </div>
      </div>
    </section>
  );
}
