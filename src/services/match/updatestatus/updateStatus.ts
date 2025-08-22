import { prisma } from "@/database/prisma-config";
import { MatchBodyUpdateStatusInput } from "@/schemazod/match/updatStatus";
import { updateGroupsScores } from "@/services/groupScore";
import { findMatchById } from "@/utils/prismaHelpersutils";

type updateStatusProps = {
  data: MatchBodyUpdateStatusInput;
  id: string;
};

export async function updateStatus({ data, id }: updateStatusProps) {
 const {match}=   await findMatchById(id);

 if(data.status === "FINISHED"){
   await updateGroupsScores({match})
 }

 const statusmatch = await prisma.match.update({ where: { id }, data });

 return {statusmatch}
}
