import { Router } from "express";
import { userRoutes } from "./user-routes";
import { sessionRoutes } from "./session-routes";
import { ensureAuth } from "@/middleware/ensureauth";
import { playerRoutes } from "./player-routes";
import { teamRoutes } from "./team-routes";

const routes = Router();

routes.use("/session", sessionRoutes); 
routes.use("/users", userRoutes);
routes.use("/players", playerRoutes);
routes.use("/teams", teamRoutes)

routes.use(ensureAuth);



export { routes };
