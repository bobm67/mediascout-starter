# Lib Guidelines

## Subagent Requirement
**ALWAYS use subagents for all file operations, testing, debugging, and code changes in this directory.**

## Rules

### File Purposes
- `auth.ts` - Better Auth server configuration (server-side only)
- `auth-client.ts` - Better Auth client hooks (client-side only)
- `db.ts` - Drizzle database connection
- `schema.ts` - Drizzle ORM schema definitions
- `storage.ts` - File storage abstraction (Vercel Blob / local)
- `utils.ts` - Utility functions (cn, etc.)

### Database (Drizzle + PostgreSQL)
- PostgreSQL is the database (NOT SQLite, MySQL)
- Schema changes require migration:
  ```bash
  pnpm run db:generate
  pnpm run db:migrate
  ```

### Authentication
- Server: `import { auth } from "@/lib/auth"`
- Client: `import { useSession } from "@/lib/auth-client"`

### File Storage
```typescript
import { upload, deleteFile } from "@/lib/storage"
const result = await upload(buffer, "filename.png", "folder")
await deleteFile(result.url)
```
- Auto-switches: local (dev) ↔ Vercel Blob (production)

### Best Practices
- Keep lib files focused on single responsibility
- Export only what's needed
- Use TypeScript types/interfaces
- Document complex functions
- Don't import client code in server files and vice versa

## After Changes
```bash
pnpm run lint && pnpm run typecheck
```