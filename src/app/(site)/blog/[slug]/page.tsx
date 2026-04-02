import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts, categories, creators } from "@/data/seed";
import { toCardProduct } from "@/lib/utils";
import { notFound } from "next/navigation";

interface BlogPostFull {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  content: string;
}

const blogPostsFull: BlogPostFull[] = [
  {
    slug: "como-instalar-openclaw",
    title: "Como Instalar o OpenClaw no seu Computador em 10 Minutos",
    excerpt:
      "Guia passo a passo para instalar e configurar o OpenClaw no macOS, Windows e Linux. Do zero ate seu primeiro agente funcionando.",
    date: "28 Mar 2026",
    readingTime: "8 min de leitura",
    category: "Tutorial",
    content: `O OpenClaw e uma das plataformas mais poderosas para criar e gerenciar agentes de IA. Neste tutorial, vamos mostrar como instalar e configurar tudo do zero.

## Pre-requisitos

Antes de comecar, voce vai precisar de:

- **Node.js 18+** instalado no seu computador
- **npm** ou **yarn** como gerenciador de pacotes
- **Terminal** (Terminal no macOS, PowerShell no Windows)
- Conexao com a internet

## Passo 1: Instalar o Node.js

Se voce ainda nao tem o Node.js instalado, acesse nodejs.org e baixe a versao LTS. A instalacao e simples e funciona em todos os sistemas operacionais.

Para verificar se ja esta instalado, abra o terminal e digite:

\`\`\`bash
node --version
npm --version
\`\`\`

## Passo 2: Instalar o OpenClaw

Com o Node.js instalado, basta executar o seguinte comando no terminal:

\`\`\`bash
npm install -g openclaw
\`\`\`

Isso instala o OpenClaw globalmente no seu computador, permitindo que voce o use de qualquer pasta.

## Passo 3: Criar seu primeiro agente

Agora vamos criar um agente simples:

\`\`\`bash
openclaw init meu-agente
cd meu-agente
openclaw start
\`\`\`

Pronto! Seu primeiro agente esta rodando. Voce pode interagir com ele pelo terminal ou pela interface web em http://localhost:3000.

## Passo 4: Instalar skills do marketplace

Para turbinar seu agente, instale skills do AgentSkills:

\`\`\`bash
openclaw install @agentskills/atendimento-smart
openclaw install @agentskills/analise-dados
\`\`\`

## Proximos passos

- Explore o marketplace do AgentSkills para encontrar mais skills
- Leia a documentacao oficial do OpenClaw
- Junte-se a comunidade no Discord`,
  },
  {
    slug: "5-skills-essenciais",
    title: "5 Skills Essenciais para Todo Agente de IA",
    excerpt:
      "Descubra quais sao as skills mais importantes para equipar seus agentes de IA e como elas podem transformar sua produtividade.",
    date: "25 Mar 2026",
    readingTime: "6 min de leitura",
    category: "Dicas",
    content: `Equipar seu agente de IA com as skills certas pode fazer toda a diferenca na produtividade. Aqui estao as 5 skills que todo agente deveria ter.

## 1. Atendimento ao Cliente

Uma skill de atendimento bem configurada permite que seu agente responda duvidas comuns, direcione tickets e resolva problemas de forma autonoma. Isso pode reduzir em ate 70% o volume de atendimento humano.

**Recomendacao:** Atendimento Smart Pro no AgentSkills

## 2. Analise de Dados

Agentes com capacidade de analisar dados podem gerar relatorios, identificar tendencias e fornecer insights valiosos automaticamente.

**Recomendacao:** Data Analyst Pro no AgentSkills

## 3. Geracao de Conteudo

Skills de conteudo permitem que seu agente crie textos, emails, posts e documentos com qualidade profissional, seguindo o tom de voz da sua marca.

**Recomendacao:** Content Writer BR no AgentSkills

## 4. Integracao com APIs

Uma skill de integracao permite que seu agente se conecte com outros sistemas - CRMs, ERPs, planilhas e mais - ampliando muito suas capacidades.

**Recomendacao:** API Connector no AgentSkills

## 5. Processamento de Documentos

A capacidade de ler, interpretar e extrair informacoes de documentos (PDFs, contratos, notas fiscais) e fundamental para automacao de processos.

**Recomendacao:** Doc Processor no AgentSkills

## Conclusao

Comecar com essas 5 skills ja coloca seu agente em outro nivel. O investimento se paga rapidamente com a economia de tempo e aumento de produtividade.`,
  },
  {
    slug: "criando-primeira-skill",
    title: "Guia Completo: Criando sua Primeira Skill para OpenClaw",
    excerpt:
      "Aprenda a criar, testar e publicar sua primeira skill no marketplace do AgentSkills. Inclui exemplos de codigo e melhores praticas.",
    date: "20 Mar 2026",
    readingTime: "12 min de leitura",
    category: "Tutorial",
    content: `Criar skills para o OpenClaw e mais simples do que voce imagina. Neste guia completo, vamos percorrer todo o processo desde a ideia ate a publicacao no marketplace.

## O que e uma Skill?

Uma skill e um conjunto de instrucoes, templates e configuracoes que dao ao agente de IA uma habilidade especifica. Pode ser desde responder perguntas sobre um tema ate executar tarefas complexas.

## Estrutura de uma Skill

Toda skill do OpenClaw segue uma estrutura padrao:

\`\`\`
minha-skill/
  skill.yaml        # Configuracao principal
  prompts/           # Templates de prompts
    main.md
    examples.md
  tests/             # Testes automatizados
    test.yaml
  README.md          # Documentacao
\`\`\`

## Passo 1: Criar o projeto

\`\`\`bash
openclaw skill create minha-skill
cd minha-skill
\`\`\`

## Passo 2: Configurar o skill.yaml

Este e o arquivo principal que define sua skill:

\`\`\`yaml
name: minha-skill
version: 1.0.0
description: Descricao da minha skill
author: seu-username
category: atendimento
\`\`\`

## Passo 3: Escrever os prompts

Os prompts definem como o agente vai se comportar. Escreva instrucoes claras e especificas.

## Passo 4: Testar

\`\`\`bash
openclaw skill test
\`\`\`

## Passo 5: Publicar no AgentSkills

\`\`\`bash
openclaw skill publish
\`\`\`

## Melhores praticas

- Escreva instrucoes claras e especificas
- Inclua exemplos de uso
- Adicione testes automatizados
- Mantenha a documentacao atualizada
- Peca feedback da comunidade`,
  },
  {
    slug: "ganhar-dinheiro-vendendo-skills",
    title: "Como Ganhar Dinheiro Vendendo Skills de IA",
    excerpt:
      "Estrategias comprovadas para monetizar seu conhecimento criando e vendendo skills no AgentSkills. Criadores ja faturaram mais de R$ 500K.",
    date: "15 Mar 2026",
    readingTime: "10 min de leitura",
    category: "Negocios",
    content: `O mercado de skills para agentes de IA esta em plena expansao. Criadores no AgentSkills ja faturaram mais de R$ 500K, e voce tambem pode participar dessa revolucao.

## O modelo de negocios

O AgentSkills funciona como um marketplace: voce cria a skill, define o preco e nos cuidamos do resto. A divisao e simples:

- **85%** vai para voce (o criador)
- **15%** fica com a plataforma

## Quanto da para ganhar?

Os numeros variam, mas aqui estao alguns exemplos reais:

- **Skill de atendimento:** R$ 49,90 x 500 vendas = R$ 21.207 (85%)
- **Bundle de marketing:** R$ 129,90 x 200 vendas = R$ 22.083 (85%)
- **Persona especializada:** R$ 29,90 x 1.000 vendas = R$ 25.415 (85%)

## Estrategias para maximizar vendas

### 1. Resolva problemas reais
As skills mais vendidas resolvem dores especificas de negocios. Pense em problemas que voce conhece bem.

### 2. Invista em documentacao
Produtos bem documentados vendem mais. Inclua exemplos, screenshots e instrucoes claras.

### 3. Ofereca versao gratuita
Uma versao gratuita limitada funciona como demonstracao e gera confianca para a compra da versao completa.

### 4. Mantenha atualizado
Skills atualizadas regularmente ganham mais visibilidade no marketplace e geram mais confianca.

### 5. Construa sua marca
Criadores com reputacao forte vendem mais. Responda perguntas, participe da comunidade e lance novos produtos regularmente.

## Comece hoje

O cadastro como criador e gratuito. Voce pode comecar a vender em minutos apos criar sua conta no AgentSkills.`,
  },
  {
    slug: "openclaw-vs-outras-plataformas",
    title: "OpenClaw vs Outras Plataformas de Agentes: Comparativo 2026",
    excerpt:
      "Analise comparativa entre OpenClaw, LangChain, AutoGPT e CrewAI. Veja qual framework e melhor para cada caso de uso.",
    date: "10 Mar 2026",
    readingTime: "15 min de leitura",
    category: "Analise",
    content: `Com tantas opcoes disponiveis para criar agentes de IA, escolher a plataforma certa pode ser desafiador. Neste comparativo, analisamos as principais opcoes do mercado.

## OpenClaw

**Melhor para:** Equipes que precisam de agentes prontos para producao com marketplace de skills

- Marketplace integrado de skills e personas
- Instalacao simples via CLI
- Comunidade brasileira ativa
- Suporte a multiplos modelos de IA
- Preco: Open-source (gratuito)

## LangChain

**Melhor para:** Desenvolvedores que precisam de flexibilidade maxima

- Framework muito flexivel
- Grande ecossistema de integracao
- Curva de aprendizado mais ingreme
- Sem marketplace de skills
- Preco: Open-source (gratuito)

## AutoGPT

**Melhor para:** Automacao de tarefas autonomas

- Agentes totalmente autonomos
- Execucao de tarefas complexas
- Pode ser imprevisivel
- Sem marketplace
- Preco: Open-source (gratuito)

## CrewAI

**Melhor para:** Orquestracao de multiplos agentes

- Multiplos agentes colaborando
- Definicao de papeis e tarefas
- Ideal para fluxos complexos
- Sem marketplace
- Preco: Open-source (gratuito)

## Conclusao

Cada plataforma tem seus pontos fortes. O OpenClaw se destaca pela facilidade de uso e pelo marketplace de skills que permite equipar seus agentes rapidamente sem precisar programar tudo do zero.

Para quem esta comecando ou precisa de resultados rapidos, o OpenClaw com skills do AgentSkills e a combinacao ideal.`,
  },
  {
    slug: "automacao-com-ia",
    title: "Automacao com IA: Como Agentes Estao Revolucionando Negocios",
    excerpt:
      "Cases reais de empresas brasileiras que estao usando agentes de IA para automatizar processos e reduzir custos em ate 60%.",
    date: "5 Mar 2026",
    readingTime: "9 min de leitura",
    category: "Tendencias",
    content: `A automacao com agentes de IA nao e mais futuro - e presente. Empresas brasileiras de todos os tamanhos estao adotando essa tecnologia e colhendo resultados impressionantes.

## O cenario atual

Em 2026, o mercado de agentes de IA no Brasil movimenta mais de R$ 2 bilhoes. A tendencia e de crescimento acelerado, impulsionada pela reducao de custos e aumento de eficiencia.

## Case 1: E-commerce reduz custos de atendimento em 60%

Uma loja online de medio porte implementou um agente de IA com skills de atendimento do AgentSkills. O resultado:

- **60%** de reducao no volume de atendimento humano
- **NPS** de atendimento subiu de 7.2 para 8.8
- **Tempo de resposta** caiu de 4 horas para 30 segundos
- Economia mensal de **R$ 15.000**

## Case 2: Escritorio juridico automatiza analise de contratos

Um escritorio com 50 advogados implementou agentes para analise preliminar de contratos:

- **80%** dos contratos analisados automaticamente
- Tempo de analise reduzido de **2 dias** para **15 minutos**
- **Zero** erros de classificacao apos treinamento

## Case 3: Startup de marketing automatiza criacao de conteudo

Uma agencia de marketing digital usa agentes com skills de conteudo:

- **5x** mais conteudo produzido por mes
- Custo de producao reduzido em **40%**
- Qualidade mantida com revisao humana final

## Como comecar

1. Identifique processos repetitivos no seu negocio
2. Escolha skills adequadas no AgentSkills
3. Configure seu agente com OpenClaw
4. Teste em ambiente controlado
5. Escale gradualmente

## O futuro

A tendencia e que agentes de IA se tornem tao comuns quanto planilhas. Quem comecar agora tera vantagem competitiva significativa nos proximos anos.

O AgentSkills torna essa jornada mais facil, oferecendo skills prontas criadas por especialistas brasileiros que entendem a realidade dos negocios locais.`,
  },
];

