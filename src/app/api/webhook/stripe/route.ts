import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET not configured");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const userId = session.metadata?.user_id;
      const productSlug = session.metadata?.product_slug;

      console.log("Payment completed:", {
        sessionId: session.id,
        productSlug,
        userId,
        customerEmail: session.customer_details?.email,
        amountTotal: session.amount_total,
      });

      // Gravar compra no Supabase (usa service_role para bypass de RLS)
      if (!userId || !productSlug || !session.amount_total) {
        console.error("Webhook: metadata incompleta — nao grava purchase:", {
          userId,
          productSlug,
          amount: session.amount_total,
        });
        break;
      }

      try {
        const admin = createAdminClient();
        const { data, error } = await admin
          .from("purchases")
          .insert({
            user_id: userId,
            product_slug: productSlug,
            stripe_session_id: session.id,
            stripe_payment_intent:
              typeof session.payment_intent === "string"
                ? session.payment_intent
                : null,
            amount: session.amount_total,
            currency: session.currency || "brl",
            status: "completed",
          })
          .select()
          .single();

        if (error) {
          console.error("Webhook: erro ao gravar purchase:", error);
          // Retornar 500 faz o Stripe tentar de novo, o que e' desejavel
          return NextResponse.json(
            { error: "Failed to save purchase" },
            { status: 500 }
          );
        }

        console.log("Purchase saved:", {
          id: data.id,
          userId,
          productSlug,
          amount: session.amount_total,
        });
      } catch (err) {
        console.error("Webhook: excecao ao gravar purchase:", err);
        return NextResponse.json(
          { error: "Internal error" },
          { status: 500 }
        );
      }
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
