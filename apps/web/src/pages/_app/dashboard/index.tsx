import { ContentLayout } from "@/components/admin-layout/content-layout"
import { MetricCards } from "@/modules/dashboard/components"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/dashboard/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ContentLayout title="terminal / overview">
      <MetricCards />
    </ContentLayout>
  )
}
