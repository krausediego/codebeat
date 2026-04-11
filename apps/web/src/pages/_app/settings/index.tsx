import { ContentLayout } from "@/components/admin-layout"
import { ProfileSection } from "@/modules/settings/components"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/settings/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ContentLayout title="configurações / overview" className="p-8 lg:flex">
      <ProfileSection />
    </ContentLayout>
  )
}
