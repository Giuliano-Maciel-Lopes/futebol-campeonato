import { prisma } from "@/database/prisma-config";


interface teamProps {
  id: string;
  isActive: boolean; 
}

export async function IsactiveTeamUpdate({ id, isActive }: teamProps) {
   
  const teamIsActive =  await prisma.team.update({where:{id},data:{isActive}})

  return {teamIsActive}
 
}
