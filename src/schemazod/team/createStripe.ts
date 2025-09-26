import { z } from "zod";

export const TeamBodySchemaStripe = z.object({
  name: z.string().min(1, "Nome do time é obrigatório"),

});

export type TeamBodySchemaInputStripe = z.infer<typeof TeamBodySchemaStripe>;
