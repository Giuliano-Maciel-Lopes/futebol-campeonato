import { prisma } from "@/database/prisma-config";
import { AppError } from "@/utils/AppEroor";

export async function showTeamId(id: string) {
  const team = null; 
  if (!team) {
    throw new AppError("Time não encontrado", 404);
  }
  return { team };
}

