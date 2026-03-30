import { client } from "@/lib/client"

export async function commitsApi() {
  const { data, error } = await client.api.v1.commit.get()

  if (error) throw error

  return data
}
