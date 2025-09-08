import { prisma } from "@/database/prisma-config";
import { ListPlayerParams } from "@/schemazod/player/list";
import { Player } from "@prisma/client";

type Props = {
  params: ListPlayerParams;
};

export async function listplayer({ params }: Props) {
  const { assists, goals, searchName ,participatory } = params;

  if (participatory) {
  // SQL puro pra somar gols + assists e pegar top 50 n sabi que isso era possivel no prisma 
  const playersfull = await prisma.$queryRaw<Player>`
     SELECT *, (goals + assists) AS participations
    FROM "Player"
    ORDER BY participations DESC
    LIMIT 50
  `;
  return { playersfull };
}

  const playersfull = await prisma.player.findMany({
    where: {
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
