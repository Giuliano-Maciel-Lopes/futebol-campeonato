import { prisma } from "@/database/prisma-config";
import { AppError } from "@/utils/AppEroor";


export async function checkPendingInvite(receiverId: string, teamId: string) {
  const existingInvite = await prisma.invite.findFirst({
    where: {
      receiverId,
      teamId,
      status: "PENDING",
    },
  });

  if (existingInvite) {
    throw new AppError(
      "Esse jogador já recebeu um convite pendente para este time",
      400
    );
  }

  
}