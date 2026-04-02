'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '\u{1F4CA}' },
  { href: '/admin/produtos', label: 'Produtos', icon: '\u{1F4E6}' },
  { href: '/admin/usuarios', label: 'Usu\u00e1rios', icon: '\u{1F465}' },
  { href: '/admin/blog', label: 'Blog', icon: '\u{1F4DD}' },
  { href: '/admin/configuracoes', label: 'Configura\u00e7\u00f5es', icon: '\u2699\uFE0F' },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 bg-ink-900 text-white flex flex-col z-50">
      <div className="px-6 py-6 border-b border-white/10">
        <h1 className="text-lg font-bold tracking-tight">AgentSkills Admin</h1>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-accent-500 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <span className="text-base">{'\u2190'}</span>
          Voltar ao site
        </Link>
      </div>
    </aside>
  );
}
