import { useQuery } from "@tanstack/react-query"
import { commitsApi } from "../api"

export function useQueryCommits() {
  return useQuery({
    queryFn: commitsApi,
    queryKey: ["commits"],
  })
}
