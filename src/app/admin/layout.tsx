import type { Metadata } from 'next';
import AdminNav from './AdminNav';

export const metadata: Metadata = {
  title: 'Admin | AgentSkills',
  description: 'Painel administrativo do AgentSkills',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <AdminNav />
      <div className="ml-60 flex-1 bg-sand-50 min-h-screen">
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
