import { Router } from "express";
import { PlayerController } from "@/controoler/player-controllers";

const playerRoutes = Router();

const playerController = new PlayerController();

playerRoutes.post("/", playerController.create);
playerRoutes.get("/:id", playerController.get);
playerRoutes.get("/", playerController.list);
playerRoutes.put("/:id", playerController.update);
playerRoutes.delete("/:id", playerController.delete);

export { playerRoutes}