import { useIsFetching } from "@tanstack/react-query"
import { useQueryCommits, useQueryPullRequests } from "../../hooks"
import {
  CustomMetricCardSkeleton,
  CustomMetricCardContent,
  CustomMetricCardRoot,
  CustomMetricCardTitle,
  CustomMetricCardValue,
} from "."

export function MetricCards() {
  const { data: commits } = useQueryCommits()
  const { data: pullRequests } = useQueryPullRequests()

  const isFetching =
    useIsFetching({
      predicate: (query) =>
        ["commits", "pull-requests"].some((key) =>
          query.queryKey.includes(key)
        ),
    }) > 0

  if (isFetching) {
    return (
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CustomMetricCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
      <CustomMetricCardRoot>
        <CustomMetricCardTitle>commits</CustomMetricCardTitle>
        <CustomMetricCardContent>
          <CustomMetricCardValue>{commits?.commits30d}</CustomMetricCardValue>
        </CustomMetricCardContent>
      </CustomMetricCardRoot>

      <CustomMetricCardRoot>
        <CustomMetricCardTitle>ofensiva</CustomMetricCardTitle>
        <CustomMetricCardContent>
          <CustomMetricCardValue>
            {commits?.currentStreak}
          </CustomMetricCardValue>
        </CustomMetricCardContent>
      </CustomMetricCardRoot>

      <CustomMetricCardRoot>
        <CustomMetricCardTitle>PRs mergeadas</CustomMetricCardTitle>
        <CustomMetricCardContent>
          <CustomMetricCardValue>{pullRequests?.merged}</CustomMetricCardValue>
        </CustomMetricCardContent>
      </CustomMetricCardRoot>

      <CustomMetricCardRoot>
        <CustomMetricCardTitle>issues</CustomMetricCardTitle>
        <CustomMetricCardContent>
          <CustomMetricCardValue>
            {pullRequests?.issues?.total}
          </CustomMetricCardValue>
        </CustomMetricCardContent>
      </CustomMetricCardRoot>
    </div>
  )
}
