'use client'

import NextTopLoader from 'nextjs-toploader'

export function AppTopLoader() {
  return (
    <NextTopLoader
      showSpinner={false}
      color='#FF8C00'
      height={5}
      crawlSpeed={400}
    />
  )
}
