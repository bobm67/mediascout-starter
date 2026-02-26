# Lib -- Core Utilities and Configuration

**Parent Context**: [../../CLAUDE.md](../../CLAUDE.md)

## Directory Contents

| File | Purpose | Side |
|------|---------|------|
| `auth.ts` | BetterAuth server configuration | Server only |
| `auth-client.ts` | BetterAuth client hooks (useSession, signIn, signUp, signOut) | Client only |
| `db.ts` | Drizzle ORM database connection (PostgreSQL) | Server only |
| `schema.ts` | Drizzle ORM table definitions | Server only |
| `storage.ts` | File upload abstraction (Vercel Blob / local fallback) | Server only |
| `session.ts` | Auth helpers: requireAuth(), getOptionalSession(), protectedRoutes | Server only |
| `env.ts` | Zod validation for environment variables | Both |
| `utils.ts` | Utility functions (cn for Tailwind class merging) | Both |

## Rules

- **MUST NOT** import client-side code (`auth-client.ts`) in server files
- **MUST NOT** import server-only code (`auth.ts`, `db.ts`, `schema.ts`) in client components
- **MUST** keep each file focused on a single responsibility
- **MUST** export only what is needed

## Authentication

### Server Side
```typescript
import { auth } from "@/lib/auth"
import { requireAuth, getOptionalSession } from "@/lib/session"

// In protected Server Components:
const session = await requireAuth() // redirects if unauthenticated

// In API routes:
const session = await auth.api.getSession({ headers: await headers() })
```

### Client Side
```typescript
import { useSession, signIn, signUp, signOut } from "@/lib/auth-client"

const { data: session, isPending } = useSession()
```

## Database (Drizzle + PostgreSQL)

- Database is PostgreSQL (MUST NOT use SQLite or MySQL)
- Schema defined in `schema.ts` using Drizzle `pgTable`
- Connection in `db.ts` uses `POSTGRES_URL` env var

### Schema Change Workflow
```bash
# 1. Edit src/lib/schema.ts
# 2. Generate migration
pnpm run db:generate
# 3. Apply migration
pnpm run db:migrate
```

### Quick Push (development only)
```bash
pnpm run db:push
```

## File Storage

```typescript
import { upload, deleteFile } from "@/lib/storage"
const result = await upload(buffer, "filename.png", "folder")
await deleteFile(result.url)
```
Auto-switches: local filesystem (dev) <-> Vercel Blob (production via `BLOB_READ_WRITE_TOKEN`).

## Environment Variables

Validated with Zod in `env.ts`. Two schemas:
- `serverEnvSchema` -- server-only variables (POSTGRES_URL, BETTER_AUTH_SECRET, etc.)
- `clientEnvSchema` -- browser-safe variables (NEXT_PUBLIC_APP_URL)

```typescript
import { getServerEnv, getClientEnv } from "@/lib/env"
```

## Search Hints
```bash
# Find all lib exports
rg -n "^export " src/lib/

# Find schema tables
rg -n "pgTable" src/lib/schema.ts

# Find auth usage
rg -n "from \"@/lib/auth" src/
```
