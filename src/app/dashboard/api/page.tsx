"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/* Mock data                                                          */
/* ------------------------------------------------------------------ */

interface ApiKey {
  id: string;
  name: string;
  key: string;
  maskedKey: string;
  createdAt: string;
  lastUsed: string;
}

const initialKeys: ApiKey[] = [
  {
    id: "1",
    name: "Producao",
    key: "as_prod_4f46e5a1b2c3d4e5f6a7b8c9d0e1f2a3",
    maskedKey: "as_prod_...f2a3",
    createdAt: "15/01/2026",
    lastUsed: "01/04/2026",
  },
  {
    id: "2",
    name: "Desenvolvimento",
    key: "as_dev_1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d",
    maskedKey: "as_dev_...5c6d",
    createdAt: "20/02/2026",
    lastUsed: "30/03/2026",
  },
  {
    id: "3",
    name: "CI/CD Pipeline",
    key: "as_prod_7f8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c",
    maskedKey: "as_prod_...1d2c",
    createdAt: "05/03/2026",
    lastUsed: "28/03/2026",
  },
];

const curlExample = `# Criar novo produto
curl -X POST https://agentskills.com.br/api/v1/listings \\
  -H "Authorization: Bearer sk_sua_chave" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Minha Skill",
    "type": "skill",
    "price": 29.90,
    "description": "Uma skill incrivel para agentes de IA"
  }'

# Listar seus produtos
curl https://agentskills.com.br/api/v1/listings \\
  -H "Authorization: Bearer sk_sua_chave"

# Atualizar preco
curl -X PATCH https://agentskills.com.br/api/v1/listings/prod-id \\
  -H "Authorization: Bearer sk_sua_chave" \\
  -H "Content-Type: application/json" \\
  -d '{"price": 39.90}'`;

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export default function ApiPage() {
  const [keys, setKeys] = useState<ApiKey[]>(initialKeys);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleGenerateKey = () => {
    const newKey: ApiKey = {
      id: String(keys.length + 1),
      name: `Nova Chave ${keys.length + 1}`,
      key: `as_prod_${Math.random().toString(36).slice(2, 34)}`,
      maskedKey: `as_prod_...${Math.random().toString(36).slice(2, 6)}`,
      createdAt: new Date().toLocaleDateString("pt-BR"),
      lastUsed: "Nunca",
    };
    setKeys([newKey, ...keys]);
  };

  const handleDelete = (id: string) => {
    setKeys(keys.filter((k) => k.id !== id));
  };

  const handleCopy = (key: string, id: string) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-ink-900">
          API de Publicacao
        </h1>
        <p className="text-sm text-ink-500 mt-2 max-w-2xl">
          Use a API do AgentSkills para publicar e gerenciar seus produtos
          programaticamente. Ideal para integrar com pipelines de CI/CD,
          automatizar publicacoes e manter seus produtos atualizados via
          scripts.
        </p>
      </div>

      {/* Generate key button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleGenerateKey}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-accent-500 text-white hover:bg-accent-600 shadow-sm hover:shadow-md transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Gerar Nova Chave
        </button>
      </div>

      {/* API keys table */}
      <div className="bg-white rounded-2xl border border-sand-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-sand-100">
          <h2 className="text-lg font-semibold text-ink-900">
            Chaves de API
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sand-100">
                <th className="text-left px-6 py-3 font-medium text-ink-500 text-xs uppercase tracking-wide">
                  Nome
                </th>
                <th className="text-left px-6 py-3 font-medium text-ink-500 text-xs uppercase tracking-wide">
                  Chave
                </th>
                <th className="text-center px-4 py-3 font-medium text-ink-500 text-xs uppercase tracking-wide">
                  Criada em
                </th>
                <th className="text-center px-4 py-3 font-medium text-ink-500 text-xs uppercase tracking-wide">
                  Ultimo uso
                </th>
                <th className="text-right px-6 py-3 font-medium text-ink-500 text-xs uppercase tracking-wide">
                  Acoes
                </th>
              </tr>
            </thead>
            <tbody>
              {keys.map((k) => (
                <tr
                  key={k.id}
                  className="border-b border-sand-100 last:border-0 hover:bg-sand-50/50"
                >
                  <td className="px-6 py-4 font-medium text-ink-900">
                    {k.name}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <code className="text-xs font-mono bg-sand-100 px-2.5 py-1 rounded-lg text-ink-700">
                        {k.maskedKey}
                      </code>
                      <button
                        onClick={() => handleCopy(k.key, k.id)}
                        className="p-1 rounded-lg text-ink-500 hover:bg-sand-100 transition-colors"
                        title="Copiar chave"
                      >
                        {copiedId === k.id ? (
                          <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center text-ink-500 text-xs">
                    {k.createdAt}
                  </td>
                  <td className="px-4 py-4 text-center text-ink-500 text-xs">
                    {k.lastUsed}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(k.id)}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Code examples */}
      <div className="bg-white rounded-2xl border border-sand-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-sand-100">
          <h2 className="text-lg font-semibold text-ink-900">
            Exemplos de Uso
          </h2>
          <p className="text-sm text-ink-500 mt-1">
            Copie e adapte os comandos abaixo para integrar com a API.
          </p>
        </div>
        <div className="p-6">
          <pre className="bg-ink-900 text-sand-100 rounded-xl p-5 overflow-x-auto text-xs leading-relaxed font-mono">
            {curlExample}
          </pre>
        </div>
      </div>

      {/* Documentation link */}
      <div className="bg-accent-500/5 rounded-2xl border border-accent-500/20 p-6 flex items-start gap-4">
        <div className="p-2 rounded-xl bg-accent-500/10 text-accent-500 shrink-0">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-ink-900">
            Documentacao Completa
          </h3>
          <p className="text-sm text-ink-500 mt-1">
            Consulte a documentacao completa da API com todos os endpoints,
            parametros, exemplos de resposta e codigos de erro.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-accent-500 hover:text-accent-600"
          >
            Ver Documentacao
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
