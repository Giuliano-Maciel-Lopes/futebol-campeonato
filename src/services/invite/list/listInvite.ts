import { prisma } from "@/database/prisma-config";
import { findPlayerByUserId } from "@/utils/prismaHelpersutils";
import { inviteInclude } from "../utils/includesInvites";
import { InviteStatus } from "@prisma/client";

type listProps = {
  userId: string;
  status?: InviteStatus;
};

export async function listInvite({ userId, status }: listProps) {
  const { player } = await findPlayerByUserId(userId);

  const invite = await prisma.invite.findMany({
    where: {
      OR: [{ receiverId: player.id }, { senderId: player.id }],
      ...(status && { status }),
    },

    include: inviteInclude,
  });

  return { invite };
}
