import { z } from "zod";

export const PlayerBodySchemaupdate = z.object({
  nameCart: z.string().min(1, "O nome é obrigatório").optional(),
  position: z.enum(
    ["GOLEIRO", "DEFENSOR", "MEIOCAMPO", "ATACANTE"],
    "escolha uma opçao"
  ).optional(),
  number: z.number().int().positive("O número deve ser positivo").optional(),
  photoUrl: z.string().url().optional(),
});

export type updatePlayerInput = z.infer<typeof PlayerBodySchemaupdate>;
