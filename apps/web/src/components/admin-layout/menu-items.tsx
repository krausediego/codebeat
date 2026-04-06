import { menuItems } from "@/lib/menu-items"
import { useLocation, useNavigate } from "@tanstack/react-router"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { Badge } from "../ui/badge"

export function MenuItems() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <div>
      {menuItems.map(({ icon: Icon, title, href, comingSoon }) => {
        const active = pathname.includes(href)

        return (
          <Button
            variant={active ? "secondary" : "ghost"}
            disabled={comingSoon}
            onClick={() => navigate({ to: href })}
            className={cn(
              "w-full justify-start gap-3 rounded-none px-4 py-6 text-xs uppercase",
              active && "border-l-2 border-l-primary pl-6 text-primary"
            )}
          >
            <Icon />
            {title}
            {comingSoon && (
              <Badge variant="secondary" className="ml-auto">
                Em breve
              </Badge>
            )}
          </Button>
        )
      })}
    </div>
  )
}
