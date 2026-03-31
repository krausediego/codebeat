import z from "zod";
import { defineSchema } from "@/infra";
import { RestEndpointMethodTypes } from "@octokit/rest";

type GithubRepos =
  RestEndpointMethodTypes["repos"]["listForAuthenticatedUser"]["response"]["data"];

export const repoSchema = defineSchema({
  response: {
    200: z.object({
      data: z.custom<GithubRepos>(),
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
