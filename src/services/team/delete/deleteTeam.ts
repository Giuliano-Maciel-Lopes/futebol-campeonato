import { prisma } from "@/database/prisma-config";
import { AppError } from "@/utils/AppEroor";
import { Role } from "@prisma/client";

interface DeleteTeamProps {
  id: string;

}

export async function deleteTeam({ id, }: DeleteTeamProps) {
 // so o adm vai poder deletar nem o dono vai poder ja que e um campeonato para n deltar sem querer ou algo do tipo 
 
  const teamDelete = await prisma.team.delete({ where: { id } });
  return {teamDelete}
}
