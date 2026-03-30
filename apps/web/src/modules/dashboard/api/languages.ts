import { client } from "@/lib/client"

export async function languagesApi() {
  const { data, error } = await client.api.v1.language.get()

  if (error) throw error

  return data
}
