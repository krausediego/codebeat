import { useIsFetching } from "@tanstack/react-query"
import { CommitsCard, CommitsCardSkeleton } from "."

export function Commits() {
  const isFetching =
    useIsFetching({
      predicate: (query) =>
        ["commits"].some((key) => query.queryKey.includes(key)),
    }) > 0

  if (isFetching) {
    return <CommitsCardSkeleton />
  }

  return <CommitsCard />
}
