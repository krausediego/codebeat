import logo from "@/assets/logo.svg"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { MENU_ITEMS } from "@/modules/home/constants"
import { useSignIn } from "@/modules/home/hooks"

export function Header() {
  const { mutateAsync, isPending } = useSignIn()

  return (
    <header className="sticky top-0 h-14 w-full bg-background/90 shadow-sm">
      <div className="container m-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} className="size-14" />
          <h2 className="hidden text-2xl font-semibold text-foreground md:flex">
            Codebeat
          </h2>
        </div>

        <div className="flex items-center gap-4">
          {MENU_ITEMS.map((menu) => {
            return (
              <Button variant="ghost" size="lg">
                {menu.name}
              </Button>
            )
          })}
        </div>

        <Button
          onClick={async () => await mutateAsync()}
          disabled={isPending}
          variant="outline"
          className="gap-3"
        >
          <GitHubLogoIcon />
          Entrar
        </Button>
      </div>
    </header>
  )
}
