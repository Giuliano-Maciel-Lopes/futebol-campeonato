import { Request, Response } from "express";
import { CreateStripeCheckout } from "@/services/stripe/stripe";
import { TeamBodySchemaStripe } from "@/schemazod/team/createStripe";
import Stripe from "stripe";
import { env } from "@/utils/env";


const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-08-27.basil"
});

class StripeController {
  async create(req: Request, res: Response) {
    const userId = req.user!.id;
    const data = TeamBodySchemaStripe.parse(req.body);
    

   const session = await CreateStripeCheckout({ userId, stripe, data });
    res.json({ url: session.url });
  }
}
export { StripeController };
