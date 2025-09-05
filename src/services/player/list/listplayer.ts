import { prisma } from "@/database/prisma-config";
import { ListPlayerParams } from "@/schemazod/player/list";

type Props = {
  params: ListPlayerParams;
};

export async function listplayer({ params }: Props) {
  const { assists, goals, searchName } = params;

  const playersfull = await prisma.player.findMany({
    where: {
      nameCart: { contains: searchName, mode: "insensitive" },
    },
    orderBy: assists
      ? { assists: "desc" }
      : goals
      ? { goals: "desc" }
      : { nameCart: "asc" },
    take: goals || assists ? 10 : undefined,
  });
  return { playersfull };
}
