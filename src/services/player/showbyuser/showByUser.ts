import { prisma } from "@/database/prisma-config";
import { playerInclude } from "../utils/getincludes";

type Props = {
  userId: string;
};

export async function showbyuserIdPlayer({ userId }: Props) {
  // player logado ver sua cartinha c tiver ou nao

  const playerLog = await prisma.player.findUnique({
    where: { userId },
    include: playerInclude,
  });

  return { playerLog };
}
