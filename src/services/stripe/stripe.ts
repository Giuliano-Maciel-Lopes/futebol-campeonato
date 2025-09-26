import Stripe from "stripe";
import { env } from "@/utils/env";
import { TeamBodySchemaInputStripe } from "@/schemazod/team/createStripe";
import { findPlayerByUserId } from "@/utils/prismaHelpersutils";
import { AppError } from "@/utils/AppEroor";

type Props = {
  stripe: Stripe;
  data: TeamBodySchemaInputStripe;
  userId: string;
};

export async function CreateStripeCheckout({ stripe, data, userId }: Props) {
  const { player } = await findPlayerByUserId(userId);

  if (player.teamId) {
    throw new AppError("Essa conta ja tem uma cartinha que pertence a um time!! ");
  }

  //  criei a sessão de checkout com metadata // para usar com hebhok
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "brl",
          product_data: {
            name: "Inscrição Fut7",
          },
          unit_amount: 59999, // R$599,99 em centavos
        },
        quantity: 1,
      },
    ],
    metadata: {
      nameTeam: data.name, // name do time
      playerId: player.id, // player que vai ser tornar capitao depois no hebbhook
    },
    success_url: `${env.URL_FRONT}/cart/payment?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.URL_FRONT}/cart/payment?canceled=true`,
  });

  return session;
}
