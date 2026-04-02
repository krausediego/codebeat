import { ContentLayout } from "@/components/admin-layout"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/repositories/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <ContentLayout title="repositórios / overview">diego</ContentLayout>
}
