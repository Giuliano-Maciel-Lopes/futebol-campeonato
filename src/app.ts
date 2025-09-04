import express from "express";
import "express-async-errors";
import { routes } from "./routes";
import { errorHandling } from "./middleware";
import cors from "cors";
import path from "node:path";
import cookieParser from "cookie-parser";


export const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000", 
  credentials: true, 
}));
app.use("/TPM", express.static(path.join(__dirname, "..", "public",  "TPM")));

app.use(express.json());
app.use(cookieParser())

app.use(routes);

app.use(errorHandling);
