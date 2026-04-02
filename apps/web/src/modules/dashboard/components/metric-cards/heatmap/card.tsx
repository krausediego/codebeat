import { HeatmapCalendar } from "@/components/ui/heatmap"
import { useQueryCommits } from "@/modules/dashboard/hooks"

export function HeatmapCard() {
  const { data: commits } = useQueryCommits()

  return (
    <div className="space-y-4 bg-card p-8 lg:col-span-2">
      <p className="text-xs font-light text-muted-foreground uppercase">
        PRS MERGEADAS
      </p>
      <HeatmapCalendar
        data={
          commits?.heatmap.map((data) => {
            return {
              date: data.date,
              value: data.count,
            }
          }) ?? []
        }
        cellSize={9}
        cellGap={5}
        legend={{ placement: "bottom", lessText: "Menos", moreText: "Mais" }}
        axisLabels={false}
      />
    </div>
  )
}
