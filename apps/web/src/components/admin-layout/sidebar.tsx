import { menuItems } from "@/lib/menu-items"
import { SidebarHeader } from "./sidebar-header"
import { Button } from "../ui/button"
import { useLocation } from "@tanstack/react-router"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen w-80 border-r">
      <SidebarHeader />

      <div>
        {menuItems.map(({ icon: Icon, title, href }) => {
          const active = pathname.includes(href)

          return (
            <Button
              variant={active ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start rounded-none px-4 py-6 text-xs uppercase",
                active && "border-l-2 border-l-primary pl-6 text-primary"
              )}
            >
              <Icon />
              {title}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
