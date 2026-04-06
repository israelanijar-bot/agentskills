"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import Button from "./Button";

const navLinks = [
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<{ name: string; avatar_url: string | null; role: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) {
        supabase
          .from("profiles")
          .select("name, avatar_url, role")
          .eq("id", user.id)
          .single()
          .then(({ data }) => {
            if (data) setProfile(data);
          });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) setProfile(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  const initials = profile?.name
    ? profile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-sand-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl" role="img" aria-label="logo">
              🧩
            </span>
            <span className="text-xl font-bold text-ink-900 tracking-tight">
              AgentSkills
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink-700 hover:text-accent-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-accent-500 text-white flex items-center justify-center text-xs font-bold">
                      {initials}
                    </div>
                  )}
                  <svg
                    className="w-4 h-4 text-ink-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-sand-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-sand-100">
                      <p className="text-sm font-semibold text-ink-900 truncate">
                        {profile?.name}
                      </p>
                      <p className="text-xs text-ink-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-ink-700 hover:bg-sand-50"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/minhas-compras"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-ink-700 hover:bg-sand-50"
                    >
                      Minhas Compras
                    </Link>
                    <Link
                      href="/favoritos"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-ink-700 hover:bg-sand-50"
                    >
                      Favoritos
                    </Link>
                    <Link
                      href="/perfil"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-ink-700 hover:bg-sand-50"
                    >
                      Perfil
                    </Link>
                    {profile?.role === "admin" && (
                      <Link
                        href="/admin"
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                      >
                        Painel Admin
                      </Link>
                    )}
                    <div className="border-t border-sand-100 mt-1 pt-1">
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-ink-700 hover:bg-sand-50 cursor-pointer"
                      >
                        Sair
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="secondary" size="sm">
                    Entrar
                  </Button>
                </Link>
                <Link href="/cadastro">
                  <Button variant="primary" size="sm">
                    Cadastre-se
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-ink-700 hover:text-ink-900"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-72 bg-white shadow-xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <span className="text-lg font-bold text-ink-900">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-ink-700 hover:text-ink-900"
                aria-label="Fechar menu"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {user && profile && (
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-sand-100">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-accent-500 text-white flex items-center justify-center text-sm font-bold">
                    {initials}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink-900 truncate">
                    {profile.name}
                  </p>
                  <p className="text-xs text-ink-500 truncate">{user.email}</p>
                </div>
              </div>
            )}

            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-ink-700 hover:text-accent-500 py-2"
                >
                  {link.label}
                </Link>
              ))}
              {user && (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="text-base font-medium text-ink-700 hover:text-accent-500 py-2"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/minhas-compras"
                    onClick={() => setMobileOpen(false)}
                    className="text-base font-medium text-ink-700 hover:text-accent-500 py-2"
                  >
                    Minhas Compras
                  </Link>
                  {profile?.role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileOpen(false)}
                      className="text-base font-medium text-red-600 hover:text-red-700 py-2"
                    >
                      Painel Admin
                    </Link>
                  )}
                </>
              )}
            </nav>

            <div className="mt-auto flex flex-col gap-3">
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-3 bg-sand-100 text-ink-700 font-medium rounded-xl hover:bg-sand-200 cursor-pointer transition-colors"
                >
                  Sair
                </button>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileOpen(false)}>
                    <Button variant="secondary" size="md" className="w-full">
                      Entrar
                    </Button>
                  </Link>
                  <Link href="/cadastro" onClick={() => setMobileOpen(false)}>
                    <Button variant="primary" size="md" className="w-full">
                      Cadastre-se
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
