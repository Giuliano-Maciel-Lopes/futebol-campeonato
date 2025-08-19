import { prisma } from "@/database/prisma-config";
import { TeamBodySchemaInput } from "@/schemazod/team/create";
import { updatePlayer } from "@/services/player";
import { AppError } from "@/utils/AppEroor";
import { PlayerRole, Role } from "@prisma/client";

interface CreateTeamRequest {
  data: TeamBodySchemaInput;
}

export async function createTeam({ data }: CreateTeamRequest) {
  const verifiCaptain = await prisma.team.findFirst({
    where: { captainId: data.captainId },
  });
  if (verifiCaptain) {
    throw new AppError("Ops  esse player ja e capitao de um time ");
  }

  const TeamCreate = await prisma.team.create({ data });

  await prisma.player.update({
    where: { id: data.captainId },
    data: { teamId: TeamCreate.id, role: "CAPITAO" },
  });

  return { TeamCreate };
}
