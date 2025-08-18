import { prisma } from "@/database/prisma-config";
import { AppError } from "@/utils/AppEroor";
import { TeamUpdateInput } from "@/schemazod/team/update";

interface UpdateTeamRequest {
  id: string;
  data: TeamUpdateInput;
}

export async function updateTeam({ id, data }: UpdateTeamRequest) {
  const updatedTeam = { id, data };
  return { updatedTeam };
}

