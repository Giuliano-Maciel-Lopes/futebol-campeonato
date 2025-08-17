import { sessionCreate } from "@/services/session";
import { Request, Response } from "express";
import { createSessionSchema } from "@/schemazod/session/creat";


class SessionController {
  async create(req: Request, res: Response) {
    
    const data = createSessionSchema.parse(req.body)
   const {token , user } =  await sessionCreate({data})
        res.json({token , user})
  }
}
export {SessionController}