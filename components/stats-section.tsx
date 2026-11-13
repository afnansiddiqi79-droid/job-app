import {
  BriefcaseBusiness,
  ChartColumn,
  Search,
  Star,
  type LucideIcon,
} from "lucide-react"

import { Card } from "@/components/ui/card"

type Stat = {
  icon: LucideIcon
  value: string
  label: string
}

const stats: Stat[] = [
  { icon: BriefcaseBusiness, value: "50K", label: "Active Jobs" },
  { icon: ChartColumn, value: "12K", label: "Companies" },
  { icon: Search, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
]

export function StatsSection() {
  return (
    <ul className="relative z-10 mx-auto -mt-16 grid w-full max-w-6xl grid-cols-1 gap-3 px-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <li key={stat.label}>
          <Card className="gap-6 py-8 backdrop-blur">
            <stat.icon
              className="mx-6 size-5 text-muted-foreground"
              aria-hidden="true"
            />
            <div className="px-6">
              <p className="text-4xl font-semibold tracking-tight">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  )
}
