import { Skeleton } from "@/components/ui/skeleton"

export function HeatmapSkeleton() {
  return (
    <div className="col-span-2 space-y-4 rounded-md bg-card p-8">
      <p className="text-xs font-light text-muted-foreground uppercase">
        ATIVIDADE DE COMMITS
      </p>
      <Skeleton className="h-28 w-full" />
    </div>
  )
}
