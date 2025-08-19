import { prisma } from "@/database/prisma-config";


interface PlayerProps {
  id: string;
  isActive: boolean; 
}

export async function IsactivePlayerUpdate({ id, isActive }: PlayerProps) {
   
  const playerIsActive =  await prisma.player.update({where:{id},data:{isActive}})

  return {playerIsActive }
 
}
