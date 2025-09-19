import { prisma } from "@/database/prisma-config";
import { InviteBodyInput } from "@/schemazod/invite/create";
import { AppError } from "@/utils/AppEroor";
import {
  findUserById,

  findTeamById,
  findPlayerById,
} from "@/utils/prismaHelpersutils";
import { inviteInclude } from "../utils/includesInvites";


interface ICreateInviteRequest {
  data: InviteBodyInput;
  userId: string;
}

export async function createInvite({ data, userId }: ICreateInviteRequest) {
  // a unica pessoa que pode criar um convite é o capitao do time 
    await findTeamById(data.teamId);
   const {player: playerReceiverId}=  await findPlayerById(data.receiverId);
    

  const player = await prisma.player.findFirst({
    where: { userId },
    include: { captainOf: true },
  });

  if (!player) {
    throw new AppError("esse jogador nao tem uma cartinha", 404); // ou seja n e capiato nem player 
  }
  if(playerReceiverId.teamId ){
        throw new AppError("esse jogador ja esta em um time ", 404);
    
  }

  if (!player.captainOf || player.captainOf.id !== data.teamId) { // capitao do time / e não so capitao  
    throw new AppError("Apenas o capitão deste time pode criar convites", 403);
  }

  const invitecreate = await prisma.invite.create({
    data: { senderId: player.id, ...data },
    include:inviteInclude
  });

  return { invitecreate };
}
