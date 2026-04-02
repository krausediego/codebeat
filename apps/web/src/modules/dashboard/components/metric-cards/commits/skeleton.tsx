import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export function CommitsCardSkeleton() {
  return (
    <div className="row-span-2 flex flex-col justify-between rounded-md bg-card p-8">
      <div className="space-y-4">
        <p className="text-xs font-light text-muted-foreground uppercase">
          commits / 30 dias
        </p>
        <div className="flex items-end gap-2">
          <Skeleton className="h-14 w-22" />

          <Skeleton className="h-6 w-32" />
        </div>
      </div>

      <div className="space-y-24">
        <div className="space-y-4">
          <Separator />
          <p className="text-xs font-light text-muted-foreground uppercase">
            TOTAL ÚLTIMO ANO
          </p>
          <h1 className="text-5xl leading-none font-medium text-card-foreground">
            <Skeleton className="h-14 w-22" />
          </h1>
        </div>

        <div className="flex items-end gap-1">
          {Array.from({ length: 12 }).map((_, i) => {
            return <Skeleton key={i} className="h-25 w-full" />
          })}
        </div>
      </div>
    </div>
  )
}
