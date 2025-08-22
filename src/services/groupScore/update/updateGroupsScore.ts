import { prisma } from "@/database/prisma-config";
import { Match, Prisma } from "@prisma/client";
import { getResult } from "./getresult";

type Props = {
  match: Match;
};
 // vai ser chamdado assim que uma partida entre dois times acabar  "match status"
export async function updateGroupsScores({ match }: Props) {
  const teams = [
    {
      id: match.team1Id,
      golsFor: match.team1Score,
      goalsAgainst: match.team2Score,
    },
    {
      id: match.team2Id,
      golsFor: match.team2Score,
      goalsAgainst: match.team1Score,
    },
  ];

  for (const team of teams) {
    const data = getResult(team.golsFor, team.goalsAgainst);

    await prisma.groupScore.update({ where: { teamId: team.id }, data });
  }
}
