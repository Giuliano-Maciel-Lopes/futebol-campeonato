import { Router } from "express";
import { TeamController } from "@/controoler/team-controller";
import { ensureAuth, verifyUserAuthorization } from "@/middleware";


const teamRoutes = Router();

const teamController = new TeamController();
teamRoutes.get("/:id", teamController.showID);
teamRoutes.get("/", teamController.list);

teamRoutes.use(ensureAuth)

teamRoutes.post("/", verifyUserAuthorization(["ADMIN"]) ,  teamController.create);
teamRoutes.patch("/:id", teamController.update);
teamRoutes.delete("/:id", verifyUserAuthorization(["ADMIN"]) ,  teamController.delete);
teamRoutes.patch("/isActive/:id", verifyUserAuthorization(["ADMIN"]) ,  teamController.isActiveUpdate);


export { teamRoutes };
