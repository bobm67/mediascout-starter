# Agentic Coding Boilerplate - Components Guidelines

## Components Overview

### Tech Stack
- **UI**: shadcn/ui components with Tailwind CSS 4
- **Styling**: Tailwind CSS with dark mode support (next-themes)

## Guidelines for components

### CRITICAL RULES

1. **ALWAYS use subagents for all file operations, testing, debugging, and code changes**  
  - this is a strict requirement
2. **Styling Guidelines**
   - Stick to standard Tailwind CSS utility classes
   - Use shadcn/ui color tokens (e.g., `bg-background`, `text-foreground`)
   - Avoid custom colors unless explicitly requested
   - Support dark mode with appropriate Tailwind classes
3. **Component Creation**
   - Use existing shadcn/ui components when possible
   - Follow the established patterns in `src/components/ui/`
   - Support both light and dark modes
   - Use TypeScript with proper types


### Best Practices

- Use subagents for all file operations, testing, debugging, and code changes  - this is a strict requirement
- Read existing code patterns before creating new components
- Maintain consistency with established components
- Use the documentation-finder skill when implementing related features
