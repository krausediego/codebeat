import { useIsFetching } from "@tanstack/react-query"
import { PullRequestsCard, PullRequestsCardSkeleton } from "."
import { useQueryPullRequests } from "@/modules/dashboard/hooks"

export function PullRequests() {
  const { data: pullRequests, isFetching } = useQueryPullRequests()

  if (isFetching) return <PullRequestsCardSkeleton />

  return <PullRequestsCard />
}
