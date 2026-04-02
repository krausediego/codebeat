import { Skeleton } from "@/components/ui/skeleton"

export function LanguagesCardSkeleton() {
  return (
    <div className="space-y-6 rounded-md bg-card p-8">
      <p className="text-xs font-light text-muted-foreground uppercase transition-transform">
        LINGUAGENS
      </p>
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => {
          return <Skeleton className="h-5 w-full" />
        })}
      </div>
    </div>
  )
}
