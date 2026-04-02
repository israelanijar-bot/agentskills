import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AgentSkills - Marketplace de Skills para Agentes de IA",
    template: "%s | AgentSkills",
  },
  description:
    "Descubra, compre e instale skills e personas prontas para OpenClaw. O maior marketplace brasileiro de habilidades para agentes de IA.",
  keywords: [
    "OpenClaw",
    "agentes de IA",
    "skills",
    "personas",
    "marketplace",
    "inteligencia artificial",
    "automacao",
    "Brasil",
  ],
  authors: [{ name: "AgentSkills" }],
  creator: "AgentSkills",
  metadataBase: new URL("https://agentskills.com.br"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://agentskills.com.br",
    siteName: "AgentSkills",
    title: "AgentSkills - Marketplace de Skills para Agentes de IA",
    description:
      "Descubra, compre e instale skills e personas prontas para OpenClaw. O maior marketplace brasileiro de habilidades para agentes de IA.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentSkills - Marketplace de Skills para Agentes de IA",
    description:
      "Descubra, compre e instale skills e personas prontas para OpenClaw.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-sand-50 text-ink-900">
        {children}
      </body>
    </html>
  );
}
