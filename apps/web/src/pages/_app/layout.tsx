import { Header } from "@/components/admin-layout/content-layout"
import { Sidebar } from "@/components/admin-layout/sidebar"
import { auth } from "@/lib/auth"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_app")({
  beforeLoad: async () => {
    const { data: session } = await auth.getSession()

    if (!session) {
      throw redirect({
        to: "/",
      })
    }

    return { ...session }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  )
}
