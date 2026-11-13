import Image from "next/image"

import { UserMenu } from "@/components/user-menu"

const navLinks = [
  { href: "#browse-jobs", label: "Browse Jobs" },
  { href: "#company", label: "Company" },
  { href: "#pricing", label: "Pricing" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-4 z-50 px-4">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl bg-card/80 px-4 ring-1 ring-foreground/10 backdrop-blur md:px-6">
        <a href="#" className="flex items-center">
          <Image
            src="/logo.png"
            alt="HireLoop"
            width={154}
            height={44}
            className="h-8 w-auto"
            priority
          />
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <UserMenu />
      </div>
    </header>
  )
}
