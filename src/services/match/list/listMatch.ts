import { prisma } from "@/database/prisma-config";
import { matchInclude } from "../utils/listincludesget";
import { ParamsMatch } from "@/schemazod/match/params";
import { Role } from "@prisma/client";

type Props ={
  params:ParamsMatch
  role?:Role
}

export async function listMatch({params , role}:Props) {
  const ADM = role === "ADMIN"

  
  const dataMatch = await prisma.match.findMany({
 where: {
  ...(!ADM && { isActive: true }), 
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
