import { z } from "zod";

export const PlayerBodySchema = z.object({
   nameCart: z.string().trim().min(1, "min 1 caracter"),
  position: z.enum(
    ["GOLEIRO", "DEFENSOR", "MEIOCAMPO", "ATACANTE"],
    "escolha uma opçao"
  ),
  number: z.coerce.number().int().positive("O número deve ser positivo"),
  photoUrl: z.string().optional(),
  role: z.enum(["PLAYER", "CAPITAO"]).optional(),
});

export type PlayerInput = z.infer<typeof PlayerBodySchema>;
