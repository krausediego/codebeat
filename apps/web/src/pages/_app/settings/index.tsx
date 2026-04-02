import { ContentLayout } from "@/components/admin-layout"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/settings/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <ContentLayout title="configurações / overview">diego</ContentLayout>
}
