import { z } from "zod";

export const PlayerBodySchema = z.object({
  nameCart: z.string().min(1, "O nome é obrigatório"),
  position: z.enum(
    ["GOLEIRO", "DEFENSOR", "MEIOCAMPO", "ATACANTE"],
    "escolha uma opçao"
  ),
  number: z.number().int().positive("O número deve ser positivo"),
  photoUrl: z.string().url().optional(),
});

export type PlayerInput = z.infer<typeof PlayerBodySchema>;
