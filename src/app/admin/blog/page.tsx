'use client';

import { useState } from 'react';

type PostStatus = 'Publicado' | 'Rascunho';

interface BlogPost {
  id: string;
  title: string;
  status: PostStatus;
  date: string;
  views: number;
}

const mockPosts: BlogPost[] = [
  { id: '1', title: 'Como criar sua primeira Skill para OpenClaw', status: 'Publicado', date: '28/03/2026', views: 1245 },
  { id: '2', title: 'Guia completo de Personas: do conceito \u00e0 publica\u00e7\u00e3o', status: 'Publicado', date: '22/03/2026', views: 892 },
  { id: '3', title: '10 Skills essenciais para desenvolvedores em 2026', status: 'Publicado', date: '15/03/2026', views: 2103 },
  { id: '4', title: 'Como precificar suas Skills no marketplace', status: 'Publicado', date: '08/03/2026', views: 756 },
  { id: '5', title: 'Novidades do AgentSkills: Bundles e Cole\u00e7\u00f5es', status: 'Rascunho', date: '01/04/2026', views: 0 },
  { id: '6', title: 'Entrevista: Lucasferreira sobre automa\u00e7\u00e3o com IA', status: 'Publicado', date: '01/03/2026', views: 1567 },
  { id: '7', title: 'Roadmap 2026: O que vem por a\u00ed no AgentSkills', status: 'Rascunho', date: '02/04/2026', views: 0 },
  { id: '8', title: 'Case: Como a empresa X aumentou vendas com Skills de IA', status: 'Publicado', date: '20/02/2026', views: 934 },
];

const statusColors: Record<PostStatus, string> = {
  Publicado: 'bg-green-100 text-green-700',
  Rascunho: 'bg-yellow-100 text-yellow-700',
};

export default function AdminBlog() {
  const [posts, setPosts] = useState(mockPosts);
  const [openActions, setOpenActions] = useState<string | null>(null);

  const togglePublish = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status:
                p.status === 'Publicado'
                  ? ('Rascunho' as PostStatus)
                  : ('Publicado' as PostStatus),
            }
          : p
      )
    );
    setOpenActions(null);
  };

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setOpenActions(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">
            Gerenciamento do Blog
          </h1>
          <p className="text-ink-500 mt-1">
            Crie, edite e gerencie artigos do blog
          </p>
        </div>
        <button className="px-5 py-2.5 bg-accent-500 text-white text-sm font-semibold rounded-xl hover:bg-accent-600 transition-colors cursor-pointer">
          + Novo Artigo
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-sand-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sand-100 bg-sand-50/50">
                <th className="px-4 py-3 text-left font-semibold text-ink-500">
                  T\u00edtulo
                </th>
                <th className="px-4 py-3 text-left font-semibold text-ink-500">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-semibold text-ink-500">
                  Data
                </th>
                <th className="px-4 py-3 text-left font-semibold text-ink-500">
                  Views
                </th>
                <th className="px-4 py-3 text-left font-semibold text-ink-500">
                  A\u00e7\u00f5es
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-sand-100 last:border-0 hover:bg-sand-50/50"
                >
                  <td className="px-4 py-3 font-medium text-ink-900 max-w-md">
                    {post.title}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[post.status]}`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink-500">{post.date}</td>
                  <td className="px-4 py-3 text-ink-700">
                    {post.views.toLocaleString('pt-BR')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenActions(
                            openActions === post.id ? null : post.id
                          )
                        }
                        className="text-ink-500 hover:text-ink-900 font-medium text-xs px-2 py-1 rounded hover:bg-sand-100 cursor-pointer"
                      >
                        {'\u2022\u2022\u2022'}
                      </button>
                      {openActions === post.id && (
                        <div className="absolute right-0 top-8 bg-white border border-sand-200 rounded-lg shadow-lg z-10 min-w-[180px] py-1">
                          <button
                            onClick={() => setOpenActions(null)}
                            className="w-full text-left px-4 py-2 text-sm text-ink-700 hover:bg-sand-50 cursor-pointer"
                          >
                            {'\u270F\uFE0F'} Editar
                          </button>
                          <button
                            onClick={() => togglePublish(post.id)}
                            className="w-full text-left px-4 py-2 text-sm text-accent-500 hover:bg-accent-500/5 cursor-pointer"
                          >
                            {post.status === 'Publicado'
                              ? '\u{1F4E4} Despublicar'
                              : '\u{1F4E2} Publicar'}
                          </button>
                          <button
                            onClick={() => deletePost(post.id)}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                          >
                            {'\u{1F5D1}'} Deletar
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
    </div>
  );
}
