"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-ink-900 rounded-3xl p-8 sm:p-12 lg:p-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            AgentSkills Daily
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-lg mx-auto">
            Receba as melhores skills e dicas de IA toda semana
          </p>

          {subscribed ? (
            <div className="bg-success/10 border border-success/20 rounded-2xl p-6 max-w-md mx-auto">
              <p className="text-success font-semibold text-lg">
                Inscrito com sucesso!
              </p>
              <p className="text-white/50 text-sm mt-2">
                Fique de olho no seu email.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="flex-1 px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:border-accent-400 focus:ring-2 focus:ring-accent-400/20"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-xl cursor-pointer whitespace-nowrap"
              >
                Assinar Grátis
              </button>
            </form>
          )}

          <p className="text-white/30 text-sm mt-6">
            5.000+ assinantes
          </p>
        </div>
      </div>
    </section>
  );
}
