import { prisma } from "@/database/prisma-config";
import { findTeamById } from "@/utils/prismaHelpersutils";
interface DeleteTeamProps {
  id: string;
}

export async function deleteTeam({ id }: DeleteTeamProps) {
  // so o adm vai poder deletar nem o dono vai poder ja que e um campeonato para n deltar sem querer ou algo do tipo
  await findTeamById(id);

  const teamDelete = await prisma.team.delete({ where: { id } });
  return { teamDelete };
}
