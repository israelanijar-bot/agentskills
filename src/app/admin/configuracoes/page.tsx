'use client';

import { useState } from 'react';

export default function AdminConfiguracoes() {
  const [comissao, setComissao] = useState('15');
  const [moeda, setMoeda] = useState('BRL');
  const [produtosPorPagina, setProdutosPorPagina] = useState('24');
  const [aprovacaoManual, setAprovacaoManual] = useState(true);
  const [validacaoSkillMd, setValidacaoSkillMd] = useState(true);
  const [smtpHost, setSmtpHost] = useState('smtp.agentskills.com.br');
  const [smtpPort, setSmtpPort] = useState('587');
  const [smtpUser, setSmtpUser] = useState('noreply@agentskills.com.br');
  const [smtpPassword, setSmtpPassword] = useState('');
  const [stripeKey, setStripeKey] = useState('');
  const [openclawUrl, setOpenclawUrl] = useState(
    'https://api.openclaw.ai/v1'
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-ink-900">
          Configura\u00e7\u00f5es
        </h1>
        <p className="text-ink-500 mt-1">
          Configure o marketplace, modera\u00e7\u00e3o, e-mail e integra\u00e7\u00f5es
        </p>
      </div>

      {/* Marketplace */}
      <section className="bg-white rounded-xl border border-sand-200 p-6 space-y-5">
        <h2 className="text-lg font-semibold text-ink-900">Marketplace</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">
              Comiss\u00e3o (%)
            </label>
            <input
              type="number"
              min={0}
              max={100}
              value={comissao}
              onChange={(e) => setComissao(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-sand-200 bg-white text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">
              Moeda
            </label>
            <select
              value={moeda}
              onChange={(e) => setMoeda(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-sand-200 bg-white text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-accent-500"
            >
              <option value="BRL">BRL - Real Brasileiro</option>
              <option value="USD">USD - D\u00f3lar Americano</option>
              <option value="EUR">EUR - Euro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">
              Produtos por p\u00e1gina
            </label>
            <input
              type="number"
              min={6}
              max={100}
              value={produtosPorPagina}
              onChange={(e) => setProdutosPorPagina(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-sand-200 bg-white text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
          </div>
        </div>
      </section>

      {/* Moderacao */}
      <section className="bg-white rounded-xl border border-sand-200 p-6 space-y-5">
        <h2 className="text-lg font-semibold text-ink-900">Modera\u00e7\u00e3o</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ink-900">
                Aprova\u00e7\u00e3o manual obrigat\u00f3ria
              </p>
              <p className="text-xs text-ink-500 mt-0.5">
                Todos os produtos novos precisam ser aprovados antes de serem
                publicados
              </p>
            </div>
            <button
              onClick={() => setAprovacaoManual(!aprovacaoManual)}
              className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                aprovacaoManual ? 'bg-accent-500' : 'bg-sand-200'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  aprovacaoManual ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ink-900">
                Valida\u00e7\u00e3o autom\u00e1tica de SKILL.md
              </p>
              <p className="text-xs text-ink-500 mt-0.5">
                Verifica automaticamente se o arquivo SKILL.md segue o formato
                padr\u00e3o
              </p>
            </div>
            <button
              onClick={() => setValidacaoSkillMd(!validacaoSkillMd)}
              className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                validacaoSkillMd ? 'bg-accent-500' : 'bg-sand-200'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  validacaoSkillMd ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Email */}
      <section className="bg-white rounded-xl border border-sand-200 p-6 space-y-5">
        <h2 className="text-lg font-semibold text-ink-900">E-mail (SMTP)</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">
              Host SMTP
            </label>
            <input
              type="text"
              value={smtpHost}
              onChange={(e) => setSmtpHost(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-sand-200 bg-white text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">
              Porta
            </label>
            <input
              type="text"
              value={smtpPort}
              onChange={(e) => setSmtpPort(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-sand-200 bg-white text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">
              Usu\u00e1rio
            </label>
            <input
              type="text"
              value={smtpUser}
              onChange={(e) => setSmtpUser(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-sand-200 bg-white text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">
              Senha
            </label>
            <input
              type="password"
              value={smtpPassword}
              onChange={(e) => setSmtpPassword(e.target.value)}
              placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
              className="w-full px-4 py-2.5 rounded-xl border border-sand-200 bg-white text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
          </div>
        </div>
      </section>

      {/* Integracoes */}
      <section className="bg-white rounded-xl border border-sand-200 p-6 space-y-5">
        <h2 className="text-lg font-semibold text-ink-900">Integra\u00e7\u00f5es</h2>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">
              Chave Stripe (Secret Key)
            </label>
            <input
              type="password"
              value={stripeKey}
              onChange={(e) => setStripeKey(e.target.value)}
              placeholder="sk_live_\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
              className="w-full px-4 py-2.5 rounded-xl border border-sand-200 bg-white text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-accent-500 font-mono"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">
              OpenClaw API URL
            </label>
            <input
              type="text"
              value={openclawUrl}
              onChange={(e) => setOpenclawUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-sand-200 bg-white text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-accent-500 font-mono"
            />
          </div>
        </div>
      </section>

      {/* Save */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-accent-500 text-white text-sm font-semibold rounded-xl hover:bg-accent-600 transition-colors cursor-pointer"
        >
          Salvar
        </button>
        {saved && (
          <span className="text-sm font-medium text-green-600">
            Configura\u00e7\u00f5es salvas com sucesso!
          </span>
        )}
      </div>
    </div>
  );
}
