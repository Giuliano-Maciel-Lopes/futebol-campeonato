import { z } from "zod";

export const MatchBodySchema = z.object({
  stage: z.enum(["GROUP", "QUARTAS", "SEMI", "FINAL"]),

  team1Id: z.uuid(),
  team2Id: z.uuid(),

  date: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  }, z.date()), // trasnformando string em date 
});
export type MatchBodyInput = z.infer<typeof MatchBodySchema>;
