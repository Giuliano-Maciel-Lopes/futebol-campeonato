import { prisma } from "@/database/prisma-config";
import { AppError } from "@/utils/AppEroor";
import { Role } from "@prisma/client";

interface DeletePlayerProps {
  id: string;
 
}

export async function deletePlayer({ id, }: DeletePlayerProps) {
    // so adm pode apagar a cartinha 
    // midalawares de autenticated e verifiauthorizathion
    await prisma.player.delete({where:{id}})
 
}
