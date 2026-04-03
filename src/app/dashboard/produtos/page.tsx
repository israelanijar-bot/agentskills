"use client";

import { useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/* Mock data                                                          */
/* ------------------------------------------------------------------ */

type ProductStatus = "publicado" | "em revisao" | "rascunho";

interface DashboardProduct {
  id: string;
  title: string;
  image: string;
  type: "skill" | "persona" | "bundle";
  status: ProductStatus;
  sales: number;
  revenue: string;
  date: string;
}

const mockProducts: DashboardProduct[] = [
  {
    id: "1",
    title: "Loops de Codigo para Agentes",
    image: "https://placehold.co/80x60/1a1a2e/e0e0e0?text=Loops",
    type: "skill",
    status: "publicado",
    sales: 387,
    revenue: "R$ 19.301,30",
    date: "15/03/2026",
  },
  {
    id: "2",
    title: "Acesso YouTube para Agentes",
    image: "https://placehold.co/80x60/1a1a2e/e0e0e0?text=YouTube",
    type: "skill",
    status: "publicado",
    sales: 256,
    revenue: "R$ 10.214,40",
    date: "20/02/2026",
  },
  {
    id: "3",
    title: "Automacao WhatsApp",
    image: "https://placehold.co/80x60/1a1a2e/e0e0e0?text=WhatsApp",
    type: "skill",
    status: "publicado",
    sales: 623,
    revenue: "R$ 56.007,70",
    date: "22/03/2026",
  },
  {
    id: "4",
    title: "Pack Desenvolvedor Full Stack",
    image: "https://placehold.co/80x60/1a1a2e/e0e0e0?text=Pack+Dev",
    type: "bundle",
    status: "em revisao",
    sales: 234,
    revenue: "R$ 42.096,60",
    date: "25/03/2026",
  },
  {
    id: "5",
    title: "Engenheiro Senior",
    image: "https://placehold.co/80x60/1a1a2e/e0e0e0?text=Eng+Sr",
    type: "persona",
    status: "publicado",
    sales: 456,
    revenue: "R$ 22.754,40",
    date: "20/03/2026",
  },
  {
    id: "6",
    title: "Nova Skill de Debugging",
    image: "https://placehold.co/80x60/1a1a2e/e0e0e0?text=Debug",
    type: "skill",
    status: "rascunho",
    sales: 0,
    revenue: "R$ 0,00",
    date: "28/03/2026",
  },
  {
    id: "7",
    title: "Assistente de Code Review",
    image: "https://placehold.co/80x60/1a1a2e/e0e0e0?text=Review",
    type: "persona",
    status: "em revisao",
    sales: 0,
    revenue: "R$ 0,00",
    date: "30/03/2026",
  },
  {
    id: "8",
    title: "Kit DevOps Completo",
    image: "https://placehold.co/80x60/1a1a2e/e0e0e0?text=DevOps",
    type: "bundle",
    status: "rascunho",
    sales: 0,
    revenue: "R$ 0,00",
    date: "01/04/2026",
  },
];

const statusConfig: Record<ProductStatus, { label: string; className: string }> = {
  publicado: { label: "Publicado", className: "bg-success/15 text-green-700" },
  "em revisao": { label: "Em Revisao", className: "bg-warning/15 text-yellow-700" },
  rascunho: { label: "Rascunho", className: "bg-sand-200 text-ink-500" },
};

const typeConfig: Record<string, { label: string; className: string }> = {
  skill: { label: "Skill", className: "bg-blue-100 text-blue-700" },
  persona: { label: "Persona", className: "bg-purple-100 text-purple-700" },
  bundle: { label: "Bundle", className: "bg-orange-100 text-orange-700" },
};

type FilterTab = "todos" | "publicado" | "em revisao" | "rascunho";

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export default function ProdutosPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("todos");

  const filtered =
    activeTab === "todos"
      ? mockProducts
      : mockProducts.filter((p) => p.status === activeTab);

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: "todos", label: "Todos", count: mockProducts.length },
    {
      key: "publicado",
      label: "Publicados",
      count: mockProducts.filter((p) => p.status === "publicado").length,
    },
    {
      key: "em revisao",
      label: "Em Revisao",
      count: mockProducts.filter((p) => p.status === "em revisao").length,
    },
    {
      key: "rascunho",
      label: "Rascunhos",
      count: mockProducts.filter((p) => p.status === "rascunho").length,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Meus Produtos</h1>
          <p className="text-sm text-ink-500 mt-1">
            Gerencie todos os seus produtos publicados no marketplace.
          </p>
        </div>
        <Link
          href="/dashboard/novo-produto"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-accent-500 text-white hover:bg-accent-600 shadow-sm hover:shadow-md transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Novo Produto
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 p-1 bg-sand-100 rounded-xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "bg-white text-ink-900 shadow-sm"
                : "text-ink-500 hover:text-ink-700"
            }`}
          >
            {tab.label}
            <span className="ml-1.5 text-xs opacity-60">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Products table */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-sand-200 p-12 text-center">
          <svg className="w-12 h-12 mx-auto text-ink-500/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
          <p className="text-ink-700 font-medium">
            Voce ainda nao tem produtos. Crie o primeiro!
          </p>
          <Link
            href="/dashboard/novo-produto"
            className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 text-sm font-semibold rounded-xl bg-accent-500 text-white hover:bg-accent-600 shadow-sm transition-all"
          >
            Criar Produto
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-sand-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-sand-100">
                  <th className="text-left px-6 py-3 font-medium text-ink-500 text-xs uppercase tracking-wide">
                    Produto
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-ink-500 text-xs uppercase tracking-wide">
                    Tipo
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-ink-500 text-xs uppercase tracking-wide">
                    Status
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-ink-500 text-xs uppercase tracking-wide">
                    Vendas
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-ink-500 text-xs uppercase tracking-wide">
                    Receita
                  </th>
                  <th className="text-center px-4 py-3 font-medium text-ink-500 text-xs uppercase tracking-wide">
                    Data
                  </th>
                  <th className="text-right px-6 py-3 font-medium text-ink-500 text-xs uppercase tracking-wide">
                    Acoes
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const status = statusConfig[p.status];
                  const type = typeConfig[p.type];
                  return (
                    <tr
                      key={p.id}
                      className="border-b border-sand-100 last:border-0 hover:bg-sand-50/50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-12 h-9 rounded-lg object-cover bg-sand-100"
                          />
                          <span className="font-medium text-ink-900">
                            {p.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${type.className}`}
                        >
                          {type.label}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right text-ink-700">
                        {p.sales.toLocaleString("pt-BR")}
                      </td>
                      <td className="px-4 py-4 text-right text-ink-700">
                        {p.revenue}
                      </td>
                      <td className="px-4 py-4 text-center text-ink-500 text-xs">
                        {p.date}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button className="px-2.5 py-1.5 text-xs font-medium rounded-lg text-accent-500 hover:bg-accent-500/10 transition-colors">
                            Editar
                          </button>
                          <button className="px-2.5 py-1.5 text-xs font-medium rounded-lg text-ink-500 hover:bg-sand-100 transition-colors">
                            Nova Versao
                          </button>
                          <a
                            href="#"
                            className="p-1.5 rounded-lg text-ink-500 hover:bg-sand-100 transition-colors"
                            title="Visualizar"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
