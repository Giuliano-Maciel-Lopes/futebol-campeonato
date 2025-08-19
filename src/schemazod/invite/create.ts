import { z } from "zod";

export const InviteBodySchema = z.object({
  receiverId: z.uuid(),
  teamId: z.uuid(),
});

export type InviteBodyInput = z.infer<typeof InviteBodySchema>;
