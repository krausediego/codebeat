import { useQueryPullRequests } from "../../hooks"

export function IssuesCard() {
  const { data: pullRequests } = useQueryPullRequests()

  return (
    <div className="space-y-4 rounded-md bg-card p-8">
      <p className="text-xs font-light text-muted-foreground uppercase">
        ISSUES
      </p>
      <h1 className="text-5xl leading-none font-medium text-amber-400">
        {pullRequests?.issues.total}
      </h1>
      <h5 className="text-xs leading-none font-light text-card-foreground">
        {pullRequests?.issues.closed} FECHADA · {pullRequests?.issues.open}{" "}
        ABERTA
      </h5>
    </div>
  )
}
