import { prisma } from "@/database/prisma-config"

type data ={
    
}

export async function listplayer(){
    // ao longo do projeto add query 
    // tds podem ver n tem problema 
   const playersfull =  await prisma.player.findMany()
   return {playersfull}
}