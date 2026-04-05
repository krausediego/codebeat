import { useLocation, useNavigate } from "@tanstack/react-router"
import { MenuItems } from "."

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

      <MenuItems />
    </div>
  )
}
