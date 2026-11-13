import type { Metadata } from "next"

import { SignUpForm } from "@/components/auth/sign-up-form"
import { AuthFooterLink, AuthShell } from "@/components/auth/auth-shell"

export const metadata: Metadata = {
  title: "Sign Up | HireLoop",
}

export default function SignUpPage() {
  return (
    <AuthShell
      title="Create your account"
      description="Join HireLoop and find your dream job today."
      footer={
        <AuthFooterLink
          text="Already have an account?"
          href="/sign-in"
          linkText="Sign in"
        />
      }
    >
      <SignUpForm />
    </AuthShell>
  )
}
