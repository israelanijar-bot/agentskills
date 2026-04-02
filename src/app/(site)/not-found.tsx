import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="text-8xl font-bold text-accent-500 mb-4">404</div>
      <h1 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-4">
        Pagina nao encontrada
      </h1>
      <p className="text-ink-700 max-w-md mb-8">
        A pagina que voce esta procurando nao existe ou foi movida. Que tal
        explorar nosso marketplace?
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-accent-500 text-white font-semibold rounded-xl hover:bg-accent-600 transition-colors"
        >
          Voltar para o Inicio
        </Link>
        <Link
          href="/browse"
          className="inline-flex items-center justify-center px-6 py-3 border-2 border-accent-500 text-accent-500 font-semibold rounded-xl hover:bg-accent-500 hover:text-white transition-colors"
        >
          Explorar Marketplace
        </Link>
      </div>
    </div>
  );
}
