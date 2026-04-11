import { ContentLayout } from "@/components/admin-layout"
import { RepositoriesHeader } from "@/modules/repositories/components"
import { CardRepository } from "@/modules/repositories/components/card-repository"
import { RepositoriesProvider } from "@/modules/repositories/contexts"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/repositories/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <RepositoriesProvider>
      <ContentLayout
        title="repositórios / overview"
        className="lg:grid-cols-4 xl:grid-rows-4"
      >
        <RepositoriesHeader />
        <div className="col-span-4 row-span-3 grid grid-cols-1 grid-rows-2 divide-x divide-y lg:grid-cols-3">
          <CardRepository />
        </div>
      </ContentLayout>
    </RepositoriesProvider>
  )
}
