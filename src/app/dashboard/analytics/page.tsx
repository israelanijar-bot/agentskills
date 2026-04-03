"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/* Mock data                                                          */
/* ------------------------------------------------------------------ */

type DateRange = "7d" | "30d" | "90d";

const metricsData: Record<DateRange, { views: string; clicks: string; conversion: string; revenue: string }> = {
  "7d": { views: "2.340", clicks: "456", conversion: "4,2%", revenue: "R$ 2.890,00" },
  "30d": { views: "12.450", clicks: "2.134", conversion: "3,8%", revenue: "R$ 12.450,00" },
  "90d": { views: "38.120", clicks: "6.230", conversion: "4,1%", revenue: "R$ 34.670,00" },
};

const chartData: Record<DateRange, { label: string; value: number }[]> = {
  "7d": [
    { label: "Seg", value: 320 },
    { label: "Ter", value: 410 },
    { label: "Qua", value: 280 },
    { label: "Qui", value: 520 },
    { label: "Sex", value: 390 },
    { label: "Sab", value: 220 },
    { label: "Dom", value: 198 },
  ],
  "30d": [
    { label: "Sem 1", value: 2100 },
    { label: "Sem 2", value: 2800 },
    { label: "Sem 3", value: 3200 },
    { label: "Sem 4", value: 4350 },
  ],
  "90d": [
    { label: "Jan", value: 9800 },
    { label: "Fev", value: 11200 },
    { label: "Mar", value: 17120 },
  ],
};

const topProducts = [
  { rank: 1, name: "Automacao WhatsApp", views: 4230, sales: 123, conversion: "2,9%" },
  { rank: 2, name: "Loops de Codigo para Agentes", views: 3120, sales: 87, conversion: "2,8%" },
  { rank: 3, name: "Engenheiro Senior", views: 2890, sales: 76, conversion: "2,6%" },
  { rank: 4, name: "Pack Desenvolvedor Full Stack", views: 2140, sales: 54, conversion: "2,5%" },
  { rank: 5, name: "Acesso YouTube para Agentes", views: 1670, sales: 42, conversion: "2,5%" },
];

const topReferrers = [
  { source: "Google (organico)", visits: 5230, conversions: 187 },
  { source: "Twitter / X", visits: 2890, conversions: 98 },
  { source: "LinkedIn", visits: 1940, conversions: 67 },
  { source: "GitHub", visits: 1230, conversions: 45 },
  { source: "Direto", visits: 980, conversions: 34 },
  { source: "YouTube", visits: 560, conversions: 12 },
];

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export default function AnalyticsPage() {
  const [range, setRange] = useState<DateRange>("7d");

  const metrics = metricsData[range];
  const chart = chartData[range];
  const maxChartValue = Math.max(...chart.map((d) => d.value));

  const metricCards = [
    {
      label: "Visualizacoes",
      value: metrics.views,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      label: "Cliques",
      value: metrics.clicks,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
        </svg>
      ),
    },
    {
      label: "Conversao",
      value: metrics.conversion,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
    },
    {
      label: "Receita",
      value: metrics.revenue,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const ranges: { key: DateRange; label: string }[] = [
    { key: "7d", label: "Ultimos 7 dias" },
    { key: "30d", label: "Ultimos 30 dias" },
    { key: "90d", label: "Ultimos 90 dias" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Analytics</h1>
          <p className="text-sm text-ink-500 mt-1">
            Acompanhe o desempenho dos seus produtos.
          </p>
        </div>

        {/* Date range selector */}
        <div className="flex gap-1 p-1 bg-sand-100 rounded-xl w-fit">
          {ranges.map((r) => (
            <button
              key={r.key}
              onClick={() => setRange(r.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                range === r.key
                  ? "bg-white text-ink-900 shadow-sm"
                  : "text-ink-500 hover:text-ink-700"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((m) => (
          <div
            key={m.label}
            className="bg-white rounded-2xl border border-sand-200 p-5 flex items-start gap-4"
          >
            <div className="p-2 rounded-xl bg-accent-500/10 text-accent-500 shrink-0">
              {m.icon}
            </div>
            <div>
              <p className="text-xs font-medium text-ink-500 uppercase tracking-wide">
                {m.label}
              </p>
              <p className="text-xl font-bold text-ink-900 mt-1">{m.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl border border-sand-200 p-6">
        <h2 className="text-lg font-semibold text-ink-900 mb-6">
          Visualizacoes por Periodo
        </h2>
        <div className="flex items-end gap-3 h-48">
          {chart.map((d) => (
            <div key={d.label} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-medium text-ink-500">
                {d.value.toLocaleString("pt-BR")}
              </span>
              <div className="w-full">
                <div
                  className="w-full bg-accent-500/80 rounded-t-lg hover:bg-accent-500 transition-colors"
                  style={{
                    height: `${(d.value / maxChartValue) * 140}px`,
                  }}
                />
              </div>
              <span className="text-xs text-ink-500">{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tables row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top products */}
        <div className="bg-white rounded-2xl border border-sand-200">
          <div className="px-6 py-4 border-b border-sand-100">
            <h2 className="text-lg font-semibold text-ink-900">
              Produtos Mais Vistos
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-sand-100">
                  <th className="text-left px-6 py-3 font-medium text-ink-500 text-xs uppercase tracking-wide">
                    #
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-ink-500 text-xs uppercase tracking-wide">
                    Produto
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-ink-500 text-xs uppercase tracking-wide">
                    Views
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-ink-500 text-xs uppercase tracking-wide">
                    Vendas
                  </th>
                  <th className="text-right px-6 py-3 font-medium text-ink-500 text-xs uppercase tracking-wide">
                    Conv.
                  </th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p) => (
                  <tr
                    key={p.rank}
                    className="border-b border-sand-100 last:border-0 hover:bg-sand-50/50"
                  >
                    <td className="px-6 py-3 text-ink-500 font-medium">
                      {p.rank}
                    </td>
                    <td className="px-4 py-3 font-medium text-ink-900 text-xs">
                      {p.name}
                    </td>
                    <td className="px-4 py-3 text-right text-ink-700 text-xs">
                      {p.views.toLocaleString("pt-BR")}
                    </td>
                    <td className="px-4 py-3 text-right text-ink-700 text-xs">
                      {p.sales}
                    </td>
                    <td className="px-6 py-3 text-right text-ink-700 text-xs">
                      {p.conversion}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top referrers */}
        <div className="bg-white rounded-2xl border border-sand-200">
          <div className="px-6 py-4 border-b border-sand-100">
            <h2 className="text-lg font-semibold text-ink-900">
              Principais Fontes de Trafego
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-sand-100">
                  <th className="text-left px-6 py-3 font-medium text-ink-500 text-xs uppercase tracking-wide">
                    Fonte
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-ink-500 text-xs uppercase tracking-wide">
                    Visitas
                  </th>
                  <th className="text-right px-6 py-3 font-medium text-ink-500 text-xs uppercase tracking-wide">
                    Conversoes
                  </th>
                </tr>
              </thead>
              <tbody>
                {topReferrers.map((r) => (
                  <tr
                    key={r.source}
                    className="border-b border-sand-100 last:border-0 hover:bg-sand-50/50"
                  >
                    <td className="px-6 py-3 font-medium text-ink-900 text-xs">
                      {r.source}
                    </td>
                    <td className="px-4 py-3 text-right text-ink-700 text-xs">
                      {r.visits.toLocaleString("pt-BR")}
                    </td>
                    <td className="px-6 py-3 text-right text-ink-700 text-xs">
                      {r.conversions}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
