import Image from "next/image"
import Link from "next/link"

import { AuthRedirect } from "@/components/auth/auth-redirect"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function AuthShell({
  title,
  description,
  children,
  footer,
}: {
  title: string
  description: string
  children: React.ReactNode
  footer: React.ReactNode
}) {
  return (
    <div className="dark flex min-h-svh flex-col items-center justify-center bg-background p-4 text-foreground">
      <AuthRedirect />
      <Link href="/" className="mb-8 shrink-0">
        <Image
          src="/logo.png"
          alt="HireLoop"
          width={154}
          height={44}
          className="h-8 w-auto"
          priority
        />
      </Link>
      <Card className="w-full max-w-sm backdrop-blur">
        <CardHeader>
          <h1 className="font-heading text-lg leading-snug font-medium">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter className="justify-center gap-1 text-sm">
          {footer}
        </CardFooter>
      </Card>
    </div>
  )
}

export function AuthFooterLink({
  text,
  href,
  linkText,
}: {
  text: string
  href: string
  linkText: string
}) {
  return (
    <>
      <span className="text-muted-foreground">{text}</span>
      <Link
        href={href}
        className="font-medium text-primary underline-offset-4 hover:underline"
      >
        {linkText}
      </Link>
    </>
  )
}
