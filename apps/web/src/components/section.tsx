import { cn } from "@/lib/utils"

export function Section({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <section
      className={cn(
        "flex w-full flex-col items-center px-4 py-32 text-center",
        className
      )}
      {...props}
    />
  )
}
