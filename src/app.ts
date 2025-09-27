import express from "express";
import "express-async-errors";
import { routes } from "./routes";
import { errorHandling } from "./middleware";
import cors from "cors";
import path from "node:path";
import cookieParser from "cookie-parser";
import { stripeWebhookRoutes } from "./routes/stripe-webhook";

export const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",

    credentials: true,
  })
);

app.use("/stripe" , stripeWebhookRoutes)

app.use(express.json());
app.use(cookieParser());

app.use("/TPM", express.static(path.join(__dirname, "..", "public", "TPM")));

app.use(routes);

app.use(errorHandling);
