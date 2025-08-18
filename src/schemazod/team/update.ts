import { z } from "zod";

export const TeamUpdateSchema = z.object({
  name: z.string().optional(),
});

export type TeamUpdateInput = z.infer<typeof TeamUpdateSchema>;

