import { prisma } from "@/database/prisma-config";
import Stripe from "stripe";

type Metada = {
  nameTeam: string;
  playerId: string;
};

export class StripeWebhookService {
  private stripe: Stripe;

  constructor(stripe: Stripe) {
    this.stripe = stripe;
  }

  constructEvent(
    payload: Buffer,
    sig: string,
    webhookSecret: string
  ): Stripe.Event {
    return this.stripe.webhooks.constructEvent(payload, sig, webhookSecret);
  }

  async handleEvent(event: Stripe.Event) {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const metadata = session.metadata as Metada;
         console.log(" Session metadata:", session.metadata);

        const TeamCreate = await prisma.team.create({
          data: { name: metadata.nameTeam, captainId: metadata.playerId },
        });

        await prisma.player.update({
          where: { id: metadata.playerId },
          data: { teamId: TeamCreate.id, role: "CAPITAO", positionIndex: 0 },
        });

        break;
      }

      default:
        console.log("🔹 Evento não tratado:", event.type);
    }
  }
}
