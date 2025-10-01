import { prisma } from "@/database/prisma-config";
import { AppError } from "@/utils/AppEroor";
import {
  findPlayerById,
  findPlayerByUserId,
  
} from "@/utils/prismaHelpersutils";

type Props = {
  playerId: string;
  userId: string;
};

export async function updateByTeamIdPlayers({ playerId, userId }: Props) {
  const { player: playerToRemove } = await findPlayerById(playerId);
  const { player: captain } = await findPlayerByUserId(userId);

  if (!captain.captainOf || captain.captainOf.id !== playerToRemove.teamId) {
    throw new AppError("Só o capitão do time pode expulsar um jogador do time");
  }

  const removedPlayer = await prisma.player.update({
    where: { id: playerToRemove.id },
    data: { teamId: null },
  });

  return { removedPlayer };
}

