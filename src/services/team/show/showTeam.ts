import { prisma } from "@/database/prisma-config";
import { AppError } from "@/utils/AppEroor";
import { findTeamById } from "@/utils/prismaHelpersutils";

export async function showTeamId(id: string) {
  await  findTeamById(id)

  const teamId = await prisma.team.findFirst({
    where: { id },
    include: {
      players: {
        select: {
          nameCart: true,
          number: true,
        },
      },
    },
  });

 

  return { teamId };
}
