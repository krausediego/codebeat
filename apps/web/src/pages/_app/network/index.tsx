import { ContentLayout } from "@/components/admin-layout"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/network/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <ContentLayout title="network / overview">diego</ContentLayout>
}
