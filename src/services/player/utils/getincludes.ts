import { Prisma } from "@prisma/client";

export const playerInclude = {
  team: {
    select: {
      photoUrl: true,
      name: true,
      captain: {
        select: {
          id: true,
          userId: true,
          nameCart: true,
        },
      },
    },
  },
} as Prisma.PlayerInclude;
