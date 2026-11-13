"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { signUp } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { GoogleButton } from "@/components/auth/google-button"

const roleOptions = [
  { value: "seeker", label: "Job Seeker" },
  { value: "recruiter", label: "Recruiter" },
  { value: "admin", label: "Admin" },
] as const

type Role = (typeof roleOptions)[number]["value"]

export function SignUpForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [role, setRole] = useState<Role>("seeker")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    const data = new FormData(event.currentTarget)
    console.log("Sign-up input:", {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      role,
    })
    try {
      const result = await signUp.email({
        name: data.get("name") as string,
        email: data.get("email") as string,
        password: data.get("password") as string,
        role,
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
      <GoogleButton label="Sign up with Google" />

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs whitespace-nowrap text-muted-foreground">
          or sign up with email
        </span>
        <Separator className="flex-1" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Jane Doe"
            autoComplete="name"
            required
          />
        </div>
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
            placeholder="At least 8 characters"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="role">I am a</Label>
          <Select
            value={role}
            onValueChange={(value) => setRole(value as Role)}
          >
            <SelectTrigger id="role" className="w-full">
              <SelectValue>
                {(value) =>
                  roleOptions.find((option) => option.value === value)?.label ??
                  "Select your role"
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent align="start">
              {roleOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button type="submit" className="mt-1 w-full" disabled={loading}>
          {loading && <Loader2 className="animate-spin" aria-hidden="true" />}
          Create Account
        </Button>
      </form>
    </div>
  )
}
