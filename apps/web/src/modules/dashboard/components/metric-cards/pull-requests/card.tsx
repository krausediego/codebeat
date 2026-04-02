import { useQueryPullRequests } from "@/modules/dashboard/hooks"

export function PullRequestsCard() {
  const { data: pullRequests } = useQueryPullRequests()

  return (
    <div className="space-y-4 rounded-md bg-card p-8">
      <p className="text-xs font-light text-muted-foreground uppercase">
        PRS MERGEADAS
      </p>
      <h1 className="text-5xl leading-none font-medium text-emerald-400">
        {pullRequests?.merged}
      </h1>
      <h5 className="text-xs leading-none font-light text-card-foreground">
        {pullRequests?.total} TOTAL · {pullRequests?.open} ABERTA
      </h5>
    </div>
  )
}
