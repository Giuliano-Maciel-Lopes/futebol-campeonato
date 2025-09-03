import { z } from "zod";

export const PlayerBodySchemaupdate = z.object({
  nameCart: z.string().trim().min(1, "min 1 caracter").optional(),
  position: z
    .enum(["GOLEIRO", "DEFENSOR", "MEIOCAMPO", "ATACANTE"], "escolha uma opçao")
    .optional(),
  number: z.coerce
    .number()
    .int()
    .positive("O número deve ser positivo")
    .optional(),
  photoUrl: z.string().optional(),
});

export type updatePlayerInput = z.infer<typeof PlayerBodySchemaupdate>;
