import { prisma } from "@/database/prisma-config";
import { findPlayerByUserId, findTeamById, findUserById } from "@/utils/prismaHelpersutils"

type Props ={
    userId:string
}
export async function showTeamUserID({userId}:Props){
const  {player} = await findPlayerByUserId(userId)

  if (!player.teamId) {
    return null; // aqui eu  trato  no front
  }
   const {team} =  await findTeamById(player.teamId)

  const TeamUser =  await prisma.team.findFirst({where:{id:team.id}})

  return TeamUser
}