import { prisma } from "@/database/prisma-config";
import { AppError } from "@/utils/AppEroor";
import { findMatchById } from "@/utils/prismaHelpersutils";

export async function deleteMatch  ( id: string ) {
 const {match} = await findMatchById(id)

 if (match.events && match.events.length > 0) {
    throw new AppError("Impossível apagar essa partida pois ela tem eventos");
  }

const dataDelete =  await prisma.match.delete({where:{id}})

return {dataDelete}
};
