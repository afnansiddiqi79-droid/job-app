import type { Metadata } from "next"

import { SignInForm } from "@/components/auth/sign-in-form"
import { AuthFooterLink, AuthShell } from "@/components/auth/auth-shell"

export const metadata: Metadata = {
  title: "Sign In | HireLoop",
}

export default function SignInPage() {
  return (
    <AuthShell
      title="Welcome back"
      description="Sign in to your HireLoop account to continue your job search."
      footer={
        <AuthFooterLink
          text="Don't have an account?"
          href="/sign-up"
          linkText="Sign up"
        />
      }
    >
      <SignInForm />
    </AuthShell>
  )
}
