import { prisma } from "@/database/prisma-config";
import { TeamBodySchemaInput } from "@/schemazod/team/create";
import { updatePlayer } from "@/services/player";
import { AppError } from "@/utils/AppEroor";
import { PlayerRole, Role } from "@prisma/client";




interface CreateTeamRequest {
  data: TeamBodySchemaInput;
  rolePlayer:PlayerRole
  role: Role;
  userId: string;
}

export async function createTeam({ data ,rolePlayer ,role ,userId}: CreateTeamRequest) {
  const verifiCaptain = await prisma.team.findFirst({
    where: { captainId: data.captainId },
  });
  if (verifiCaptain) {
    throw new AppError("Ops  esse player ja e capitao de um time ");
  }

  const TeamCreate = await prisma.team.create({ data });

  await  updatePlayer({data:{role:rolePlayer} , id:data.captainId, role , userId})
      
  return { TeamCreate };
}
