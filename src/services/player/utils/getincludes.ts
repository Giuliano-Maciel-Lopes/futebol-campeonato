import { Prisma } from "@prisma/client";

export const playerInclude = {
  team: {
    select: {
      photoUrl: true,
      name: true,
    },
  },
} as Prisma.PlayerInclude;
