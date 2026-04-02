import { useIsFetching } from "@tanstack/react-query"
import { LanguagesCard, LanguagesCardSkeleton } from "."

export function Languages() {
  const isFetching =
    useIsFetching({
      predicate: (query) =>
        ["languages"].some((key) => query.queryKey.includes(key)),
    }) > 0

  if (isFetching) {
    return <LanguagesCardSkeleton />
  }

  return <LanguagesCard />
}
