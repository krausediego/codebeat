interface CardStepProps {
  order: string
  title: string
  description: string
}

export function CardStep({ order, title, description }: CardStepProps) {
  return (
    <div className="space-y-2 py-6 text-start">
      <p className="tracking-wider text-primary">{order}</p>
      <h3 className="text-2xl font-semibold text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
