# Hooks -- Custom React Hooks

**Parent Context**: [../../CLAUDE.md](../../CLAUDE.md)

## Contents

| File | Purpose |
|------|---------|
| `use-diagnostics.ts` | Fetches system diagnostics (env, database, auth, AI status) |

## Rules

- **MUST** prefix all hook files with `use-` (kebab-case)
- **MUST** prefix all hook functions with `use` (camelCase)
- **MUST** mark files as `"use client"` (hooks require client-side React)
- **MUST** define proper TypeScript types for return values (no `any`)
- **MUST** handle loading, error, and success states
- **SHOULD** use real `fetch` calls to API routes (NEVER mock data)

## Pattern

```typescript
// src/hooks/use-diagnostics.ts pattern
"use client"

import { useEffect, useState } from "react"

type DiagnosticsResponse = {
  timestamp: string
  env: { POSTGRES_URL: boolean; /* ... */ }
  database: { connected: boolean; schemaApplied: boolean; error?: string }
  overallStatus: "ok" | "warn" | "error"
}

export function useDiagnostics() {
  const [data, setData] = useState<DiagnosticsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function fetchDiagnostics() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/diagnostics", { cache: "no-store" })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = (await res.json()) as DiagnosticsResponse
      setData(json)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchDiagnostics() }, [])

  return { data, loading, error, refetch: fetchDiagnostics }
}
```

## Search Hints
```bash
# Find all hooks
rg -n "export function use" src/hooks/

# Find hook usage across app
rg -n "from \"@/hooks/" src/
```
