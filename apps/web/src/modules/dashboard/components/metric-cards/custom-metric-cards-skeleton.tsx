import { Skeleton } from "@/components/ui/skeleton"
import { CustomMetricCardContent, CustomMetricCardRoot } from "."

export function CustomMetricCardSkeleton() {
  return (
    <CustomMetricCardRoot>
      <Skeleton className="h-3 w-24" />
      <CustomMetricCardContent>
        <Skeleton className="h-6 w-16" />
      </CustomMetricCardContent>
    </CustomMetricCardRoot>
  )
}
