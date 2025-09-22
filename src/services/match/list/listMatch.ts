import { prisma } from "@/database/prisma-config";
import { matchInclude } from "../utils/listincludesget";
import { ParamsMatch } from "@/schemazod/match/params";

type Props ={
  params:ParamsMatch
}

export async function listMatch({params}:Props) {
  const dataMatch = await prisma.match.findMany({
 where: {
  ...(params.stage && { stage: params.stage }),
  ...(params.status && { status: params.status }),
  ...(params.timeName && {
    OR: [
      { team1: { name: { contains: params.timeName, mode: "insensitive" } } },
      { team2: { name: { contains: params.timeName, mode: "insensitive" } } },
    ],
  }),
},

    orderBy: { date: "desc" },
    take: 20,
    include: matchInclude,

  });

  return { dataMatch };
}
