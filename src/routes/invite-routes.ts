import { Router } from "express";
import { InviteController } from "@/controoler/invite-controller";
import { ensureAuth } from "@/middleware";

const inviteRoutes = Router();

const inviteController = new InviteController();


inviteRoutes.post("/", inviteController.create);
inviteRoutes.get("/", inviteController.list);
inviteRoutes.get("/:id", inviteController.showID);
inviteRoutes.patch("/:id", inviteController.update);
inviteRoutes.delete("/:id", inviteController.delete);

export { inviteRoutes };
