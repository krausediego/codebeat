import logo from "@/assets/logo.svg"

export function HomeFooter() {
  return (
    <footer className="w-full">
      <div className="container m-auto flex flex-col items-center lg:flex-row lg:justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} className="size-14" />
          <h2 className="text-2xl font-semibold text-foreground">Codebeat</h2>
        </div>

        <p className="text-sm text-muted-foreground">
          © 2025 Codebeat. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
