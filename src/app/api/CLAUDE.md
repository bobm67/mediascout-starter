# API Routes Guidelines

## Subagent Requirement
**ALWAYS use subagents for all file operations, testing, debugging, and code changes in this directory.**

## Rules

### Route Handler Structure
- Export HTTP method handlers: `GET`, `POST`, `PUT`, `DELETE`, `PATCH`
- Return `Response` or `NextResponse` objects
- Use proper TypeScript types for request/response

### AI Integration (OpenRouter)
- **NEVER use OpenAI directly** - use OpenRouter
- Import: `import { openrouter } from "@openrouter/ai-sdk-provider"`
- Model format: `provider/model-name` (e.g., `openai/gpt-5-mini`)
- Reference: `docs/technical/ai/streaming.md`

### Authentication in API Routes
```typescript
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

const session = await auth.api.getSession({ headers: await headers() })
if (!session) return new Response("Unauthorized", { status: 401 })
```

### Error Handling
- Always wrap in try/catch
- Return appropriate HTTP status codes
- Log errors server-side, return safe messages to client

### Best Practices
- Validate input data before processing
- Use Zod for request body validation
- Keep routes focused - one responsibility per endpoint
- Rate limit sensitive endpoints

## After Changes
```bash
pnpm run lint && pnpm run typecheck
```