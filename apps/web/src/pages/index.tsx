import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import { createFileRoute } from "@tanstack/react-router"
import { Github } from "lucide-react"

export const Route = createFileRoute("/")({
  component: RouteComponent,
})

function RouteComponent() {
  async function handleConnectGithub() {
    const { data, error } = await auth.signIn.social({
      provider: "github",
      callbackURL: "http://localhost:5173",
    })

    if (error) throw error

    console.log("data", data)
  }

  return (
    <main>
      <Button onClick={handleConnectGithub}>
        <Github />
        Conectar no github
      </Button>
    </main>
  )
}
