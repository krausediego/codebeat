import "./index.css"
import { Button } from "@/components/ui/button"
import { client } from "./lib/client"

export function App() {
  async function getHealthCheck() {
    const { data, error } = await client.api.v1["health-check"].get()

    if (error) throw error

    console.log("MESSAGE", data.message)
  }

  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component for you.</p>
          <Button className="mt-2" onClick={getHealthCheck}>
            Button
          </Button>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div>
    </div>
  )
}
