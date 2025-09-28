import { prisma } from "@/database/prisma-config";
import { Team } from "@prisma/client";

type Props = {
  groupId: string;
  team: Team;
};
 
export async function PopulateGropScore({ groupId, team }: Props) {
  // Verifica se o time já tem um score neste grupo
  const existing = await prisma.groupScore.findUnique({
    where: {
      groupId_teamId: {
        groupId,
        teamId: team.id,
      },
    },
  });

  if (existing) {
    // Já existe nesse grupo, não faz nada
    return existing;
  }

  // Verifica se o time já tem score em outro grupo // se tiver mantem os dados c nao cria novo 
  const oldScore = await prisma.groupScore.findFirst({
    where: { teamId: team.id },
  });

  const dataToInsert = oldScore
    ? {
        teamId: team.id,
        groupId,
        points: oldScore.points,
        played: oldScore.played,
        win: oldScore.win,
        drawn: oldScore.drawn,
        lost: oldScore.lost,
        goalsFor: oldScore.goalsFor,
        goalsAgainst: oldScore.goalsAgainst,
        goalDifference: oldScore.goalDifference,
      }
    : {
        teamId: team.id,
        groupId,
        points: 0,
        played: 0,
        win: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
      };

  return prisma.groupScore.create({ data: dataToInsert });
}
