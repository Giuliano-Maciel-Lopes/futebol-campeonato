import { z } from "zod";

// Schema dos parâmetros de busca
export const listPlayerParamsSchema = z.object({
  searchName:z.string().trim().min(1, "1 carac no minimo").optional(),
  goals: z.coerce.boolean().optional(),
  assists: z.coerce.boolean().optional(),
  participatory:z.coerce.boolean().optional()


});

// Inferir tipo para TypeScript
export type ListPlayerParams = z.infer<typeof  listPlayerParamsSchema>;
