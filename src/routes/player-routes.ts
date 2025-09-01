import { Router } from "express";
import { PlayerController } from "@/controoler/player-controllers";
import { ensureAuth, verifyUserAuthorization } from "@/middleware";
import multer from "multer";
import configUpload from "../config/upload";

const playerRoutes = Router();

const playerController = new PlayerController();

const uploads = multer(configUpload.MULTER)

playerRoutes.get("/me", ensureAuth ,  playerController.playersByUser)
playerRoutes.get("/:id", playerController.showID);
playerRoutes.get("/", playerController.list);

playerRoutes.use(ensureAuth);

playerRoutes.post("/", playerController.create);
playerRoutes.patch("/:id", uploads.single("file") , playerController.update);
playerRoutes.delete("/:id", verifyUserAuthorization(["ADMIN"]) ,  playerController.delete);
playerRoutes.patch("/isActive/:id", verifyUserAuthorization(["ADMIN"]) ,  playerController.isActiveUpdate);






export { playerRoutes };
