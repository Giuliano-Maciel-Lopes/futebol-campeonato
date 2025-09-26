import { Router } from "express";
import { StripeController } from "@/controoler/stripe-controller";

const stripeRoutes = Router();

const stripeController = new StripeController();

// protegida por middlaware no index
stripeRoutes.post("/payment", stripeController.create);

export { stripeRoutes };
