import { LucideIcon } from "lucide-react"

interface CardSectionProps {
  icon: LucideIcon
  title: string
  description: string
}

export function CardSection({
  icon: Icon,
  title,
  description,
}: CardSectionProps) {
  return (
    <div className="space-y-6 bg-transparent p-8 text-start transition-colors hover:bg-muted-foreground/10">
      <div className="flex size-8 items-center justify-center rounded-sm border bg-muted-foreground/20 p-2">
        <Icon className="size-4 text-foreground" />
      </div>
      <div className="space-y-2">
        <h1 className="text-xl font-bold text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
