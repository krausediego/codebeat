import { LogOut } from "lucide-react"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { useQueryProfile } from "@/hooks"

export function UserManagement() {
  const { data: profile } = useQueryProfile()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={profile?.avatar_url} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-3xs p-3">
        <DropdownMenuGroup className="space-y-1.5">
          <h3 className="text-sm font-medium text-primary">{profile?.name}</h3>
          <p className="text-xs text-muted-foreground">@{profile?.login}</p>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Button variant="destructive" className="w-full">
            <LogOut />
            Sair
          </Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
