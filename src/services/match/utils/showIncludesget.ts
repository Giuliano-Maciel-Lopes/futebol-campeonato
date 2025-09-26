import { Prisma } from "@prisma/client";


export const matchIncludeShow: Prisma.MatchInclude = {
  team1: {
    select: {
      id:true, 
      name: true,
      photoUrl: true,
      players: {
        select: {
          id: true,
          nameCart: true,
        },
      },
    },
  },
  team2: {
    select: {
       id:true, 
      name: true,
      photoUrl: true,
      players: {
        select: {
          id: true,
          nameCart: true,
        },
      },
    },
  },
  events: {
    select: {
      type: true,
      player: {
        select: {
          id: true,
          nameCart: true,
          teamId: true,
        },
      },
    },
  },
};
