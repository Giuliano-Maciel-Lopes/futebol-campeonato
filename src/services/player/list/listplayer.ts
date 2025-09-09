import { prisma } from "@/database/prisma-config";
import { ListPlayerParams } from "@/schemazod/player/list";
import { Player, Prisma, Role } from "@prisma/client";


type Props = {
  params: ListPlayerParams;
  role:Role
};

export async function listplayer({ params , role }: Props) {
  const ADMIN = role === "ADMIN";
  const whereActive: Prisma.PlayerWhereInput = ADMIN ? {} : { isActive: true };

  const { assists, goals, searchName ,participatory } = params;

  if (participatory) {
  // SQL puro pra somar gols + assists e pegar top 50 n sabi que isso era possivel no prisma 
  const playersfull = await prisma.$queryRaw<Player>`
     SELECT *, (goals + assists) AS participations
    FROM "Player"
      ${!ADMIN ? Prisma.sql`WHERE "isActive" = TRUE` : Prisma.sql``}
    ORDER BY participations DESC
    LIMIT 50
  `;
  return { playersfull };
}

  const playersfull = await prisma.player.findMany({
    where: {
      ...whereActive,
      nameCart: { contains: searchName, mode: "insensitive" },
    },
    orderBy: assists
      ? { assists: "desc" }
      : goals
      ? { goals: "desc" }
      : { nameCart: "asc" },
    take:  goals || assists ? 10 : undefined,
  });
  return { playersfull };
}
