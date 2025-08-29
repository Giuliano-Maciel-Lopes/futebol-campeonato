import { prisma } from "@/database/prisma-config";
import { compare } from "bcryptjs";
import jwt from 'jsonwebtoken';
import { CreateSessionInput } from "@/schemazod/session/creat";
import { AppError } from "@/utils/AppEroor";
import { authConfig } from "@/config/auth";

type sessionCreateInput = {
  data: CreateSessionInput;
};

export async  function sessionCreate({ data }: sessionCreateInput) {
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  if (!user) {
    throw new AppError("senha ou email incorretos");
  }
  const passwordmatch = await compare(data.password , user.password)
  if(!passwordmatch){
      throw new AppError("senha ou email incorretos");
  }
  const {expiresIn , secret} = authConfig.jwt

  const token = jwt.sign({role:user.role ?? "CAPITAO"}, secret ,{
    subject:user.id, 
    expiresIn, 
  } )
  const {password:_, ...useData}= user

  return{
    token, 
    datauser: useData
  }


}
