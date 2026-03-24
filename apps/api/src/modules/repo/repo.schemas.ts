import z from "zod";
import { defineSchema } from "@/infra";

export const repoSchema = defineSchema({
  response: {
    200: z.any(),
  },
  detail: {
    tags: ["Repos"],
    summary: "List repos",
  },
});

export namespace RepoSchema {
  export type GetResponse = z.infer<(typeof repoSchema.response)[200]>;
}
