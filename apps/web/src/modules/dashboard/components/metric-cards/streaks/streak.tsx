import { useIsFetching } from "@tanstack/react-query"
import { StreakCard, StreakCardSkeleton } from "."

export function Streak() {
  const isFetching =
    useIsFetching({
      predicate: (query) =>
        ["commits"].some((key) => query.queryKey.includes(key)),
    }) > 0

  if (isFetching) {
    return <StreakCardSkeleton />
  }

  return <StreakCard />
}
