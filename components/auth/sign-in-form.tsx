"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { signIn } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { GoogleButton } from "@/components/auth/google-button"

export function SignInForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    const data = new FormData(event.currentTarget)
    try {
      const result = await signIn.email({
        email: data.get("email") as string,
        password: data.get("password") as string,
      })

      if (result.error) {
        setError(result.error.message ?? "Something went wrong. Try again.")
        setLoading(false)
        return
      }

      router.push("/")
    } catch {
      setError("Unable to reach the server. Try again.")
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <GoogleButton label="Continue with Google" />

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs whitespace-nowrap text-muted-foreground">
          or continue with email
        </span>
        <Separator className="flex-1" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button type="submit" className="mt-1 w-full" disabled={loading}>
          {loading && <Loader2 className="animate-spin" aria-hidden="true" />}
          Sign In
        </Button>
      </form>
    </div>
  )
}
