import { cn } from "@/lib/utils"

interface CustomMetricCardsProps {
  title: string
  value: string
  percent: string
  className: string
}

const CustomMetricCardRoot = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("space-y-2 rounded-md bg-card p-8 shadow-sm", className)}
      {...props}
    />
  )
}

const CustomMetricCardTitle = ({
  className,
  ...props
}: React.ComponentProps<"p">) => {
  return (
    <p
      className={cn(
        "text-sm font-light tracking-wider text-muted-foreground uppercase",
        className
      )}
      {...props}
    />
  )
}

const CustomMetricCardContent = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return <div className={cn("flex items-end gap-2", className)} {...props} />
}

const CustomMetricCardValue = ({
  className,
  ...props
}: React.ComponentProps<"h1">) => {
  return (
    <h1
      className={cn(
        "text-xl leading-none font-medium text-card-foreground",
        className
      )}
      {...props}
    />
  )
}

const CustomMetricCardPercent = ({
  className,
  ...props
}: React.ComponentProps<"p">) => {
  return <p className={cn("text-xs text-emerald-500", className)} {...props} />
}

export {
  CustomMetricCardRoot,
  CustomMetricCardTitle,
  CustomMetricCardContent,
  CustomMetricCardValue,
  CustomMetricCardPercent,
}
