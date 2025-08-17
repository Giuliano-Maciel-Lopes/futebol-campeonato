import express from "express";
import "express-async-errors";
import { routes } from "./routes";
import { errorHandling } from "./middleware/errohandler";
import { ensureAuth } from "./middleware/ensureauth";

export const app = express();

app.use(express.json());


app.use(routes);

app.use(errorHandling)
app.use(ensureAuth)