import { prisma } from "@/database/prisma-config"
import { TeamUpdateGrupIdInput } from "@/schemazod/team/UpdateGrupId"
import { createGrupscore } from "@/services/groupScore"
import { findTeamById } from "@/utils/prismaHelpersutils"

type UpdateProps ={
    data: TeamUpdateGrupIdInput
    id: string
}

export async function updateGrupId({id , data}:UpdateProps){
  const {team} =  await findTeamById(id)

   const addGrupsID =  await prisma.team.update({where:{id}, data})
 
   await createGrupscore({data , team})

   return {addGrupsID}
  
}