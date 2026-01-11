# App Router Guidelines

## Subagent Requirement
**ALWAYS use subagents for all file operations, testing, debugging, and code changes in this directory.**

## Rules

### Page Creation
- Use Server Components by default
- File naming: `page.tsx` for pages, `layout.tsx` for layouts
- Protected routes must check session in Server Components
- Add new pages to navigation if user-facing

### Authentication in Pages
```typescript
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

const session = await auth.api.getSession({ headers: await headers() })
if (!session) redirect("/login")
```

### Route Groups
- `(auth)/` - Authentication pages (login, register, etc.)
- Use route groups to organize without affecting URL structure

### Best Practices
- Keep pages thin - delegate logic to components and lib
- Use `loading.tsx` for loading states
- Use `error.tsx` for error boundaries
- Colocate related files (page, loading, error) in same folder
- Prefer Server Components; use `"use client"` only when needed

## After Changes
```bash
pnpm run lint && pnpm run typecheck
```