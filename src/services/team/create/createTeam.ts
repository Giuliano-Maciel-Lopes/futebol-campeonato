import { prisma } from "@/database/prisma-config";
import { TeamBodySchemaInput } from "@/schemazod/team/create";
import { AppError } from "@/utils/AppEroor";
import { findPlayerById } from "@/utils/prismaHelpersutils";

// so adm pode criar time ta no middlawqare
interface CreateTeamRequest {
  data: TeamBodySchemaInput;
}

export async function createTeam({ data }: CreateTeamRequest) {
 const {player} = await  findPlayerById(data.captainId)

 if(player.teamId){
  throw new AppError(" Esse jogador já pertence a um time")
 }


  const TeamCreate = await prisma.team.create({ data });

  await prisma.player.update({
    where: { id: data.captainId },
    data: { teamId: TeamCreate.id, role: "CAPITAO", positionIndex:0},
  });

  return { TeamCreate };
}
