'use client'

import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'

interface Props {
  children: React.ReactNode
  session?: Session
}

export function Providers({ children, session }: Props) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}
