import { usePagination, usePerPage, useQueryRepos } from "@/hooks"
import { CardRepositoryContent } from "."
import { useRepositories } from "@/modules/repositories/contexts"

export function CardRepository() {
  const {
    pagination: { paginated },
  } = useRepositories()

  return (
    <>
      {paginated.map((repo) => {
        return <CardRepositoryContent key={repo.id} data={repo} />
      })}
    </>
  )
}
