import { usePagination, useQueryRepos } from "@/hooks"
import { CardRepositoryContent } from "."

export function CardRepository() {
  const { data: repos } = useQueryRepos()

  const { paginated } = usePagination({ data: repos?.data ?? [], perPage: 9 })

  return (
    <>
      {paginated.map((repo) => {
        return <CardRepositoryContent key={repo.id} data={repo} />
      })}
    </>
  )
}
