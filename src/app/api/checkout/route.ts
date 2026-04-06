import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getProductBySlug } from "@/data/seed";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Pagamento nao configurado ainda" },
      { status: 503 }
    );
  }

  try {
    const { slug } = await request.json();

    const product = getProductBySlug(slug);
    if (!product) {
      return NextResponse.json({ error: "Produto nao encontrado" }, { status: 404 });
    }

    if (product.price === 0) {
      return NextResponse.json({ error: "Produto gratuito" }, { status: 400 });
    }

    // Obter user_id do usuario autenticado
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const origin = request.headers.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: product.title,
              description: product.description,
              images: product.image.startsWith("http") ? [product.image] : [],
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        product_slug: product.slug,
        product_id: product.id,
        user_id: user?.id || "",
      },
      success_url: `${origin}/compra/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/${product.slug}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Erro ao criar sessao de pagamento" },
      { status: 500 }
    );
  }
}
