import { useQuery } from "@tanstack/react-query"
import { languagesApi } from "../api"

export function useQueryLanguages() {
  return useQuery({
    queryFn: languagesApi,
    queryKey: ["languages"],
  })
}
