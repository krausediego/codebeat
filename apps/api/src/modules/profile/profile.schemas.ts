import z from "zod";
import { defineSchema } from "@/infra";

export const profileSchema = defineSchema({
  response: {
    200: z.object({}),
  },
  detail: {
    tags: [""],
    summary: "",
  },
});

export namespace ProfileSchema {
  export type GetParams = z.infer<typeof profileSchema.body>;
  export type GetResponse = z.infer<(typeof profileSchema.response)[200]>;
}
