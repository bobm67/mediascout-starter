# UI Components (shadcn/ui)

**Parent Context**: [../CLAUDE.md](../CLAUDE.md)

## Contents

Base primitives managed by shadcn/ui:
`avatar.tsx`, `badge.tsx`, `button.tsx`, `card.tsx`, `dialog.tsx`,
`dropdown-menu.tsx`, `dropdown-menu-sub.tsx`, `github-stars.tsx`,
`input.tsx`, `label.tsx`, `mode-toggle.tsx`, `separator.tsx`,
`sheet.tsx`, `skeleton.tsx`, `sonner.tsx`, `spinner.tsx`, `textarea.tsx`

## Rules

- **MUST NOT** modify base shadcn components unless absolutely necessary
- **MUST** create wrapper components in parent `src/components/` folder instead of editing these
- **MUST** keep all accessibility features (ARIA attributes, keyboard navigation) intact
- **MUST** support dark mode via CSS variables defined in `src/app/globals.css`
- **SHOULD** add new shadcn components via CLI: `pnpm dlx shadcn@latest add <component>`

## Styling

These components use:
- CSS variables from `globals.css` (e.g., `--background`, `--foreground`, `--primary`)
- `class-variance-authority` for variant definitions
- `cn()` from `@/lib/utils` for class merging
- Radix UI primitives for behavior (dialog, dropdown, etc.)

## Overlay Backgrounds

All overlays (dialog, dropdown-menu, sheet) **MUST** have solid backgrounds.
If adding a new shadcn component with an overlay, verify it does not use transparent backgrounds.
