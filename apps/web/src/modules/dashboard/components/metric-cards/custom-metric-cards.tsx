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
      className={cn("space-y-4 rounded-md bg-card p-8", className)}
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
        "text-xs font-light text-muted-foreground uppercase",
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
        "text-5xl leading-none font-medium text-card-foreground",
        className
      )}
      {...props}
    />
  )
}

const CustomMetricCardValueDescription = ({
  className,
  ...props
}: React.ComponentProps<"h6">) => {
  return (
    <span
      className={cn(
        "text-sm leading-none font-medium text-card-foreground uppercase",
        className
      )}
      {...props}
    />
  )
}

const CustomMetricCardPercent = ({
  positive = true,
  className,
  ...props
}: React.ComponentProps<"p"> & { positive?: boolean }) => {
  return (
    <p
      className={cn(
        "text-xs uppercase",
        positive ? "text-emerald-500" : "text-destructive",
        className
      )}
      {...props}
    />
  )
}

const CustomMetricDescription = ({
  className,
  ...props
}: React.ComponentProps<"h5">) => {
  return (
    <h5
      className={cn(
        "text-sm leading-none font-medium text-card-foreground uppercase",
        className
      )}
      {...props}
    />
  )
}

export {
  CustomMetricCardRoot,
  CustomMetricCardTitle,
  CustomMetricCardContent,
  CustomMetricCardValue,
  CustomMetricCardValueDescription,
  CustomMetricCardPercent,
  CustomMetricDescription,
}
