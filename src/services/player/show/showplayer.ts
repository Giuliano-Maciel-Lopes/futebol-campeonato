import { prisma } from "@/database/prisma-config";
import type { UuidInput } from "@/schemazod/uuid";
import { AppError } from "@/utils/AppEroor";
import { findPlayerById } from "@/utils/prismaHelpersutils";
import { Prisma, Role } from "@prisma/client";
import { playerInclude } from "../utils/getincludes";

type Props = {
  id: UuidInput;
  role?: Role;
};

export async function showPlayerId({ id, role }: Props) {
  await findPlayerById(id);
  const ADMIN = role === "ADMIN";

  let whereActive: Prisma.PlayerWhereInput;

  whereActive = ADMIN ? {} : { isActive: true };

  const playerCardId = await prisma.player.findFirst({
    where: { id, ...whereActive },
    include: playerInclude,
  });

  return { playerCardId };
}
