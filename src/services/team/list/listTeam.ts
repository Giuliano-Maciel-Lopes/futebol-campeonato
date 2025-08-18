import { prisma } from "@/database/prisma-config";

export async function listTeam() {
 const fullTeam =  await prisma.player.findMany()
 
return {fullTeam} 
}

