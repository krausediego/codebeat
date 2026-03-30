import { Section } from "@/components/section"
import { SECTION_CARDS } from "@/modules/home/constants"
import { CardSection } from "@/modules/home/components"

export function ThirdSection() {
  return (
    <Section>
      <div className="container flex flex-col items-start gap-12">
        <div className="space-y-2 text-start">
          <h3 className="tracking-wider text-muted-foreground">RECURSOS</h3>
          <h1 className="text-3xl font-semibold text-foreground">
            Tudo o que você precisa.
          </h1>
        </div>

        <div className="grid grid-cols-1 divide-x divide-y rounded border lg:grid-cols-3">
          {SECTION_CARDS.map((card, i) => (
            <CardSection
              key={i}
              icon={card.icon}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
