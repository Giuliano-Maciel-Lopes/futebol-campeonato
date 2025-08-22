import { prisma } from "@/database/prisma-config";
import { Prisma } from "@prisma/client";

type ListProps = {
  name?: string | undefined;
};

export async function listGroups({ name }: ListProps) {
  let where: Prisma.GroupWhereInput;
  where = name ? { name } : {};
  const groups = await prisma.group.findMany({
    where,
    include: {
      groupscore: {
        select: {
          points: true,
          played: true,
          win: true,
          drawn: true,
          lost: true,
          goalsFor: true,
          goalsAgainst: true,
          goalDifference: true,
          team: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return { groups };
}
