import { prisma } from "@/database/prisma-config";
import { Prisma, Role } from "@prisma/client";

type Props = {
  role?: Role;
};

export async function listTeam({ role }: Props) {
  const ADM = role === "ADMIN";

  const whereActive: Prisma.TeamWhereInput = ADM ? {} : { isActive: true };
  const fullTeam = await prisma.team.findMany({
    where: { ...whereActive },
    include: {
      players: {
        select: {
          nameCart: true,
          photoUrl: true,
          positionIndex: true,
          id: true,
        },
      },
    },
  });

  return { fullTeam };
}
