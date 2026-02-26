# App Router -- Pages and Layouts

**Parent Context**: [../../CLAUDE.md](../../CLAUDE.md)

## Directory Contents

```
src/app/
├── (auth)/                 # Auth route group
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── forgot-password/page.tsx
│   ├── reset-password/page.tsx
│   └── layout.tsx          # Shared auth layout
├── api/                    # API routes (see api/CLAUDE.md)
├── chat/                   # Chat feature
│   ├── page.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   └── _components/        # Chat-specific components
├── dashboard/
│   ├── page.tsx
│   └── loading.tsx
├── profile/
│   ├── page.tsx
│   └── _components/        # Profile-specific components
├── layout.tsx              # Root layout (providers, header, footer, toaster)
├── page.tsx                # Landing page
├── error.tsx               # Global error boundary
├── not-found.tsx           # 404 page
├── globals.css             # Global styles + Tailwind
├── manifest.ts             # PWA manifest
├── robots.ts               # robots.txt
└── sitemap.ts              # sitemap.xml
```

## Page Patterns

### Protected Page (Server Component)
```typescript
// src/app/dashboard/page.tsx pattern
import { requireAuth } from "@/lib/session"

export default async function DashboardPage() {
  const session = await requireAuth() // redirects to "/" if not authenticated
  return <div>Welcome {session.user.name}</div>
}
```

### Auth Page (Route Group)
Auth pages live in `(auth)/` route group -- URL has no `/auth/` prefix:
- `(auth)/login/page.tsx` serves `/login`
- `(auth)/register/page.tsx` serves `/register`

### Page-Scoped Components
Use `_components/` folder for components private to a route:
- `chat/_components/chat-input.tsx`
- `chat/_components/message-list.tsx`
- `profile/_components/edit-profile-dialog.tsx`

These are NOT reusable -- they serve only their parent page.

## Rules

- **MUST** use Server Components by default
- **MUST** add `"use client"` only when hooks, events, or browser APIs are needed
- **MUST** check authentication in protected routes using `requireAuth()` from `@/lib/session`
- **MUST** colocate `loading.tsx` and `error.tsx` with pages that need them
- **SHOULD** keep pages thin -- delegate logic to components and lib
- **SHOULD** add new user-facing pages to navigation in `src/components/site-header.tsx`

## Root Layout Structure

`layout.tsx` wraps all pages with:
1. `ThemeProvider` (next-themes, system default)
2. `AppTopLoader` (top loading bar)
3. `SiteHeader` + `SiteFooter`
4. `Toaster` (sonner, top-right)

## Search Hints
```bash
# Find all pages
find src/app -name "page.tsx"

# Find all layouts
find src/app -name "layout.tsx"

# Find loading states
find src/app -name "loading.tsx"

# Find route-scoped components
find src/app -name "_components" -type d
```
