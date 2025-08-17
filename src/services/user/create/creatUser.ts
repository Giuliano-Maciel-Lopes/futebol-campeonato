import { hash } from "bcryptjs";
import { prisma } from "@/database/prisma-config";
import { AppError } from "@/utils/AppEroor";
import type { User } from "@prisma/client";

type CreateUser = {
  data: Omit<User, "id" | "createdAt" | "updatedAt" | "role">;
};

export async function CreatUser({ data }: CreateUser) {
  const email = await prisma.user.findUnique({ where: { email: data.email } });

  if (email) {
    throw new AppError("Já existe um usuário com este e-mail");
  }
  const hashedPassword = hash(data.password, 8);

 const user =  await prisma.user.create({
    data: { ...data, password: await hashedPassword }
  });

  const { password, ...userWithoutPassword } = user;
  
  return userWithoutPassword;
}
