import { prisma } from "@/database/prisma-config";
import { findPlayerByUserId } from "@/utils/prismaHelpersutils";

type DeletePlayerByTeamIdRequest = {
  userId: string;
};

export async function updatePlayerByTeamId({
  userId,
}: DeletePlayerByTeamIdRequest) {
  const { player } = await findPlayerByUserId(userId);

  if (player.captainOf) {
    throw new Error(
      "O capitão não pode sair do time sem transferir a faixa ! Entre em contato com uma ADM"
    );
  }

  const updaedeTeamId = await prisma.player.update({
    where: {
      id: player.id,
    },
    data: { teamId: null },
  });

  return {
    updaedeTeamId,
  };
}
