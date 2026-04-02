import Link from "next/link";

export interface Creator {
  name: string;
  username: string;
  avatar: string;
  bio: string;
  totalSales: number;
  totalProducts: number;
}

interface CreatorCardProps {
  creator: Creator;
}

export default function CreatorCard({ creator }: CreatorCardProps) {
  return (
    <Link
      href={`/criador/${creator.username}`}
      className="group flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <img
        src={creator.avatar}
        alt={creator.name}
        className="w-14 h-14 rounded-full object-cover shrink-0 ring-2 ring-sand-100 group-hover:ring-accent-400 transition-all"
      />

      <div className="min-w-0 flex-1">
        <h4 className="font-semibold text-ink-900 group-hover:text-accent-500 transition-colors">
          {creator.name}
        </h4>
        <p className="text-xs text-ink-500 mb-1">@{creator.username}</p>
        <p className="text-sm text-ink-700 line-clamp-1">{creator.bio}</p>
      </div>

      <div className="hidden sm:flex flex-col items-end gap-1 shrink-0 text-right">
        <span className="text-sm font-semibold text-ink-900">
          {creator.totalSales.toLocaleString("pt-BR")} vendas
        </span>
        <span className="text-xs text-ink-500">
          {creator.totalProducts} produtos
        </span>
      </div>
    </Link>
  );
}
