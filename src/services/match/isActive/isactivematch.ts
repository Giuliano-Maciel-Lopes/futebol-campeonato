import { prisma } from "@/database/prisma-config";
import { findMatchById, } from "@/utils/prismaHelpersutils";



interface PlayerProps {
  id: string;
  isActive: boolean; 
}

export async function updateIsactiveMacth({ id, isActive }: PlayerProps) {
 await findMatchById(id)
  
   
  const match =  await prisma.match.update({where:{id},data:{isActive}})

  return {match }
 
}
