/**
 * Dados seed do AgentSkills.com.br
 * Marketplace brasileiro de skills para agentes OpenClaw AI
 */

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  totalSales: number;
  totalProducts: number;
  joinedAt: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  type: 'skill' | 'persona' | 'bundle';
  price: number;
  categoryId: string;
  creatorId: string;
  salesCount: number;
  favoritesCount: number;
  version: string;
  createdAt: string;
  updatedAt: string;
  image: string;
  tags: string[];
  installInstructions: string;
  filesIncluded: string[];
}

// ---------------------------------------------------------------------------
// Categorias
// ---------------------------------------------------------------------------

export const categories: Category[] = [
  {
    id: 'cat-programacao',
    name: 'Programacao',
    slug: 'programacao',
    description: 'Skills para desenvolvimento de software, automacao de codigo e engenharia',
    icon: '💻',
  },
  {
    id: 'cat-marketing',
    name: 'Marketing',
    slug: 'marketing',
    description: 'Estrategias de marketing digital, SEO, campanhas e redes sociais',
    icon: '📢',
  },
  {
    id: 'cat-produtividade',
    name: 'Produtividade',
    slug: 'produtividade',
    description: 'Ferramentas para organizar tarefas, tempo e fluxos de trabalho',
    icon: '⚡',
  },
  {
    id: 'cat-vendas',
    name: 'Vendas',
    slug: 'vendas',
    description: 'Automacao de vendas, CRM, follow-up e pipeline comercial',
    icon: '💰',
  },
  {
    id: 'cat-pesquisa',
    name: 'Pesquisa',
    slug: 'pesquisa',
    description: 'Pesquisa de mercado, analise competitiva e coleta de dados',
    icon: '🔍',
  },
  {
    id: 'cat-conteudo',
    name: 'Criacao de Conteudo',
    slug: 'criacao-de-conteudo',
    description: 'Geracao de textos, posts, artigos e roteiros para diversas plataformas',
    icon: '✍️',
  },
  {
    id: 'cat-atendimento',
    name: 'Atendimento',
    slug: 'atendimento',
    description: 'Suporte ao cliente, chatbots, respostas automaticas e triagem',
    icon: '🎧',
  },
  {
    id: 'cat-design',
    name: 'Design',
    slug: 'design',
    description: 'Prompts de design, geracao de imagens e prototipacao visual',
    icon: '🎨',
  },
  {
    id: 'cat-financas',
    name: 'Financas',
    slug: 'financas',
    description: 'Controle financeiro, relatorios, previsoes e analise de investimentos',
    icon: '📊',
  },
  {
    id: 'cat-operacoes',
    name: 'Operacoes',
    slug: 'operacoes',
    description: 'Gestao de processos, logistica, automacao operacional e integracao',
    icon: '⚙️',
  },
  {
    id: 'cat-personas-executivas',
    name: 'Personas Executivas',
    slug: 'personas-executivas',
    description: 'Personas de lideranca, C-level e tomada de decisao estrategica',
    icon: '👔',
  },
  {
    id: 'cat-growth',
    name: 'Growth',
    slug: 'growth',
    description: 'Estrategias de crescimento, experimentacao, metricas e retencao',
    icon: '🚀',
  },
  {
    id: 'cat-produto',
    name: 'Produto',
    slug: 'produto',
    description: 'Gestao de produto, discovery, roadmap e priorizacao de features',
    icon: '📦',
  },
  {
    id: 'cat-assistente-pessoal',
    name: 'Assistente Pessoal',
    slug: 'assistente-pessoal',
    description: 'Organizacao pessoal, lembretes, agenda e tarefas do dia a dia',
    icon: '🤖',
  },
];

// ---------------------------------------------------------------------------
// Criadores
// ---------------------------------------------------------------------------

export const creators: Creator[] = [
  {
    id: 'creator-1',
    name: 'Lucas Ferreira',
    username: 'lucasferreira',
    avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=LucasFerreira',
    bio: 'Engenheiro de software com 10 anos de experiencia. Especialista em automacao e agentes de IA. Criador de tools open-source para produtividade de devs.',
    totalSales: 1847,
    totalProducts: 6,
    joinedAt: '2025-08-15',
  },
  {
    id: 'creator-2',
    name: 'Camila Santos',
    username: 'camilasantos',
    avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=CamilaSantos',
    bio: 'Growth hacker e especialista em marketing digital. Ajudo empresas a crescerem usando IA de forma estrategica e mensuravel.',
    totalSales: 923,
    totalProducts: 4,
    joinedAt: '2025-09-02',
  },
  {
    id: 'creator-3',
    name: 'Rafael Oliveira',
    username: 'rafaeloliveira',
    avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=RafaelOliveira',
    bio: 'Arquiteto de solucoes e entusiasta de IA generativa. Foco em criar personas inteligentes que realmente resolvem problemas de negocio.',
    totalSales: 1235,
    totalProducts: 5,
    joinedAt: '2025-07-20',
  },
  {
    id: 'creator-4',
    name: 'Juliana Costa',
    username: 'julianacosta',
    avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=JulianaCosta',
    bio: 'Product Manager com background em dados. Crio skills e bundles que automatizam fluxos de produto de ponta a ponta.',
    totalSales: 654,
    totalProducts: 3,
    joinedAt: '2025-10-11',
  },
  {
    id: 'creator-5',
    name: 'Pedro Almeida',
    username: 'pedroalmeida',
    avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=PedroAlmeida',
    bio: 'Consultor financeiro e desenvolvedor autodidata. Construo ferramentas de IA para controle financeiro pessoal e empresarial.',
    totalSales: 412,
    totalProducts: 2,
    joinedAt: '2025-11-05',
  },
];

