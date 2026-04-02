/**
 * Script de seed para popular o Supabase com dados iniciais
 * Uso: node scripts/seed-db.mjs
 */

const SUPABASE_URL = 'https://msmvvsmzucuchxomsnnt.supabase.co'
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SERVICE_KEY) {
  console.error('❌ Defina SUPABASE_SERVICE_ROLE_KEY no ambiente')
  process.exit(1)
}

const headers = {
  'apikey': SERVICE_KEY,
  'Authorization': `Bearer ${SERVICE_KEY}`,
  'Content-Type': 'application/json',
}

async function upsert(table, data) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: { ...headers, 'Prefer': 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.text()
    const parsed = JSON.parse(err)
    // Ignora duplicatas
    if (parsed.code === '23505') return
    throw new Error(`Erro ao inserir em ${table}: ${err}`)
  }
}

async function createAuthUser(email, name) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email,
      password: `AgentSkills@${Math.random().toString(36).slice(2)}!`,
      email_confirm: true,
      user_metadata: { name },
    }),
  })
  if (!res.ok) {
    const err = await res.text()
    // Se já existe, busca
    if (err.includes('already been registered')) {
      const listRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?email=${encodeURIComponent(email)}`, { headers })
      const list = await listRes.json()
      return list.users?.[0]?.id
    }
    throw new Error(`Erro ao criar usuário ${email}: ${err}`)
  }
  const user = await res.json()
  return user.id
}

// ---------------------------------------------------------------------------
// Categorias
// ---------------------------------------------------------------------------
const categories = [
  { name: 'Programação', slug: 'programacao', description: 'Skills para desenvolvimento de software, automação de código e engenharia', icon: '💻' },
  { name: 'Marketing', slug: 'marketing', description: 'Estratégias de marketing digital, SEO, campanhas e redes sociais', icon: '📢' },
  { name: 'Produtividade', slug: 'produtividade', description: 'Ferramentas para organizar tarefas, tempo e fluxos de trabalho', icon: '⚡' },
  { name: 'Vendas', slug: 'vendas', description: 'Automação de vendas, CRM, follow-up e pipeline comercial', icon: '💰' },
  { name: 'Pesquisa', slug: 'pesquisa', description: 'Pesquisa de mercado, análise competitiva e coleta de dados', icon: '🔍' },
  { name: 'Criação de Conteúdo', slug: 'criacao-de-conteudo', description: 'Geração de textos, posts, artigos e roteiros para diversas plataformas', icon: '✍️' },
  { name: 'Atendimento', slug: 'atendimento', description: 'Suporte ao cliente, chatbots, respostas automáticas e triagem', icon: '🎧' },
  { name: 'Design', slug: 'design', description: 'Prompts de design, geração de imagens e prototipação visual', icon: '🎨' },
  { name: 'Finanças', slug: 'financas', description: 'Controle financeiro, relatórios, previsões e análise de investimentos', icon: '📊' },
  { name: 'Operações', slug: 'operacoes', description: 'Gestão de processos, logística, automação operacional e integração', icon: '⚙️' },
  { name: 'Personas Executivas', slug: 'personas-executivas', description: 'Personas de liderança, C-level e tomada de decisão estratégica', icon: '👔' },
  { name: 'Growth', slug: 'growth', description: 'Estratégias de crescimento, experimentação, métricas e retenção', icon: '🚀' },
  { name: 'Produto', slug: 'produto', description: 'Gestão de produto, discovery, roadmap e priorização de features', icon: '📦' },
  { name: 'Assistente Pessoal', slug: 'assistente-pessoal', description: 'Organização pessoal, lembretes, agenda e tarefas do dia a dia', icon: '🤖' },
]

// Criadores
const creatorsData = [
  { email: 'lucas@agentskills.com.br', name: 'Lucas Ferreira', username: 'lucasferreira', bio: 'Engenheiro de software com 10 anos de experiência. Especialista em automação e agentes de IA.', total_sales: 1847 },
  { email: 'camila@agentskills.com.br', name: 'Camila Santos', username: 'camilasantos', bio: 'Growth hacker e especialista em marketing digital.', total_sales: 923 },
  { email: 'rafael@agentskills.com.br', name: 'Rafael Oliveira', username: 'rafaeloliveira', bio: 'Arquiteto de soluções e entusiasta de IA generativa.', total_sales: 1235 },
  { email: 'juliana@agentskills.com.br', name: 'Juliana Costa', username: 'julianacosta', bio: 'Product Manager com background em dados.', total_sales: 654 },
  { email: 'pedro@agentskills.com.br', name: 'Pedro Almeida', username: 'pedroalmeida', bio: 'Consultor financeiro e desenvolvedor autodidata.', total_sales: 412 },
]

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log('🌱 Iniciando seed do AgentSkills...\n')

  // 1. Categorias
  console.log('📂 Inserindo categorias...')
  await upsert('categories', categories)
  console.log(`  ✅ ${categories.length} categorias inseridas`)

  // Busca IDs das categorias
  const catRes = await fetch(`${SUPABASE_URL}/rest/v1/categories?select=id,slug`, { headers })
  const catRows = await catRes.json()
  const catMap = {}
  catRows.forEach(c => { catMap[c.slug] = c.id })

  // 2. Criadores (auth + profile)
  console.log('👤 Criando usuários autenticados...')
  const creatorIds = {}
  for (const c of creatorsData) {
    const uid = await createAuthUser(c.email, c.name)
    creatorIds[c.username] = uid
    console.log(`  ✅ ${c.name} → ${uid}`)
  }

  // 3. Profiles
  console.log('📋 Inserindo profiles...')
  const profiles = creatorsData.map(c => ({
    id: creatorIds[c.username],
    name: c.name,
    username: c.username,
    avatar_url: `https://api.dicebear.com/9.x/initials/svg?seed=${c.name.replace(' ','')}`,
    bio: c.bio,
    role: 'creator',
    total_sales: c.total_sales,
  }))
  await upsert('profiles', profiles)
  console.log(`  ✅ ${profiles.length} profiles inseridos`)

  // 4. Produtos
  console.log('📦 Inserindo produtos...')
  const products = [
    // Skills
    { title: 'Loops de Código para Agentes', slug: 'loops-de-codigo-para-agentes', description: 'Permite que agentes escrevam, testem e corrijam código automaticamente em loops iterativos.', type: 'skill', status: 'published', price: 49.90, category_id: catMap['programacao'], creator_id: creatorIds['lucasferreira'], image_url: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Loops+de+Codigo', sales_count: 387, favorites_count: 142, version: '2.1.0', tags: ['codigo', 'automacao', 'testes', 'iterativo', 'dev'], install_instructions: 'openclaw install @lucasferreira/loops-de-codigo --agent default', files_included: ['skill.yaml', 'loops-engine.ts', 'README.md'] },
    { title: 'Acesso YouTube para Agentes', slug: 'acesso-youtube-para-agentes', description: 'Skill que permite ao agente buscar, analisar e resumir vídeos do YouTube automaticamente.', type: 'skill', status: 'published', price: 39.90, category_id: catMap['pesquisa'], creator_id: creatorIds['lucasferreira'], image_url: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=YouTube+Agentes', sales_count: 256, favorites_count: 98, version: '1.4.2', tags: ['youtube', 'video', 'resumo', 'pesquisa'], install_instructions: 'openclaw install @lucasferreira/youtube-access --agent default', files_included: ['skill.yaml', 'youtube-client.ts', 'README.md'] },
    { title: 'Sistema de Memória 3 Camadas', slug: 'sistema-de-memoria-3-camadas', description: 'Adiciona memória de curto, médio e longo prazo ao seu agente para contexto persistente.', type: 'skill', status: 'published', price: 79.90, category_id: catMap['produtividade'], creator_id: creatorIds['rafaeloliveira'], image_url: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Memoria+3+Camadas', sales_count: 512, favorites_count: 234, version: '3.0.1', tags: ['memoria', 'contexto', 'persistencia', 'embeddings'], install_instructions: 'openclaw install @rafaeloliveira/memoria-3-camadas --agent default', files_included: ['skill.yaml', 'memory-manager.ts', 'README.md'] },
    { title: 'Gerador de Conteúdo', slug: 'gerador-de-conteudo', description: 'Cria posts, artigos, legendas e roteiros otimizados para diferentes plataformas.', type: 'skill', status: 'published', price: 59.90, category_id: catMap['criacao-de-conteudo'], creator_id: creatorIds['camilasantos'], image_url: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Gerador+Conteudo', sales_count: 445, favorites_count: 189, version: '2.3.0', tags: ['conteudo', 'copywriting', 'social-media', 'seo'], install_instructions: 'openclaw install @camilasantos/gerador-conteudo --agent default', files_included: ['skill.yaml', 'content-engine.ts', 'README.md'] },
    { title: 'Automação WhatsApp', slug: 'automacao-whatsapp', description: 'Conecta seu agente ao WhatsApp para responder mensagens, enviar notificações e gerenciar conversas.', type: 'skill', status: 'published', price: 89.90, category_id: catMap['atendimento'], creator_id: creatorIds['lucasferreira'], image_url: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=WhatsApp+Auto', sales_count: 623, favorites_count: 278, version: '2.0.3', tags: ['whatsapp', 'automacao', 'chatbot', 'atendimento'], install_instructions: 'openclaw install @lucasferreira/whatsapp-automation --agent default', files_included: ['skill.yaml', 'whatsapp-client.ts', 'README.md'] },
    { title: 'Análise de Dados', slug: 'analise-de-dados', description: 'Skill para importar, limpar, analisar e visualizar dados de planilhas e bancos de dados.', type: 'skill', status: 'published', price: 69.90, category_id: catMap['financas'], creator_id: creatorIds['pedroalmeida'], image_url: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Analise+Dados', sales_count: 198, favorites_count: 87, version: '1.2.0', tags: ['dados', 'analise', 'graficos', 'planilhas'], install_instructions: 'openclaw install @pedroalmeida/analise-dados --agent default', files_included: ['skill.yaml', 'data-engine.ts', 'README.md'] },
    { title: 'Pipeline de Vendas Inteligente', slug: 'pipeline-de-vendas-inteligente', description: 'Automatiza follow-ups, qualificação de leads e gestão do funil de vendas.', type: 'skill', status: 'published', price: 99.90, category_id: catMap['vendas'], creator_id: creatorIds['camilasantos'], image_url: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Pipeline+Vendas', sales_count: 312, favorites_count: 156, version: '1.8.0', tags: ['vendas', 'crm', 'leads', 'follow-up'], install_instructions: 'openclaw install @camilasantos/pipeline-vendas --agent default', files_included: ['skill.yaml', 'pipeline-engine.ts', 'README.md'] },
    { title: 'Orquestrador de Tarefas', slug: 'orquestrador-de-tarefas', description: 'Gerencia e prioriza tarefas automaticamente usando métodos GTD e Eisenhower.', type: 'skill', status: 'published', price: 0, category_id: catMap['produtividade'], creator_id: creatorIds['julianacosta'], image_url: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Orquestrador+Tarefas', sales_count: 876, favorites_count: 345, version: '1.5.0', tags: ['tarefas', 'gtd', 'produtividade', 'gratis'], install_instructions: 'openclaw install @julianacosta/orquestrador-tarefas --agent default', files_included: ['skill.yaml', 'task-manager.ts', 'README.md'] },
    { title: 'SEO Automatizado', slug: 'seo-automatizado', description: 'Analisa páginas, sugere melhorias de SEO e monitora posicionamento no Google.', type: 'skill', status: 'published', price: 59.90, category_id: catMap['marketing'], creator_id: creatorIds['camilasantos'], image_url: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=SEO+Automatizado', sales_count: 178, favorites_count: 67, version: '1.1.0', tags: ['seo', 'google', 'ranking', 'auditoria'], install_instructions: 'openclaw install @camilasantos/seo-automatizado --agent default', files_included: ['skill.yaml', 'seo-auditor.ts', 'README.md'] },
    { title: 'Gerador de Prompts Avançado', slug: 'gerador-de-prompts-avancado', description: 'Cria, otimiza e testa prompts para diferentes modelos de IA automaticamente.', type: 'skill', status: 'published', price: 0, category_id: catMap['programacao'], creator_id: creatorIds['rafaeloliveira'], image_url: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Gerador+Prompts', sales_count: 934, favorites_count: 412, version: '2.0.0', tags: ['prompts', 'ia', 'otimizacao', 'gratis'], install_instructions: 'openclaw install @rafaeloliveira/gerador-prompts --agent default', files_included: ['skill.yaml', 'prompt-engine.ts', 'README.md'] },
    // Personas
    { title: 'CEO Empreendedor', slug: 'ceo-empreendedor', description: 'Persona de CEO visionário focado em startups, estratégia de negócio e captação de investimento.', type: 'persona', status: 'published', price: 39.90, category_id: catMap['personas-executivas'], creator_id: creatorIds['rafaeloliveira'], image_url: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=CEO+Empreendedor', sales_count: 289, favorites_count: 134, version: '1.3.0', tags: ['ceo', 'startup', 'estrategia', 'persona'], install_instructions: 'openclaw install @rafaeloliveira/ceo-empreendedor --persona default', files_included: ['persona.yaml', 'system-prompt.md', 'README.md'] },
    { title: 'Engenheiro Sênior', slug: 'engenheiro-senior', description: 'Persona de engenheiro de software experiente para code review, arquitetura e mentoria técnica.', type: 'persona', status: 'published', price: 49.90, category_id: catMap['programacao'], creator_id: creatorIds['lucasferreira'], image_url: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Engenheiro+Senior', sales_count: 456, favorites_count: 201, version: '2.1.0', tags: ['engenheiro', 'code-review', 'arquitetura', 'persona'], install_instructions: 'openclaw install @lucasferreira/engenheiro-senior --persona default', files_included: ['persona.yaml', 'system-prompt.md', 'README.md'] },
    { title: 'Marketing Digital', slug: 'marketing-digital', description: 'Persona de especialista em marketing digital focada em estratégias para o mercado brasileiro.', type: 'persona', status: 'published', price: 34.90, category_id: catMap['marketing'], creator_id: creatorIds['camilasantos'], image_url: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Marketing+Digital', sales_count: 334, favorites_count: 145, version: '1.6.0', tags: ['marketing', 'digital', 'trafego', 'persona'], install_instructions: 'openclaw install @camilasantos/marketing-digital --persona default', files_included: ['persona.yaml', 'system-prompt.md', 'README.md'] },
    { title: 'Assistente Financeiro', slug: 'assistente-financeiro', description: 'Persona de consultor financeiro para controle de gastos, investimentos e planejamento.', type: 'persona', status: 'published', price: 29.90, category_id: catMap['financas'], creator_id: creatorIds['pedroalmeida'], image_url: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Assistente+Financeiro', sales_count: 214, favorites_count: 98, version: '1.4.0', tags: ['financas', 'investimentos', 'orcamento', 'persona'], install_instructions: 'openclaw install @pedroalmeida/assistente-financeiro --persona default', files_included: ['persona.yaml', 'system-prompt.md', 'README.md'] },
    { title: 'Suporte ao Cliente', slug: 'suporte-ao-cliente', description: 'Persona de atendente profissional para suporte técnico e atendimento humanizado.', type: 'persona', status: 'published', price: 44.90, category_id: catMap['atendimento'], creator_id: creatorIds['rafaeloliveira'], image_url: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Suporte+Cliente', sales_count: 367, favorites_count: 156, version: '1.7.0', tags: ['suporte', 'atendimento', 'cliente', 'persona'], install_instructions: 'openclaw install @rafaeloliveira/suporte-cliente --persona default', files_included: ['persona.yaml', 'system-prompt.md', 'README.md'] },
    { title: 'Analista de Dados', slug: 'analista-de-dados', description: 'Persona de analista de dados que interpreta números, cria dashboards e gera insights.', type: 'persona', status: 'published', price: 54.90, category_id: catMap['pesquisa'], creator_id: creatorIds['julianacosta'], image_url: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Analista+Dados', sales_count: 178, favorites_count: 89, version: '1.2.0', tags: ['dados', 'analise', 'dashboard', 'persona'], install_instructions: 'openclaw install @julianacosta/analista-dados --persona default', files_included: ['persona.yaml', 'system-prompt.md', 'README.md'] },
    // Bundles
    { title: 'Kit Startup Completo', slug: 'kit-startup-completo', description: 'Bundle com persona CEO, skills de vendas, marketing e produtividade para empreendedores.', type: 'bundle', status: 'published', price: 149.90, category_id: catMap['personas-executivas'], creator_id: creatorIds['rafaeloliveira'], image_url: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Kit+Startup', sales_count: 145, favorites_count: 89, version: '1.0.0', tags: ['bundle', 'startup', 'empreendedor', 'desconto'], install_instructions: 'openclaw install @rafaeloliveira/kit-startup --bundle', files_included: ['bundle.yaml', 'onboarding-guide.md'] },
    { title: 'Pack Desenvolvedor Full Stack', slug: 'pack-desenvolvedor-full-stack', description: 'Bundle com skills de código, prompts, memória e persona de engenheiro sênior.', type: 'bundle', status: 'published', price: 179.90, category_id: catMap['programacao'], creator_id: creatorIds['lucasferreira'], image_url: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Pack+Dev+Full+Stack', sales_count: 234, favorites_count: 167, version: '1.2.0', tags: ['bundle', 'desenvolvedor', 'fullstack', 'desconto'], install_instructions: 'openclaw install @lucasferreira/pack-dev-fullstack --bundle', files_included: ['bundle.yaml', 'setup-guide.md'] },
    { title: 'Suite Marketing 360', slug: 'suite-marketing-360', description: 'Bundle completo de marketing: conteúdo, SEO, persona de marketing e pipeline de vendas.', type: 'bundle', status: 'published', price: 189.90, category_id: catMap['marketing'], creator_id: creatorIds['camilasantos'], image_url: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Suite+Marketing+360', sales_count: 156, favorites_count: 78, version: '1.1.0', tags: ['bundle', 'marketing', 'seo', 'conteudo'], install_instructions: 'openclaw install @camilasantos/suite-marketing-360 --bundle', files_included: ['bundle.yaml'] },
    { title: 'Kit Finanças Pessoais', slug: 'kit-financas-pessoais', description: 'Bundle com persona financeira, skill de análise de dados e orquestrador de tarefas.', type: 'bundle', status: 'published', price: 99.90, category_id: catMap['financas'], creator_id: creatorIds['pedroalmeida'], image_url: 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Kit+Financas', sales_count: 98, favorites_count: 56, version: '1.0.0', tags: ['bundle', 'financas', 'investimentos', 'pessoal'], install_instructions: 'openclaw install @pedroalmeida/kit-financas-pessoais --bundle', files_included: ['bundle.yaml'] },
  ]

  await upsert('products', products)
  console.log(`  ✅ ${products.length} produtos inseridos`)

  console.log('\n🎉 Seed concluído com sucesso!')
  console.log(`   ${categories.length} categorias | ${profiles.length} criadores | ${products.length} produtos`)
}

main().catch(err => {
  console.error('❌ Erro:', err.message)
  process.exit(1)
})
