import { prisma } from "@/database/prisma-config";

export async function  listMatch  (){
 const dataMatch =  await prisma.match.findMany()
 
  return { dataMatch };
};
