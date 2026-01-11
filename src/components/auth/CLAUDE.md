# Auth Components Guidelines

## Subagent Requirement
**ALWAYS use subagents for all file operations, testing, debugging, and code changes in this directory.**

## Rules

### Client-Side Auth
- Import hooks from `@/lib/auth-client`
- All auth components here are client components (`"use client"`)

### Existing Components
- `sign-in-button.tsx` - Sign in form
- `sign-up-form.tsx` - Registration form
- `forgot-password-form.tsx` - Password recovery
- `reset-password-form.tsx` - Password reset
- `sign-out-button.tsx` - Logout button
- `user-profile.tsx` - User profile display

### Best Practices
- Follow existing patterns in this folder
- Handle loading and error states
- Show user feedback for all actions
- Validate forms client-side before submission
- Use shadcn/ui components from `../ui/`

## After Changes
```bash
pnpm run lint && pnpm run typecheck
```