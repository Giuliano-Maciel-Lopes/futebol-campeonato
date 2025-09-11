import { prisma } from "@/database/prisma-config";
import { findTeamById } from "@/utils/prismaHelpersutils";


interface teamProps {
  id: string;
  isActive: boolean; 
}

export async function IsactiveTeamUpdate({ id, isActive }: teamProps) {
 await findTeamById(id)
   
  const teamIsActive =  await prisma.team.update({where:{id},data:{isActive}})

  return {teamIsActive}
 
}
