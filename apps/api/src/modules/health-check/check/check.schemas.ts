import { defineSchema } from "@/infra";
import z from "zod";

export const checkSchema = defineSchema({
  response: {
    200: z.object({
      message: z.string(),
    }),
  },
  detail: {
    tags: ["Health-check"],
    summary: "Check health",
  },
});

export namespace CheckSchema {
  export type GetResponse = z.infer<(typeof checkSchema.response)[200]>;
}
