import { prisma } from "@/database/prisma-config";
import { findPlayerById } from "@/utils/prismaHelpersutils";
import { updateGolsMatch } from "./updatematch";
import { Match } from "@prisma/client";
import { AppError } from "@/utils/AppEroor";

type ApplyMatchEventProps = {
  playerId?: string;
  type?: "GOAL" | "OWN_GOAL" | "ASSIST"; // EventType
  teamId?: string;
  match: Match;
  delta: 1 | -1;
};

export async function applyMatchEvent({ playerId, type, teamId, match, delta }: ApplyMatchEventProps) {
  const golsMatch = type === "GOAL" || type === "OWN_GOAL";
    if (match.status !== "ONGOING") {
    throw new AppError("Só é possível aplicar eventos em partidas em andamento.");
  }

  if (playerId) {
    await findPlayerById(playerId);

    await prisma.player.update({
      where: { id: playerId },
      data: {
        goals: type === "GOAL" ? { increment: delta } : undefined,
        assists: type === "ASSIST" ? { increment: delta } : undefined,
      },
    });
  }

  if (golsMatch && teamId) {
    await updateGolsMatch({ type, match, teamId, delta });
  }
}
