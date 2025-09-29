import { prisma } from "@/database/prisma-config";
import { MatchEventBodyInput } from "@/schemazod/matche-event/create";
import { findMatchById } from "@/utils/prismaHelpersutils";
import { applyMatchEvent } from "../utils/applymatchevents";

type createMatcheEvent = {
  data: MatchEventBodyInput;
  
};

export async function createMatcheEvent({ data,  }: createMatcheEvent) {
  const { match } = await findMatchById(data.matchId);

  await applyMatchEvent({
    delta:1,
    match,
    playerId: data.playerId,
    teamId: data.teamId,
    type: data.type,
  });

  const eventmatch = await prisma.matchEvent.create({ data });

  return { eventmatch };
}
