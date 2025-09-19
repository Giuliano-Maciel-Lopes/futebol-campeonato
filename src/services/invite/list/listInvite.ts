import { prisma } from "@/database/prisma-config";
import { findPlayerByUserId } from "@/utils/prismaHelpersutils";

type listProps = {
  userId: string;
};

export async function listInvite({ userId }: listProps) {
  const { player } = await findPlayerByUserId(userId);

  const invite = await prisma.invite.findMany({
    where: {
      OR: [{ receiverId: player.id }, { senderId: player.id }],
    },
    include: {
      team: {
        select: {
          name: true,
        },
      },
      receiver: {
        select: {
          user: {
            select: { id: true },
          },
        },
      },
      sender: {
        select: {
          user: {
            select: { id: true },
          },
        },
      },
    },
  });

  return { invite };
}
