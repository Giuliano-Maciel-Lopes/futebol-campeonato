import { z } from "zod";

export const InviteUpdateSchema = z.object({
  status: z.enum(["PENDING", "ACCEPTED","REJECT" ]).optional(),
});

export type InviteUpdate = z.infer<typeof InviteUpdateSchema>;
