# Auth Components

**Parent Context**: [../CLAUDE.md](../CLAUDE.md)

## Contents

All components are Client Components (`"use client"`):

| File | Purpose |
|------|---------|
| `sign-in-button.tsx` | Sign-in form with email/password + Google OAuth |
| `sign-up-form.tsx` | Registration form |
| `forgot-password-form.tsx` | Password recovery request |
| `reset-password-form.tsx` | Password reset with token |
| `sign-out-button.tsx` | Logout button |
| `user-profile.tsx` | User profile display/avatar |

## Rules

- **MUST** import auth hooks from `@/lib/auth-client` (NEVER from `@/lib/auth`)
- **MUST** handle loading and error states for all auth actions
- **MUST** show user feedback (toast, inline message) for all actions
- **MUST** validate forms client-side before submission
- **MUST** use shadcn/ui components from `../ui/` for form elements
- **SHOULD** follow existing patterns in this folder when adding new auth components

## Pattern

```typescript
"use client"

import { useState } from "react"
import { signIn } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SignInButton() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSignIn(formData: FormData) {
    setLoading(true)
    setError(null)
    // ... auth logic with error handling
    setLoading(false)
  }

  return (/* form with loading/error states */)
}
```

## Search Hints
```bash
# Find auth hook usage
rg -n "from \"@/lib/auth-client\"" src/components/auth/

# Find which pages use auth components
rg -n "from \"@/components/auth/" src/app/
```
