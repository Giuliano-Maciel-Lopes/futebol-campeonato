import { Router } from "express";
import { userRoutes } from "./user-routes";
import { sessionRoutes } from "./session-routes";
import { ensureAuth } from "@/middleware/ensureauth";
import { playerRoutes } from "./player-routes";
import { inviteRoutes } from "./invite-routes";
import { teamRoutes } from "./team-routes";
import { matchRoutes } from "./match-routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/session", sessionRoutes);
routes.use("/teams", teamRoutes);
routes.use("/players", playerRoutes);
routes.use("/match" , matchRoutes)


routes.use(ensureAuth);
routes.use("/invites", inviteRoutes);




export { routes };
