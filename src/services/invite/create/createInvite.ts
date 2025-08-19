import { prisma } from "@/database/prisma-config";
import { InviteBodyInput } from "@/schemazod/invite/create";
import { AppError } from "@/utils/AppEroor";

interface ICreateInviteRequest {
  data: InviteBodyInput;
  userId: string;
}

export async function createInvite({ data, userId }: ICreateInviteRequest) {
  // a unica pessoa que pode criar um convite é o capitao do time

  const team = await prisma.team.findFirst({ where: { id: data.teamId } });
  if (!team) {
    throw new AppError("nao existe time com esse id", 404);
  }

  const user = await prisma.user.findUnique({
  where: { id: data.receiverId },
});

if (!user) {
  throw new AppError("Usuário que vai receber o convite não existe", 404);
}


  const player = await prisma.player.findFirst({
    where: { userId },
    include: { captainOf: true },
  });

  if (!player) {
    throw new AppError("nao existe player com esse id", 404);
  }
  

  if (!player.captainOf || player.captainOf.id !== data.teamId) {
    throw new AppError("Apenas o capitão deste time pode criar convites", 403);
  }

  const invitecreate = await prisma.invite.create({
    data: { senderId: userId, ...data },
  });

  return { invitecreate };
}
