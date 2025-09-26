import { prisma } from "@/database/prisma-config";
import { findMatchById } from "@/utils/prismaHelpersutils";
import { matchIncludeShow } from "../utils/showIncludesget";


export async function showMatchId(id: string) {
  // Primeiro verifica se existe
  await findMatchById(id);

  const MatchId = await prisma.match.findUnique({
    where: { id },
     include: matchIncludeShow,
  });

  return { MatchId };
}
