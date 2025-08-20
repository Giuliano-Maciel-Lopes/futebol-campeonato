import { prisma } from "@/database/prisma-config";
import { InviteUpdate } from "@/schemazod/invite/update";
import { AppError } from "@/utils/AppEroor";
import {
  findInviteById,
  findPlayerByUserId,
  findTeamById,
} from "@/utils/prismaHelpersutils";

interface updateProps {
  id: string;
  data: InviteUpdate;
  userId: string;
}

export async function updateInvite({ id, data, userId }: updateProps) {
  // apenas quem recebeu o convite pode atualizar

  const { invite } = await findInviteById(id);
  const { player } = await findPlayerByUserId(userId);

  if (invite.receiverId !== player.id) {
    throw new Error("Você não tem permissão para atualizar este convite");
  }

  if (data.status === "ACCEPTED") {
    const { team } = await findTeamById(invite.teamId);

    if (team.players.length >= 14) {
      throw new AppError("tima ja atingiu o limite de jogadores", 400);
    }

    await prisma.player.update({
      where: { id: invite.receiverId },
      data: { teamId: invite.teamId },
    }); // jogador aceita entrar no time
  }

  const InviteUpdate = await prisma.invite.update({ where: { id }, data });

  return { InviteUpdate };
}
