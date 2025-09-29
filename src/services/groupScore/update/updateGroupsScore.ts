import { prisma } from "@/database/prisma-config";
import { Match, Prisma } from "@prisma/client";
import { getResult } from "./getresult";
import { getTeamsThowFromMatch } from "./getTeamThowmatch";
type Props = {
  match: Match;
};
 // vai ser chamdado assim que uma partida entre dois times acabar  "match status"
export async function updateGroupsScores({ match }: Props) {

  const teams = getTeamsThowFromMatch(match); // pega quantidade de gol sofrdos e marcados  id dos 2 times

  for (const team of teams) {
    const data = getResult(team.golsFor, team.goalsAgainst);

    await prisma.groupScore.update({ where: { teamId: team.id }, data });
  }
}
