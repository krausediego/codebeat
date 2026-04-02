import { HeatmapCalendar } from "@/components/ui/heatmap"
import { useIsFetching } from "@tanstack/react-query"
import { HeatmapCard, HeatmapSkeleton } from "."

export function Heatmap() {
  const isFetching =
    useIsFetching({
      predicate: (query) =>
        ["commits"].some((key) => query.queryKey.includes(key)),
    }) > 0

  if (isFetching) {
    return <HeatmapSkeleton />
  }

  return <HeatmapCard />
}
