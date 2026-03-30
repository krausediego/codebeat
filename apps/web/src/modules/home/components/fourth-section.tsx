import { CardStep } from "@/components/card-step"
import { Section } from "@/components/section"
import { STEPS_CARDS } from "@/modules/home/constants"

export function FourthSection() {
  return (
    <Section>
      <div className="container flex flex-col items-start justify-between gap-14 lg:flex-row lg:gap-0">
        <div className="space-y-4 text-start">
          <h3 className="tracking-wider text-muted-foreground">SETUP</h3>
          <h1 className="text-3xl font-semibold text-foreground">
            Em 3 passos simples
          </h1>
        </div>

        <div className="divide-y">
          {STEPS_CARDS.map((card, i) => (
            <CardStep
              key={i}
              order={card.order}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
