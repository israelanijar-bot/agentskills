import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Painel Administrativo | AgentSkills',
};

const metrics = [
  {
    label: 'Receita Total',
    value: 'R$ 45.230,00',
    change: '+12,5%',
    positive: true,
    icon: '\u{1F4B0}',
    bg: 'bg-green-50',
    border: 'border-green-200',
  },
  {
    label: 'Vendas Hoje',
    value: '23',
    change: '+8',
    positive: true,
    icon: '\u{1F6D2}',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  {
    label: 'Produtos Ativos',
    value: '156',
    change: '+3',
    positive: true,
    icon: '\u{1F4E6}',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
  },
  {
    label: 'Usu\u00e1rios Totais',
    value: '1.230',
    change: '+47',
    positive: true,
    icon: '\u{1F465}',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
  },
  {
    label: 'Criadores Ativos',
    value: '45',
    change: '+2',
    positive: true,
    icon: '\u{1F3A8}',
    bg: 'bg-pink-50',
    border: 'border-pink-200',
  },
  {
    label: 'Taxa de Convers\u00e3o',
    value: '3,2%',
    change: '+0,3%',
    positive: true,
    icon: '\u{1F4C8}',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
  },
];

const recentActivity = [
  {
    text: 'Novo produto submetido: Automa\u00e7\u00e3o WhatsApp por @lucasferreira',
    time: '5 min atr\u00e1s',
    type: 'product',
  },
  {
    text: 'Venda realizada: Sistema de Mem\u00f3ria 3 Camadas - R$ 49,90',
    time: '12 min atr\u00e1s',
    type: 'sale',
  },
  {
    text: 'Novo criador registrado: @mariana_costa',
    time: '1h atr\u00e1s',
    type: 'user',
  },
  {
    text: 'Produto aprovado: Gerador de Conte\u00fado por @camilasantos',
    time: '1h30 atr\u00e1s',
    type: 'approval',
  },
  {
    text: 'Venda realizada: Pack Desenvolvedor Full Stack - R$ 179,90',
    time: '2h atr\u00e1s',
    type: 'sale',
  },
  {
    text: 'Produto rejeitado: Bot Spam Autom\u00e1tico (viola\u00e7\u00e3o de pol\u00edtica)',
    time: '2h30 atr\u00e1s',
    type: 'rejection',
  },
  {
    text: 'Novo usu\u00e1rio registrado: fernanda.lima@email.com',
    time: '3h atr\u00e1s',
    type: 'user',
  },
  {
    text: 'Reembolso processado: Pipeline de Vendas - R$ 99,90',
    time: '3h45 atr\u00e1s',
    type: 'refund',
  },
  {
    text: 'Venda realizada: CEO Empreendedor - R$ 39,90',
    time: '4h atr\u00e1s',
    type: 'sale',
  },
  {
    text: 'Novo artigo publicado: "Como criar sua primeira Skill"',
    time: '5h atr\u00e1s',
    type: 'content',
  },
];

function getActivityColor(type: string) {
  switch (type) {
    case 'sale':
      return 'bg-green-500';
    case 'product':
      return 'bg-blue-500';
    case 'user':
      return 'bg-purple-500';
    case 'approval':
      return 'bg-emerald-500';
    case 'rejection':
      return 'bg-red-500';
    case 'refund':
      return 'bg-orange-500';
    case 'content':
      return 'bg-indigo-500';
    default:
      return 'bg-gray-500';
  }
}

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-ink-900">
          Painel Administrativo
        </h1>
        <p className="text-ink-500 mt-1">
          Vis\u00e3o geral do marketplace AgentSkills
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className={`${metric.bg} border ${metric.border} rounded-xl p-5`}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{metric.icon}</span>
              <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                {metric.change}
              </span>
            </div>
            <p className="mt-3 text-2xl font-bold text-ink-900">
              {metric.value}
            </p>
            <p className="text-sm text-ink-500 mt-1">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-sand-200 p-6">
          <h2 className="text-lg font-semibold text-ink-900 mb-4">
            Atividade Recente
          </h2>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 py-2 border-b border-sand-100 last:border-0"
              >
                <span
                  className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${getActivityColor(activity.type)}`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-ink-700 leading-relaxed">
                    {activity.text}
                  </p>
                  <p className="text-xs text-ink-500 mt-0.5">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Reviews */}
        <div className="bg-white rounded-xl border border-sand-200 p-6">
          <h2 className="text-lg font-semibold text-ink-900 mb-4">
            Modera\u00e7\u00e3o
          </h2>
          <div className="space-y-4">
            <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-ink-900">8</p>
              <p className="text-sm text-ink-500 mt-1">
                Produtos pendentes de revis\u00e3o
              </p>
              <a
                href="/admin/produtos"
                className="inline-block mt-3 text-sm font-semibold text-accent-500 hover:text-accent-600"
              >
                Ver fila de modera\u00e7\u00e3o &rarr;
              </a>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-500">Aprovados hoje</span>
                <span className="font-semibold text-ink-900">5</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-500">Rejeitados hoje</span>
                <span className="font-semibold text-ink-900">1</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-500">Denúncias abertas</span>
                <span className="font-semibold text-ink-900">3</span>
              </div>
            </div>

            <hr className="border-sand-100" />

            <div>
              <h3 className="text-sm font-semibold text-ink-900 mb-2">
                Resumo do M\u00eas
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-500">Novos produtos</span>
                  <span className="font-semibold text-ink-900">18</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-500">Novos usu\u00e1rios</span>
                  <span className="font-semibold text-ink-900">127</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-500">Volume de vendas</span>
                  <span className="font-semibold text-ink-900">R$ 12.450</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
