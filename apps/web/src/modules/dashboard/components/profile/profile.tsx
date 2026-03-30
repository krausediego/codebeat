import { useIsFetching } from "@tanstack/react-query"
import {
  PersonalInfoSkeleton,
  ProfileBadgesSkeleton,
  PersonalInfo,
  ProfileBadges,
} from "."

export function Profile() {
  const isFetching =
    useIsFetching({
      predicate: (query) =>
        ["profile", "commits", "languages", "pull-requests"].some((key) =>
          query.queryKey.includes(key)
        ),
    }) > 0

  return (
    <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
      {isFetching ? (
        <>
          <PersonalInfoSkeleton />
          <ProfileBadgesSkeleton />
        </>
      ) : (
        <>
          <PersonalInfo />
          <ProfileBadges />
        </>
      )}
    </div>
  )
}
