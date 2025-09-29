import { prisma } from "@/database/prisma-config";
import { Match } from "@prisma/client";

type UpdateGolsMatchProps = {
  type: "GOAL" | "OWN_GOAL";
  match: Match;
  teamId: string;
  delta: 1 | -1;
};

export async function updateGolsMatch({ type, match, teamId, delta }: UpdateGolsMatchProps) {
  const isOwnGoal = type === "OWN_GOAL";

  await prisma.match.update({
    where: { id: match.id },
    data: {
      team1Score: (isOwnGoal ? match.team1Id !== teamId : match.team1Id === teamId)
        ? { increment: delta }
        : undefined,
      team2Score: (isOwnGoal ? match.team2Id !== teamId : match.team2Id === teamId)
        ? { increment: delta }
        : undefined,
    },
  });
}
