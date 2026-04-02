import { Skeleton } from "@/components/ui/skeleton"

export function ReposCardSkeleton() {
  return (
    <div className="space-y-4 rounded-md bg-card p-8">
      <p className="text-xs font-light text-muted-foreground uppercase">
        TOP REPOSITÓRIOS
      </p>
      <div className="space-y-4 divide-y">
        {Array.from({ length: 3 }).map((_, i) => {
          return <Skeleton key={i} className="h-8 w-full" />
        })}
      </div>
    </div>
  )
}
