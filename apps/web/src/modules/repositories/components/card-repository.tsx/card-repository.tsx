import { useQueryRepos } from "@/hooks"
import { CardRepositoryContent } from "."

export function CardRepository() {
  const { data: repos } = useQueryRepos()

  return (
    <>
      {repos?.data?.map((repo) => {
        return <CardRepositoryContent key={repo.id} data={repo} />
      })}
    </>
  )
}
