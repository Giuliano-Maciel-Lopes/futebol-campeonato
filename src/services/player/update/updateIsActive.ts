import { prisma } from "@/database/prisma-config";
import { findPlayerById } from "@/utils/prismaHelpersutils";



interface PlayerProps {
  id: string;
  isActive: boolean; 
}

export async function IsactivePlayerUpdate({ id, isActive }: PlayerProps) {
 await findPlayerById(id)
  
   
  const playerIsActive =  await prisma.player.update({where:{id},data:{isActive}})

  return {playerIsActive }
 
}
