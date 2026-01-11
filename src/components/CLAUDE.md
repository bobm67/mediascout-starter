# Components Guidelines

## Subagent Requirement
**ALWAYS use subagents for all file operations, testing, debugging, and code changes in this directory.**

## Rules

### Component Organization
- `auth/` - Authentication components (sign-in, sign-up, etc.)
- `ui/` - shadcn/ui base components
- Root level - App-specific composed components

### Styling
- Use standard Tailwind CSS utility classes only
- Avoid custom colors unless explicitly requested
- Support dark mode with appropriate Tailwind classes
- Use `cn()` utility from `@/lib/utils` for conditional classes

### Client vs Server Components
- Default to Server Components
- Add `"use client"` only when using:
  - React hooks (useState, useEffect, etc.)
  - Browser APIs
  - Event handlers
  - Client-side auth hooks

### Auth Components
- Client-side auth: Import from `@/lib/auth-client`
- Use existing components in `auth/` folder as patterns
- Don't duplicate auth logic - extend existing components

### Best Practices
- Keep components small and focused
- Extract reusable logic to custom hooks
- Use TypeScript interfaces for props
- Provide default props where sensible
- Document complex components with comments

## After Changes
```bash
pnpm run lint && pnpm run typecheck
```