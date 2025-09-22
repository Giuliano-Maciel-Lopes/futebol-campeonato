import { Router } from "express";
import { MatchController } from "@/controoler/match-controller";
import { ensureAuth, verifyUserAuthorization } from "@/middleware";
import { optionalAuth } from "@/middleware/optionalAuth";

const matchRoutes = Router();

const matchController = new MatchController();

matchRoutes.get("/:id", optionalAuth, matchController.showID);
matchRoutes.get("/", optionalAuth, matchController.list);

matchRoutes.use(ensureAuth);

matchRoutes.use(verifyUserAuthorization(["ADMIN"]));

matchRoutes.post("/", matchController.create);
matchRoutes.delete("/:id", matchController.delete);
matchRoutes.patch("/:id", matchController.updateStatus);

export { matchRoutes };
