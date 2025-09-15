import { prisma } from "@/database/prisma-config";
import { findTeamById } from "@/utils/prismaHelpersutils";
import { Prisma, Role } from "@prisma/client";
import { teamInclude } from "../utils/getinclude";


type Props = {
  role?: Role;
  id: string;
};

export async function showTeamId({ id, role }: Props) {
  await findTeamById(id);
  const ADM = role === "ADMIN";
  const whereActive: Prisma.TeamWhereInput = ADM ? {} : { isActive: true };

  const teamId = await prisma.team.findFirst({
    where: { id ,...whereActive },
    include: teamInclude
  });

  return { teamId };
}
