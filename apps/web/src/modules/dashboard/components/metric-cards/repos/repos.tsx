import { useIsFetching } from "@tanstack/react-query"
import { ReposCard, ReposCardSkeleton } from "."

export function Repos() {
  const isFetching =
    useIsFetching({
      predicate: (query) =>
        ["repos"].some((key) => query.queryKey.includes(key)),
    }) > 0

  if (isFetching) {
    return <ReposCardSkeleton />
  }

  return <ReposCard />
}
