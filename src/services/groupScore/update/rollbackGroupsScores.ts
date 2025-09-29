import { Match } from "@prisma/client";
import { getTeamsThowFromMatch } from "./getTeamThowmatch";
import { getResult } from "./getresult";
import { prisma } from "@/database/prisma-config";


type Props = {
  match: Match;
};
export async function rollbackGroupsScores({ match }: Props) {
  const teams = getTeamsThowFromMatch(match);

  for (const team of teams) {
    const increments = getResult(team.golsFor, team.goalsAgainst);

    // objeto que vai guardar os campos para decrementar
    const rollbackData: Record<string, any> = {};

    Object.entries(increments).forEach(([key, val]) => {
      if (typeof val === "object" && "increment" in val) {
        // inverte o increment para decrement
        rollbackData[key] = { decrement: val.increment };
      }
    });

    // aplica no banco com Prisma
    await prisma.groupScore.update({
      where: { teamId: team.id },
      data: rollbackData,
    });
  }
}

