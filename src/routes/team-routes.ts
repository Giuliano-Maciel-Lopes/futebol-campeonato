import { Router } from "express";
import { TeamController } from "@/controoler/team-controller";
import { ensureAuth, verifyUserAuthorization } from "@/middleware";

const teamRoutes = Router();

const teamController = new TeamController();
teamRoutes.get("/:id", teamController.showID);
teamRoutes.get("/", teamController.list);
teamRoutes.post("/", teamController.create);
teamRoutes.patch("/:id", teamController.update);
teamRoutes.delete("/:id", teamController.delete);

export { teamRoutes };
