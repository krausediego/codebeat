import { menuItems } from "@/lib/menu-items"
import { Button } from "../ui/button"
import { useLocation, useNavigate } from "@tanstack/react-router"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <div className="hidden min-h-screen w-80 border-r lg:block">
      <div className="flex h-16 w-full items-center border-b p-4">
        <h1 className="text-xl font-semibold text-primary uppercase">
          codebeat
        </h1>
      </div>

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
    </div>
  )
}
