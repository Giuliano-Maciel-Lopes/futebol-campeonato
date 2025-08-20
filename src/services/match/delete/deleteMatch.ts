import { prisma } from "@/database/prisma-config";
import { findMatchById } from "@/utils/prismaHelpersutils";

export async function deleteMatch  ( id: string ) {
 await findMatchById(id)

const dataDelete =  await prisma.match.delete({where:{id}})

return {dataDelete}
};
