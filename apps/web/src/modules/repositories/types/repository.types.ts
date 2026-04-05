import { client } from "@/lib/client"

type ReposResponse = Awaited<ReturnType<typeof client.api.v1.repos.get>>

export type ReposData = NonNullable<ReposResponse["data"]>["data"][number]
