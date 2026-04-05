import { menuItems } from "@/lib/menu-items"
import { useLocation, useNavigate } from "@tanstack/react-router"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

export function MenuItems() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <div>
      {menuItems.map(({ icon: Icon, title, href }) => {
        const active = pathname.includes(href)

        return (
          <Button
            variant={active ? "secondary" : "ghost"}
            onClick={() => navigate({ to: href })}
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
  )
}
