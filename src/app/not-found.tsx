import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-ink-900 mb-4">404</h1>
      <p className="text-xl text-ink-700 mb-8">Página não encontrada</p>
      <Link
        href="/"
        className="inline-flex items-center px-6 py-3 bg-accent-500 text-white font-semibold rounded-xl hover:bg-accent-600 transition-colors"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
