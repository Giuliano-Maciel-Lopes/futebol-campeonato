import { prisma } from "@/database/prisma-config";
import { Request, Response } from "express";
import { UsercreateUserSchema } from "@/schemazod/user/creat";
import { CreatUser } from "@/services/user";

class UserController {
  async create(req: Request, res: Response) {
    const data = UsercreateUserSchema.parse(req.body);

   const user =  await CreatUser({ data: data });

    res.json(user);
  }
}
export { UserController };
