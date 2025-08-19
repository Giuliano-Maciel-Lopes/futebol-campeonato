import { prisma } from "@/database/prisma-config";
import type{ UuidInput} from "@/schemazod/uuid";
import { AppError } from "@/utils/AppEroor";
import { findPlayerById} from "@/utils/prismaHelpersutils";



export async function showPlayerId(id:UuidInput) {
    await findPlayerById(id);

  const playerCardId = await prisma.player.findUnique({ where: { id } });

  

  return { playerCardId };
}
