import { Prisma } from "@prisma/client";

// helpers/prismaIncludes.ts
export const matchInclude: Prisma.MatchInclude = {
  team1: {
    select: {
      name: true,
      photoUrl: true,
      id:true
    },
  },
  team2: {
    select: {
      name: true,
      photoUrl: true,
       id:true
    },
  },
};
