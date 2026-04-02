import { useIsFetching } from "@tanstack/react-query"
import { IssuesCard, IssuesCardSkeleton } from "."

export function Issues() {
  const isFetching =
    useIsFetching({
      predicate: (query) =>
        ["pull-requests"].some((key) => query.queryKey.includes(key)),
    }) > 0

  if (isFetching) {
    return <IssuesCardSkeleton />
  }

  return <IssuesCard />
}
