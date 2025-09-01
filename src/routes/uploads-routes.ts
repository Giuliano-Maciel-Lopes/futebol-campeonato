import { UploadsController } from "@/controoler/uploads-controller";
import { Router } from "express";
import configUpload from "../config/upload";
import multer from "multer";

const uploadsRoutes = Router();

const uploadsController = new UploadsController();


const upload = multer(configUpload.MULTER);


uploadsRoutes.post("/", upload.single("file"), uploadsController.create);

export { uploadsRoutes };
