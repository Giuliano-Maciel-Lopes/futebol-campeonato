import { z } from "zod";

export const InviteUpdateSchema = z.object({
  status: z.enum(["PENDING", "ACCEPTED", "REJECTED", "CANCELED"]).optional(),
});

export type InviteUpdate = z.infer<typeof InviteUpdateSchema>;
