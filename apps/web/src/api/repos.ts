import { client } from "@/lib/client"

export async function reposApi() {
  const { data, error } = await client.api.v1.repos.get()

  if (error) throw error

  return data
}
