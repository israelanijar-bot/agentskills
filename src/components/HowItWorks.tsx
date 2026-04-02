const steps = [
  {
    icon: "🔍",
    title: "Explore e Escolha",
    description:
      "Navegue por skills e personas criadas por especialistas. Filtre por categoria, preço ou avaliação.",
  },
  {
    icon: "💳",
    title: "Compre e Baixe",
    description:
      "Pagamento via Pix ou cartão. Download instantâneo após a confirmação do pagamento.",
  },
  {
    icon: "🚀",
    title: "Instale e Use",
    description:
      "Instale no seu OpenClaw com um comando. Pronto para produção em segundos.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-ink-900 mb-4">
            Como Funciona
          </h2>
          <p className="text-ink-700 text-lg max-w-xl mx-auto">
            Três passos simples para turbinar seus agentes de IA
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative text-center p-8 rounded-2xl bg-sand-50 hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              {/* Step number */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-accent-500/10 flex items-center justify-center text-sm font-bold text-accent-500">
                {index + 1}
              </div>

              <div className="text-5xl mb-6" role="img" aria-label={step.title}>
                {step.icon}
              </div>

              <h3 className="text-xl font-semibold text-ink-900 mb-3">
                {step.title}
              </h3>

              <p className="text-ink-700 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
