import { Request, Response } from "express";
import Stripe from "stripe";
import { env } from "@/utils/env.js";
import { StripeWebhookService } from "@/services/stripe/webbhook";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-08-27.basil",
});
const webhookService = new StripeWebhookService(stripe);

class StripeWebhookController {
  async webhook(req: Request, res: Response): Promise<void> {
    try {
      const sig = req.headers["stripe-signature"] as string;
      const payload = req.body as Buffer;

      const event: Stripe.Event = webhookService.constructEvent(
        payload,
        sig,
        env.STRIPE_WEBHOOK_SECRET_KEY
      );

      await webhookService.handleEvent(event);
      res.status(200).json({ received: true });
    } catch (err) {
      console.error("Erro no webhook:", err);
      res.status(500).json({ error: "Erro no webhook" });
    }
  }
}

export { StripeWebhookController };
