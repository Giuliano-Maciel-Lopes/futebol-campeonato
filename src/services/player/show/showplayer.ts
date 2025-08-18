import { prisma } from "@/database/prisma-config";
import type{ UuidInput} from "@/schemazod/uuid";
import { AppError } from "@/utils/AppEroor";


export async function showPlayerId(id:UuidInput) {
  if (!id) {
    throw new AppError("ID inválido");
  }

  const playerCardId = await prisma.player.findUnique({ where: { id } });

  if (!playerCardId) {
    throw new AppError("Player não encontrado");
  }

  return { playerCardId };
}
