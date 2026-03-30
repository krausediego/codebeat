import { client } from "@/lib/client"

export async function pullRequestsApi() {
  const { data, error } = await client.api.v1["pull-request"].get()

  if (error) throw error

  return data
}
