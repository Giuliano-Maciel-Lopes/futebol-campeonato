import { z } from "zod";

export const ParamsTeamSchema = z.object({
  search: z.string().min(1).max(50).optional(), // termo de busca opcional
});

export type ParamsTeam = z.infer<typeof ParamsTeamSchema>;
