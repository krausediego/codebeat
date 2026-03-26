import z from "zod";
import { defineSchema } from "@/infra";
import { Languages } from "./languages.interface";

export const languagesSchema = defineSchema({
  response: {
    200: z.object({
      languages: z.custom<Languages.LanguageItem[]>(),
      totalBytes: z.number(),
    }),
  },
  detail: {
    tags: ["Language"],
    summary: "List top languages",
  },
});

export namespace LanguagesSchema {
  export type GetResponse = z.infer<(typeof languagesSchema.response)[200]>;
}
