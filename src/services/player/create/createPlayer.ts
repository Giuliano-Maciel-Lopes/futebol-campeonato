import { prisma } from "@/database/prisma-config";
import type { PlayerInput } from "@/schemazod/player/create";
import { AppError } from "@/utils/AppEroor";
import { Request } from "express";
type createPlayerInput = {
  data: PlayerInput;
  userId: string;
};

export async function createPlayer({ data, userId }: createPlayerInput) {
  const existing = await prisma.player.findFirst({
    where: {
      OR: [{ nameCart: data.nameCart }, { userId: userId }],
    },
  });

  if (existing) {
    if (existing.nameCart === data.nameCart) {
      throw new AppError("Já existe um usuário com esse nome");
    }
    if (existing.userId === userId) {
      throw new AppError("voce já possui uma cartinha ");
    }
  }

  const dataCart = await prisma.player.create({ data: { ...data, userId } });

  return { dataCart };
}
