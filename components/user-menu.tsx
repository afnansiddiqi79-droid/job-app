"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { authClient, useSession } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

export function UserMenu() {
  const router = useRouter()
  const { data: session, isPending } = useSession()
  const [signingOut, setSigningOut] = useState(false)

  if (isPending) {
    return <div className="h-8 w-40 animate-pulse rounded-lg bg-muted" />
  }

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => router.push("/sign-in")}>
          Sign In
        </Button>
        <Button onClick={() => router.push("/sign-up")}>Get Started</Button>
      </div>
    )
  }

  async function handleSignOut() {
    setSigningOut(true)
    await authClient.signOut()
    setSigningOut(false)
    router.push("/")
    router.refresh()
  }

  return (
    <div className="flex items-center gap-2">
      <span className="hidden max-w-40 truncate text-sm text-muted-foreground sm:inline">
        {session.user.name || session.user.email}
      </span>
      <Button variant="outline" onClick={handleSignOut} disabled={signingOut}>
        Sign Out
      </Button>
    </div>
  )
}
