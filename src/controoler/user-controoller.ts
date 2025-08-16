import { prisma } from "@/database/prisma-config";
import { Request, Response } from "express";
import { UsercreateUserSchema } from "@/schemazod/user";
import { CreatUser } from "@/services/user";

class UserController {
  async create(req: Request, res: Response) {
    
    const data = UsercreateUserSchema.parse(req.body)

   await CreatUser({data:data})
   res.json("usuario criado")
}
}
export { UserController };
