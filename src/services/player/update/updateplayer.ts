import { prisma } from "@/database/prisma-config";
import { updatePlayerInput } from "@/schemazod/player/update";
import { AppError } from "@/utils/AppEroor";
import { Role, User } from "@prisma/client";

type UpdateProps = {
  data: updatePlayerInput;
  id: string;
  userId:string ;
  role:Role
};
export async function updatePlayer({ data, id, userId , role}: UpdateProps) {
  if (!userId) throw new AppError("ID do usuário é obrigatório para atualizar o jogador");
  
  if (!id) throw new AppError("ID do jogador é obrigatório para atualizar o jogador");

const where = role==="ADMIN" ? {id}: {id , userId}
  const updatedDataIDplayer = await prisma.player.update({
    where,
    data,
  });
  return { updatedDataIDplayer };
}
