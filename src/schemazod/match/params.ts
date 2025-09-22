import { MatchStatus, Stage } from "@prisma/client";
import z from "zod";

export const ParamsSchemaMatch = z.object({
  stage: z.enum([Stage.GROUP, Stage.SEMI, Stage.FINAL , Stage.QUARTAS]).optional(),       
  status: z.enum([MatchStatus.SCHEDULED, MatchStatus.ONGOING, MatchStatus.FINISHED]).optional(),
  timeName: z.string().min(1, "O nome do time é obrigatório").optional(),
});


export type ParamsMatch = z.infer<typeof ParamsSchemaMatch>;
