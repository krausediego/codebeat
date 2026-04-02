import {
  Commits,
  Heatmap,
  Issues,
  Languages,
  PullRequests,
  Repos,
  Streak,
} from "."

export function MetricCards() {
  return (
    <>
      <Commits />
      <Streak />
      <PullRequests />
      <Heatmap />
      <Languages />
      <Issues />
      <Repos />
    </>
  )
}
