'use client';

import { useState } from 'react';

type ProductStatus = 'Publicado' | 'Em Revis\u00e3o' | 'Rejeitado' | 'Suspenso';

interface AdminProduct {
  id: string;
  name: string;
  creator: string;
  type: 'Skill' | 'Persona' | 'Bundle';
  status: ProductStatus;
  price: number;
  sales: number;
  date: string;
}

const mockProducts: AdminProduct[] = [
  { id: '1', name: 'Automa\u00e7\u00e3o WhatsApp', creator: '@lucasferreira', type: 'Skill', status: 'Publicado', price: 89.9, sales: 623, date: '22/03/2026' },
  { id: '2', name: 'Sistema de Mem\u00f3ria 3 Camadas', creator: '@rafaeloliveira', type: 'Skill', status: 'Publicado', price: 79.9, sales: 512, date: '28/03/2026' },
  { id: '3', name: 'Gerador de Conte\u00fado', creator: '@camilasantos', type: 'Skill', status: 'Em Revis\u00e3o', price: 59.9, sales: 0, date: '01/04/2026' },
  { id: '4', name: 'Bot de Telegram Avan\u00e7ado', creator: '@mariana_costa', type: 'Skill', status: 'Em Revis\u00e3o', price: 45.0, sales: 0, date: '01/04/2026' },
  { id: '5', name: 'CEO Empreendedor', creator: '@rafaeloliveira', type: 'Persona', status: 'Publicado', price: 39.9, sales: 289, date: '10/02/2026' },
  { id: '6', name: 'Assistente Jur\u00eddico', creator: '@fernanda_lima', type: 'Persona', status: 'Em Revis\u00e3o', price: 54.9, sales: 0, date: '31/03/2026' },
  { id: '7', name: 'Scraper de Dados Pessoais', creator: '@carlos_hack', type: 'Skill', status: 'Rejeitado', price: 29.9, sales: 0, date: '28/03/2026' },
  { id: '8', name: 'Kit Startup Completo', creator: '@rafaeloliveira', type: 'Bundle', status: 'Publicado', price: 149.9, sales: 145, date: '20/03/2026' },
  { id: '9', name: 'Pipeline de Vendas', creator: '@camilasantos', type: 'Skill', status: 'Publicado', price: 99.9, sales: 312, date: '05/03/2026' },
  { id: '10', name: 'Gerador de Fake Reviews', creator: '@spam_bot', type: 'Skill', status: 'Rejeitado', price: 19.9, sales: 0, date: '25/03/2026' },
  { id: '11', name: 'Analista de Dados', creator: '@julianacosta', type: 'Persona', status: 'Publicado', price: 54.9, sales: 178, date: '15/03/2026' },
  { id: '12', name: 'Automa\u00e7\u00e3o Instagram', creator: '@pedro_social', type: 'Skill', status: 'Suspenso', price: 69.9, sales: 34, date: '12/03/2026' },
];

const statusColors: Record<ProductStatus, string> = {
  'Publicado': 'bg-green-100 text-green-700',
  'Em Revis\u00e3o': 'bg-yellow-100 text-yellow-700',
  'Rejeitado': 'bg-red-100 text-red-700',
  'Suspenso': 'bg-gray-100 text-gray-600',
};

type FilterTab = 'Todos' | 'Pendentes' | 'Publicados' | 'Rejeitados';

const filterCounts: Record<FilterTab, number> = {
  Todos: 156,
  Pendentes: 8,
  Publicados: 142,
  Rejeitados: 6,
};

