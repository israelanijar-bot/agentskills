import Button from "./Button";
import SearchBar from "./SearchBar";

const stats = [
  { value: "2.000+", label: "Skills" },
  { value: "250+", label: "Criadores" },
  { value: "R$ 500K+", label: "Pagos" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-sand-50 via-white to-sand-100 opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(79,70,229,0.05),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink-900 tracking-tight leading-tight mb-6">
            O Marketplace de Skills para seus{" "}
            <span className="text-accent-500">Agentes de IA</span>
          </h1>

          <p className="text-lg sm:text-xl text-ink-700 mb-10 max-w-2xl mx-auto leading-relaxed">
            Descubra, compre e instale skills e personas prontas para OpenClaw.
            Criado por especialistas, pronto para produção.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button variant="primary" size="lg">
              Explorar Marketplace
            </Button>
            <Button variant="secondary" size="lg">
              Vender suas Skills
            </Button>
          </div>

          <div className="flex justify-center mb-12">
            <SearchBar />
          </div>
        </div>

        {/* Stats bar */}
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-center divide-x divide-sand-200">
            {stats.map((stat) => (
              <div key={stat.label} className="px-6 sm:px-8 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-ink-900">
                  {stat.value}
                </div>
                <div className="text-sm text-ink-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
