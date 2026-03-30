import z from "zod";
import { defineSchema } from "@/infra";
import { PullRequest } from ".";

export const pullRequestSchema = defineSchema({
  response: {
    200: z.object({
      total: z.number(),
      open: z.number(),
      merged: z.number(),
      closed: z.number(),
      avgMergeTimeHours: z.number().nullable(),
      last12Months: z.custom<PullRequest.MonthlyCount[]>(),
      issues: z.object({
        total: z.number(),
        open: z.number(),
        closed: z.number(),
      }),
    }),
  },
  detail: {
    tags: ["Pull Request"],
    summary: "Get pull requests",
  },
});

export namespace PullRequestSchema {
  export type GetResponse = z.infer<(typeof pullRequestSchema.response)[200]>;
}
