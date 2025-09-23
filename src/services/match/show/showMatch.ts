import { prisma } from "@/database/prisma-config";
import { findMatchById } from "@/utils/prismaHelpersutils";
import { matchInclude } from "../utils/listincludesget";

export async function showMatchId(id: string) {
  // Primeiro verifica se existe
  await findMatchById(id);

  const MatchId = await prisma.match.findUnique({
    where: { id },
    include: {
      ...matchInclude, // inclui os times
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
