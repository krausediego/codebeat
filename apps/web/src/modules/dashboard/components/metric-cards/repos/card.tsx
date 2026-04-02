import { useQueryRepos } from "@/modules/dashboard/hooks"
import { useMemo } from "react"

export function ReposCard() {
  const { data: repos } = useQueryRepos()

  const topRepos = useMemo(() => {
    if (!repos?.data.length) return []

    return [...(repos.data ?? [])]
      .filter((r) => !r.fork)
      .sort(
        (a, b) =>
          new Date(b?.pushed_at ?? "").getTime() -
          new Date(a?.pushed_at ?? "").getTime()
      )
      .slice(0, 3)
  }, [repos])

  return (
    <div className="space-y-4 rounded-md bg-card p-8">
      <p className="text-xs font-light text-muted-foreground uppercase">
        TOP REPOSITÓRIOS
      </p>
      <div className="divide-y">
        {topRepos?.map((repo) => {
          return (
            <div className="px-6 py-4 transition-colors hover:border-l-2 hover:border-l-primary hover:bg-primary/40">
              <h3 className="text-sm font-semibold uppercase">{repo.name}</h3>
            </div>
          )
        })}
      </div>
    </div>
  )
}
