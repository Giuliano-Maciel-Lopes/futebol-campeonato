AppError
import { prisma } from "@/database/prisma-config";
import { AppError } from "@/utils/AppEroor";
import type { User } from "@prisma/client";

type CreateUser = {
  data: Omit<User, "id" | "createdAt" | "updatedAt"|"role">;
};

export async function CreatUser({ data }: CreateUser) {
  const email = await prisma.user.findUnique({ where: { email: data.email }  });

if (email) {
  throw new AppError("Já existe um usuário com este e-mail");
}

  await prisma.user.create({data:data})
  


}
