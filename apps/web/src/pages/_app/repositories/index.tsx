import { ContentLayout } from "@/components/admin-layout"
import { RepositoriesHeader } from "@/modules/repositories/components"
import { CardRepository } from "@/modules/repositories/components/card-repository.tsx"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/repositories/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ContentLayout
      title="repositórios / overview"
      className="lg:grid-cols-4 xl:grid-rows-5"
    >
      <RepositoriesHeader />
      <div className="col-span-4 row-span-4 grid grid-cols-3 divide-x divide-y">
        <CardRepository />
      </div>
    </ContentLayout>
  )
}
