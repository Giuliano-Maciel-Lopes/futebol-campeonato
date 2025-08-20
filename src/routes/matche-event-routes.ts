import { MatcheEventController } from "@/controoler/matche-event-controller";
import { verifyUserAuthorization } from "@/middleware";
import { Router } from "express";

const matchEventRoutes = Router();

const matcheEventController = new MatcheEventController();

matchEventRoutes.use(verifyUserAuthorization(["ADMIN"]));

matchEventRoutes.post("/", matcheEventController.create);

export { matchEventRoutes };
