import { useIsFetching } from "@tanstack/react-query"
import { PullRequestsCard, PullRequestsCardSkeleton } from "."

export function PullRequests() {
  const isFetching =
    useIsFetching({
      predicate: (query) =>
        ["pull-requests"].some((key) => query.queryKey.includes(key)),
    }) > 0

  if (isFetching) {
    return <PullRequestsCardSkeleton />
  }

  return <PullRequestsCard />
}
