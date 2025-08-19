import { prisma } from "@/database/prisma-config";

export async function listTeam() {
 const fullTeam =  await prisma.team.findMany()
 
return {fullTeam} 
}

