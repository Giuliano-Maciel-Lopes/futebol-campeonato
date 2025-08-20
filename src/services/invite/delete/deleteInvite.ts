import { prisma } from "@/database/prisma-config";
import { findInviteById } from "@/utils/prismaHelpersutils";

type DeleteProps = {
  id: string;
}



export async function deleteInvite({ id }: DeleteProps) {
 await  findInviteById(id)

 const InviteDelete = await prisma.invite.delete({where:{id}})

  return {InviteDelete};
}
