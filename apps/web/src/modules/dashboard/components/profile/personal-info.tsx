import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useQueryProfile } from "../../hooks"
import { format } from "date-fns"

export function PersonalInfo() {
  const { data } = useQueryProfile()

  return (
    <div className="flex items-center gap-4">
      <Avatar className="size-24">
        <AvatarImage src={data?.avatar_url} />
      </Avatar>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-wider text-foreground">
          {data?.name}
        </h2>
        <p className="text-sm font-light tracking-wider text-muted-foreground">
          @{data?.login} • Desde{" "}
          {data?.created_at && format(data?.created_at, "dd/MM/yyyy")}
        </p>
      </div>
    </div>
  )
}
