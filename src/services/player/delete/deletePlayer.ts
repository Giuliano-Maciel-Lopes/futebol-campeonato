import { prisma } from "@/database/prisma-config";
import { AppError } from "@/utils/AppEroor";
import { Role } from "@prisma/client";

interface DeletePlayerProps {
  id: string;
  userId: string;
  role: Role;
}

export async function deletePlayer({ id, userId, role }: DeletePlayerProps) {
  // Lógica de exclusão de jogador aqui
  // A implementação da lógica de autorização (ADMIN vs. proprietário) ficará a seu cargo aqui
  // Exemplo: se for admin, deleta por ID. Se não for, deleta por ID e userId.

  // Pode usar o mesmo padrão de `where` que usamos no updatePlayer
  const whereClause = role === "ADMIN" ? { id } : { id, userId };

  try {
    const deletedPlayer = await prisma.player.delete({
      where: whereClause,
    });
    return { deletedPlayer };
  } catch (error: any) {
    if (error.code === 'P2025') { // Prisma Client known error code for record not found
      throw new AppError("Ops, não autorizado ou jogador não encontrado para exclusão.", 403);
    }
    throw error; // Re-throw other errors
  }
}
