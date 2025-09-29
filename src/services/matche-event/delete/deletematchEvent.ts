import { findMatchEventById } from "@/utils/prismaHelpersutils";
import { applyMatchEvent } from "../utils/applymatchevents";
import { prisma } from "@/database/prisma-config";

export async function deleteMatchEvent(id: string) {
  const { matchEvent } = await findMatchEventById(id);
  await applyMatchEvent({
    delta: -1,
    match: matchEvent.match,
    playerId: matchEvent.playerId ?? undefined,
    teamId: matchEvent.teamId,
    type: matchEvent.type,
  });

  const deleteEevnt = await  prisma.matchEvent.delete({ where: { id } });
  return { deleteEevnt };
}