// ---------------------------------------------------------------------------
// Produtos
// ---------------------------------------------------------------------------

export const products: Product[] = [
  // ========== SKILLS (10) ==========
  {
    id: 'prod-1',
    title: 'Loops de Codigo para Agentes',
    slug: 'loops-de-codigo-para-agentes',
    description: 'Permite que agentes escrevam, testem e corrijam codigo automaticamente em loops iterativos.',
    longDescription: `Esta skill transforma seu agente em um desenvolvedor autonomo capaz de escrever codigo, executar testes e corrigir erros em ciclos iterativos ate atingir o resultado desejado. Ideal para automacao de tarefas de programacao repetitivas.

O sistema utiliza um pipeline inteligente de 3 etapas: geracao de codigo, execucao de testes automatizados e analise de erros com correcao automatica. Cada iteracao aprende com os erros anteriores, reduzindo o tempo de resolucao progressivamente.

Compativel com Python, JavaScript, TypeScript e Go. Inclui configuracao de limites de iteracao, timeout por ciclo e integracao com ambientes de teste locais ou remotos.`,
    type: 'skill',
    price: 49.9,
    categoryId: 'cat-programacao',
    creatorId: 'creator-1',
    salesCount: 387,
    favoritesCount: 142,
    version: '2.1.0',
    createdAt: '2025-09-10',
    updatedAt: '2026-03-15',
    image: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Loops+de+Codigo',
    tags: ['codigo', 'automacao', 'testes', 'iterativo', 'dev'],
    installInstructions: 'openclaw install @lucasferreira/loops-de-codigo --agent default',
    filesIncluded: ['skill.yaml', 'loops-engine.ts', 'test-runner.ts', 'README.md'],
  },
  {
    id: 'prod-2',
    title: 'Acesso YouTube para Agentes',
    slug: 'acesso-youtube-para-agentes',
    description: 'Skill que permite ao agente buscar, analisar e resumir videos do YouTube automaticamente.',
    longDescription: `Com esta skill, seu agente pode pesquisar videos no YouTube, extrair transcricoes, gerar resumos e identificar os pontos-chave de qualquer conteudo em video. Perfeita para pesquisa de mercado e curadoria de conteudo.

A skill utiliza a API oficial do YouTube Data v3 para buscas e o sistema de legendas automaticas para extracao de texto. O agente consegue processar videos de ate 3 horas, gerando resumos estruturados com timestamps e topicos principais.

Inclui filtros por idioma, duracao, data de publicacao e relevancia. Os resumos podem ser exportados em Markdown, JSON ou texto plano.`,
    type: 'skill',
    price: 39.9,
    categoryId: 'cat-pesquisa',
    creatorId: 'creator-1',
    salesCount: 256,
    favoritesCount: 98,
    version: '1.4.2',
    createdAt: '2025-10-05',
    updatedAt: '2026-02-20',
    image: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=YouTube+Agentes',
    tags: ['youtube', 'video', 'resumo', 'pesquisa', 'transcricao'],
    installInstructions: 'openclaw install @lucasferreira/youtube-access --agent default',
    filesIncluded: ['skill.yaml', 'youtube-client.ts', 'transcription.ts', 'summarizer.ts', 'README.md'],
  },
  {
    id: 'prod-3',
    title: 'Sistema de Memoria 3 Camadas',
    slug: 'sistema-de-memoria-3-camadas',
    description: 'Adiciona memoria de curto, medio e longo prazo ao seu agente para contexto persistente.',
    longDescription: `O Sistema de Memoria 3 Camadas resolve um dos maiores problemas dos agentes de IA: a perda de contexto entre conversas. Com ele, seu agente mantem tres niveis de memoria que funcionam como o cerebro humano.

A camada de curto prazo armazena o contexto da conversa atual com janela deslizante configuravel. A camada de medio prazo persiste informacoes entre sessoes usando embeddings vetoriais para recuperacao semantica. A camada de longo prazo guarda fatos permanentes sobre o usuario e preferencias aprendidas ao longo do tempo.

Inclui painel de administracao para visualizar e gerenciar memorias armazenadas, configuracao de politicas de retencao e integracao com bancos vetoriais como Pinecone, Weaviate e Supabase pgvector.`,
    type: 'skill',
    price: 79.9,
    categoryId: 'cat-produtividade',
    creatorId: 'creator-3',
    salesCount: 512,
    favoritesCount: 234,
    version: '3.0.1',
    createdAt: '2025-08-20',
    updatedAt: '2026-03-28',
    image: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Memoria+3+Camadas',
    tags: ['memoria', 'contexto', 'persistencia', 'embeddings', 'vetorial'],
    installInstructions: 'openclaw install @rafaeloliveira/memoria-3-camadas --agent default',
    filesIncluded: ['skill.yaml', 'memory-manager.ts', 'short-term.ts', 'mid-term.ts', 'long-term.ts', 'admin-panel.tsx', 'README.md'],
  },
  {
    id: 'prod-4',
    title: 'Gerador de Conteudo',
    slug: 'gerador-de-conteudo',
    description: 'Cria posts, artigos, legendas e roteiros otimizados para diferentes plataformas.',
    longDescription: `O Gerador de Conteudo e uma skill completa para producao de textos otimizados para Instagram, LinkedIn, Twitter/X, blogs e newsletters. Basta informar o tema e a plataforma que o agente cria conteudo pronto para publicar.

A skill inclui templates pre-configurados para cada formato: carrosseis de Instagram, threads de Twitter, artigos longos para blog com SEO, posts de LinkedIn com storytelling e newsletters com segmentacao por publico. Cada template segue as melhores praticas da plataforma.

Suporta tom de voz personalizavel (formal, informal, tecnico, divertido), calendarios editoriais automaticos e sugestoes de hashtags e palavras-chave baseadas em tendencias atuais do mercado brasileiro.`,
    type: 'skill',
    price: 59.9,
    categoryId: 'cat-conteudo',
    creatorId: 'creator-2',
    salesCount: 445,
    favoritesCount: 189,
    version: '2.3.0',
    createdAt: '2025-09-25',
    updatedAt: '2026-03-10',
    image: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Gerador+Conteudo',
    tags: ['conteudo', 'copywriting', 'social-media', 'seo', 'marketing'],
    installInstructions: 'openclaw install @camilasantos/gerador-conteudo --agent default',
    filesIncluded: ['skill.yaml', 'content-engine.ts', 'templates/', 'seo-optimizer.ts', 'README.md'],
  },
  {
    id: 'prod-5',
    title: 'Automacao WhatsApp',
    slug: 'automacao-whatsapp',
    description: 'Conecta seu agente ao WhatsApp para responder mensagens, enviar notificacoes e gerenciar conversas.',
    longDescription: `A skill de Automacao WhatsApp transforma seu agente em um assistente completo dentro do mensageiro mais usado no Brasil. Responda mensagens automaticamente, envie notificacoes programadas e gerencie multiplas conversas simultaneamente.

Utiliza a API oficial do WhatsApp Business via Cloud API da Meta. O agente consegue interpretar mensagens de texto, audio (com transcricao automatica), imagens e documentos. Respostas podem incluir botoes interativos, listas de opcoes e mensagens com template.

Inclui sistema de filas para alto volume, roteamento inteligente para atendimento humano quando necessario, dashboard de metricas de atendimento e integracao com CRMs populares como HubSpot e RD Station.`,
    type: 'skill',
    price: 89.9,
    categoryId: 'cat-atendimento',
    creatorId: 'creator-1',
    salesCount: 623,
    favoritesCount: 278,
    version: '2.0.3',
    createdAt: '2025-08-30',
    updatedAt: '2026-03-22',
    image: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=WhatsApp+Auto',
    tags: ['whatsapp', 'automacao', 'chatbot', 'atendimento', 'mensageiro'],
    installInstructions: 'openclaw install @lucasferreira/whatsapp-automation --agent default',
    filesIncluded: ['skill.yaml', 'whatsapp-client.ts', 'message-handler.ts', 'queue-manager.ts', 'templates/', 'README.md'],
  },
  {
    id: 'prod-6',
    title: 'Analise de Dados',
    slug: 'analise-de-dados',
    description: 'Skill para importar, limpar, analisar e visualizar dados de planilhas e bancos de dados.',
    longDescription: `A skill de Analise de Dados capacita seu agente a trabalhar com conjuntos de dados de forma autonoma. Importe dados de CSV, Excel, Google Sheets ou bancos SQL, aplique limpeza automatica e gere analises com graficos e insights acionaveis.

O motor de analise identifica automaticamente padroes, outliers, correlacoes e tendencias nos dados. Gera relatorios visuais com graficos interativos que podem ser exportados em PDF, PNG ou incorporados em dashboards web.

Suporta analises descritivas, diagnosticas e preditivas basicas. Inclui conectores para PostgreSQL, MySQL, BigQuery e APIs REST. Ideal para equipes de dados que precisam automatizar relatorios recorrentes.`,
    type: 'skill',
    price: 69.9,
    categoryId: 'cat-financas',
    creatorId: 'creator-5',
    salesCount: 198,
    favoritesCount: 87,
    version: '1.2.0',
    createdAt: '2025-11-15',
    updatedAt: '2026-02-28',
    image: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Analise+Dados',
    tags: ['dados', 'analise', 'graficos', 'planilhas', 'sql'],
    installInstructions: 'openclaw install @pedroalmeida/analise-dados --agent default',
    filesIncluded: ['skill.yaml', 'data-engine.ts', 'importers/', 'visualizer.ts', 'report-generator.ts', 'README.md'],
  },
  {
    id: 'prod-7',
    title: 'Pipeline de Vendas Inteligente',
    slug: 'pipeline-de-vendas-inteligente',
    description: 'Automatiza follow-ups, qualificacao de leads e gestao do funil de vendas.',
    longDescription: `O Pipeline de Vendas Inteligente automatiza todo o ciclo comercial, desde a captura de leads ate o fechamento. Seu agente qualifica prospects automaticamente com base em criterios BANT, envia follow-ups no timing ideal e prioriza oportunidades por probabilidade de conversao.

O sistema de scoring utiliza machine learning para aprender com o historico de vendas da sua empresa, melhorando a precisao das previsoes ao longo do tempo. Integra-se com CRMs populares para manter o funil sempre atualizado.

Inclui templates de e-mails de follow-up em portugues, scripts de abordagem, relatorios de previsao de receita e alertas automaticos quando um deal esfria. Suporta pipelines multiplos para diferentes produtos ou segmentos.`,
    type: 'skill',
    price: 99.9,
    categoryId: 'cat-vendas',
    creatorId: 'creator-2',
    salesCount: 312,
    favoritesCount: 156,
    version: '1.8.0',
    createdAt: '2025-10-20',
    updatedAt: '2026-03-05',
    image: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Pipeline+Vendas',
    tags: ['vendas', 'crm', 'leads', 'follow-up', 'funil'],
    installInstructions: 'openclaw install @camilasantos/pipeline-vendas --agent default',
    filesIncluded: ['skill.yaml', 'pipeline-engine.ts', 'lead-scorer.ts', 'follow-up.ts', 'templates/', 'README.md'],
  },
  {
    id: 'prod-8',
    title: 'Orquestrador de Tarefas',
    slug: 'orquestrador-de-tarefas',
    description: 'Gerencia e prioriza tarefas automaticamente usando metodos GTD e Eisenhower.',
    longDescription: `O Orquestrador de Tarefas transforma seu agente em um gerente de produtividade pessoal. Ele captura tarefas de multiplas fontes (e-mail, mensagens, reunioes), classifica por urgencia e importancia usando a Matriz de Eisenhower e organiza em listas acionaveis.

O sistema suporta metodologias GTD (Getting Things Done), Pomodoro e time-blocking. O agente sugere automaticamente a proxima tarefa com base no contexto atual: horario do dia, energia estimada, prazos proximos e dependencias entre tarefas.

Integra-se com Google Calendar, Notion, Todoist e Trello. Gera relatorios semanais de produtividade com metricas de conclusao, tempo gasto por categoria e sugestoes de melhoria baseadas em padroes identificados.`,
    type: 'skill',
    price: 0,
    categoryId: 'cat-produtividade',
    creatorId: 'creator-4',
    salesCount: 876,
    favoritesCount: 345,
    version: '1.5.0',
    createdAt: '2025-10-15',
    updatedAt: '2026-03-01',
    image: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Orquestrador+Tarefas',
    tags: ['tarefas', 'gtd', 'produtividade', 'organizacao', 'gratis'],
    installInstructions: 'openclaw install @julianacosta/orquestrador-tarefas --agent default',
    filesIncluded: ['skill.yaml', 'task-manager.ts', 'prioritizer.ts', 'integrations/', 'README.md'],
  },
  {
    id: 'prod-9',
    title: 'SEO Automatizado',
    slug: 'seo-automatizado',
    description: 'Analisa paginas, sugere melhorias de SEO e monitora posicionamento no Google.',
    longDescription: `A skill de SEO Automatizado faz auditoria completa de sites, identifica problemas tecnicos e de conteudo, e gera um plano de acao priorizado para melhorar o posicionamento organico no Google.

O agente analisa meta tags, estrutura de headings, velocidade de carregamento, links internos e externos, sitemap, robots.txt e Core Web Vitals. Compara seu site com os 10 primeiros resultados para cada palavra-chave alvo, identificando gaps de conteudo.

Inclui monitoramento continuo de posicoes, alertas de quedas de ranking, sugestoes de palavras-chave de cauda longa e geracao automatica de meta descriptions otimizadas. Relatorios exportaveis em PDF para apresentacao a clientes.`,
    type: 'skill',
    price: 59.9,
    categoryId: 'cat-marketing',
    creatorId: 'creator-2',
    salesCount: 178,
    favoritesCount: 67,
    version: '1.1.0',
    createdAt: '2025-12-01',
    updatedAt: '2026-03-18',
    image: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=SEO+Automatizado',
    tags: ['seo', 'google', 'ranking', 'auditoria', 'marketing'],
    installInstructions: 'openclaw install @camilasantos/seo-automatizado --agent default',
    filesIncluded: ['skill.yaml', 'seo-auditor.ts', 'rank-tracker.ts', 'keyword-research.ts', 'README.md'],
  },
  {
    id: 'prod-10',
    title: 'Gerador de Prompts Avancado',
    slug: 'gerador-de-prompts-avancado',
    description: 'Cria, otimiza e testa prompts para diferentes modelos de IA automaticamente.',
    longDescription: `O Gerador de Prompts Avancado e uma meta-skill que ajuda a criar prompts melhores para qualquer modelo de IA. Ele analisa seu objetivo, sugere tecnicas de prompting adequadas (chain-of-thought, few-shot, tree-of-thought) e gera variantes otimizadas.

O sistema inclui uma biblioteca de mais de 200 templates de prompts testados e validados para casos de uso comuns: extracao de dados, classificacao de texto, geracao criativa, analise de sentimento, sumarizacao e traducao. Cada template pode ser personalizado.

Possui modo de benchmark que testa automaticamente multiplas variantes do prompt contra um dataset de avaliacao, comparando qualidade, latencia e custo. Ideal para equipes que trabalham com IA e precisam otimizar resultados sistematicamente.`,
    type: 'skill',
    price: 0,
    categoryId: 'cat-programacao',
    creatorId: 'creator-3',
    salesCount: 934,
    favoritesCount: 412,
    version: '2.0.0',
    createdAt: '2025-09-01',
    updatedAt: '2026-03-25',
    image: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Gerador+Prompts',
    tags: ['prompts', 'ia', 'otimizacao', 'templates', 'gratis'],
    installInstructions: 'openclaw install @rafaeloliveira/gerador-prompts --agent default',
    filesIncluded: ['skill.yaml', 'prompt-engine.ts', 'templates/', 'benchmark.ts', 'evaluator.ts', 'README.md'],
  },

  // ========== PERSONAS (6) ==========
  {
    id: 'prod-11',
    title: 'CEO Empreendedor',
    slug: 'ceo-empreendedor',
    description: 'Persona de CEO visionario focado em startups, estrategia de negocio e captacao de investimento.',
    longDescription: `A persona CEO Empreendedor transforma seu agente em um consultor estrategico de alto nivel, com mentalidade de founder e visao de mercado. Ideal para empreendedores que precisam de um sparring partner para decisoes criticas de negocio.

A persona domina frameworks como Business Model Canvas, Lean Startup, OKRs e metricas SaaS (MRR, CAC, LTV, churn). Consegue analisar pitch decks, sugerir melhorias na proposta de valor, simular perguntas de investidores e ajudar na definicao de go-to-market.

Inclui conhecimento aprofundado do ecossistema brasileiro de startups, fundos de venture capital nacionais, programas de aceleracao e regulamentacoes especificas do mercado brasileiro. Tom de comunicacao direto, estrategico e orientado a resultados.`,
    type: 'persona',
    price: 39.9,
    categoryId: 'cat-personas-executivas',
    creatorId: 'creator-3',
    salesCount: 289,
    favoritesCount: 134,
    version: '1.3.0',
    createdAt: '2025-09-15',
    updatedAt: '2026-02-10',
    image: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=CEO+Empreendedor',
    tags: ['ceo', 'startup', 'estrategia', 'investimento', 'persona'],
    installInstructions: 'openclaw install @rafaeloliveira/ceo-empreendedor --persona default',
    filesIncluded: ['persona.yaml', 'system-prompt.md', 'knowledge-base/', 'README.md'],
  },
  {
    id: 'prod-12',
    title: 'Engenheiro Senior',
    slug: 'engenheiro-senior',
    description: 'Persona de engenheiro de software experiente para code review, arquitetura e mentoria tecnica.',
    longDescription: `A persona Engenheiro Senior simula um desenvolvedor com mais de 15 anos de experiencia em empresas de tecnologia de ponta. Ideal para code review detalhado, decisoes de arquitetura, mentoria de desenvolvedores juniores e resolucao de problemas complexos.

Domina design patterns, principios SOLID, arquitetura de microsservicos, sistemas distribuidos e boas praticas de DevOps. Avalia codigo considerando legibilidade, performance, seguranca, testabilidade e manutencao a longo prazo.

Comunica feedback de forma construtiva, sempre explicando o "por que" de cada sugestao. Inclui conhecimento atualizado de ecossistemas Node.js, Python, Go e Java, alem de frameworks populares como Next.js, FastAPI, Spring Boot e infraestrutura em nuvem AWS e GCP.`,
    type: 'persona',
    price: 49.9,
    categoryId: 'cat-programacao',
    creatorId: 'creator-1',
    salesCount: 456,
    favoritesCount: 201,
    version: '2.1.0',
    createdAt: '2025-08-25',
    updatedAt: '2026-03-20',
    image: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Engenheiro+Senior',
    tags: ['engenheiro', 'code-review', 'arquitetura', 'mentoria', 'persona'],
    installInstructions: 'openclaw install @lucasferreira/engenheiro-senior --persona default',
    filesIncluded: ['persona.yaml', 'system-prompt.md', 'review-checklist.md', 'README.md'],
  },
  {
    id: 'prod-13',
    title: 'Marketing Digital',
    slug: 'marketing-digital',
    description: 'Persona de especialista em marketing digital focada em estrategias para o mercado brasileiro.',
    longDescription: `A persona Marketing Digital e uma especialista completa em todas as vertentes do marketing online, com foco especifico no comportamento do consumidor brasileiro e nas particularidades do mercado nacional.

Domina estrategias de trafego pago (Google Ads, Meta Ads, TikTok Ads), marketing de conteudo, e-mail marketing, social media management e growth hacking. Conhece as principais ferramentas do mercado como RD Station, Hotmart, Kiwify e plataformas de e-commerce brasileiras.

Ajuda a criar planos de marketing completos, definir orcamentos de midia, analisar metricas de campanha e propor otimizacoes baseadas em dados. Comunica-se de forma pratica e orientada a ROI, sempre considerando o contexto economico e cultural brasileiro.`,
    type: 'persona',
    price: 34.9,
    categoryId: 'cat-marketing',
    creatorId: 'creator-2',
    salesCount: 334,
    favoritesCount: 145,
    version: '1.6.0',
    createdAt: '2025-10-01',
    updatedAt: '2026-03-12',
    image: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Marketing+Digital',
    tags: ['marketing', 'digital', 'trafego', 'social-media', 'persona'],
    installInstructions: 'openclaw install @camilasantos/marketing-digital --persona default',
    filesIncluded: ['persona.yaml', 'system-prompt.md', 'templates/', 'README.md'],
  },
  {
    id: 'prod-14',
    title: 'Assistente Financeiro',
    slug: 'assistente-financeiro',
    description: 'Persona de consultor financeiro para controle de gastos, investimentos e planejamento.',
    longDescription: `O Assistente Financeiro e uma persona especializada em financas pessoais e empresariais, com profundo conhecimento do sistema financeiro brasileiro. Ajuda a organizar orcamentos, controlar gastos, planejar investimentos e tomar decisoes financeiras informadas.

Conhece detalhadamente produtos financeiros brasileiros: Tesouro Direto, CDB, LCI, LCA, fundos imobiliarios, acoes na B3, criptomoedas, previdencia privada (PGBL e VGBL) e seguros. Calcula rentabilidade liquida considerando impostos (IR, IOF) e inflacao (IPCA).

Inclui capacidade de analisar extratos bancarios, categorizar despesas automaticamente, criar orcamentos mensais com a regra 50/30/20 e gerar relatorios de saude financeira. Tom de comunicacao didatico e acessivel, sem jargoes desnecessarios.`,
    type: 'persona',
    price: 29.9,
    categoryId: 'cat-financas',
    creatorId: 'creator-5',
    salesCount: 214,
    favoritesCount: 98,
    version: '1.4.0',
    createdAt: '2025-11-10',
    updatedAt: '2026-02-25',
    image: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Assistente+Financeiro',
    tags: ['financas', 'investimentos', 'orcamento', 'planejamento', 'persona'],
    installInstructions: 'openclaw install @pedroalmeida/assistente-financeiro --persona default',
    filesIncluded: ['persona.yaml', 'system-prompt.md', 'calculators/', 'README.md'],
  },
  {
    id: 'prod-15',
    title: 'Suporte ao Cliente',
    slug: 'suporte-ao-cliente',
    description: 'Persona de atendente profissional para suporte tecnico e atendimento humanizado.',
    longDescription: `A persona Suporte ao Cliente simula um atendente de nivel senior com experiencia em grandes operacoes de customer success. Responde duvidas, resolve problemas e encaminha casos complexos seguindo boas praticas de atendimento.

Utiliza tecnicas de comunicacao nao-violenta, escuta ativa e resolucao de conflitos. Adapta o tom de voz automaticamente conforme o estado emocional do cliente detectado na mensagem: mais empatico para clientes frustrados, mais direto para duvidas simples.

Inclui base de conhecimento configuravel, sistema de escalonamento para atendimento humano, templates de respostas para situacoes comuns (troca, devolucao, reclamacao, elogio) e metricas de satisfacao. Totalmente adaptada ao portugues brasileiro e ao Codigo de Defesa do Consumidor.`,
    type: 'persona',
    price: 44.9,
    categoryId: 'cat-atendimento',
    creatorId: 'creator-3',
    salesCount: 367,
    favoritesCount: 156,
    version: '1.7.0',
    createdAt: '2025-09-20',
    updatedAt: '2026-03-08',
    image: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Suporte+Cliente',
    tags: ['suporte', 'atendimento', 'cliente', 'customer-success', 'persona'],
    installInstructions: 'openclaw install @rafaeloliveira/suporte-cliente --persona default',
    filesIncluded: ['persona.yaml', 'system-prompt.md', 'knowledge-base/', 'escalation-rules.yaml', 'README.md'],
  },
  {
    id: 'prod-16',
    title: 'Analista de Dados',
    slug: 'analista-de-dados',
    description: 'Persona de analista de dados que interpreta numeros, cria dashboards e gera insights.',
    longDescription: `A persona Analista de Dados transforma seu agente em um profissional de dados completo, capaz de receber datasets brutos e entregar analises estruturadas com insights acionaveis e visualizacoes claras.

Domina estatistica descritiva e inferencial, analise exploratoria de dados (EDA), testes de hipotese, regressao e segmentacao. Trabalha com SQL avancado, pandas, numpy e bibliotecas de visualizacao. Sabe comunicar resultados para publicos tecnicos e nao-tecnicos.

Ideal para equipes que precisam de analises rapidas sem esperar pelo time de dados. A persona segue boas praticas de reproducibilidade, documenta cada etapa da analise e questiona premissas antes de tirar conclusoes. Inclui templates de relatorios executivos e dashboards.`,
    type: 'persona',
    price: 54.9,
    categoryId: 'cat-pesquisa',
    creatorId: 'creator-4',
    salesCount: 178,
    favoritesCount: 89,
    version: '1.2.0',
    createdAt: '2025-11-20',
    updatedAt: '2026-03-15',
    image: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Analista+Dados',
    tags: ['dados', 'analise', 'dashboard', 'estatistica', 'persona'],
    installInstructions: 'openclaw install @julianacosta/analista-dados --persona default',
    filesIncluded: ['persona.yaml', 'system-prompt.md', 'analysis-templates/', 'README.md'],
  },

  // ========== BUNDLES (4) ==========
  {
    id: 'prod-17',
    title: 'Kit Startup Completo',
    slug: 'kit-startup-completo',
    description: 'Bundle com persona CEO, skills de vendas, marketing e produtividade para empreendedores.',
    longDescription: `O Kit Startup Completo e o pacote essencial para quem esta comecando um negocio. Reune as melhores ferramentas de IA para empreendedores em um unico bundle com desconto significativo em relacao a compra individual.

Inclui a persona CEO Empreendedor para decisoes estrategicas, o Pipeline de Vendas Inteligente para montar sua operacao comercial, o Gerador de Conteudo para sua presenca digital e o Orquestrador de Tarefas para manter tudo organizado enquanto voce faz malabarismo com mil responsabilidades.

Todas as skills e personas do bundle sao pre-configuradas para funcionar juntas, compartilhando contexto e dados entre si. Inclui guia de onboarding passo a passo em portugues e suporte prioritario por 90 dias.`,
    type: 'bundle',
    price: 149.9,
    categoryId: 'cat-personas-executivas',
    creatorId: 'creator-3',
    salesCount: 145,
    favoritesCount: 89,
    version: '1.0.0',
    createdAt: '2025-12-01',
    updatedAt: '2026-03-20',
    image: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Kit+Startup',
    tags: ['bundle', 'startup', 'empreendedor', 'completo', 'desconto'],
    installInstructions: 'openclaw install @rafaeloliveira/kit-startup --bundle',
    filesIncluded: ['bundle.yaml', 'ceo-empreendedor/', 'pipeline-vendas/', 'gerador-conteudo/', 'orquestrador-tarefas/', 'onboarding-guide.md'],
  },
  {
    id: 'prod-18',
    title: 'Pack Desenvolvedor Full Stack',
    slug: 'pack-desenvolvedor-full-stack',
    description: 'Bundle com skills de codigo, prompts, memoria e persona de engenheiro senior.',
    longDescription: `O Pack Desenvolvedor Full Stack reune tudo que um desenvolvedor precisa para multiplicar sua produtividade com agentes de IA. Da escrita de codigo a revisao, passando por testes e documentacao, este bundle cobre o ciclo completo de desenvolvimento.

Inclui Loops de Codigo para Agentes para automacao de desenvolvimento iterativo, o Gerador de Prompts Avancado para criar instrucoes precisas, o Sistema de Memoria 3 Camadas para manter contexto entre sessoes longas de programacao e a persona Engenheiro Senior para code review e mentoria.

As skills sao otimizadas para trabalhar em conjunto: o sistema de memoria alimenta o contexto do engenheiro senior, que por sua vez guia os loops de codigo com melhores praticas. Economia de mais de 40% comparado a compra individual.`,
    type: 'bundle',
    price: 179.9,
    categoryId: 'cat-programacao',
    creatorId: 'creator-1',
    salesCount: 234,
    favoritesCount: 167,
    version: '1.2.0',
    createdAt: '2025-11-15',
    updatedAt: '2026-03-25',
    image: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Pack+Dev+Full+Stack',
    tags: ['bundle', 'desenvolvedor', 'fullstack', 'codigo', 'desconto'],
    installInstructions: 'openclaw install @lucasferreira/pack-dev-fullstack --bundle',
    filesIncluded: ['bundle.yaml', 'loops-codigo/', 'gerador-prompts/', 'memoria-3-camadas/', 'engenheiro-senior/', 'setup-guide.md'],
  },
  {
    id: 'prod-19',
    title: 'Suite Marketing 360',
    slug: 'suite-marketing-360',
    description: 'Bundle completo de marketing: conteudo, SEO, persona de marketing e pipeline de vendas.',
    longDescription: `A Suite Marketing 360 e o kit definitivo para profissionais e agencias de marketing digital. Combina ferramentas de criacao de conteudo, otimizacao para buscadores, gestao de vendas e uma persona especialista que orquestra tudo.

Inclui o Gerador de Conteudo para producao em escala, o SEO Automatizado para dominar o organico, o Pipeline de Vendas Inteligente para converter o trafego em receita e a persona Marketing Digital para estrategia e planejamento. Cada ferramenta alimenta a proxima em um fluxo integrado.

O bundle inclui dashboard unificado que mostra metricas de todas as frentes (conteudo publicado, posicoes no Google, leads gerados, conversoes) em uma unica visao. Economia de 35% em relacao a compra separada e acesso a templates exclusivos do mercado brasileiro.`,
    type: 'bundle',
    price: 189.9,
    categoryId: 'cat-marketing',
    creatorId: 'creator-2',
    salesCount: 156,
    favoritesCount: 78,
    version: '1.1.0',
    createdAt: '2025-12-10',
    updatedAt: '2026-03-18',
    image: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Suite+Marketing+360',
    tags: ['bundle', 'marketing', 'seo', 'conteudo', 'vendas'],
    installInstructions: 'openclaw install @camilasantos/suite-marketing-360 --bundle',
    filesIncluded: ['bundle.yaml', 'gerador-conteudo/', 'seo-automatizado/', 'pipeline-vendas/', 'marketing-digital/', 'dashboard-config.yaml'],
  },
  {
    id: 'prod-20',
    title: 'Kit Financas Pessoais',
    slug: 'kit-financas-pessoais',
    description: 'Bundle com persona financeira, skill de analise de dados e orquestrador de tarefas.',
    longDescription: `O Kit Financas Pessoais e perfeito para quem quer tomar controle da vida financeira usando IA. Combina as melhores ferramentas para organizar gastos, planejar investimentos e manter a disciplina financeira no dia a dia.

Inclui a persona Assistente Financeiro para consultoria personalizada sobre investimentos e orcamento, a skill Analise de Dados para importar extratos e gerar relatorios visuais de gastos, e o Orquestrador de Tarefas configurado com lembretes financeiros (vencimento de contas, aportes mensais, revisao de carteira).

Todas as ferramentas compartilham dados entre si: o assistente financeiro acessa os relatorios da analise de dados para dar conselhos mais precisos, e o orquestrador envia lembretes baseados nos compromissos financeiros identificados. Inclui planilha de orcamento pre-configurada e guia de investimentos para iniciantes.`,
    type: 'bundle',
    price: 99.9,
    categoryId: 'cat-financas',
    creatorId: 'creator-5',
    salesCount: 98,
    favoritesCount: 56,
    version: '1.0.0',
    createdAt: '2026-01-05',
    updatedAt: '2026-03-22',
    image: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Kit+Financas',
    tags: ['bundle', 'financas', 'investimentos', 'orcamento', 'pessoal'],
    installInstructions: 'openclaw install @pedroalmeida/kit-financas-pessoais --bundle',
    filesIncluded: ['bundle.yaml', 'assistente-financeiro/', 'analise-dados/', 'orquestrador-tarefas/', 'planilha-orcamento.xlsx', 'guia-investimentos.md'],
  },
];

// ---------------------------------------------------------------------------
// Funcoes auxiliares
// ---------------------------------------------------------------------------

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.categoryId === categoryId);
}

export function getCreatorByUsername(username: string): Creator | undefined {
  return creators.find((c) => c.username === username);
}

export function getFeaturedProducts(): Product[] {
  return products
    .slice()
    .sort((a, b) => b.favoritesCount - a.favoritesCount)
    .slice(0, 6);
}

export function getPopularSkills(): Product[] {
  return products
    .filter((p) => p.type === 'skill')
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, 6);
}

export function getPopularPersonas(): Product[] {
  return products
    .filter((p) => p.type === 'persona')
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, 6);
}
