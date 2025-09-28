import { prisma } from "@/database/prisma-config";
import { Prisma } from "@prisma/client";

type ListProps = {
  name?: string;
};

export async function listGroups({ name }: ListProps) {
  const where: Prisma.GroupWhereInput = name ? { name } : {};

  const groups = await prisma.group.findMany({
    where,
    include: {
      groupscore: {
        include: {
          team: {
            select: { name: true }, 
          },
        },
      },
    },
  });

  return { groups };
}
