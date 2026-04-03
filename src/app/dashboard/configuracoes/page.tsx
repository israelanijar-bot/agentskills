"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export default function ConfiguracoesPage() {
  const [name, setName] = useState("Lucas Ferreira");
  const [bio, setBio] = useState(
    "Engenheiro de software com 10 anos de experiencia. Especialista em automacao e agentes de IA."
  );
  const [website, setWebsite] = useState("https://lucasferreira.dev");
  const [github, setGithub] = useState("https://github.com/lucasferreira");
  const [pixKey, setPixKey] = useState("lucas@email.com");
  const [bankInfo, setBankInfo] = useState("Banco Inter - Ag 0001 - CC 12345-6");
  const [notifications, setNotifications] = useState({
    novaVenda: true,
    novoReview: true,
    newsletter: false,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-sand-200 text-sm text-ink-900 bg-white placeholder:text-ink-500/60 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all";

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-ink-900">Configuracoes</h1>
        <p className="text-sm text-ink-500 mt-1">
          Gerencie seu perfil, pagamentos e preferencias.
        </p>
      </div>

      {/* Profile section */}
      <section className="bg-white rounded-2xl border border-sand-200 p-6 space-y-5">
        <h2 className="text-lg font-semibold text-ink-900">Perfil</h2>

        {/* Avatar */}
        <div className="flex items-center gap-4">
          <img
            src="https://api.dicebear.com/9.x/initials/svg?seed=LucasFerreira"
            alt="Avatar"
            className="w-16 h-16 rounded-full bg-sand-100"
          />
          <div>
            <button className="px-4 py-2 text-sm font-medium rounded-xl border-2 border-accent-500 text-accent-500 hover:bg-accent-500 hover:text-white transition-all">
              Alterar Avatar
            </button>
            <p className="text-xs text-ink-500 mt-1">
              JPG ou PNG, max 1MB
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink-700 mb-1.5">
            Nome
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink-700 mb-1.5">
            Bio
          </label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">
              Website
            </label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://seusite.com"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">
              GitHub
            </label>
            <input
              type="url"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              placeholder="https://github.com/usuario"
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* Payment section */}
      <section className="bg-white rounded-2xl border border-sand-200 p-6 space-y-5">
        <h2 className="text-lg font-semibold text-ink-900">Pagamento</h2>
        <p className="text-sm text-ink-500">
          Configure como voce deseja receber seus pagamentos.
        </p>

        <div>
          <label className="block text-sm font-medium text-ink-700 mb-1.5">
            Chave PIX
          </label>
          <input
            type="text"
            value={pixKey}
            onChange={(e) => setPixKey(e.target.value)}
            placeholder="CPF, e-mail, telefone ou chave aleatoria"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink-700 mb-1.5">
            Dados Bancarios
          </label>
          <input
            type="text"
            value={bankInfo}
            onChange={(e) => setBankInfo(e.target.value)}
            placeholder="Banco, agencia e conta"
            className={inputClass}
          />
        </div>
      </section>

      {/* Notifications section */}
      <section className="bg-white rounded-2xl border border-sand-200 p-6 space-y-5">
        <h2 className="text-lg font-semibold text-ink-900">Notificacoes</h2>
        <p className="text-sm text-ink-500">
          Escolha quais notificacoes por e-mail voce deseja receber.
        </p>

        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.novaVenda}
              onChange={(e) =>
                setNotifications({ ...notifications, novaVenda: e.target.checked })
              }
              className="w-4 h-4 rounded border-sand-200 text-accent-500 focus:ring-accent-500"
            />
            <div>
              <span className="text-sm font-medium text-ink-900">
                Nova venda
              </span>
              <p className="text-xs text-ink-500">
                Receber e-mail a cada nova venda realizada.
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.novoReview}
              onChange={(e) =>
                setNotifications({ ...notifications, novoReview: e.target.checked })
              }
              className="w-4 h-4 rounded border-sand-200 text-accent-500 focus:ring-accent-500"
            />
            <div>
              <span className="text-sm font-medium text-ink-900">
                Novo review
              </span>
              <p className="text-xs text-ink-500">
                Receber e-mail quando alguem avaliar seu produto.
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.newsletter}
              onChange={(e) =>
                setNotifications({ ...notifications, newsletter: e.target.checked })
              }
              className="w-4 h-4 rounded border-sand-200 text-accent-500 focus:ring-accent-500"
            />
            <div>
              <span className="text-sm font-medium text-ink-900">
                Newsletter
              </span>
              <p className="text-xs text-ink-500">
                Receber novidades, dicas e atualizacoes do AgentSkills.
              </p>
            </div>
          </label>
        </div>
      </section>

      {/* Save button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-xl bg-accent-500 text-white hover:bg-accent-600 shadow-sm hover:shadow-md transition-all"
        >
          Salvar Alteracoes
        </button>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm text-green-600 font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Alteracoes salvas!
          </span>
        )}
      </div>
    </div>
  );
}
