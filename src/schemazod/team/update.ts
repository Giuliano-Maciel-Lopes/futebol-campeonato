import { z } from "zod";

export const TeamUpdateSchema = z.object({
  name: z.string().min(1, "Nome do time é obrigatório").optional(),
  photoUrl: z.string().optional(),
});

export type TeamUpdateInput = z.infer<typeof TeamUpdateSchema>;

