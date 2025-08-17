import { Router } from "express";
import { SessionController } from "@/controoler/session-controler";

const sessionRoutes = Router()

const sessionController = new SessionController

sessionRoutes.post("/" , sessionController.create)

export {sessionRoutes}