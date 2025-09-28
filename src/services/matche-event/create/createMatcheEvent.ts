import { prisma } from "@/database/prisma-config";
import { MatchEventBodyInput } from "@/schemazod/matche-event/create";
import { findMatchById, findPlayerById } from "@/utils/prismaHelpersutils";
import { updateGolsMatch } from "./updatematch";
import { AppError } from "@/utils/AppEroor";

type createMatcheEvent = {
  data: MatchEventBodyInput;
};

export async function createMatcheEvent({ data }: createMatcheEvent) {
  const { match } = await findMatchById(data.matchId);
  const golsMatch = data.type === "GOAL" || data.type === "OWN_GOAL";

  if (match.status !== "ONGOING") {
    throw new AppError("Só pode criar eventos com a partida em andamento", 404);
  }

  if (data.playerId) {
    await findPlayerById(data.playerId);

    await prisma.player.update({
      where: { id: data.playerId },
      data: {
        goals: data.type === "GOAL" ? { increment: 1 } : undefined,
        assists: data.type === "ASSIST" ? { increment: 1 } : undefined,
      },
    });
  }

  if (golsMatch) {
    await updateGolsMatch({ data, match });
  }

  const eventmatch = await prisma.matchEvent.create({ data });

  return { eventmatch };
}
