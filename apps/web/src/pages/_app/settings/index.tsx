import { ContentLayout } from "@/components/admin-layout"
import { Separator } from "@/components/ui/separator"
import { ProfileSection, Visibility } from "@/modules/settings/components"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/settings/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ContentLayout
      title="configurações / overview"
      className="flex-col gap-4 divide-x-0 divide-y-0 p-8 lg:flex"
    >
      <ProfileSection />
      <Separator />
      <Visibility />
    </ContentLayout>
  )
}
