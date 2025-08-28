import express from "express";
import "express-async-errors";
import { routes } from "./routes";
import { errorHandling } from "./middleware";
import cors from "cors"


export const app = express();

app.use(cors)
app.use(express.json());


app.use(routes);

app.use(errorHandling)
