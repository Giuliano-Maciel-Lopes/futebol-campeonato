import { prisma } from "@/database/prisma-config";
import { AppError } from "@/utils/AppEroor";

export async function showTeamId(id: string) {
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

  if (!teamId) {
    throw new AppError("Time não encontrado ", 404);
  }

  return { teamId };
}
