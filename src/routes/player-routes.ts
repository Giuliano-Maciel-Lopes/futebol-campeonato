import { Router } from "express";
import { PlayerController } from "@/controoler/player-controllers";
import { ensureAuth, verifyUserAuthorization } from "@/middleware";

const playerRoutes = Router();

const playerController = new PlayerController();
playerRoutes.get("/me", ensureAuth ,  playerController.playersByUser)
playerRoutes.get("/:id", playerController.showID);
playerRoutes.get("/", playerController.list);

playerRoutes.use(ensureAuth);

playerRoutes.post("/", playerController.create);
playerRoutes.patch("/:id", playerController.update);
playerRoutes.delete("/:id", verifyUserAuthorization(["ADMIN"]) ,  playerController.delete);
playerRoutes.patch("/isActive/:id", verifyUserAuthorization(["ADMIN"]) ,  playerController.isActiveUpdate);






export { playerRoutes };
