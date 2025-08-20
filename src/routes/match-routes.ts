import { Router } from "express";
import { MatchController } from "@/controoler/match-controller";
import { ensureAuth, verifyUserAuthorization } from "@/middleware";

const matchRoutes = Router();

const matchController = new MatchController();

matchRoutes.get("/:id", matchController.showID);
matchRoutes.get("/", matchController.list);

matchRoutes.use(ensureAuth);

matchRoutes.use(verifyUserAuthorization(["ADMIN"]))

matchRoutes.post("/", matchController.create);
matchRoutes.delete("/:id",  matchController.delete);


export { matchRoutes };
