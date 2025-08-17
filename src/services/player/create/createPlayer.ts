import { prisma } from "@/database/prisma-config";
import type { PlayerInput } from "@/schemazod/player/create";
import { AppError } from "@/utils/AppEroor";
import { Request } from "express";
type createPlayerInput = {
  data: PlayerInput;
  userId: string;
};

export async function createPlayer({ data, userId }: createPlayerInput) {
  const existingName = await prisma.player.findFirst({
    where: { nameCart: data.nameCart },
  });

  if (existingName) {
    throw new AppError("ja existe um usario com esse nome");
  }
  const dataCart = await prisma.player.create({ data: { ...data, userId } });

  return { dataCart };
}
