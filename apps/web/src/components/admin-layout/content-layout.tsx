import { cn } from "@/lib/utils"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { LogOut, Search } from "lucide-react"
import { Avatar, AvatarImage } from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { useQueryProfile } from "@/hooks/use-query-profile"

export function ContentLayout({
  title,
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & { title: string }) {
  const { data: profile } = useQueryProfile()

  return (
    <div className="min-h-screen w-full">
      <header className="flex h-16 w-full items-center justify-between border-b p-4">
        <div className="flex items-center gap-8">
          <h1 className="text-xs text-primary uppercase">{title}</h1>

          <InputGroup className="w-auto">
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput placeholder="SEARCH_SYSTEM..." />
          </InputGroup>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src={profile?.avatar_url} />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-3xs p-3">
            <DropdownMenuGroup className="space-y-1.5">
              <h3 className="text-sm font-medium text-primary">
                {profile?.name}
              </h3>
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
      </header>

      <div
        className={cn(
          "grid h-[calc(100vh-64px)] grid-cols-3 grid-rows-3 divide-x divide-y",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}
