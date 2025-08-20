import { prisma } from "@/database/prisma-config";
import { MatchEventBodyInput } from "@/schemazod/matche-event/create"
import { Match } from "@prisma/client";


type UpdateProps={
data:MatchEventBodyInput
match:Match
}

export async function updateGolsMatch({ data, match }: UpdateProps) {
    // se um time fizer gol contra gol po outro timr c n gol dele 

  if (data.type === "GOAL" || data.type === "OWN_GOAL") {
    const isOwnGoal = data.type === "OWN_GOAL";

    await prisma.match.update({
      where: { id: data.matchId },
      data: {
        team1Score: (isOwnGoal ? match.team1Id !== data.teamId : match.team1Id === data.teamId)
          ? { increment: 1 }
          : undefined,
        team2Score: (isOwnGoal ? match.team2Id !== data.teamId : match.team2Id === data.teamId)
          ? { increment: 1 }
          : undefined,
      },
    });
  }
}
