import { ContentLayout } from "@/components/admin-layout/content-layout"
import { HeatmapCalendar } from "@/components/ui/heatmap"
import { Separator } from "@/components/ui/separator"
import { MetricCards } from "@/modules/dashboard/components"
import { useQueryCommits } from "@/modules/dashboard/hooks"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/dashboard/")({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: commits } = useQueryCommits()

  return (
    <ContentLayout title="terminal / overview">
      <MetricCards />
      <HeatmapCalendar
        className="col-span-2"
        title="Atividade de commits"
        data={
          commits?.heatmap.map((data) => {
            return {
              date: data.date,
              value: data.count,
            }
          }) ?? []
        }
        axisLabels
      />
    </ContentLayout>
  )
}
