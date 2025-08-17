import { Router } from "express";
import { UserController } from "@/controoler/user-controoller";
import { verifyUserAuthorization } from "@/middleware";


const userRoutes = Router()

const userController = new UserController

userRoutes.post("/" ,  userController.create)

export {userRoutes}