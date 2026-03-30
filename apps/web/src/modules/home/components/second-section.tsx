import { Section } from "@/components/section"

export function SecondSection() {
  return (
    <Section className="gap-6">
      <h4 className="font-medium tracking-wider text-muted-foreground">
        PARA DEVS QUE SE IMPORTAM
      </h4>

      <h1 className="max-w-xl text-4xl font-bold text-foreground">
        Seu GitHub conta uma história. A gente ajuda a contar melhor.
      </h1>

      <p className="max-w-xl text-muted-foreground">
        Vá além do gráfico verde. Entenda seus padrões de código, identifique
        onde você é mais produtivo e compartilhe um perfil que realmente mostra
        seu valor como desenvolvedor.
      </p>
    </Section>
  )
}
