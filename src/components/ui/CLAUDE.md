# UI Components Guidelines (shadcn/ui)

## Subagent Requirement
**ALWAYS use subagents for all file operations, testing, debugging, and code changes in this directory.**

## Rules

### shadcn/ui Components
- These are shadcn/ui base components
- Modify sparingly - prefer composition over modification
- Add new shadcn components via CLI when possible

### Styling
- Use standard Tailwind CSS classes
- Avoid custom colors unless explicitly requested
- Support dark mode with Tailwind dark: variants
- Use CSS variables defined in globals.css

### Best Practices
- Don't modify base shadcn components unless necessary
- Create wrapper components in parent `components/` folder instead
- Keep accessibility features intact
- Test dark mode appearance

## After Changes
```bash
pnpm run lint && pnpm run typecheck
```