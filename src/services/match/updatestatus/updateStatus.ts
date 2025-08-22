import { prisma } from "@/database/prisma-config";
import { MatchBodyUpdateStatusInput } from "@/schemazod/match/updatStatus";
import { findMatchById } from "@/utils/prismaHelpersutils";

type updateStatusProps = {
  data: MatchBodyUpdateStatusInput;
  id: string;
};

export async function updateStatus({ data, id }: updateStatusProps) {
 const {match}=   await findMatchById(id);


  await prisma.match.update({ where: { id }, data });
}
