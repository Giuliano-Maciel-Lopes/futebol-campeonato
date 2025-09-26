import { prisma } from "@/database/prisma-config";
import { Prisma, Role } from "@prisma/client";
import { teamInclude } from "../utils/getinclude";
import { ParamsTeam } from "@/schemazod/team/params";

type Props = {
  role?: Role;
  params?: ParamsTeam;
};

export async function listTeam({ role, params }: Props) {
  const ADM = role === "ADMIN";

  const whereActive: Prisma.TeamWhereInput = ADM ? {} : { isActive: true };
   const searchWhere: Prisma.TeamWhereInput = params?.search
    ? { name: { contains: params.search, mode: "insensitive" } }
    : {};

  const fullTeam = await prisma.team.findMany({
    where: { ...whereActive, ...searchWhere },
    include: teamInclude,
  });

  return { fullTeam };
}
