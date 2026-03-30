import { client } from "@/lib/client"

export async function profileApi() {
  const { data, error } = await client.api.v1.profile.get()

  if (error) throw error

  return data
}
