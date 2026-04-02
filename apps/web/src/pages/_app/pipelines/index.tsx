import { ContentLayout } from "@/components/admin-layout/"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/pipelines/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <ContentLayout title="pipelines / overview">diego</ContentLayout>
}
