'use client';

import { useState } from 'react';

type UserRole = 'Comprador' | 'Criador' | 'Admin';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  products: number;
  purchases: number;
  joinedAt: string;
}

const mockUsers: AdminUser[] = [
  { id: '1', name: 'Lucas Ferreira', email: 'lucas@email.com', avatar: 'LF', role: 'Criador', products: 6, purchases: 3, joinedAt: '15/08/2025' },
  { id: '2', name: 'Camila Santos', email: 'camila@email.com', avatar: 'CS', role: 'Criador', products: 4, purchases: 5, joinedAt: '02/09/2025' },
  { id: '3', name: 'Rafael Oliveira', email: 'rafael@email.com', avatar: 'RO', role: 'Criador', products: 5, purchases: 2, joinedAt: '20/07/2025' },
  { id: '4', name: 'Israel Anijar', email: 'israel@agentskills.com', avatar: 'IA', role: 'Admin', products: 0, purchases: 0, joinedAt: '01/06/2025' },
  { id: '5', name: 'Fernanda Lima', email: 'fernanda.lima@email.com', avatar: 'FL', role: 'Comprador', products: 0, purchases: 12, joinedAt: '15/11/2025' },
  { id: '6', name: 'Marcos Souza', email: 'marcos.souza@email.com', avatar: 'MS', role: 'Comprador', products: 0, purchases: 8, joinedAt: '03/12/2025' },
  { id: '7', name: 'Ana Paula Costa', email: 'ana.costa@email.com', avatar: 'AC', role: 'Admin', products: 0, purchases: 1, joinedAt: '01/06/2025' },
  { id: '8', name: 'Juliana Costa', email: 'juliana@email.com', avatar: 'JC', role: 'Criador', products: 3, purchases: 7, joinedAt: '11/10/2025' },
  { id: '9', name: 'Bruno Alves', email: 'bruno.alves@email.com', avatar: 'BA', role: 'Comprador', products: 0, purchases: 4, joinedAt: '22/01/2026' },
  { id: '10', name: 'Carla Mendes', email: 'carla.mendes@email.com', avatar: 'CM', role: 'Admin', products: 0, purchases: 2, joinedAt: '01/06/2025' },
];

const roleColors: Record<UserRole, string> = {
  Comprador: 'bg-blue-100 text-blue-700',
  Criador: 'bg-purple-100 text-purple-700',
  Admin: 'bg-red-100 text-red-700',
};

type FilterTab = 'Todos' | 'Compradores' | 'Criadores' | 'Admins';

const filterCounts: Record<FilterTab, number> = {
  Todos: 1230,
  Compradores: 1150,
  Criadores: 45,
  Admins: 3,
};

export default function AdminUsuarios() {
  const [activeTab, setActiveTab] = useState<FilterTab>('Todos');
  const [search, setSearch] = useState('');
  const [openActions, setOpenActions] = useState<string | null>(null);

  const filtered = mockUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    if (activeTab === 'Compradores') return matchesSearch && u.role === 'Comprador';
    if (activeTab === 'Criadores') return matchesSearch && u.role === 'Criador';
    if (activeTab === 'Admins') return matchesSearch && u.role === 'Admin';
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-900">
          Gerenciamento de Usu\u00e1rios
        </h1>
        <p className="text-ink-500 mt-1">
          Gerencie usu\u00e1rios, roles e permiss\u00f5es
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

      {/* Search */}
      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="Buscar por nome ou e-mail..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-sand-200 bg-white text-sm text-ink-900 placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-accent-500"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500">
          {'\u{1F50D}'}
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-sand-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sand-100 bg-sand-50/50">
                <th className="px-4 py-3 text-left font-semibold text-ink-500">
                  Usu\u00e1rio
                </th>
                <th className="px-4 py-3 text-left font-semibold text-ink-500">
                  E-mail
                </th>
                <th className="px-4 py-3 text-left font-semibold text-ink-500">
                  Role
                </th>
                <th className="px-4 py-3 text-left font-semibold text-ink-500">
                  Produtos
                </th>
                <th className="px-4 py-3 text-left font-semibold text-ink-500">
                  Compras
                </th>
                <th className="px-4 py-3 text-left font-semibold text-ink-500">
                  Data Cadastro
                </th>
                <th className="px-4 py-3 text-left font-semibold text-ink-500">
                  A\u00e7\u00f5es
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-sand-100 last:border-0 hover:bg-sand-50/50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {user.avatar}
                      </div>
                      <span className="font-medium text-ink-900">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-500">{user.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${roleColors[user.role]}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink-700">{user.products}</td>
                  <td className="px-4 py-3 text-ink-700">{user.purchases}</td>
                  <td className="px-4 py-3 text-ink-500">{user.joinedAt}</td>
                  <td className="px-4 py-3">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenActions(
                            openActions === user.id ? null : user.id
                          )
                        }
                        className="text-ink-500 hover:text-ink-900 font-medium text-xs px-2 py-1 rounded hover:bg-sand-100 cursor-pointer"
                      >
                        {'\u2022\u2022\u2022'}
                      </button>
                      {openActions === user.id && (
                        <div className="absolute right-0 top-8 bg-white border border-sand-200 rounded-lg shadow-lg z-10 min-w-[180px] py-1">
                          <button
                            onClick={() => setOpenActions(null)}
                            className="w-full text-left px-4 py-2 text-sm text-ink-700 hover:bg-sand-50 cursor-pointer"
                          >
                            {'\u{1F464}'} Ver Perfil
                          </button>
                          {user.role === 'Comprador' && (
                            <button
                              onClick={() => setOpenActions(null)}
                              className="w-full text-left px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 cursor-pointer"
                            >
                              {'\u2B06'} Promover a Criador
                            </button>
                          )}
                          {user.role !== 'Admin' && (
                            <button
                              onClick={() => setOpenActions(null)}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                            >
                              {'\u{1F6AB}'} Suspender
                            </button>
                          )}
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
    </div>
  );
}
