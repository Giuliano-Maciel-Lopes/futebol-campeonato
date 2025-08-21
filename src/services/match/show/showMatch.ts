import { prisma } from "@/database/prisma-config";
import { findMatchById } from "@/utils/prismaHelpersutils";

export async function showMatchId(id: string) {
  await findMatchById(id);

const MatchId = await prisma.match.findUnique({
  where: { id },
  include: {
    events: {
      select: {
        type: true,
        player: {
          select: {
            nameCart: true,
          },
        },
      },
    },
  },
});


  return { MatchId };
}
