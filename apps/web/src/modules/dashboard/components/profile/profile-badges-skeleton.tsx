import { Skeleton } from "@/components/ui/skeleton"

export function ProfileBadgesSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="h-6 w-28" />
      <Skeleton className="h-6 w-28" />
      <Skeleton className="h-6 w-28" />
    </div>
  )
}
