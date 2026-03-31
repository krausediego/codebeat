import { useQueryCommits } from "../../hooks"
import { HeatmapCalendar } from "@/components/ui/heatmap"
import {
  CommitsCard,
  IssuesCard,
  LanguagesCard,
  PullRequestsCard,
  ReposCard,
  StreakCard,
} from "."

export function MetricCards() {
  const { data: commits } = useQueryCommits()

  return (
    <>
      <CommitsCard />
      <StreakCard />
      <PullRequestsCard />
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
      <LanguagesCard />
      <IssuesCard />
      <ReposCard />
    </>
  )
}
