# Agentic Coding Boilerplate

## Tech Stack
- **Framework**: Next.js 16, React 19, TypeScript
- **AI**: Vercel AI SDK 5 + OpenRouter (NOT OpenAI)
- **Auth**: BetterAuth (Email/Password, Google)
- **Database**: PostgreSQL + Drizzle ORM
- **Styling**: Tailwind CSS + next-themes

## Critical Rules

1. **ALWAYS use subagents** for file operations, testing, debugging, and code changes
2. **ALWAYS run after changes**: `pnpm run lint && pnpm run typecheck`
3. **NEVER start dev server** - ask user for output if needed
4. **Use OpenRouter** - import from `@openrouter/ai-sdk-provider`, model format: `provider/model-name`

## Scripts
```bash
pnpm run lint         # ESLint
pnpm run typecheck    # TypeScript check
pnpm run db:migrate   # Run migrations
pnpm run db:push      # Push schema changes
pnpm run db:studio    # Database GUI
```

## Key Imports
```typescript
// Server auth
import { auth } from "@/lib/auth"
const session = await auth.api.getSession({ headers: await headers() })

// Client auth
import { useSession } from "@/lib/auth-client"

// Database
import { db } from "@/lib/db"
import { users } from "@/lib/schema"

// Storage
import { upload, deleteFile } from "@/lib/storage"

// AI
import { openrouter } from "@openrouter/ai-sdk-provider"
```

## Documentation
- `docs/technical/ai/streaming.md` - AI streaming
- `docs/technical/ai/structured-data.md` - Structured data
- `docs/technical/betterauth/polar.md` - Payments

## Folder CLAUDE.md Files
See folder-level CLAUDE.md files for specific rules:
- `src/app/CLAUDE.md` - Pages and layouts
- `src/app/api/CLAUDE.md` - API routes
- `src/components/CLAUDE.md` - Components
- `src/lib/CLAUDE.md` - Utilities and config