import Image from "next/image"
import { BriefcaseBusiness, MapPin, Search } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { StatsSection } from "@/components/stats-section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
]

export default function Home() {
  return (
    <div className="dark min-h-svh overflow-x-clip bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pt-20 text-center sm:pt-24">
        <div className="flex w-full max-w-md items-center gap-3">
          <div
            className="h-px flex-1 bg-gradient-to-r from-transparent to-foreground/25"
            aria-hidden="true"
          />
          <Badge
            variant="outline"
            className="h-7 gap-1.5 bg-card px-3 font-mono uppercase ring-1 ring-foreground/10"
          >
            <BriefcaseBusiness aria-hidden="true" />
            <strong className="font-sans font-semibold">50,000+</strong>
            new jobs this month
          </Badge>
          <div
            className="h-px flex-1 bg-gradient-to-l from-transparent to-foreground/25"
            aria-hidden="true"
          />
        </div>

        <h1 className="mt-6 max-w-2xl text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          Find Your Dream Job Today
        </h1>
        <p className="mt-4 max-w-xl text-balance text-muted-foreground">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search bar */}
        <form
          action="#"
          className="mt-10 flex h-14 w-full max-w-2xl items-center gap-2 rounded-2xl bg-card pr-2 pl-5 ring-1 ring-foreground/10"
        >
          <label className="flex min-w-0 flex-1 items-center gap-2">
            <Search
              className="size-4 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              type="search"
              name="query"
              placeholder="Job title, skill or company"
              className="border-0 bg-transparent px-0 ring-0 focus-visible:border-0 focus-visible:ring-0 dark:bg-transparent"
            />
          </label>
          <div
            className="h-6 w-px shrink-0 bg-foreground/10"
            aria-hidden="true"
          />
          <label className="hidden min-w-0 flex-1 items-center gap-2 sm:flex">
            <MapPin
              className="size-4 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              type="search"
              name="location"
              placeholder="Location or Remote"
              className="border-0 bg-transparent px-0 ring-0 focus-visible:border-0 focus-visible:ring-0 dark:bg-transparent"
            />
          </label>
          <Button
            size="icon-lg"
            type="submit"
            className="size-10 rounded-xl"
            aria-label="Search jobs"
          >
            <Search aria-hidden="true" />
          </Button>
        </form>

        {/* Trending positions */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-muted-foreground">
            Trending Position:
          </span>
          {trendingPositions.map((position) => (
            <Badge
              key={position}
              variant="outline"
              className="h-6 bg-card ring-1 ring-foreground/10"
            >
              {position}
            </Badge>
          ))}
        </div>
      </section>

      {/* Globe */}
      <section className="relative mt-8 flex justify-center">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-72 [background-image:radial-gradient(circle,oklch(0.985_0_0/0.4)_1px,transparent_1.5px)] [background-size:28px_28px] opacity-30"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-10 h-72 [background-image:radial-gradient(circle,oklch(0.985_0_0/0.5)_1px,transparent_1.5px)] [background-size:44px_44px] opacity-20"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(closest-side_at_50%_60%,oklch(0.55_0.21_277/0.5),transparent)] blur-2xl"
          aria-hidden="true"
        />
        <Image
          src="/globe.png"
          alt=""
          width={1440}
          height={1882}
          className="relative w-full max-w-6xl [mask-image:linear-gradient(to_bottom,black_55%,transparent_95%)] opacity-90"
          priority
        />
        <p className="absolute inset-x-0 bottom-24 mx-auto max-w-md px-4 text-center text-2xl text-foreground/90 sm:bottom-32 sm:text-3xl">
          Assisting over 15,000 job seekers find their dream positions.
        </p>
      </section>

      {/* Stats */}
      <StatsSection />
    </div>
  )
}
