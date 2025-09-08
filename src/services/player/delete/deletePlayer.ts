import { prisma } from "@/database/prisma-config";
import { findPlayerById } from "@/utils/prismaHelpersutils";

interface DeletePlayerProps {
  id: string;
}

export async function deletePlayer({ id }: DeletePlayerProps) {
  await findPlayerById(id);

const deletedata =  await prisma.player.delete({ where: { id } });
return {deletedata}
}
