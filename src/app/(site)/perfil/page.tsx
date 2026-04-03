"use client";

import { useState } from "react";
import Link from "next/link";

const mockUser = {
  name: "Israel Anijar",
  email: "israel@agentskills.com.br",
  bio: "Entusiasta de IA e automacao. Explorando o mundo dos agentes inteligentes.",
  avatar: "",
  website: "",
  role: "buyer" as const,
  memberSince: "Abril 2026",
  purchases: 5,
  favorites: 4,
};

export default function PerfilPage() {
  const [name, setName] = useState(mockUser.name);
  const [bio, setBio] = useState(mockUser.bio);
  const [avatarUrl, setAvatarUrl] = useState(mockUser.avatar);
  const [website, setWebsite] = useState(mockUser.website);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const initials = mockUser.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <title>Meu Perfil | AgentSkills</title>
      <meta name="robots" content="noindex, nofollow" />

      <div className="py-8 sm:py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-8">
            Meu Perfil
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left - Profile info & edit form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile card */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center gap-4 mb-6">
                  {/* Avatar */}
                  <div className="w-20 h-20 bg-accent-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0">
                    {initials}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-ink-900">
                      {mockUser.name}
                    </h2>
                    <p className="text-sm text-ink-500">{mockUser.email}</p>
                    <span className="inline-block mt-1 px-2.5 py-0.5 text-xs font-medium rounded-full bg-accent-500/10 text-accent-600">
                      {mockUser.role === "buyer" ? "Comprador" : "Criador"}
                    </span>
                  </div>
                </div>

                <p className="text-ink-700 text-sm">{mockUser.bio}</p>
              </div>

              {/* Edit form */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-ink-900 mb-6">
                  Editar Perfil
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-ink-700 mb-1.5">
                      Nome
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm text-ink-900 focus:border-accent-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink-700 mb-1.5">
                      Bio
                    </label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm text-ink-900 focus:border-accent-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink-700 mb-1.5">
                      URL do Avatar
                    </label>
                    <input
                      type="url"
                      value={avatarUrl}
                      onChange={(e) => setAvatarUrl(e.target.value)}
                      placeholder="https://exemplo.com/avatar.png"
                      className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm text-ink-900 placeholder:text-ink-500/50 focus:border-accent-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink-700 mb-1.5">
                      Website
                    </label>
                    <input
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://meusite.com.br"
                      className="w-full px-4 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-sm text-ink-900 placeholder:text-ink-500/50 focus:border-accent-500"
                    />
                  </div>

                  <button
                    onClick={handleSave}
                    className="px-6 py-2.5 bg-accent-500 text-white font-semibold rounded-xl hover:bg-accent-600 cursor-pointer transition-colors text-sm"
                  >
                    {saved ? "Salvo!" : "Salvar"}
                  </button>
                </div>
              </div>
            </div>

            {/* Right - Stats & links */}
            <div className="space-y-6">
              {/* Stats */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-ink-900 mb-4">
                  Estatisticas
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-ink-500">Compras</span>
                    <span className="font-bold text-ink-900">
                      {mockUser.purchases}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-ink-500">Favoritos</span>
                    <span className="font-bold text-ink-900">
                      {mockUser.favorites}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-ink-500">Membro desde</span>
                    <span className="font-semibold text-ink-900 text-sm">
                      {mockUser.memberSince}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick links */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-ink-900 mb-4">
                  Links rapidos
                </h2>
                <nav className="space-y-2">
                  <Link
                    href="/minhas-compras"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-ink-700 hover:bg-sand-50 hover:text-accent-500 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    Minhas Compras
                  </Link>
                  <Link
                    href="/favoritos"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-ink-700 hover:bg-sand-50 hover:text-accent-500 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    Favoritos
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-ink-700 hover:bg-sand-50 hover:text-accent-500 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Configuracoes
                  </Link>
                </nav>
              </div>

              {/* CTA for buyers */}
              {mockUser.role === "buyer" && (
                <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl p-6 text-white">
                  <h3 className="font-bold text-lg mb-2">
                    Quer vender suas skills?
                  </h3>
                  <p className="text-white/80 text-sm mb-4">
                    Crie e publique suas proprias skills e personas no
                    marketplace.
                  </p>
                  <Link
                    href="/criadores"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-accent-600 font-semibold rounded-xl hover:bg-white/90 transition-colors text-sm"
                  >
                    Comecar a Vender
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
