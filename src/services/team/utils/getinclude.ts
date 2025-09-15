import { Prisma } from "@prisma/client";


export const teamInclude = {
  players: {
    select: {
      id: true,
      nameCart: true,
      photoUrl: true,
      positionIndex: true,
    },
  },
} satisfies Prisma.TeamInclude;
