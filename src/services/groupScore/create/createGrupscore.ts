import { prisma } from "@/database/prisma-config"
import { Team } from "@prisma/client"
import type { TeamUpdateGrupIdInput } from "@/schemazod/team/UpdateGrupId"

// essa funçao e chamada assim que alguem muda o grupId de uma time 

type Props ={
    data:TeamUpdateGrupIdInput , 
    team:Team
 }
export async function createGrupscore({data ,team}:Props){

    await prisma.groupScore.create({data:{teamId:team.id ,groupId:data.groupId}})
}



