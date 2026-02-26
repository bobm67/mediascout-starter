# MediaScout Starter Kit

## Overview
- **Type**: Next.js SaaS starter kit (single project)
- **Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui
- **AI**: Vercel AI SDK 5 + OpenRouter (NOT OpenAI)
- **Auth**: BetterAuth (Email/Password, Google OAuth)
- **Database**: PostgreSQL + Drizzle ORM
- **Port**: 3000
- **Package Manager**: pnpm (MUST NOT use npm or yarn)

This CLAUDE.md is the authoritative source for all development rules.
Subdirectories contain specialized CLAUDE.md files that extend these rules.

---

## Universal Development Rules

### Workflow (MUST)
- **MUST** use subagents for all file operations, testing, debugging, and code changes
- **MUST** run `pnpm run lint && pnpm run typecheck` after every code change
- **MUST** use CLEAN CODE methodology strictly
- **MUST** use TDD with Playwright (MUST NOT use Jest or Vitest)
- **MUST** ask user before starting new tasks or subtasks
- **MUST NOT** start or stop the dev server -- ask the user to do it

### Data Policy (MUST -- ZERO EXCEPTIONS)
- **MUST NOT** use mock data, mock functions, or mock HTTP
- **MUST** use real data and real API calls in all tests and code
- This is non-negotiable -- mock data invalidates tests and produces false confidence

### Code Quality (MUST)
- **MUST NOT** use `any` or `unknown` types -- create proper interfaces
- **MUST NOT** modify code to bypass or satisfy tests artificially
- **MUST** use `@/` prefix for all imports from `src/`
- **MUST** write TypeScript in strict mode
- **MUST** keep functions small and focused on a single responsibility
- **MUST** handle all error cases explicitly with try/catch
- **MUST** validate inputs at system boundaries with Zod

### UI Rules (MUST)
- **MUST NOT** use transparent backgrounds on menus, popups, dropdowns, or similar overlays
- **MUST** use explicit solid backgrounds (e.g., `bg-white dark:bg-[#0f172a]`)
- **MUST** ensure sufficient contrast for all text in both light and dark mode
- **MUST** use `cn()` from `@/lib/utils` for conditional Tailwind classes
- **MUST** support dark mode via Tailwind `dark:` variants

### Security (MUST)
- **MUST NOT** commit secrets, API keys, tokens, or `.env` files
- **MUST NOT** hardcode credentials -- use environment variables
- **MUST** validate all user input server-side with Zod
- **MUST** check authentication in all protected routes and API endpoints
- **MUST** return safe error messages to clients (log details server-side)

### Git (MUST)
- **MUST NOT** commit without asking the user first
- **MUST** commit but NOT push (user pushes manually)
- **MUST NOT** include AI references in commit messages (no "Claude", "Generated", "Co-Authored-By")
- **SHOULD** use Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`

### Best Practices (SHOULD)
- **SHOULD** prefer Server Components; use `"use client"` only when needed
- **SHOULD** keep files under 200 lines
- **SHOULD** reuse existing components -- search codebase before creating new ones
- **SHOULD** use descriptive variable names (no single letters except loop counters)
- **SHOULD** document complex logic with comments explaining WHY

---

## Core Commands

### Quality Gates (run after every change)
```bash
pnpm run lint && pnpm run typecheck
```

### All Available Scripts
```bash
pnpm run dev              # Start dev server (port 3000, Turbopack)
pnpm run build            # Build (runs db:migrate first)
pnpm run build:ci         # Build without migration
pnpm run lint             # ESLint
pnpm run typecheck        # TypeScript validation (tsc --noEmit)
pnpm run check            # lint + typecheck combined
pnpm run format           # Prettier write
pnpm run format:check     # Prettier check
pnpm run db:generate      # Generate Drizzle migration
pnpm run db:migrate       # Run Drizzle migrations
pnpm run db:push          # Push schema directly (dev)
pnpm run db:studio        # Drizzle Studio GUI
pnpm run db:reset         # Drop + push schema (destructive)
```

---

## Project Structure

```
src/
├── app/                          # Next.js App Router (see src/app/CLAUDE.md)
│   ├── (auth)/                   # Auth route group (login, register, forgot/reset-password)
│   ├── api/                      # API routes (see src/app/api/CLAUDE.md)
│   │   ├── auth/[...all]/        # BetterAuth catch-all handler
│   │   ├── chat/route.ts         # AI chat streaming endpoint
│   │   └── diagnostics/route.ts  # System diagnostics endpoint
│   ├── chat/                     # Chat page + _components/
│   ├── dashboard/                # Dashboard page
│   ├── profile/                  # Profile page + _components/
│   ├── layout.tsx                # Root layout (providers, header, footer)
│   └── page.tsx                  # Landing page
├── components/                   # All components (see src/components/CLAUDE.md)
│   ├── auth/                     # Auth forms (see src/components/auth/CLAUDE.md)
│   ├── ui/                       # shadcn/ui primitives (see src/components/ui/CLAUDE.md)
│   └── [root files]              # App components (header, footer, hero, features, etc.)
├── hooks/                        # Custom React hooks (see src/hooks/CLAUDE.md)
│   └── use-diagnostics.ts        # Diagnostics data hook
└── lib/                          # Core utilities (see src/lib/CLAUDE.md)
    ├── auth.ts                   # BetterAuth server config
    ├── auth-client.ts            # BetterAuth client hooks
    ├── db.ts                     # Drizzle database connection
    ├── schema.ts                 # Drizzle ORM schema
    ├── storage.ts                # File storage (Vercel Blob / local)
    ├── session.ts                # Session utilities (requireAuth, getOptionalSession)
    ├── env.ts                    # Zod environment variable validation
    └── utils.ts                  # Utility functions (cn)
