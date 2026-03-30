import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import { ElementType } from "react"

// custom-badge.tsx
interface CustomBadgeProps {
  icon: LucideIcon | ElementType
  description: string
  color: string // só a cor base, derivamos o resto aqui
}

export function CustomBadge({
  icon: Icon,
  description,
  color,
}: CustomBadgeProps) {
  return (
    <div
      className="flex items-center gap-2 rounded-sm border px-3 py-1"
      style={{
        backgroundColor: `${color}1a`,
        borderColor: `${color}33`,
      }}
    >
      <Icon className="size-3.5" style={{ color }} />
      <p className="text-sm font-medium" style={{ color: `${color}cc` }}>
        {description}
      </p>
    </div>
  )
}