export default function AdminProdutos() {
  const [activeTab, setActiveTab] = useState<FilterTab>('Todos');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [openActions, setOpenActions] = useState<string | null>(null);

  const filtered = mockProducts.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.creator.toLowerCase().includes(search.toLowerCase());

    if (activeTab === 'Pendentes') return matchesSearch && p.status === 'Em Revis\u00e3o';
    if (activeTab === 'Publicados') return matchesSearch && p.status === 'Publicado';
    if (activeTab === 'Rejeitados') return matchesSearch && p.status === 'Rejeitado';
    return matchesSearch;
  });

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selected.length === filtered.length) {
      setSelected([]);
    } else {
      setSelected(filtered.map((p) => p.id));
    }
  };

  const formatPrice = (price: number) =>
    `R$ ${price.toFixed(2).replace('.', ',')}`;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-900">
          Gerenciamento de Produtos
        </h1>
        <p className="text-ink-500 mt-1">
          Gerencie, aprove e modere os produtos do marketplace
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 bg-sand-100 rounded-lg p-1 w-fit">
        {(Object.keys(filterCounts) as FilterTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === tab
                ? 'bg-white text-ink-900 shadow-sm'
                : 'text-ink-500 hover:text-ink-700'
            }`}
          >
            {tab}{' '}
            <span className="text-xs opacity-70">({filterCounts[tab]})</span>
          </button>
        ))}
      </div>

      {/* Search + Bulk Actions */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Buscar por produto ou criador..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-sand-200 bg-white text-sm text-ink-900 placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-accent-500"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500">
            {'\u{1F50D}'}
          </span>
        </div>
        {selected.length > 0 && (
          <button
            onClick={() => setSelected([])}
            className="px-4 py-2.5 bg-accent-500 text-white text-sm font-semibold rounded-xl hover:bg-accent-600 transition-colors cursor-pointer"
          >
            Aprovar Selecionados ({selected.length})
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-sand-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sand-100 bg-sand-50/50">
                <th className="pl-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      filtered.length > 0 &&
                      selected.length === filtered.length
                    }
                    onChange={toggleAll}
                    className="rounded border-sand-200 accent-accent-500"
                  />
                </th>
                <th className="px-4 py-3 text-left font-semibold text-ink-500">
                  Produto
                </th>
                <th className="px-4 py-3 text-left font-semibold text-ink-500">
                  Criador
                </th>
                <th className="px-4 py-3 text-left font-semibold text-ink-500">
                  Tipo
                </th>
                <th className="px-4 py-3 text-left font-semibold text-ink-500">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-semibold text-ink-500">
                  Pre\u00e7o
                </th>
                <th className="px-4 py-3 text-left font-semibold text-ink-500">
                  Vendas
                </th>
                <th className="px-4 py-3 text-left font-semibold text-ink-500">
                  Data
                </th>
                <th className="px-4 py-3 text-left font-semibold text-ink-500">
                  A\u00e7\u00f5es
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-sand-100 last:border-0 hover:bg-sand-50/50"
                >
                  <td className="pl-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(product.id)}
                      onChange={() => toggleSelect(product.id)}
                      className="rounded border-sand-200 accent-accent-500"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-ink-900">
                    {product.name}
                  </td>
                  <td className="px-4 py-3 text-ink-500">{product.creator}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-sand-100 text-ink-700">
                      {product.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[product.status]}`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink-700">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-4 py-3 text-ink-700">{product.sales}</td>
                  <td className="px-4 py-3 text-ink-500">{product.date}</td>
                  <td className="px-4 py-3">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenActions(
                            openActions === product.id ? null : product.id
                          )
                        }
                        className="text-ink-500 hover:text-ink-900 font-medium text-xs px-2 py-1 rounded hover:bg-sand-100 cursor-pointer"
                      >
                        {'\u2022\u2022\u2022'}
                      </button>
                      {openActions === product.id && (
                        <div className="absolute right-0 top-8 bg-white border border-sand-200 rounded-lg shadow-lg z-10 min-w-[160px] py-1">
                          <button
                            onClick={() => setOpenActions(null)}
                            className="w-full text-left px-4 py-2 text-sm text-ink-700 hover:bg-sand-50 cursor-pointer"
                          >
                            {'\u{1F441}'} Visualizar
                          </button>
                          <button
                            onClick={() => setOpenActions(null)}
                            className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-50 cursor-pointer"
                          >
                            {'\u2705'} Aprovar
                          </button>
                          <button
                            onClick={() => {
                              setRejectingId(product.id);
                              setOpenActions(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                          >
                            {'\u274C'} Rejeitar
                          </button>
                          <button
                            onClick={() => setOpenActions(null)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 cursor-pointer"
                          >
                            {'\u23F8'} Suspender
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rejection Modal */}
      {rejectingId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-ink-900">
              Rejeitar Produto
            </h3>
            <p className="text-sm text-ink-500">
              Informe o motivo da rejei\u00e7\u00e3o. O criador receber\u00e1 essa informa\u00e7\u00e3o por
              e-mail.
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Motivo da rejei\u00e7\u00e3o..."
              rows={4}
              className="w-full px-4 py-3 border border-sand-200 rounded-xl text-sm text-ink-900 placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setRejectingId(null);
                  setRejectReason('');
                }}
                className="px-4 py-2 text-sm font-medium text-ink-700 hover:bg-sand-100 rounded-lg cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setRejectingId(null);
                  setRejectReason('');
                }}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg cursor-pointer"
              >
                Confirmar Rejei\u00e7\u00e3o
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
