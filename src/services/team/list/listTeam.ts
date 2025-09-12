import { prisma } from "@/database/prisma-config";

export async function listTeam() {
  const fullTeam = await prisma.team.findMany({
    include: {
      players: {
        select: {
          nameCart: true,
          photoUrl: true,
          positionIndex:true,
          id:true
        },
      },
    },
  });

  return { fullTeam };
}
