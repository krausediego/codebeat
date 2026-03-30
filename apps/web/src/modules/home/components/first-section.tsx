import { Button } from "@/components/ui/button"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { useSignIn } from "@/modules/home/hooks"

export function FirstSection() {
  const { mutateAsync, isPending } = useSignIn()

  return (
    <>
      <div className="flex items-center gap-2 rounded-full border bg-secondary px-4 py-1">
        <div className="size-2 animate-pulse rounded-full bg-primary" />
        <p className="text-xs text-muted-foreground">
          Novo - Perfil público disponível
        </p>
      </div>

      <div className="text-center text-7xl font-bold">
        <h1 className="text-foreground">Seu código.</h1>
        <h1 className="text-primary">Em números.</h1>
      </div>

      <h3 className="max-w-xl px-4 text-center text-lg text-muted-foreground">
        Transforme sua atividade no GitHub em insights poderosos. Acompanhe,
        analise e compartilhe seu progresso como desenvolvedor.
      </h3>

      <div className="m-auto flex flex-col gap-3">
        <Button
          onClick={async () => await mutateAsync()}
          disabled={isPending}
          className="h-16 gap-4 px-6 text-base"
        >
          <GitHubLogoIcon className="size-6" />
          Entrar com Github
        </Button>
        <p className="text-xs text-muted-foreground">
          Gratuito · Sem cartão · Sem burocracia
        </p>
      </div>
    </>
  )
}
