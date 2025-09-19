import { prisma } from "@/database/prisma-config";
import { findPlayerByUserId } from "@/utils/prismaHelpersutils";
import { inviteInclude } from "../utils/includesInvites";

type listProps = {
  userId: string;
};

export async function listInvite({ userId }: listProps) {
  const { player } = await findPlayerByUserId(userId);

  const invite = await prisma.invite.findMany({
    where: {
      OR: [{ receiverId: player.id }, { senderId: player.id }],
    },
    include: inviteInclude,
  });

  return { invite };
}