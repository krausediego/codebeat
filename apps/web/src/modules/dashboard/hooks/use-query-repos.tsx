import { useQuery } from "@tanstack/react-query"
import { reposApi } from "../api"

export function useQueryRepos() {
  return useQuery({
    queryFn: reposApi,
    queryKey: ["repos"],
  })
}
