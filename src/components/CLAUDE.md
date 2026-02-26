# Components

**Parent Context**: [../../CLAUDE.md](../../CLAUDE.md)

## Directory Structure

```
src/components/
├── auth/                       # Auth components (see auth/CLAUDE.md)
│   ├── sign-in-button.tsx
│   ├── sign-up-form.tsx
│   ├── forgot-password-form.tsx
│   ├── reset-password-form.tsx
│   ├── sign-out-button.tsx
│   └── user-profile.tsx
├── ui/                         # shadcn/ui primitives (see ui/CLAUDE.md)
│   ├── button.tsx, card.tsx, dialog.tsx, input.tsx, label.tsx
│   ├── dropdown-menu.tsx, dropdown-menu-sub.tsx, sheet.tsx
│   ├── avatar.tsx, badge.tsx, separator.tsx, skeleton.tsx
│   ├── textarea.tsx, spinner.tsx, mode-toggle.tsx
│   ├── sonner.tsx, github-stars.tsx
│   └── ...
├── AppTopLoader.tsx            # Top loading bar (nextjs-toploader)
├── features-section.tsx        # Landing page features grid
├── hero-section.tsx            # Landing page hero
├── setup-checklist.tsx         # Setup diagnostics checklist
├── setup-section.tsx           # Setup section wrapper
├── site-footer.tsx             # Global footer
├── site-header.tsx             # Global header with navigation
├── starter-prompt-modal.tsx    # Starter prompt dialog
└── theme-provider.tsx          # next-themes ThemeProvider wrapper
```

## Rules

- **MUST** default to Server Components
- **MUST** add `"use client"` only when using hooks, browser APIs, or event handlers
- **MUST** use `cn()` from `@/lib/utils` for conditional class merging
- **MUST** use shadcn/ui primitives from `./ui/` for base elements (Button, Card, Input, etc.)
- **MUST NOT** use transparent backgrounds on any overlay (dropdown, dialog, sheet, popover)
- **MUST** ensure text contrast in both light and dark mode
- **SHOULD** reuse existing components before creating new ones
- **SHOULD** keep components small and focused

## Component Patterns

### Server Component (default)
```typescript
// src/components/site-footer.tsx pattern
export function SiteFooter() {
  return <footer className="border-t bg-background">...</footer>
}
```

### Client Component (only when needed)
```typescript
// src/components/theme-provider.tsx pattern
"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

### Conditional Classes
```typescript
// Always use cn() for conditional Tailwind
import { cn } from "@/lib/utils"

<div className={cn("base-classes", isActive && "active-classes")} />
```

## Styling Rules

- Use Tailwind CSS utility classes
- Use CSS variables from `globals.css` for theme colors (e.g., `bg-background`, `text-foreground`)
- Support dark mode with `dark:` variants
- Solid backgrounds on overlays: `bg-white dark:bg-[#0f172a]` or `bg-background`

## Search Hints
```bash
# Find all component exports
rg -n "^export (function|const) " src/components/ --type ts

# Find client components
rg -n "\"use client\"" src/components/

# Find component usage
rg -n "<SiteHeader|<SiteFooter|<ThemeProvider" src/app/
```
