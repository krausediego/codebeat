import { cn } from "@/lib/utils"
import { Header } from "."

export function ContentLayout({
  title,
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & { title: string }) {
  return (
    <div className="min-h-screen w-full">
      <Header title={title} />

      <div
        className={cn(
          "flex h-[calc(100vh-64px)] w-full flex-col divide-x divide-y lg:grid lg:grid-cols-3 xl:grid-rows-3",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}
