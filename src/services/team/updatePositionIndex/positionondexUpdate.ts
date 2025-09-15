import { prisma } from "@/database/prisma-config";
import { TeamFormation } from "@/schemazod/player/updatePositionindex";
import { AppError } from "@/utils/AppEroor";
import {
  findPlayerByUserId,
  findTeamById,
  findUserById,
} from "@/utils/prismaHelpersutils";

type Props = {
  userId: string;
  id: string;
  data: TeamFormation; // posicao de tds os palyer
};

export async function UpdatePositionIndexTeam({ userId, id, data }: Props) {
  const { team } = await findTeamById(id);
  const { player } = await findPlayerByUserId(userId);
  const players = await prisma.player.findMany({
    where: {
      id: { in: data.players.map((p) => p.id) },
    },
  });

  const invalidUpdate = players.find((p) => p.teamId !== team.id);
  if (team.players.length !== data.players.length) {
  throw new AppError(
    "Ops! Algum dado desatualizado: o número de jogadores não bate com o time."
  );
}
  
  if (invalidUpdate) {
    throw new AppError(
      "Algum player informado nao pertence mais a esse time! tente novamente mais tarde"
    );
  }
  if (!player.captainOf || player.captainOf.id !== team.id) {
    throw new AppError("Apenas o capitão deste time pode criar convites", 403);
  }

await prisma.$transaction(
  players.map((p) => {
    const newPos = data.players.find((d) => d.id === p.id)?.positionIndex;
    return prisma.player.update({
      where: { id: p.id },
      data: { positionIndex: newPos! },
    });
  })
);

  
}
