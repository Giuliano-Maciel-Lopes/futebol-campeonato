import { prisma } from "@/database/prisma-config";
import { updatePlayerInput } from "@/schemazod/player/update";
import { AppError } from "@/utils/AppEroor";
import { Role, User } from "@prisma/client";

type UpdateProps = {
  data: updatePlayerInput;
  id: string;
  userId: string;
  role: Role;
};
export async function updatePlayer({ data, id, userId, role }: UpdateProps) {
  const playerExists = await prisma.player.findUnique({ where: { id } });
  if (!playerExists) {
    throw new AppError("Player não existe", 404);
  }

  if (role !== "ADMIN" && playerExists.userId !== userId) {
    throw new AppError("Não autorizado a atualizar esse jogador", 403);
  }

  const updatedDataIDplayer = await prisma.player.update({
    where: { id },
    data,
  });
  return { updatedDataIDplayer };
}
