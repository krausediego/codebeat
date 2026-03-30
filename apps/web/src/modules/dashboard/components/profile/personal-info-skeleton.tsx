import { Skeleton } from "@/components/ui/skeleton"

export function PersonalInfoSkeleton() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="size-24 rounded-full" />

      <div className="space-y-2">
        <Skeleton className="h-8 w-72" />
        <Skeleton className="h-6 w-64" />
      </div>
    </div>
  )
}
