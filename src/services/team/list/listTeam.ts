import { prisma } from "@/database/prisma-config";

export async function listTeam() {
  const teams = [];
  return { teams };
}

