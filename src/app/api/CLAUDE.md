# API Routes

**Parent Context**: [../../../CLAUDE.md](../../../CLAUDE.md)

## Directory Contents

```
src/app/api/
├── auth/[...all]/route.ts    # BetterAuth catch-all handler
├── chat/route.ts             # AI chat streaming (POST)
└── diagnostics/route.ts      # System diagnostics (GET)
```

## Route Handler Pattern

### Authenticated API Route
```typescript
// Pattern from src/app/api/chat/route.ts
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { z } from "zod"

const requestSchema = z.object({ /* ... */ })

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const parsed = requestSchema.safeParse(body)
  if (!parsed.success) {
    return new Response(JSON.stringify({
      error: "Invalid request",
      details: parsed.error.flatten().fieldErrors,
    }), { status: 400, headers: { "Content-Type": "application/json" } })
  }

  // ... handle request
}
```

## Rules

- **MUST** export named HTTP methods: `GET`, `POST`, `PUT`, `DELETE`, `PATCH`
- **MUST** return `Response` or `NextResponse` objects
- **MUST** wrap all handlers in try/catch
- **MUST** validate request bodies with Zod schemas
- **MUST** check authentication via `auth.api.getSession({ headers: await headers() })`
- **MUST** return appropriate HTTP status codes (401, 400, 500)
- **MUST** log errors server-side, return safe messages to clients

## AI Integration (OpenRouter)

- **MUST NOT** import from OpenAI directly
- **MUST** use `createOpenRouter` from `@openrouter/ai-sdk-provider`
- Model format: `provider/model-name` (e.g., `openai/gpt-5-mini`)
- Default model set via `OPENROUTER_MODEL` env var
- Reference: `docs/technical/ai/streaming.md`

```typescript
import { createOpenRouter } from "@openrouter/ai-sdk-provider"
import { streamText, convertToModelMessages } from "ai"

const openrouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY })
const result = streamText({
  model: openrouter(process.env.OPENROUTER_MODEL || "openai/gpt-5-mini"),
  messages: convertToModelMessages(messages),
})
```

## BetterAuth Catch-All

`auth/[...all]/route.ts` handles all auth endpoints automatically.
Do NOT create custom auth API routes -- BetterAuth manages them.

## Search Hints
```bash
# Find all route handlers
rg -n "export async function (GET|POST|PUT|DELETE|PATCH)" src/app/api/

# Find Zod validation schemas in API
rg -n "z\.object" src/app/api/
```
