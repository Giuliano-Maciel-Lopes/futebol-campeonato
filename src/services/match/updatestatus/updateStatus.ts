import { prisma } from "@/database/prisma-config";
import { MatchBodyUpdateStatusInput } from "@/schemazod/match/updatStatus";
import { updateGroupsScores } from "@/services/groupScore";
import { rollbackGroupsScores } from "@/services/groupScore/update/rollbackGroupsScores";
import { AppError } from "@/utils/AppEroor";
import { findMatchById } from "@/utils/prismaHelpersutils";

type updateStatusProps = {
  data: MatchBodyUpdateStatusInput;
  id: string;
};

export async function updateStatus({ data, id }: updateStatusProps) {
 const {match}=   await findMatchById(id);
  if (data.status === "FINISHED") {
    if (match.status !== "ONGOING") {
      throw new AppError(
        match.status === "FINISHED"
          ? "Essa partida já foi finalizada"
          : "Para finalizar uma partida ela precisa entrar em andamento primeiro"
      );
    }
  }
 if(match.status === "FINISHED" && data.status !=="FINISHED"){
  await rollbackGroupsScores({match})
 }

 if(data.status === "FINISHED"){
   await updateGroupsScores({match})
 }

 const statusmatch = await prisma.match.update({ where: { id }, data });

 return {statusmatch}
}
