"use client";

import { useState, KeyboardEvent } from "react";
import { slugify } from "@/lib/utils";
import { categories } from "@/data/seed";

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export default function NovoProdutoPage() {
  const [titulo, setTitulo] = useState("");
  const [slug, setSlug] = useState("");
  const [tipo, setTipo] = useState<"skill" | "persona" | "bundle">("skill");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [gratuito, setGratuito] = useState(false);
  const [descricaoCurta, setDescricaoCurta] = useState("");
  const [descricaoLonga, setDescricaoLonga] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleTituloChange = (value: string) => {
    setTitulo(value);
    setSlug(slugify(value));
    if (errors.titulo) setErrors((e) => ({ ...e, titulo: "" }));
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim().toLowerCase())) {
        setTags([...tags, tagInput.trim().toLowerCase()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!titulo.trim()) newErrors.titulo = "Titulo e obrigatorio";
    if (!categoria) newErrors.categoria = "Selecione uma categoria";
    if (!gratuito && (!preco || parseFloat(preco) <= 0))
      newErrors.preco = "Informe um preco valido";
    if (!descricaoCurta.trim())
      newErrors.descricaoCurta = "Descricao curta e obrigatoria";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (action: "draft" | "review") => {
    if (action === "review" && !validate()) return;
    alert(
      action === "draft"
        ? "Rascunho salvo com sucesso!"
        : "Produto enviado para revisao!"
    );
  };

  const inputClass = (field?: string) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm text-ink-900 bg-white placeholder:text-ink-500/60 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all ${
      field && errors[field]
        ? "border-red-400 ring-1 ring-red-300"
        : "border-sand-200"
    }`;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-ink-900">Novo Produto</h1>
        <p className="text-sm text-ink-500 mt-1">
          Preencha as informacoes do seu produto para publicar no marketplace.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informacoes Basicas */}
          <section className="bg-white rounded-2xl border border-sand-200 p-6 space-y-5">
            <h2 className="text-lg font-semibold text-ink-900">
              Informacoes Basicas
            </h2>

            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">
                Titulo *
              </label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => handleTituloChange(e.target.value)}
                placeholder="Ex: Automacao WhatsApp para Agentes"
                className={inputClass("titulo")}
              />
              {errors.titulo && (
                <p className="text-xs text-red-500 mt-1">{errors.titulo}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">
                Slug
              </label>
              <input
                type="text"
                value={slug}
                readOnly
                className="w-full px-4 py-2.5 rounded-xl border border-sand-200 text-sm text-ink-500 bg-sand-50"
              />
              <p className="text-xs text-ink-500 mt-1">
                Gerado automaticamente a partir do titulo
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1.5">
                  Tipo *
                </label>
                <select
                  value={tipo}
                  onChange={(e) =>
                    setTipo(e.target.value as "skill" | "persona" | "bundle")
                  }
                  className={inputClass()}
                >
                  <option value="skill">Skill</option>
                  <option value="persona">Persona</option>
                  <option value="bundle">Bundle</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1.5">
                  Categoria *
                </label>
                <select
                  value={categoria}
                  onChange={(e) => {
                    setCategoria(e.target.value);
                    if (errors.categoria)
                      setErrors((err) => ({ ...err, categoria: "" }));
                  }}
                  className={inputClass("categoria")}
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.icon} {c.name}
                    </option>
                  ))}
                </select>
                {errors.categoria && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.categoria}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Preco */}
          <section className="bg-white rounded-2xl border border-sand-200 p-6 space-y-5">
            <h2 className="text-lg font-semibold text-ink-900">Preco</h2>

            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">
                Preco (R$) *
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={preco}
                onChange={(e) => {
                  setPreco(e.target.value);
                  if (errors.preco)
                    setErrors((err) => ({ ...err, preco: "" }));
                }}
                disabled={gratuito}
                placeholder="0,00"
                className={`${inputClass("preco")} ${
                  gratuito ? "opacity-50 cursor-not-allowed" : ""
                }`}
              />
              {errors.preco && (
                <p className="text-xs text-red-500 mt-1">{errors.preco}</p>
              )}
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={gratuito}
                onChange={(e) => {
                  setGratuito(e.target.checked);
                  if (e.target.checked) {
                    setPreco("");
                    setErrors((err) => ({ ...err, preco: "" }));
                  }
                }}
                className="w-4 h-4 rounded border-sand-200 text-accent-500 focus:ring-accent-500"
              />
              <span className="text-sm text-ink-700">Produto gratuito</span>
            </label>
          </section>

          {/* Descricao */}
          <section className="bg-white rounded-2xl border border-sand-200 p-6 space-y-5">
            <h2 className="text-lg font-semibold text-ink-900">Descricao</h2>

            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">
                Descricao curta *
              </label>
              <textarea
                rows={3}
                value={descricaoCurta}
                onChange={(e) => {
                  setDescricaoCurta(e.target.value);
                  if (errors.descricaoCurta)
                    setErrors((err) => ({ ...err, descricaoCurta: "" }));
                }}
                placeholder="Uma frase que resume o que seu produto faz..."
                className={inputClass("descricaoCurta")}
              />
              {errors.descricaoCurta && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.descricaoCurta}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">
                Descricao longa
              </label>
              <textarea
                rows={8}
                value={descricaoLonga}
                onChange={(e) => setDescricaoLonga(e.target.value)}
                placeholder="Descreva em detalhes o que o produto faz, como funciona, e para quem e indicado..."
                className={inputClass()}
              />
              <p className="text-xs text-ink-500 mt-1">
                Suporta Markdown
              </p>
            </div>
          </section>

          {/* Arquivos */}
          <section className="bg-white rounded-2xl border border-sand-200 p-6 space-y-5">
            <h2 className="text-lg font-semibold text-ink-900">Arquivos</h2>

            <div className="border-2 border-dashed border-sand-200 rounded-xl p-8 text-center hover:border-accent-400 transition-colors cursor-pointer">
              <svg className="w-10 h-10 mx-auto text-ink-500/50 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <p className="text-sm font-medium text-ink-700">
                Arraste arquivos ou clique para selecionar
              </p>
              <p className="text-xs text-ink-500 mt-1">
                Formatos aceitos: .md, .zip
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">
                Imagem de Capa
              </label>
              <div className="border-2 border-dashed border-sand-200 rounded-xl p-8 text-center hover:border-accent-400 transition-colors cursor-pointer">
                <svg className="w-10 h-10 mx-auto text-ink-500/50 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                </svg>
                <p className="text-sm font-medium text-ink-700">
                  Arraste uma imagem ou clique para selecionar
                </p>
                <p className="text-xs text-ink-500 mt-1">
                  PNG, JPG ou WebP (max 2MB)
                </p>
              </div>
            </div>
          </section>

          {/* Tags */}
          <section className="bg-white rounded-2xl border border-sand-200 p-6 space-y-5">
            <h2 className="text-lg font-semibold text-ink-900">Tags</h2>

            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">
                Adicionar tags
              </label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Digite e pressione Enter para adicionar..."
                className={inputClass()}
              />
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-500/10 text-accent-500 text-xs font-medium"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-accent-600"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </section>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => handleSubmit("review")}
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-xl bg-accent-500 text-white hover:bg-accent-600 shadow-sm hover:shadow-md transition-all"
            >
              Enviar para Revisao
            </button>
            <button
              onClick={() => handleSubmit("draft")}
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-xl border-2 border-accent-500 text-accent-500 hover:bg-accent-500 hover:text-white transition-all"
            >
              Salvar Rascunho
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <h3 className="text-sm font-semibold text-ink-700 uppercase tracking-wide">
              Pre-visualizacao
            </h3>
            <div className="bg-white rounded-2xl border border-sand-200 overflow-hidden">
              {/* Card image */}
              <div className="aspect-[4/3] bg-ink-900 flex items-center justify-center">
                <span className="text-white/30 text-sm">Imagem de Capa</span>
              </div>
              {/* Card body */}
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-accent-500/10 text-accent-500 text-xs font-medium capitalize">
                    {tipo}
                  </span>
                  {categoria && (
                    <span className="text-xs text-ink-500">
                      {categories.find((c) => c.id === categoria)?.name}
                    </span>
                  )}
                </div>
                <h4 className="font-semibold text-ink-900 text-sm leading-tight">
                  {titulo || "Titulo do produto"}
                </h4>
                <p className="text-xs text-ink-500 line-clamp-2">
                  {descricaoCurta || "Descricao curta do produto..."}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-sand-100">
                  <span className="text-sm font-bold text-ink-900">
                    {gratuito
                      ? "Gratis"
                      : preco
                      ? `R$ ${parseFloat(preco).toFixed(2).replace(".", ",")}`
                      : "R$ 0,00"}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-ink-500">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                    0 vendas
                  </div>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full bg-sand-100 text-ink-500 text-[10px]"
                      >
                        {tag}
                      </span>
                    ))}
                    {tags.length > 4 && (
                      <span className="text-[10px] text-ink-500">
                        +{tags.length - 4}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
