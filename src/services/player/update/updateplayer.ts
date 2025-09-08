import { prisma } from "@/database/prisma-config";
import { updatePlayerInput } from "@/schemazod/player/update";
import { AppError } from "@/utils/AppEroor";
import { findPlayerById } from "@/utils/prismaHelpersutils";
import { Role, } from "@prisma/client";



type UpdateProps = {
  data: updatePlayerInput;
  id: string;
  userId: string;
  role: Role;
};
export async function updatePlayer({ data, id, userId, role }: UpdateProps) {
  const {player} =  await findPlayerById(id)

  if (role !== "ADMIN" && player.userId !== userId) {
    throw new AppError("Não autorizado a atualizar esse jogador", 403);
  }
    if (data.nameCart && data.nameCart !== player.nameCart) {
    const existing = await prisma.player.findFirst({
      where: { nameCart: data.nameCart },
    });

    if (existing) {
      throw new AppError("Já existe um jogador com esse nome");
    }
  }

  const updatedDataIDplayer = await prisma.player.update({
    where: { id },
    data,
  });
  return { updatedDataIDplayer };
}