```

---

## Key Imports (Copy-Paste Ready)

```typescript
// Server auth (Server Components and API routes)
import { auth } from "@/lib/auth"
import { requireAuth, getOptionalSession } from "@/lib/session"
const session = await auth.api.getSession({ headers: await headers() })

// Client auth (Client Components)
import { useSession, signIn, signUp, signOut } from "@/lib/auth-client"

// Database
import { db } from "@/lib/db"
import { users } from "@/lib/schema"

// Storage
import { upload, deleteFile } from "@/lib/storage"

// AI (OpenRouter -- NEVER import from OpenAI)
import { createOpenRouter } from "@openrouter/ai-sdk-provider"
import { streamText, UIMessage, convertToModelMessages } from "ai"

// UI utilities
import { cn } from "@/lib/utils"

// Environment validation
import { getServerEnv, getClientEnv } from "@/lib/env"
```

---

## Quick Find Commands

```bash
# Find a component definition
rg -n "export (function|const) " src/components/ --type ts

# Find API route handlers
rg -n "export async function (GET|POST|PUT|DELETE)" src/app/api/

# Find hook definitions
rg -n "export function use" src/hooks/

# Find schema tables
rg -n "export const .* = pgTable" src/lib/schema.ts

# Find protected routes
rg -n "requireAuth\|protectedRoutes" src/

# Find "use client" components
rg -n "\"use client\"" src/

# Find all page files
find src/app -name "page.tsx"
```

---

## Environment Variables

### Required
- `POSTGRES_URL` -- PostgreSQL connection string
- `BETTER_AUTH_SECRET` -- Auth secret (min 32 chars)

### Optional
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` -- Google OAuth
- `OPENROUTER_API_KEY` -- AI chat functionality
- `OPENROUTER_MODEL` -- AI model (default: `openai/gpt-5-mini`)
- `BLOB_READ_WRITE_TOKEN` -- Vercel Blob storage (falls back to local)
- `NEXT_PUBLIC_APP_URL` -- Public app URL (default: `http://localhost:3000`)

Client-side variables **MUST** use `NEXT_PUBLIC_` prefix.
Validation schema is in `src/lib/env.ts`.

---

## Testing Strategy

- **Framework**: Playwright only (MUST NOT use Jest/Vitest)
- **Method**: TDD -- write Playwright tests before starting each subtask
- **Data**: MUST use real data and real API calls (NEVER mock)
- **Success criteria**: Subtask succeeds only when 100% of tests pass
- **Debugging**: Check browser console when errors appear

---

## Protected Routes

Defined in `src/lib/session.ts`:
- `/chat` -- requires authentication
- `/dashboard` -- requires authentication
- `/profile` -- requires authentication

Use `requireAuth()` in Server Components, check session in API routes.

---

## Documentation References

- `docs/technical/ai/streaming.md` -- AI streaming patterns
- `docs/technical/ai/structured-data.md` -- Structured data with AI
- `docs/technical/betterauth/polar.md` -- Payment integration
- `docs/technical/react-markdown.md` -- React markdown rendering
- `docs/business/starter-prompt.md` -- Business starter prompt

---

## Available Tools

### Claude Code Agents
- `.claude/agents/deep-dive.md` -- Deep codebase analysis
- `.claude/agents/code-review.md` -- Code review
- `.claude/agents/better-auth-expert.md` -- BetterAuth specialist
- `.claude/agents/coder.md` -- General coding
- `.claude/agents/polar-payments-expert.md` -- Payments specialist

### Custom Commands
- `/publish-to-github` -- Publish to GitHub
- `/checkpoint` -- Create checkpoint
- `/create-spec` -- Create feature specification
- `/continue-feature` -- Continue feature development

### Tool Permissions
- Allowed: Read any file, write code files, run lint/typecheck/tests
- Ask first: Edit .env files, force push, database destructive operations
- Blocked: Starting/stopping dev server, using mock data

---

## Common Gotchas

1. **Dynamic route params are async** in Next.js 16 -- use `await params`
2. **Client-side env vars** need `NEXT_PUBLIC_` prefix or they are undefined in browser
3. **OpenRouter, not OpenAI** -- use `createOpenRouter` from `@openrouter/ai-sdk-provider`
4. **BetterAuth session** requires `await headers()` -- it is async in Next.js 16
5. **Drizzle schema changes** require `pnpm run db:generate && pnpm run db:migrate`
6. **Server Components are default** -- only add `"use client"` when hooks/events are needed
7. **Port is 3000** -- configured in package.json dev script
8. **Use pnpm** -- never npm or yarn
