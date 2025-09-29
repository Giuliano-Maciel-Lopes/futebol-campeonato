// services/groupScore.ts
import { Match } from "@prisma/client";

export function getTeamsThowFromMatch(match: Match) {
  return [
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
}
