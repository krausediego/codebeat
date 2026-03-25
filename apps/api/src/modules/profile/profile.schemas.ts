import z from "zod";
import { defineSchema } from "@/infra";
import { RestEndpointMethodTypes } from "@octokit/rest";

type GithubProfile =
  RestEndpointMethodTypes["users"]["getAuthenticated"]["response"]["data"];

export const profileSchema = defineSchema({
  response: {
    200: z.custom<GithubProfile>(),
  },
  detail: {
    tags: ["Profile"],
    summary: "Get profile",
  },
});

export namespace ProfileSchema {
  export type GetResponse = z.infer<(typeof profileSchema.response)[200]>;
}
