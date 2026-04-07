import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const BUCKET = "product-files";
const SIGNED_URL_EXPIRES_IN = 60 * 60; // 60 minutos

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json(
      { error: "Slug do produto e obrigatorio" },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  // 1. Verifica autenticacao
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { error: "Voce precisa estar autenticado para baixar" },
      { status: 401 }
    );
  }

  // 2. Verifica se o usuario tem purchase para esse produto
  const { data: purchase, error: purchaseError } = await supabase
    .from("purchases")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_slug", slug)
    .eq("status", "completed")
    .limit(1)
    .maybeSingle();

  if (purchaseError) {
    console.error("Erro ao verificar purchase:", purchaseError);
    return NextResponse.json(
      { error: "Erro ao verificar a compra" },
      { status: 500 }
    );
  }

  if (!purchase) {
    return NextResponse.json(
      { error: "Voce ainda nao comprou este produto" },
      { status: 403 }
    );
  }

  // 3. Lista arquivos do produto no bucket
  const { data: files, error: listError } = await supabase.storage
    .from(BUCKET)
    .list(slug, { limit: 100, sortBy: { column: "name", order: "asc" } });

  if (listError) {
    console.error("Erro ao listar arquivos:", listError);
    return NextResponse.json(
      { error: "Erro ao acessar os arquivos" },
      { status: 500 }
    );
  }

  if (!files || files.length === 0) {
    return NextResponse.json(
      { error: "Nenhum arquivo encontrado para este produto" },
      { status: 404 }
    );
  }

  // 4. Gera signed URL para cada arquivo (60min)
  const signedFiles = await Promise.all(
    files
      .filter((f) => f.name && !f.name.startsWith(".")) // ignora placeholders
      .map(async (file) => {
        const path = `${slug}/${file.name}`;
        const { data: signed, error: signError } = await supabase.storage
          .from(BUCKET)
          .createSignedUrl(path, SIGNED_URL_EXPIRES_IN);

        if (signError || !signed) {
          console.error("Erro ao gerar signed URL:", signError);
          return null;
        }

        return { name: file.name, url: signed.signedUrl };
      })
  );

  const validFiles = signedFiles.filter(
    (f): f is { name: string; url: string } => f !== null
  );

  if (validFiles.length === 0) {
    return NextResponse.json(
      { error: "Nao foi possivel gerar links de download" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    productSlug: slug,
    expiresInMinutes: 60,
    files: validFiles,
  });
}
