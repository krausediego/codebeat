import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import { useSignIn } from "@/modules/home/hooks"
import { GitHubLogoIcon } from "@radix-ui/react-icons"

export function FifthSection() {
  const { mutateAsync, isPending } = useSignIn()

  return (
    <Section className="gap-6">
      <h1 className="max-w-xl text-4xl font-bold text-foreground">
        Pronto para começar?
      </h1>

      <p className="max-w-xl text-muted-foreground">
        Junte-se a milhares de desenvolvedores que já estão acompanhando suas
        métricas.
      </p>

      <Button
        onClick={async () => await mutateAsync()}
        disabled={isPending}
        className="h-16 gap-4 px-6 text-base"
      >
        <GitHubLogoIcon className="size-6" />
        Entrar com Github
      </Button>
    </Section>
  )
}
