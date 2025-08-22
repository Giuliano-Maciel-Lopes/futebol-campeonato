import { prisma } from "@/database/prisma-config";
import type { MatchBodyInput } from "@/schemazod/match/create";
import { AppError } from "@/utils/AppEroor";
import { findTeamById } from "@/utils/prismaHelpersutils";

type matchProps = {
  data: MatchBodyInput;
};

export async function createMatch({ data }: matchProps) {
  const { team: team1 } = await findTeamById(data.team1Id);
  const { team: team2 } = await findTeamById(data.team2Id);

  if (data.stage === "GROUP") {
    if (!team1.groupId || !team2.groupId) {
      throw new AppError("um dos times não estão em um grupo ");
    }
  }

  const dataMatch = await prisma.match.create({ data });

  return { dataMatch };
}
