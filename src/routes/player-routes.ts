import { Router } from "express";
import { PlayerController } from "@/controoler/player-controllers";
import { ensureAuth } from "@/middleware";

const playerRoutes = Router();

const playerController = new PlayerController();
playerRoutes.get("/:id", playerController.showID);
playerRoutes.get("/", playerController.list);

playerRoutes.use(ensureAuth);

playerRoutes.post("/", playerController.create);




export { playerRoutes };
