import { prisma } from "@/database/prisma-config";
import { AppError } from "@/utils/AppEroor";
import { TeamUpdateInput } from "@/schemazod/team/update";
import { Role } from "@prisma/client";

interface UpdateTeamRequest {
  id: string;
  data: TeamUpdateInput;
  role: Role; // role do user
  userId:string
}

export async function updateTeam({ id, data, role,userId }: UpdateTeamRequest) {
  // apenas capitao e admin pode mudar

  const team = await prisma.team.findUnique({
    where: { id },
    select: { captainId: true },
  });
  if (!team) {
    throw new AppError("Nenhum time encontrado ");
  }

  const player = await prisma.player.findUnique({
    where: { userId },
  });

  if (!player) {
    throw new AppError("Nenhum player  encontrado ");
  }
  
if (role !== "ADMIN" && team.captainId !== player.id) {
  throw new AppError("Você não tem autorização para atualizar este time", 403);
}

 const dataUpdate =  await prisma.team.update({ where: { id }, data });
  return {dataUpdate};
}
