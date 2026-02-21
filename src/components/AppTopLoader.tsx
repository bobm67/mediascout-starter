'use client'

import NextTopLoader from 'nextjs-toploader'

export function AppTopLoader() {
  return (
    <NextTopLoader
      showSpinner={false}
      color='#F25802'
      height={5}
      crawlSpeed={400}
    />
  )
}
