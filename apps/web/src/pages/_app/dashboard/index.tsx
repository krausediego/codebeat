import { HeatmapCalendar } from "@/components/ui/heatmap"
import { Separator } from "@/components/ui/separator"
import { MetricCards } from "@/modules/dashboard/components/metric-cards"
import { Profile } from "@/modules/dashboard/components/profile"
import { useQueryCommits } from "@/modules/dashboard/hooks"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/dashboard/")({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: commits } = useQueryCommits()

  return (
    <div className="container m-auto space-y-8 py-12">
      <Profile />
      <Separator />
      <MetricCards />
      <HeatmapCalendar
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
    </div>
  )
}
