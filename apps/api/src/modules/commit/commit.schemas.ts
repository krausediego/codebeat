import z from "zod";
import { defineSchema } from "@/infra";
import { Commit } from "./commit.interface";

export const commitSchema = defineSchema({
  response: {
    200: z.object({
      commits30d: z.number(),
      totalThisYear: z.number(),
      currentStreak: z.number(),
      longestStreak: z.number(),
      heatmap: z.custom<Commit.HeatmapDay[]>(),
    }),
  },
  detail: {
    tags: ["Commit"],
    summary: "Get commits",
  },
});

export namespace CommitSchema {
  export type GetResponse = z.infer<(typeof commitSchema.response)[200]>;
}
