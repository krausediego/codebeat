import { useQuery } from "@tanstack/react-query"
import { profileApi } from "../api"

export function useQueryProfile() {
  return useQuery({
    queryFn: profileApi,
    queryKey: ["profile"],
  })
}
