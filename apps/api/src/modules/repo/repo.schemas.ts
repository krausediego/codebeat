import z from "zod";
import { defineSchema } from "@/infra";
import { Repo } from ".";

export const repoSchema = defineSchema({
  response: {
    200: z.object({
      data: z.custom<Repo.GithubReposResponse>(),
      total: z.number(),
    }),
  },
  detail: {
    tags: ["Repos"],
    summary: "List repos",
  },
});

export namespace RepoSchema {
  export type GetResponse = z.infer<(typeof repoSchema.response)[200]>;
}
