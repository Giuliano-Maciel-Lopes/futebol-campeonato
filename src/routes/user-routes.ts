import { Router } from "express";
import { UserController } from "@/controoler/user-controoller";

const userRoutes = Router()

const userController = new UserController

userRoutes.post("/" , userController.create)

export {userRoutes}