import { prisma } from "@/database/prisma-config";
import { AppError } from "@/utils/AppEroor";
import { Role } from "@prisma/client";

interface DeleteTeamProps {
  id: string;
  userId: string;
  role: Role;
}

export async function deleteTeam({ id, userId, role }: DeleteTeamProps) {
  if (role !== "ADMIN") {
    throw new AppError("Você não tem permissão para excluir times.", 403);
  }
  try {
    const deletedTeam = await prisma.team.delete({
      where: { id },
    });
    return { deletedTeam };
  } catch (error: any) {
    if (error.code === 'P2025') { 
      throw new AppError("Time não encontrado para exclusão.", 404);
    }
    throw error;
  }
}

