import { prisma } from "@/database/prisma-config";
import { InviteUpdate } from "@/schemazod/invite/update";
import { IndexPlayerIndexMaxIndice } from "@/services/utils/indexPlayersmax";
import { AppError } from "@/utils/AppEroor";
import {
  findInviteById,
  findPlayerById,
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
  const { player: playerReceiverdId } = await findPlayerById(invite.receiverId);

  if (invite.receiverId !== player.id) {
    throw new AppError("Você não tem permissão para atualizar este convite");
  }
  if (playerReceiverdId.teamId && data.status === "ACCEPTED") {
    throw new AppError("Você ja possui  um time ");
  }
  if (invite.status !== "PENDING") {
    throw new AppError(
      "Esse convite já foi atualizado e não pode ser alterado novamente"
    );
  }

  if (data.status === "ACCEPTED") {
    const { team } = await findTeamById(invite.teamId);

    const { firstAvailableIndex } = IndexPlayerIndexMaxIndice({ team });

    await prisma.player.update({
      where: { id: invite.receiverId },
      data: { teamId: invite.teamId, positionIndex: firstAvailableIndex },
    }); // jogador aceita entrar no time
  }

  const InviteUpdate = await prisma.invite.update({ where: { id }, data });

  return { InviteUpdate };
}
