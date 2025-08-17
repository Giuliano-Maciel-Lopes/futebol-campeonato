import { Request, Response, NextFunction } from "express"
import { AppError } from "@/utils/AppEroor"
import { Role } from "@prisma/client"



function verifyUserAuthorization(role: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if(!req.user){
        throw new AppError("ops Não autorizado!!")
    }
    if(!role.includes(req.user.role)){
        throw new AppError("ops Não autorizado!!")

    }
  next()
  }
} 
export {verifyUserAuthorization}

