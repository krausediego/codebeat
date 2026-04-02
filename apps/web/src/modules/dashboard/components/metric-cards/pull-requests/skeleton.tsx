import { Skeleton } from "@/components/ui/skeleton"

export function PullRequestsCardSkeleton() {
  return (
    <div className="space-y-4 rounded-md bg-card p-8">
      <p className="text-xs font-light text-muted-foreground uppercase">
        PRS MERGEADAS
      </p>
      <Skeleton className="h-14 w-22" />

      <Skeleton className="h-4 w-24" />
    </div>
  )
}
