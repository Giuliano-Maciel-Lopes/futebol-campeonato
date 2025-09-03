import express from "express";
import "express-async-errors";
import { routes } from "./routes";
import { errorHandling } from "./middleware";
import cors from "cors";
import path from "node:path";

export const app = express();

app.use(cors());
app.use("/TPM", express.static(path.join(__dirname, "..", "public",  "TPM")));

app.use(express.json());

app.use(routes);

app.use(errorHandling);
