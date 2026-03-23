import type { AppType } from "@backend/app.type"
import { treaty } from "@elysiajs/eden"

// @ts-expect-error: bun resolves two elysia instances in monorepo (runtime is fine)
export const client = treaty<AppType>("http://localhost:3333", {
  fetch: {
    credentials: "include",
  },
})
