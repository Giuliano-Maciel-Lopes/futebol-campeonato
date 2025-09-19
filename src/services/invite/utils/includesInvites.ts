import { Prisma } from "@prisma/client";

// Define o include padronizado
export const inviteInclude: Prisma.InviteInclude = {
  team: { select: { name: true } },
  sender: { select: { user: { select: { id: true } } } },
  receiver: { select: { user: { select: { id: true } } } },
};
