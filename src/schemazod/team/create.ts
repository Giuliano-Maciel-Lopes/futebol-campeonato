import { z } from "zod";

export const TeamBodySchema = z.object({
  name: z.string().min(1, "Nome do time é obrigatório"),
  photoUrl: z.string().optional(),
  captainId: z.uuid("ID do capitão inválido"), 
  groupId : z.uuid("ID do capitão inválido").optional()

});

export type TeamBodySchemaInput = z.infer<typeof TeamBodySchema>;
