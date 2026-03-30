import { useQuery } from "@tanstack/react-query"
import { pullRequestsApi } from "../api"

export function useQueryPullRequests() {
  return useQuery({
    queryFn: pullRequestsApi,
    queryKey: ["pull-requests"],
  })
}
