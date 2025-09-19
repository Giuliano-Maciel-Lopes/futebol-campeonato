import { Prisma } from "@prisma/client";

// Define o include padronizado
export const inviteInclude: Prisma.InviteInclude = {
  team: { select: { name: true } },
  sender: { select: { nameCart: true, user: { select: { id: true } } } },
  receiver: { select: { nameCart: true, user: { select: { id: true } } } },
};
