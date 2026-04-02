"use client";

import Link from "next/link";

/* ------------------------------------------------------------------ */
/* Mock data                                                          */
/* ------------------------------------------------------------------ */

const metrics = [
  {
    label: "Receita Total",
    value: "R$ 12.450,00",
    change: "+12,5%",
    positive: true,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Vendas Totais",
    value: "342",
    change: "+8,3%",
    positive: true,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
  },
  {
    label: "Produtos Publicados",
    value: "8",
    change: "+2",
    positive: true,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  {
    label: "Visualizacoes",
    value: "15.230",
    change: "+23,1%",
    positive: true,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const chartData = [
  { day: "Seg", value: 45 },
  { day: "Ter", value: 62 },
  { day: "Qua", value: 38 },
  { day: "Qui", value: 71 },
  { day: "Sex", value: 55 },
  { day: "Sab", value: 28 },
  { day: "Dom", value: 19 },
];

type ProductStatus = "publicado" | "em revisao" | "rascunho";

const productsData: {
  id: string;
  name: string;
  status: ProductStatus;
  sales: number;
  revenue: string;
}[] = [
  { id: "1", name: "Loops de Codigo para Agentes", status: "publicado", sales: 387, revenue: "R$ 19.301,30" },
  { id: "2", name: "Acesso YouTube para Agentes", status: "publicado", sales: 256, revenue: "R$ 10.214,40" },
  { id: "3", name: "Automacao WhatsApp", status: "publicado", sales: 623, revenue: "R$ 56.007,70" },
  { id: "4", name: "Pack Desenvolvedor Full Stack", status: "em revisao", sales: 234, revenue: "R$ 42.096,60" },
  { id: "5", name: "Engenheiro Senior", status: "publicado", sales: 456, revenue: "R$ 22.754,40" },
  { id: "6", name: "Nova Skill de Debugging", status: "rascunho", sales: 0, revenue: "R$ 0,00" },
];

const statusConfig: Record<ProductStatus, { label: string; className: string }> = {
  publicado: { label: "Publicado", className: "bg-success/15 text-green-700" },
  "em revisao": { label: "Em Revisao", className: "bg-warning/15 text-yellow-700" },
  rascunho: { label: "Rascunho", className: "bg-sand-200 text-ink-500" },
};

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export default function DashboardPage() {
  const maxChartValue = Math.max(...chartData.map((d) => d.value));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">
            Dashboard do Criador
          </h1>
          <p className="text-sm text-ink-500 mt-1">
            Bem-vindo de volta, Lucas Ferreira
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

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="bg-white rounded-2xl border border-sand-200 p-5 flex items-start gap-4"
          >
            <div className="p-2.5 rounded-xl bg-accent-500/10 text-accent-500 shrink-0">
              {m.icon}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-ink-500 uppercase tracking-wide">
                {m.label}
              </p>
              <p className="text-xl font-bold text-ink-900 mt-1">{m.value}</p>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 mt-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
                {m.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Sales chart */}
      <div className="bg-white rounded-2xl border border-sand-200 p-6">
        <h2 className="text-lg font-semibold text-ink-900 mb-6">
          Vendas - Ultimos 7 dias
        </h2>
        <div className="flex items-end gap-3 h-48">
          {chartData.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-medium text-ink-500">{d.value}</span>
              <div className="w-full relative">
                <div
                  className="w-full bg-accent-500/80 rounded-t-lg hover:bg-accent-500 transition-colors"
                  style={{
                    height: `${(d.value / maxChartValue) * 140}px`,
                  }}
                />
              </div>
              <span className="text-xs text-ink-500">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Products table */}
      <div className="bg-white rounded-2xl border border-sand-200">
        <div className="px-6 py-4 border-b border-sand-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink-900">Produtos</h2>
          <Link
            href="/dashboard/produtos"
            className="text-sm text-accent-500 hover:text-accent-600 font-medium"
          >
            Ver todos
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sand-100">
                <th className="text-left px-6 py-3 font-medium text-ink-500 text-xs uppercase tracking-wide">
                  Produto
                </th>
                <th className="text-left px-6 py-3 font-medium text-ink-500 text-xs uppercase tracking-wide">
                  Status
                </th>
                <th className="text-right px-6 py-3 font-medium text-ink-500 text-xs uppercase tracking-wide">
                  Vendas
                </th>
                <th className="text-right px-6 py-3 font-medium text-ink-500 text-xs uppercase tracking-wide">
                  Receita
                </th>
                <th className="text-right px-6 py-3 font-medium text-ink-500 text-xs uppercase tracking-wide">
                  Acoes
                </th>
              </tr>
            </thead>
            <tbody>
              {productsData.map((p) => {
                const status = statusConfig[p.status];
                return (
                  <tr
                    key={p.id}
                    className="border-b border-sand-100 last:border-0 hover:bg-sand-50/50"
                  >
                    <td className="px-6 py-4 font-medium text-ink-900">
                      {p.name}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-ink-700">
                      {p.sales.toLocaleString("pt-BR")}
                    </td>
                    <td className="px-6 py-4 text-right text-ink-700">
                      {p.revenue}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="px-3 py-1.5 text-xs font-medium rounded-lg text-accent-500 hover:bg-accent-500/10 transition-colors">
                          Editar
                        </button>
                        <button className="px-3 py-1.5 text-xs font-medium rounded-lg text-ink-500 hover:bg-sand-100 transition-colors">
                          Nova Versao
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