function getPostBySlug(slug: string): BlogPostFull | undefined {
  return blogPostsFull.find((p) => p.slug === slug);
}

export async function generateStaticParams() {
  return blogPostsFull.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Artigo nao encontrado" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Blog AgentSkills`,
      description: post.excerpt,
      url: `https://agentskills.com.br/blog/${post.slug}`,
      siteName: "AgentSkills",
      locale: "pt_BR",
      type: "article",
      publishedTime: post.date,
      authors: ["Equipe AgentSkills"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];
  let codeLanguage = "";

  lines.forEach((line, i) => {
    if (line.startsWith("```") && !inCodeBlock) {
      inCodeBlock = true;
      codeLanguage = line.slice(3).trim();
      codeLines = [];
      return;
    }

    if (line.startsWith("```") && inCodeBlock) {
      inCodeBlock = false;
      elements.push(
        <div
          key={`code-${i}`}
          className="bg-ink-900 rounded-xl p-6 font-mono text-sm text-green-400 overflow-x-auto my-6"
        >
          <pre className="whitespace-pre-wrap">{codeLines.join("\n")}</pre>
        </div>
      );
      return;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      return;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={`h2-${i}`}
          className="text-xl sm:text-2xl font-bold text-ink-900 mt-10 mb-4"
        >
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={`h3-${i}`}
          className="text-lg font-bold text-ink-900 mt-8 mb-3"
        >
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("- **")) {
      const text = line.slice(2);
      const boldMatch = text.match(/\*\*(.*?)\*\*(.*)/);
      if (boldMatch) {
        elements.push(
          <li key={`li-${i}`} className="flex items-start gap-2 ml-4 mb-2">
            <span className="text-accent-500 mt-1.5">&#8226;</span>
            <span className="text-ink-700">
              <strong className="text-ink-900">{boldMatch[1]}</strong>
              {boldMatch[2]}
            </span>
          </li>
        );
      }
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={`li-${i}`} className="flex items-start gap-2 ml-4 mb-2">
          <span className="text-accent-500 mt-1.5">&#8226;</span>
          <span className="text-ink-700">{line.slice(2)}</span>
        </li>
      );
    } else if (line.startsWith("**")) {
      const text = line.replace(/\*\*(.*?)\*\*/g, "$1");
      elements.push(
        <p key={`p-${i}`} className="text-ink-700 font-semibold mb-2">
          {text}
        </p>
      );
    } else if (line.trim() === "") {
      // skip empty lines
    } else {
      // Handle inline bold
      const parts = line.split(/(\*\*.*?\*\*)/g);
      elements.push(
        <p key={`p-${i}`} className="text-ink-700 leading-relaxed mb-4">
          {parts.map((part, j) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={j} className="text-ink-900">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </p>
      );
    }
  });

  return elements;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedProducts = getFeaturedProducts()
    .slice(0, 3)
    .map((p) => toCardProduct(p, categories, creators));

  // Article structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "Equipe AgentSkills",
      url: "https://agentskills.com.br",
    },
    publisher: {
      "@type": "Organization",
      name: "AgentSkills",
      url: "https://agentskills.com.br",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://agentskills.com.br/blog/${post.slug}`,
    },
  };

  const categoryColors: Record<string, string> = {
    Tutorial: "bg-accent-500/10 text-accent-600",
    Dicas: "bg-green-100 text-green-700",
    Negocios: "bg-amber-100 text-amber-700",
    Analise: "bg-purple-100 text-purple-700",
    Tendencias: "bg-blue-100 text-blue-700",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="py-8 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-ink-500 mb-8">
            <Link href="/" className="hover:text-accent-500">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-accent-500">
              Blog
            </Link>
            <span>/</span>
            <span className="text-ink-700 font-medium line-clamp-1">
              {post.title}
            </span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full ${
                  categoryColors[post.category] || categoryColors.Dicas
                }`}
              >
                {post.category}
              </span>
              <span className="text-sm text-ink-500">{post.readingTime}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-ink-900 mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 pb-8 border-b border-sand-200">
              <div className="w-10 h-10 bg-accent-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                AS
              </div>
              <div>
                <p className="text-sm font-semibold text-ink-900">
                  Equipe AgentSkills
                </p>
                <p className="text-xs text-ink-500">{post.date}</p>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="mb-16">{renderContent(post.content)}</div>

          {/* Author box */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm mb-16">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-accent-500 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                AS
              </div>
              <div>
                <h3 className="font-semibold text-ink-900">
                  Equipe AgentSkills
                </h3>
                <p className="text-sm text-ink-700 mt-1">
                  Somos apaixonados por IA e automacao. Nosso objetivo e tornar
                  agentes de IA acessiveis para todos os brasileiros.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-ink-900 mb-6">
            Produtos Relacionados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
